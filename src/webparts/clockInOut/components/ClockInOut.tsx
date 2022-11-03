/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SPFI } from '@pnp/sp/fi';
import * as React from 'react';
import { getSP } from '../../../service/pnpjsconfig';
import styles from './ClockInOut.module.scss';
import { IClockInOutProps } from './IClockInOutProps';
import { IClock } from './interface';
import * as dayjs from 'dayjs'
import { Modal } from 'office-ui-fabric-react';

const ClockInOut = (props: IClockInOutProps) => {
  const LIST_NAME = 'Clock'
  let _sp: SPFI = getSP(props.context);

  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [clock_in, setClock_In] = React.useState(null)
  const [clock_out, setClock_Out] = React.useState(null)
  const [clockList, setClockList] = React.useState<IClock[]>([])
  const [open, setOpen] = React.useState(false)

  const [email1, setEmail1] = React.useState('')
  const [name1, setName1] = React.useState('')
  const [clock_in1, setClock_In1] = React.useState(null)
  const [clock_out1, setClock_Out1] = React.useState(null)

  const getCurrentUser = async () => {
    const user = await _sp.web.currentUser()
    setEmail(user.Email)
    setName(user.Title)
  }

  const toggleModal = async (name: string, email: string, clock_in: string, clock_out: string) => {
    setEmail1(email)
    setName1(name)
    setClock_In1(clock_in)
    setClock_Out1(clock_out)
    if (open === false) {
      setOpen(true)
    } else setOpen(false)
  }

  const getListItemCurrentUser = async () => {
    const items = _sp.web.lists.getByTitle(LIST_NAME).items.select().filter(`Title eq '${email}'`).orderBy('ID', false)();
    setClockList((await items).map((item: any) => {
      return {
        ID: item.ID,
        Email: item.Title,
        Fullname: item.Fullname,
        Clock_in: item.ClockIn,
        Clock_out: item.ClockOut
      }
    }))
  }

  const checkUserTime = async () => {
    const items = await _sp.web.lists.getByTitle(LIST_NAME).items.select().filter(`Title eq '${email}'`).top(1).orderBy('ID', false)();
    console.log('lastest item', items)
    var output1: string[] = [];
    var output2: string[] = [];
    for (var i = 0; i < (items).length; ++i) {
      output1 = (items)[i]['ClockIn']
      output2 = (items)[i]['ClockOut']
    }
    setClock_In(output1.toString())
    setClock_Out(output2.toString())
  }

  const handleClockIn = async () => {
    await _sp.web.lists.getByTitle(LIST_NAME).items.add({
      Title: email,
      Fullname: name,
      ClockIn: dayjs(Date().toLocaleString()).format('HH:mm:ss'),
      ClockOut: ''
    })
    setClock_In(dayjs(Date().toLocaleString()).format('HH:mm:ss'))
    setClock_Out('')
    reRender()
  }

  const handleClockOut = async () => {
    const lastestItem: any[] = await _sp.web.lists.getByTitle(LIST_NAME).items.select().filter(`Title eq '${email}'`).top(1).orderBy('ID', false)();
    await _sp.web.lists.getByTitle(LIST_NAME).items.getById(lastestItem[0].Id).update({
      ClockOut: dayjs(Date().toLocaleString()).format('HH:mm:ss')
    })
    setClock_In('')
    setClock_Out('')
    reRender()
  }

  const reRender = () => {
    getListItemCurrentUser()
  }

  React.useEffect(() => {
    getCurrentUser()
    getListItemCurrentUser()
    checkUserTime()
  }, [email])

  return (
    <div className={styles.container}>
      <div className={styles['container-lab']}>
        <div className={styles['input-item']}>
          <label>Email: </label>
          <input type="text" value={email} disabled />
        </div>
        <div className={styles['input-item']}>
          <label>Full Name: </label>
          <input type="text" value={name} disabled />
        </div>
        <div className={styles['input-item']}>
          <label>Current Time: </label>
          <input type="text" value={dayjs(Date().toLocaleString()).format('DD/MM/YYYY - HH:mm:ss')} disabled />
        </div>
      </div>
      {
        ((clock_out === '' && clock_in !== '')) ?
          (<button onClick={handleClockOut}>CLOCK OUT</button>) : (<button onClick={handleClockIn}>CLOCK IN</button>)
      }
      <h1>Clock Table</h1>
      <table>
        <tr className={styles.thead}>
          <th><p>ID</p></th>
          <th><p>Email</p></th>
          <th><p>Full Name</p></th>
          <th><p>Time</p></th>
        </tr>
        {clockList.map((o: IClock, index: number) => {
          if (index % 2 === 0) {
            return (
              <tr key={index} className={styles['table-color']} onClick={() => toggleModal(o.Fullname, o.Email, o.Clock_in, o.Clock_out)}>
                <td><p>{index + 1}</p></td>
                <td><p>{o.Email}</p></td>
                <td><p>{o.Fullname}</p></td>
                <td><p>{o.Clock_in} - {o.Clock_out}</p></td>
              </tr>
            )
          }
          if (index % 2 !== 0) {
            return (
              <tr key={index} onClick={() => toggleModal(o.Fullname, o.Email, o.Clock_in, o.Clock_out)}>
                <td><p>{index + 1}</p></td>
                <td><p>{o.Email}</p></td>
                <td><p>{o.Fullname}</p></td>
                <td><p>{o.Clock_in} - {o.Clock_out}</p></td>
              </tr>
            )
          }

        })}
      </table>
      <Modal
        onDismiss={() => setOpen(false)}
        isOpen={open}
      >
        {
          <div className={styles.container}>
            <div><span>Email:</span> {email1}</div>
            <div><span>Full Name:</span> {name1}</div>
            <div><span>Time:</span> {clock_in1} - {clock_out1}</div>
          </div>
        }
      </Modal>
    </div>
  )
}

export default ClockInOut