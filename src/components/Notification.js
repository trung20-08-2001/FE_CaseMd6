import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function Example(args) {
    const account = useSelector(state => state.account.account)
    const [modal, setModal] = useState(false);
    const message = useSelector(state => state.message.messages[state.message.messages.length - 1]);
    const currentPath = window.location.pathname;

    useEffect(() => {
        if (message !== undefined && message?.senderAccount.id !== account.id && (currentPath !== `/myaccount/chat/` + message?.senderAccount.id)) {
            setModal(true);
        } else {
            setModal(false);
        }
    }, [message]);

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
                <Link to={"myaccount/chat/" + message?.senderAccount.id}><ModalBody><h3>Bạn có tin nhắn mới.</h3></ModalBody></Link>
            </Modal>
        </div>
    );
}

export default Example;