import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import WebSocketConfig from '../../config/configWebsocket';
import {findAccountAdmin, findAccountById} from '../../services/accountService';
import {
    addAccountYouMessaged,
    findAccountHostByUsername,
    findMessageByReceiverAccountAndSenderAccount,
    saveMessage
} from '../../services/messageService';
import "./style.css";
import Swal from "sweetalert2";


const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

function Chat() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const messageContainerRef = useRef(null);
    const [newMessage, setNewMessage] = useState({message: "", type: "MESSAGE"});
    const accountLogin = useSelector(state => state.account.account)
    const listAccountYouMessaged = useSelector(state => state.message.listAccountYouMessaged)
    const accountAdmin = useSelector(state => state.account.accountAdmin)
    const {idReceiverAccount} = useParams()
    const listMessage = useSelector(state => state.message.messages)
    const [accountReceiverCurrent, setAccountReceiverCurrent] = useState({})
    const accountReceiver = useSelector(state => state.account.accountReceiverCurrent)
    const [usernameSearch, setUsenameSearch] = useState("")
    const [panelWidth, setPanelWidth] = useState(0);
    const [height, setHeight] = useState()
    const myElementRef = useRef(null);


    const openCloseNav = () => {
        if (myElementRef.current) {
            const width = myElementRef.current.getBoundingClientRect().width;
            if (panelWidth == 0) {
                setPanelWidth(width);
            } else {
                setPanelWidth(0);
            }
        }
    };

    useEffect(() => {
        const messageContainer = messageContainerRef.current;
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }, [listMessage]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const height = document.getElementById('menu').offsetHeight;
        setHeight(height)
        if (idReceiverAccount === undefined) {
            if (Object.keys(accountAdmin).length === 0) {
                dispatch(findAccountAdmin())
            } else {
                navigate("/myaccount/chat/" + accountAdmin.id)
            }
        } else {
            dispatch(findAccountById(idReceiverAccount))
        }
    }, [idReceiverAccount])

    useEffect(() => {
        if (Object.keys(accountAdmin).length !== 0) {
            setAccountReceiverCurrent(accountAdmin)
            dispatch(findMessageByReceiverAccountAndSenderAccount({
                idReceiverAccount: accountAdmin.id,
                idSenderAccount: accountLogin.id
            }))
            setNewMessage({
                ...newMessage,
                senderAccount: accountLogin,
                receiverAccount: accountAdmin,
                date: `${day}-${month}-${year}`
            })
        }
    }, [accountAdmin]);

    useEffect(() => {
        if (Object.keys(accountReceiver).length !== 0) {
            const accountChat = listAccountYouMessaged.find(item => item.id == accountReceiver.id)
            if (accountChat === undefined && accountReceiver.role.id != 1) {
                dispatch(addAccountYouMessaged(accountReceiver))
            }
            setAccountReceiverCurrent(accountReceiver)
            dispatch(findMessageByReceiverAccountAndSenderAccount({
                idReceiverAccount: accountReceiver.id,
                idSenderAccount: accountLogin.id
            }))
            setNewMessage({
                ...newMessage,
                senderAccount: accountLogin,
                receiverAccount: accountReceiver,
                date: `${day}-${month}-${year}`
            })
        }

    }, [accountReceiver]);


    const sendMessage = () => {
        if (newMessage.message !== "") {
            if (accountLogin.id === accountReceiverCurrent.id) {
                Swal.fire({
                    icon: 'error',
                    title: 'Chat fail',
                    text: "You can't chat with yourself",
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                WebSocketConfig.sendMessage("/private/" + accountReceiverCurrent.id, newMessage);
                dispatch(saveMessage({...newMessage, date: currentDate}))
                setNewMessage({...newMessage, message: ""})
            }
        }
    }

    const handleFindMessageByAccount = (accountReceiver) => {
        setAccountReceiverCurrent(accountReceiver);
        setNewMessage({
            ...newMessage,
            senderAccount: accountLogin,
            receiverAccount: accountReceiver,
            date: `${day}-${month}-${year}`
        })
        dispatch(findMessageByReceiverAccountAndSenderAccount({
            idReceiverAccount: accountReceiver.id,
            idSenderAccount: accountLogin.id
        }))
        openCloseNav()
    }

    return (
        <div className="row justify-content-center h-100 distanceBody">
            <div className=" col-xl-3 chat d-none d-xl-block">
                <div className="card mb-sm-3 mb-md-0 contacts_card" style={{height: "560px"}}>
                    <div className="card-header d-flex align-items-center">
                        {accountLogin.role.id !== 2 &&
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Search host"
                                    name=""
                                    className="form-control type_search"
                                    value={usernameSearch}
                                    onChange={(event => setUsenameSearch(event.target.value))}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            dispatch(findAccountHostByUsername(usernameSearch))
                                        }
                                    }}
                                />
                                <div className="input-group-prepend"
                                     onClick={() => dispatch(findAccountHostByUsername(usernameSearch))}>
                                    <span className="input-group-text search_btn">
                                        <i className="fas fa-search"/>
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="card-body contacts_body">
                        <ul className="contacts">
                            {accountLogin.role.id !== 1 &&
                                Object.keys(accountAdmin).length !== 0 &&
                                <Link to={"/myaccount/chat/" + accountAdmin.id} key={accountAdmin.id}>
                                    <li className={accountAdmin === accountReceiverCurrent ? "active" : ""}
                                        onClick={() => handleFindMessageByAccount(accountAdmin)}>
                                        <div className="d-flex bd-highlight">
                                            <div className="img_cont">
                                                <img
                                                    src={accountAdmin.avatar}
                                                    className="rounded-circle user_img"
                                                />
                                                {/* <span className="online_icon offline" /> */}
                                            </div>
                                            <div className="user_info">
                                            <span className="text-nowrap">
                                                {accountAdmin.fullName === null ? accountAdmin.username.slice(0, 10) : accountAdmin.fullName.slice(0, 10)}
                                                {accountAdmin.fullName !== null && accountAdmin.fullName.length > 10 && " . . ."}
                                                {accountAdmin.fullName === null && accountAdmin.username.length > 10 && " . . ."}
                                            </span>
                                                <p>{accountAdmin.role.name}</p>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            }
                            {listAccountYouMessaged.map((item) => (
                                <Link to={"/myaccount/chat/" + item.id} key={item.id}>
                                    <li className={accountReceiverCurrent === item ? "active" : ""}
                                        onClick={() => handleFindMessageByAccount(item)}>
                                        <div className="d-flex bd-highlight">
                                            <div className="img_cont">
                                                <img
                                                    src={item.avatar}
                                                    className="rounded-circle user_img"
                                                />
                                                {/* <span className="online_icon offline" /> */}
                                            </div>
                                            <div className="user_info">
                                                <span className="text-nowrap">
                                                    {item.fullName === null ? item.username.slice(0, 10) : item.fullName.slice(0, 10)}
                                                    {item.fullName !== null && item.fullName.length > 10 && " . . ."}
                                                    {item.fullName === null && item.username.length > 10 && " . . ."}
                                                </span>
                                                <p>{item.role.name}</p>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className="card-footer"/>
                </div>
            </div>

            <div id="mySidepanel" className="sidepanel d-xl-none" style={{width: panelWidth}}>
                <div className="card mb-sm-3 mb-md-0 contacts_card" style={{height: "560px"}}>
                    <div className="card-header d-flex align-items-center">
                    </div>
                    <div className="card-body contacts_body">
                        <ul className="contacts">
                            {accountLogin.role.id !== 1 &&
                                Object.keys(accountAdmin).length !== 0 &&
                                <Link to={"/myaccount/chat/" + accountAdmin.id} key={accountAdmin.id}>
                                    <li className={accountAdmin === accountReceiverCurrent ? "active" : ""}
                                        onClick={() => handleFindMessageByAccount(accountAdmin)}>
                                        <div className="d-flex bd-highlight">
                                            <div className="img_cont">
                                                <img
                                                    src={accountAdmin.avatar}
                                                    className="rounded-circle user_img"
                                                />
                                            </div>
                                            <div className="user_info">
                                            <span className="text-nowrap">
                                                {accountAdmin.fullName === null ? accountAdmin.username.slice(0, 10) : accountAdmin.fullName.slice(0, 10)}
                                                {accountAdmin.fullName !== null && accountAdmin.fullName.length > 10 && " . . ."}
                                                {accountAdmin.fullName === null && accountAdmin.username.length > 10 && " . . ."}
                                            </span>
                                                <p>{accountAdmin.role.name}</p>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            }
                            {listAccountYouMessaged.map((item) => (
                                <Link to={"/myaccount/chat/" + item.id} key={item.id}>
                                    <li className={accountReceiverCurrent === item ? "active" : ""}
                                        onClick={() => handleFindMessageByAccount(item)}>
                                        <div className="d-flex bd-highlight">
                                            <div className="img_cont">
                                                <img
                                                    src={item.avatar}
                                                    className="rounded-circle user_img"
                                                />
                                            </div>
                                            <div className="user_info">
                                                <span className="text-nowrap">
                                                    {item.fullName === null ? item.username : item.fullName}
                                                </span>
                                                <p>{item.role.name}</p>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        <span id="action_menu_btn" onClick={openCloseNav}>X
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-md-12 col-xl-9 chat" id="main">
                <div className="card" style={{height: "560px"}}>
                    <div className="card-header msg_head" ref={myElementRef}>
                        {Object.keys(accountReceiverCurrent).length !== 0 &&
                            <div className="d-flex bd-highlight ">
                                <div className="img_cont">
                                    <img
                                        src={accountReceiverCurrent.avatar}
                                        className="rounded-circle user_img"
                                    />
                                </div>
                                <div className="user_info">
                                    <span>{accountReceiverCurrent.fullName === null ? accountReceiverCurrent.username : accountReceiverCurrent.fullName}</span>
                                    <p>{accountReceiverCurrent.role.name}</p>
                                </div>
                            </div>
                        }
                        <span id="action_menu_btn" className='d-sm-block d-xl-none' onClick={openCloseNav}>
                            <i className="fas fa-ellipsis-v"/>
                        </span>
                        <div className="action_menu">
                            <ul>
                                <li>
                                    <i className="fas fa-user-circle"/> View profile
                                </li>
                                <li>
                                    <i className="fas fa-users"/> Add to close friends
                                </li>
                                <li>
                                    <i className="fas fa-plus"/> Add to group
                                </li>
                                <li>
                                    <i className="fas fa-ban"/> Block
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="card-body msg_card_body" style={{overflow: "auto"}} ref={messageContainerRef}>
                        {listMessage.length !== 0 ?
                            listMessage.map(item => {
                                if (item.senderAccount?.id !== accountLogin.id) {
                                    return (
                                        <div className="d-flex justify-content-start mb-4" key={item.id}>
                                            <div className="img_cont_msg">
                                                <img
                                                    src={accountReceiverCurrent.avatar}
                                                    className="rounded-circle user_img_msg"
                                                />
                                            </div>
                                            <div className="msg_cotainer_send2 ml-10">
                                                {item.message}
                                                <span
                                                    className={`msg_time text-dark ${item.message.length < item.date.length ? 'msg_time--single-line' : ''}`}>
                                                    {item.date}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="d-flex justify-content-end mb-4" key={item.id}>
                                            <div className="msg_cotainer_send">
                                                <div className="container">
                                                    {item.message}
                                                    <span className="msg_time text-dark">{item.date}</span>
                                                </div>
                                            </div>
                                            <div className="img_cont_msg">
                                                <img
                                                    src={accountLogin.avatar}
                                                    className="rounded-circle user_img_msg"
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            })
                            : <h3 className='text-center text-danger'>There are no messages yet</h3>}
                    </div>
                    <div className="card-footer">
                        <div className="input-group">
                            <input
                                name="message"
                                className="form-control type_msg"
                                value={newMessage.message}
                                onChange={(event) => setNewMessage({...newMessage, message: event.target.value})}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        sendMessage()
                                    }
                                }}
                            />
                            <div className="input-group-append" onClick={sendMessage}>
                                <span className="input-group-text send_btn">
                                    <i className="fas fa-location-arrow"/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Chat
