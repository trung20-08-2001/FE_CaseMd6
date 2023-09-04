import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findListAccountUsers } from '../services/accountService';
import ReactModal from 'react-modal';

function ListUser() {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    let pages = []

    const pageAccountUser = useSelector(state => {
        let listAccountUser = state.account.listAccountUser;
        let totalPages = Math.ceil(listAccountUser.length / itemsPerPage)
        pages = [...Array(totalPages).keys()].map(i => i + 1);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return listAccountUser.slice(startIndex, endIndex);
    })

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };



    useEffect(() => {
        if (pageAccountUser.length === 0) {
            dispatch(findListAccountUsers())
        }
    }, [])

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
                            <td>{item.phone}</td>
                            {
                                item.status.name === "ACTIVE" ?
                                    <td className='text-success'>{item.status.name}</td> :
                                    <td className='text-danger'>{item.status.name}</td>
                            }
                            <td>
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
                            <td data-toggle="modal" data-target="#exampleModalCenter">DETAIL</td>
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
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="text-center" >User Detail</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <img class="card-img-top" src="..." alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ListUser
