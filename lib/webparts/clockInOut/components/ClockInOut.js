var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { getSP } from '../../../service/pnpjsconfig';
import styles from './ClockInOut.module.scss';
import * as dayjs from 'dayjs';
import { Modal } from 'office-ui-fabric-react';
var ClockInOut = function (props) {
    var LIST_NAME = 'Clock';
    var _sp = getSP(props.context);
    var _a = React.useState(''), email = _a[0], setEmail = _a[1];
    var _b = React.useState(''), name = _b[0], setName = _b[1];
    var _c = React.useState(null), clock_in = _c[0], setClock_In = _c[1];
    var _d = React.useState(null), clock_out = _d[0], setClock_Out = _d[1];
    var _e = React.useState([]), clockList = _e[0], setClockList = _e[1];
    var _f = React.useState(false), open = _f[0], setOpen = _f[1];
    var _g = React.useState(''), email1 = _g[0], setEmail1 = _g[1];
    var _h = React.useState(''), name1 = _h[0], setName1 = _h[1];
    var _j = React.useState(null), clock_in1 = _j[0], setClock_In1 = _j[1];
    var _k = React.useState(null), clock_out1 = _k[0], setClock_Out1 = _k[1];
    var getCurrentUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _sp.web.currentUser()];
                case 1:
                    user = _a.sent();
                    setEmail(user.Email);
                    setName(user.Title);
                    return [2 /*return*/];
            }
        });
    }); };
    var toggleModal = function (name, email, clock_in, clock_out) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setEmail1(email);
            setName1(name);
            setClock_In1(clock_in);
            setClock_Out1(clock_out);
            if (open === false) {
                setOpen(true);
            }
            else
                setOpen(false);
            return [2 /*return*/];
        });
    }); };
    var getListItemCurrentUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var items, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    items = _sp.web.lists.getByTitle(LIST_NAME).items.select().filter("Title eq '".concat(email, "'")).orderBy('ID', false)();
                    _a = setClockList;
                    return [4 /*yield*/, items];
                case 1:
                    _a.apply(void 0, [(_b.sent()).map(function (item) {
                            return {
                                ID: item.ID,
                                Email: item.Title,
                                Fullname: item.Fullname,
                                Clock_in: item.ClockIn,
                                Clock_out: item.ClockOut
                            };
                        })]);
                    return [2 /*return*/];
            }
        });
    }); };
    var checkUserTime = function () { return __awaiter(void 0, void 0, void 0, function () {
        var items, output1, output2, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _sp.web.lists.getByTitle(LIST_NAME).items.select().filter("Title eq '".concat(email, "'")).top(1).orderBy('ID', false)()];
                case 1:
                    items = _a.sent();
                    console.log('lastest item', items);
                    output1 = [];
                    output2 = [];
                    for (i = 0; i < (items).length; ++i) {
                        output1 = (items)[i]['ClockIn'];
                        output2 = (items)[i]['ClockOut'];
                    }
                    setClock_In(output1.toString());
                    setClock_Out(output2.toString());
                    return [2 /*return*/];
            }
        });
    }); };
    var handleClockIn = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _sp.web.lists.getByTitle(LIST_NAME).items.add({
                        Title: email,
                        Fullname: name,
                        ClockIn: dayjs(Date().toLocaleString()).format('HH:mm:ss'),
                        ClockOut: ''
                    })];
                case 1:
                    _a.sent();
                    setClock_In(dayjs(Date().toLocaleString()).format('HH:mm:ss'));
                    setClock_Out('');
                    reRender();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleClockOut = function () { return __awaiter(void 0, void 0, void 0, function () {
        var lastestItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _sp.web.lists.getByTitle(LIST_NAME).items.select().filter("Title eq '".concat(email, "'")).top(1).orderBy('ID', false)()];
                case 1:
                    lastestItem = _a.sent();
                    return [4 /*yield*/, _sp.web.lists.getByTitle(LIST_NAME).items.getById(lastestItem[0].Id).update({
                            ClockOut: dayjs(Date().toLocaleString()).format('HH:mm:ss')
                        })];
                case 2:
                    _a.sent();
                    setClock_In('');
                    setClock_Out('');
                    reRender();
                    return [2 /*return*/];
            }
        });
    }); };
    var reRender = function () {
        getListItemCurrentUser();
    };
    React.useEffect(function () {
        getCurrentUser();
        getListItemCurrentUser();
        checkUserTime();
    }, [email]);
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles['container-lab'] },
            React.createElement("div", { className: styles['input-item'] },
                React.createElement("label", null, "Email: "),
                React.createElement("input", { type: "text", value: email, disabled: true })),
            React.createElement("div", { className: styles['input-item'] },
                React.createElement("label", null, "Full Name: "),
                React.createElement("input", { type: "text", value: name, disabled: true })),
            React.createElement("div", { className: styles['input-item'] },
                React.createElement("label", null, "Current Time: "),
                React.createElement("input", { type: "text", value: dayjs(Date().toLocaleString()).format('DD/MM/YYYY - HH:mm:ss'), disabled: true }))),
        ((clock_out === '' && clock_in !== '')) ?
            (React.createElement("button", { onClick: handleClockOut }, "CLOCK OUT")) : (React.createElement("button", { onClick: handleClockIn }, "CLOCK IN")),
        React.createElement("h1", null, "Clock Table"),
        React.createElement("table", null,
            React.createElement("tr", { className: styles.thead },
                React.createElement("th", null,
                    React.createElement("p", null, "ID")),
                React.createElement("th", null,
                    React.createElement("p", null, "Email")),
                React.createElement("th", null,
                    React.createElement("p", null, "Full Name")),
                React.createElement("th", null,
                    React.createElement("p", null, "Time"))),
            clockList.map(function (o, index) {
                if (index % 2 === 0) {
                    return (React.createElement("tr", { key: index, className: styles['table-color'], onClick: function () { return toggleModal(o.Fullname, o.Email, o.Clock_in, o.Clock_out); } },
                        React.createElement("td", null,
                            React.createElement("p", null, index + 1)),
                        React.createElement("td", null,
                            React.createElement("p", null, o.Email)),
                        React.createElement("td", null,
                            React.createElement("p", null, o.Fullname)),
                        React.createElement("td", null,
                            React.createElement("p", null,
                                o.Clock_in,
                                " - ",
                                o.Clock_out))));
                }
                if (index % 2 !== 0) {
                    return (React.createElement("tr", { key: index, onClick: function () { return toggleModal(o.Fullname, o.Email, o.Clock_in, o.Clock_out); } },
                        React.createElement("td", null,
                            React.createElement("p", null, index + 1)),
                        React.createElement("td", null,
                            React.createElement("p", null, o.Email)),
                        React.createElement("td", null,
                            React.createElement("p", null, o.Fullname)),
                        React.createElement("td", null,
                            React.createElement("p", null,
                                o.Clock_in,
                                " - ",
                                o.Clock_out))));
                }
            })),
        React.createElement(Modal, { onDismiss: function () { return setOpen(false); }, isOpen: open }, React.createElement("div", { className: styles.container },
            React.createElement("div", null,
                React.createElement("span", null, "Email:"),
                " ",
                email1),
            React.createElement("div", null,
                React.createElement("span", null, "Full Name:"),
                " ",
                name1),
            React.createElement("div", null,
                React.createElement("span", null, "Time:"),
                " ",
                clock_in1,
                " - ",
                clock_out1)))));
};
export default ClockInOut;
//# sourceMappingURL=ClockInOut.js.map