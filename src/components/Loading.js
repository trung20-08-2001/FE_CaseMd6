import React from 'react'
import CSpinner from "react-spinners/ClipLoader";



function Loading() {
    return (
        <>
        <div className="d-flex justify-content-center">
            Loading...
            <CSpinner color="primary" />
            <CSpinner color="secondary" />
            <CSpinner color="success" />
            <CSpinner color="danger" />
            <CSpinner color="warning" />
            <CSpinner color="info" />
            <CSpinner color="light" />
            <CSpinner color="dark" />
            </div>
        </>
    )
}

export default Loading
