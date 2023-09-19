import React, { useEffect, useState, useRef } from 'react'
import WebSocketConfig from '../../config/configWebsocket';
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import { findAccountAdmin, findAccountById, findAccountsHost, findAccountsUserMessageToAccountHost } from '../../services/accountService';
import { addMessage, findMessageByReceiverAccountAndSenderAccount, receiveMessage } from '../../services/messageService';
import customAxios from '../../services/api';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';



function Chat() {
    const [newMessage, setNewMessage] = useState({ message: "", type: "MESSAGE" });
    const dispatch = useDispatch();
    const messageContainerRef = useRef(null);
    const accountAdmin = useSelector(state => state.account.accountAdmin)
    const listAccountsHost = useSelector(state => state.account.listAccountsHost);
    const listAccountsUserMessageToAccountHost = useSelector(state => state.account.listAccountsUserMessageToAccountHost)
    const account = useSelector(state => state.account.account)
    const message = useSelector(state => state.message.messages);
    const [listMessage, setListMessages] = useState([])
    const [accountReceiverCurrent, setAccountReceiverCurrent] = useState({})
    const accountSenderCurrent = useSelector(state => state.account.accountSenderCurrent);
    const { idSenderAccount } = useParams()

    useEffect(() => {
        const messageContainer = messageContainerRef.current;
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }, [listMessage]);


    useEffect(() => {
        window.scrollTo(0, 0);
        if (Object.keys(accountAdmin).length === 0) {
            dispatch(findAccountAdmin())
        }
        if (account.role.name === 'ROLE_USER' || account.role.id === 3) {
            if (listAccountsHost.length === 0) {
                dispatch(findAccountsHost());
            }
        }
        if (idSenderAccount !== undefined) {
            dispatch(findAccountById(idSenderAccount))
        }
    }, [])


    useEffect(() => {
        if (idSenderAccount !== undefined) {
            setAccountReceiverCurrent(accountSenderCurrent)
            handleFindMessageByAccount(accountSenderCurrent)
        }
    }, [accountSenderCurrent])

    useEffect(() => {
        if (idSenderAccount !== undefined) {
            dispatch(findAccountById(idSenderAccount))
        }
    }, [idSenderAccount])

    const sendMessage = () => {
        if (newMessage.message !== "") {
            dispatch(addMessage( { ...newMessage, receiverAccount: { id: accountReceiverCurrent.id }, senderAccount: { id: account.id } }))
            WebSocketConfig.sendMessage("/private/" + accountReceiverCurrent.id, newMessage)
            customAxios.post("/messages/save", { ...newMessage, receiverAccount: { id: accountReceiverCurrent.id }, senderAccount: { id: account.id }, date: new Date() })
                .then(() => {
                    dispatch(findMessageByReceiverAccountAndSenderAccount({ idReceiverAccount: account.id, idSenderAccount: accountReceiverCurrent.id }))
                    setNewMessage({ ...newMessage, message: "" })
                })
                .catch(err => console.log(err));
        }
    }


    useEffect(() => {
        customAxios.get("messages/findMessageByReceiverAccountAndSenderAccount/" + idSenderAccount + "/" + account.id)
            .then((response) => {
                setListMessages(response.data);
            })
            .catch(error => { console.log(error); })
    }, [message])


    const handleFindMessageByAccount = (accountReceiver) => {
        dispatch(findMessageByReceiverAccountAndSenderAccount({ idReceiverAccount: idSenderAccount, idSenderAccount: account.id }))
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        setAccountReceiverCurrent(accountReceiver);
        setNewMessage({ ...newMessage, senderAccount: account, receiverAccount: accountReceiver, date: `${day}-${month}-${year}` })
        customAxios.get("messages/findMessageByReceiverAccountAndSenderAccount/" + idSenderAccount + "/" + account.id)
        .then((response) => {
            setListMessages(response.data);
        })
        .catch(error => { console.log(error); })

    }

    return (
        // <div className="container-fluid h-100">

        <div className="row justify-content-center h-100" >
            <div className="col-md-2 col-xl-3 chat d-sm-none d-md-none d-lg-block d-xl-block">
                <div className="card mb-sm-3 mb-md-0 contacts_card" style={{ height: "650px" }}>
                    <div className="card-header d-flex align-items-center">
                        {/* <div className="input-group">
                            <input
                                type="text"
                                placeholder="Search..."
                                name=""
                                className="form-control"
                            />
                            <div className="input-group-prepend">
                                <span className="input-group-text search_btn">
                                    <i className="fas fa-search" />
                                </span>
                            </div>
                        </div> */}
                    </div>
                    <div className="card-body contacts_body">
                        <ul className="contacts">
                            {account.role.name !== "ROLE_ADMIN" &&
                                <Link to={"/myaccount/chat/" + accountAdmin.id}>
                                    <li className={accountReceiverCurrent === accountAdmin ? "active" : ""}>
                                        <div className="d-flex bd-highlight">
                                            <div className="img_cont">
                                                <img
                                                    src={accountAdmin.avatar}
                                                    className="rounded-circle user_img"
                                                />
                                                {/* <span className="online_icon" /> */}
                                            </div>
                                            <div className="user_info">
                                                <span>{accountAdmin.fullName === null ? "ADMIN" : accountAdmin.fullName}</span>
                                                <p>ADMIN</p>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            }
                            {listAccountsHost.map((item) => (
                                <Link to={"/myaccount/chat/" + item.id}>
                                    <li key={item.id} className={accountReceiverCurrent === item ? "active" : ""}>
                                        <div className="d-flex bd-highlight" >
                                            <div className="img_cont">
                                                <img
                                                    src={item.avatar}
                                                    className="rounded-circle user_img"
                                                />
                                                {/* <span className="online_icon offline" /> */}
                                            </div>
                                            <div className="user_info">
                                                <span>{item.fullName === null ? item.username : item.fullName}</span>
                                                <p>{item.role.name}</p>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            ))
                            }
                            {listAccountsUserMessageToAccountHost.map((item) => (
                                <li key={new Date().getTime()} className={accountReceiverCurrent === item ? "active" : ""}>
                                    <div className="d-flex bd-highlight" >
                                        <div className="img_cont">
                                            <img
                                                src={item.avatar}
                                                className="rounded-circle user_img"
                                            />
                                            {/* <span className="online_icon offline" /> */}
                                        </div>
                                        <div className="user_info">
                                            <span>{item.fullName === null ? item.username : item.fullName}</span>
                                            <p>{item.role.name}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                    <div className="card-footer" />
                </div>
            </div>
            <div className="col-md-12 col-xl-9 chat" style={{ height: "650px" }}>
                <div className="card " style={{ height: "650px" }}>
                    <div className="card-header msg_head" >
                        {account.role.id !== 3 &&
                            Object.keys(accountSenderCurrent).length !== 0 &&
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img
                                        src={accountSenderCurrent.avatar}
                                        className="rounded-circle user_img"
                                    />
                                    <span className="online_icon" />
                                </div>
                                <div className="user_info">
                                    <span>{accountSenderCurrent.fullName === null ? accountSenderCurrent.username : accountSenderCurrent.fullName}</span>
                                    <p>{accountSenderCurrent.role.name}</p>
                                </div>
                                {/* <div className="video_cam">
                                    <span>
                                        <i className="fas fa-video" />
                                    </span>
                                    <span>
                                        <i className="fas fa-phone" />
                                    </span>
                                </div> */}
                            </div>
                        }
                        {account.role.id === 3 &&
                            Object.keys(accountReceiverCurrent).length !== 0 &&
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img
                                        src={accountReceiverCurrent.avatar}
                                        className="rounded-circle user_img"
                                    />
                                    <span className="online_icon" />
                                </div>
                                <div className="user_info">
                                    <span>{accountReceiverCurrent.fullName === null ? accountReceiverCurrent.username : accountReceiverCurrent.fullName}</span>
                                    <p>{accountReceiverCurrent.role.name}</p>
                                </div>
                                {/* <div className="video_cam">
                            <span>
                                <i className="fas fa-video" />
                            </span>
                            <span>
                                <i className="fas fa-phone" />
                            </span>
                        </div> */}
                            </div>
                        }
                        <span id="action_menu_btn">
                            <IconButton size="large" aria-label="show 4 new mails" color="black">
                                        <Link to={"/"}><Badge badgeContent={0} color="error">
                                            <div style={{fontSize:"30px" ,color:"white"}}><CloseIcon /></div>

                                        </Badge> </Link>
                                    </IconButton>
                        </span>
                        <div className="action_menu">
                            <ul>
                                <li>
                                    <i className="fas fa-user-circle" /> View profile
                                </li>
                                <li>
                                    <i className="fas fa-users" /> Add to close friends
                                </li>
                                <li>
                                    <i className="fas fa-plus" /> Add to group
                                </li>
                                <li>
                                    <i className="fas fa-ban" /> Block
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body msg_card_body" style={{ overflow: "auto" }} ref={messageContainerRef}>
                        {listMessage.map(item => {
                           if (item.senderAccount?.id !== account.id) {
                                    return (
                                        <div className="d-flex justify-content-start mb-4" key={item.id}>
                                            <div className="img_cont_msg">
                                                <img
                                                    src={accountSenderCurrent.avatar}
                                                    className="rounded-circle user_img_msg"
                                                />
                                            </div>
                                            <div className="msg_cotainer_send">
                                                {item.message}
                                                <span className="msg_time text-dark" >{item.date}</span>
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
                                                    src={account.avatar}
                                                    className="rounded-circle user_img_msg"
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            }

                        )}
                    </div>
                    <div className="card-footer">
                        <div className="input-group">
                            <div className="input-group-append">
                                <span className="input-group-text attach_btn">
                                    <i className="fas fa-paperclip" />
                                </span>
                            </div>
                            <input
                                name="message"
                                className="form-control type_msg"
                                placeholder="Type your message..."
                                value={newMessage.message}
                                onChange={(event) => setNewMessage({ ...newMessage, message: event.target.value })}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        sendMessage()
                                    }
                                }}
                            />
                            <div className="input-group-append" onClick={sendMessage}>
                                <span className="input-group-text send_btn">
                                    <i className="fas fa-location-arrow" />
                                </span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
        // </div>




    )
}

export default Chat
