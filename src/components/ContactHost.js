import React from 'react'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAccountYouMessaged } from '../services/messageService';


function ContactHost(props) {
    const account = useSelector(state => state.account.account);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listAccountYouMessaged = useSelector(state => state.message.listAccountYouMessaged)

    const handleClickChat = (idHost) => {
        if (account) {
            if (account.role.id === 2 && account.id !== idHost) {
                Swal.fire({
                    icon: 'error',
                    text: "Host accounts cannot chat with each other",
                });
            } else if (account.id !== idHost) {
                let accountChat = listAccountYouMessaged.find(item => item.id == props.accountHost.id)
                if (accountChat === undefined) {
                    dispatch(addAccountYouMessaged(props.accountHost))
                }
                navigate("/myaccount/chat/" + idHost)
            } else {
                Swal.fire({
                    icon: 'error',
                    text: "You can't chat with yourself",
                });
            }
        } else {
            navigate("/login");
        }
    }

    return (
        <>
            <div className=" col-8">
                <h3>{props.accountHost.fullName}</h3><br />
                <div className="chat-icon" style={{ cursor: "pointer" }}
                    onClick={() => handleClickChat(props.accountHost.id)}>
                    <i className="fas fa-comment"></i>
                    <span> Chat</span>
                </div>
                <br />
                <div className="phone-icon">
                    <i className="fas fa-phone"></i>
                    <span> {props.accountHost.phone}</span>
                </div>
            </div>
        </>
    )
}

export default ContactHost
