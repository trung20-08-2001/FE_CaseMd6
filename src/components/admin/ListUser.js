import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusAccount, findListAccountUsers } from '../../services/accountService';
import customAxios from '../../services/api';
import { Link } from "react-router-dom";

function ListUser() {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [userDetail, setUserDetail] = useState({});
    let pages = []

    const pageAccountUser = useSelector(state => {
        let listAccountUser = state.account.listAccountUser;
        let totalPages = Math.ceil(listAccountUser.length / itemsPerPage)
        pages = [...Array(totalPages).keys()].map(i => i + 1);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return listAccountUser.slice(startIndex, endIndex);
    })

   

    useEffect(() => {
        if (pageAccountUser.length === 0) {
            dispatch(findListAccountUsers())
        }
    }, [])

    const handleUnlockAccount = (account) => {
        dispatch(changeStatusAccount({ ...account, status: { id: 1, name: "ACTIVE" } }))
        customAxios.get("/admin/updateStatus/" + 1 + "/" + account.id)
            .then((response) => {
            })
            .catch((error) => console.log(error));
    }

    const handleLockAccount = (account) => {
        dispatch(changeStatusAccount({ ...account, status: { id: 3, name: "BLOCKED" } }))
        customAxios.get("/admin/updateStatus/" + 3 + "/" + account.id)
            .then((response) => {
            })
            .catch((error) => console.log(error));
    }

    const handleChangeStatusAccount = (account) => {
        if (account.status.name === 'ACTIVE') {
            handleLockAccount(account)
        }
        if (account.status.name === 'BLOCKED') {
            handleUnlockAccount(account)
        }
    }

    return (
        <>
            <div className="container distanceBody">

                <h4 className='text-center pb-20 mt-20 headerInBody'>List account user</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-3">FullName</th>
                            <th className="col-3">Phone</th>
                            <th className="col-2">Detail</th>
                            <th className="col-2">Status</th>
                            <th className="col-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageAccountUser.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.fullName ? item.fullName : <p className="text-danger">Not update</p>}</td>
                                <td className='text-muted'>{item.phone}</td>
                                <td className='text-primary' data-toggle="modal" data-target="#exampleModalCenter"
                                    onClick={() => setUserDetail(item)}><Link className="seeDetails">See Details</Link></td>
                                {
                                    item.status.name === "ACTIVE" ?
                                        <td><p className='backgroundColorStatusActive'>Active</p></td> :
                                        <td><p className='backgroundColorStatusBlocked'>Blocked</p></td>
                                }
                                <td onClick={() => handleChangeStatusAccount(item)}>
                                    {
                                        item.status.name === "BLOCKED" ?
                                            <i className="fa fa-lock"
                                                style={{ cursor: "pointer", fontSize: "30px", fontWeight: "bold" }}></i>
                                            :
                                            <i className="fa fa-unlock"
                                                style={{ cursor: "pointer", fontSize: "30px", fontWeight: "bold" }}></i>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-content text-center block top-margin mt-20">
                <ul className="pagination fix mt-10 mb-0">
                    <li style={{cursor:"pointer"}}>
                        <a onClick={() => (currentPage > 1) && setCurrentPage(currentPage - 1)}>
                            <i className="zmdi zmdi-long-arrow-left" />
                        </a>
                    </li>
                    {pages.map(item => {
                        return (
                            <li key={item} style={{cursor:"pointer"}}>
                                <a onClick={() => setCurrentPage(item)}>{item}</a>
                            </li>)

                    })}
                    <li className="current" style={{cursor:"pointer"}}>
                        <a onClick={() => currentPage < pages.length && setCurrentPage(currentPage + 1)}>
                            <i className="zmdi zmdi-long-arrow-right" />
                        </a>
                    </li>
                </ul>
            </div>

            <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="text-center distanceBody headerInBody" style={{ marginTop: "-6%" }}><i
                                className="fa fa-info-circle"></i> Information</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                style={{ border: "1px solid black" }}
                            >
                                <span aria-hidden="true" className="fa fa-remove"
                                    style={{ color: "black", borderRadius: "50%" }}></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img className="card-img-top" src={userDetail.avatar} alt="Avatar"
                                style={{ width: "150px", height: "150px" }} />
                            <div className="card-body a ">
                                <tr>
                                    <th style={{ width: "65%" }}>Username:</th>
                                    <td style={{ color: "#95c41f", fontWeight: "bold" }}>{userDetail.username}</td>
                                </tr>
                                <tr>
                                    <th>FullName:</th>
                                    <td style={{ color: "#95c41f", fontWeight: "bold" }}>{userDetail.fullName === null ?
                                        <p className="text-danger">Not update</p> : userDetail.fullName}</td>
                                </tr>
                                <tr>
                                    <th>Phone:</th>
                                    <td style={{ color: "#95c41f", fontWeight: "bold" }}>{userDetail.phone}</td>
                                </tr>
                                <tr>
                                    <th>Status:</th>
                                    <td style={{
                                        color: "#95c41f",
                                        fontWeight: "bold"
                                    }}>{userDetail.status !== undefined && userDetail.status.name}</td>
                                </tr>
                                <tr>
                                    <th>Total Money:</th>
                                    <td style={{ color: "#95c41f", fontWeight: "bold" }}>
                                        <span>{new Intl.NumberFormat().format(userDetail.totalAllBill)}</span> VNĐ
                                    </td>
                                </tr>
                                <br />
                                <h5>Rental
                                    history: {userDetail.bills && userDetail.bills.length === 0 && "Not rental history"}</h5>
                            </div>
                            {userDetail.bills && userDetail.bills.length !== 0 &&
                                <table className="table text-center">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Date Checkin</th>
                                            <th className="text-center">Date Checkout</th>
                                            <th className="text-center">Total price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userDetail.bills && userDetail.bills.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{item.dateCheckin}</td>
                                                <td>{item.dateCheckout}</td>
                                                <td><span
                                                    style={{ fontWeight: "bold" }}>{new Intl.NumberFormat().format(item.totalPrice)}</span> VNĐ
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ListUser;
