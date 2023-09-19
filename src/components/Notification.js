import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


function Example(args) {
    const account = useSelector(state => state.account.account)
    const [modal, setModal] = useState(false);
    const message = useSelector(state => state.message.messages);
    const notification = useSelector(state => state.message.notification)
    const currentPath = window.location.pathname;
    const [showMessage, setShowMessage] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (Object.keys(message).length !== 0) {
            if (message !== undefined && message?.senderAccount.id !== account.id && (currentPath !== `/myaccount/chat/` + message?.senderAccount.id)) {
                setShowMessage(true);
                setShowNotification(false)
                setModal(true);
            } else {
                setModal(false);
            }
        }
    }, [message]);


    useEffect(() => {
        if (Object.keys(notification).length !== 0) {
            setShowMessage(false);
            setShowNotification(true);
            setModal(true);
        } else {
            setModal(false)
        }
    }, [notification])

    const toggle = () => setModal(!modal);

    const handleBackdropClick = () => {
        if (modal) {
            toggle();
        }
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} onBackdropClick={handleBackdropClick}>
                <ModalHeader>Notification</ModalHeader>
                {Object.keys(message).length !== 0 && showMessage &&
                    <Link to={"myaccount/chat/" + message?.senderAccount.id}><ModalBody><h3>You have a new message.</h3></ModalBody></Link>
                }
                {Object.keys(notification).length !== 0 && showNotification &&
                    <ModalBody>{notification.content}</ModalBody>
                }
            </Modal>
        </div>
    );
}

export default Example;