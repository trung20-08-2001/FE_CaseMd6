import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusAccount, findListAccountUsers } from '../services/accountService';
import customAxios from '../services/api';

function ListUser() {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
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
            .then((response) => { })
            .catch((error) => console.log(error));
    }

    const handleLockAccount = (account) => {
        dispatch(changeStatusAccount({ ...account, status: { id: 3, name: "BLOCKED" } }))
        customAxios.get("/admin/updateStatus/" + 3 + "/" + account.id)
            .then((response) => { })
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
            <table className="table table-bordered table-hover text-center">
                <thead>
                    <tr>
                        <th>FullName</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {pageAccountUser.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.fullName ? item.fullName : "NOT UPDATE"}</td>
                            <td className='text-muted'>{item.phone}</td>
                            {
                                item.status.name === "ACTIVE" ?
                                    <td className='text-success'>{item.status.name}</td> :
                                    <td className='text-danger'>{item.status.name}</td>
                            }
                            <td onClick={() => handleChangeStatusAccount(item)}>
                                {
                                    item.status.name === "BLOCKED" ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-unlock" viewBox="0 0 16 16">
                                            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                                        </svg>
                                }
                            </td>
                            <td className='text-primary' data-toggle="modal" data-target="#exampleModalCenter" onClick={() => setUserDetail(item)}>DETAIL</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onClick={() => (currentPage > 1) && setCurrentPage(currentPage - 1)}>
                        <a className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    {pages.map(item => {
                        return currentPage === item ?
                            <li key={item} className="page-item active"><a className="page-link" onClick={() => setCurrentPage(item)} >{item}</a></li>
                            : <li key={item} className="page-item"><a className="page-link" onClick={() => setCurrentPage(item)} >{item}</a></li>
                    })}
                    <li className="page-item" onClick={() => currentPage < pages.length && setCurrentPage(currentPage + 1)}>
                        <a className="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="text-center">User Detail</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img className="card-img-top" src={userDetail.avatar} alt="Avatar" style={{ width: "150px", height: "150px" }} />
                            <div className="card-body a ">
                                <h5 className="card-title">Username: {userDetail.username}</h5>
                                <h5 className="card-title">FullName: {userDetail.fullName === null ? "NOT UPPDATE" : userDetail.fullName}</h5>
                                <h5 className="card-title">Phone: {userDetail.phone}</h5>
                                <h5 className="card-title">Status: {userDetail.status !== undefined && userDetail.status.name}</h5>
                                <h5 className="card-title">Total Money: {userDetail.totalAllBill}</h5>
                                <h5 className="card-title">Rental history: {userDetail.bills && userDetail.bills.length === 0 && "Not rental history"}</h5>
                            </div>
                            {userDetail.bills && userDetail.bills.length !== 0 &&
                                <table className="table table-bordered table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th>Date Checkin</th>
                                            <th>Date Checkout</th>
                                            <th>Total price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userDetail.bills && userDetail.bills.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className='text-success'>{item.dateCheckin}</td>
                                                <td className='text-danger'>{item.dateCheckout}</td>
                                                <td>{item.totalPrice}</td>
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

export default ListUser
