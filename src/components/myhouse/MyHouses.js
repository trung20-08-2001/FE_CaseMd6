import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Label } from 'reactstrap';
import Swal from 'sweetalert2';
import { filterHouseByNameAndStatus } from '../../redux/selector';
import customAxios from '../../services/api';
import { getAllCategory } from '../../services/categoryService';
import { filterStatusHouse, nameHouseSearch } from '../../services/filterService';
import { editHouse, findHouseByAccount } from '../../services/houseService';
import Loading from '../Loading';
import "./style.css";

function MyHouses() {
    const dispatch = useDispatch();
    const resultSearch = useSelector(filterHouseByNameAndStatus)
    const categories = useSelector(state => state.categories.categories);
    const allMyHouses = useSelector(state => state.house.myHousesDTO.data);
    const loading = useSelector(state => state.house.myHousesDTO.loading)

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage, setItemsPerPage] = useState(6); // Số mục trên mỗi trang
    // Tổng số trang
    const totalPages = Math.ceil(resultSearch.length / itemsPerPage);
    // Lấy mục trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = resultSearch.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        let account = JSON.parse(localStorage.getItem("account"))
        if (resultSearch.length === 0) {
            dispatch(findHouseByAccount(account.id));
        }
        if (categories.length === 0) {
            dispatch(getAllCategory())
        }
    }, [])



    const handleUpdateStatus = (item, index) => {
        if (item.house.status.name === "USING" || item.house.status.name === "ORDERED") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Status cannot be changed while there is a tenant!',
            })
        } else if (item.house.status.name === "READY") {
            Swal.fire({
                title: 'Are you sure you want to lock?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: "BLOCK",

            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(editHouse({
                        house: { ...item.house, status: { id: 1, name: "BLOCKED" } },
                        images: { ...item.images },
                        indexHouseEdit: index
                    }))
                    customAxios.post("/houses/save", { ...item.house, status: { id: 3 } })
                        .then(() => {
                            Swal.fire('Changes are saved!', '', 'success')
                        })
                        .catch(err => console.log(err))
                }

            }
            )
        } else if (item.house.status.name === "BLOCKED") {
            Swal.fire({
                title: 'You definitely want to unlock it ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: "READY",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(editHouse({
                        house: { ...item.house, status: { id: 1, name: "READY" } },
                        images: { ...item.images },
                        indexHouseEdit: index
                    }))
                    customAxios.post("/houses/save", { ...item.house, status: { id: 4 } })
                        .then(() => {
                            Swal.fire('Changes are saved!', '', 'success')
                        })
                        .catch(err => console.log(err))
                }
            })
        }

    }


    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }} className="row mt-30">
                <div className="col-xl-6 col-sm-6 mb-30">
                    <Label htmlFor="nameHouse">Name House</Label>
                    <input
                        name="nameHouse"
                        type="text"
                        placeholder="Name house..."

                        onChange={e => dispatch(nameHouseSearch(e.target.value))}
                        style={{ flex: 2, marginRight: '10px' }}
                    />
                </div>
                <div className="col-xl-6 col-sm-6 mb-30">
                    <Label htmlFor="status">Status</Label>
                    <select
                        name="select"
                        onChange={e => dispatch(filterStatusHouse(e.target.value))}
                        style={{ flex: 2, marginRight: '10px' }}
                    >
                        <option value={"ALL"}>All</option>
                        <option value={"READY"}>Ready</option>
                        <option value={"ORDERED"}>Ordered</option>
                        <option value={"USING"}>Using</option>
                        <option value={"BLOCKED"}>Blocked</option>
                    </select>
                </div>
            </div>

            {loading ? <div className="row">
                <div className="col-lg-12">
                    <div className="section-title mb-38 mt-31 text-center">
                        <Loading />
                    </div>
                </div>
            </div>
                :
                allMyHouses.length === 0 ?
                    <h1 className='text-center' style={{ color: "red" }}>You don't have any house to rent yet</h1>
                    :
                    resultSearch.length === 0 ?
                        <h1 className='text-center' style={{ color: "red" }}>No matching results</h1>
                        :
                        <>
                            <div className='row mt-20'>
                                {currentItems.length !== 0 && currentItems.map((item, index) => {
                                    return (
                                        <div className="col-md-4 mb-40 " key={item.house.id}>
                                            <div className="scaleHouse">
                                                <div className="single-property hover-effect-two">
                                                    <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet"
                                                        style={{
                                                            borderRadius: "18px 18px 0 0",
                                                            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
                                                        }}
                                                    >
                                                        <div className="title-left pull_left">
                                                            <h4 className="text-white mb-12">
                                                                <span className="text-white">
                                                                    {item.house.name.slice(0, 15)}
                                                                    {item.house.name.length > 15 && "..."}
                                                                </span>
                                                            </h4>
                                                            <span style={{ color: "#fef1ec" }}>
                                                                <span className="mr-10">
                                                                    <img src="/images/icons/map.png" alt="" />
                                                                </span>
                                                                {item.house.address.slice(0, 15)}
                                                                {item.house.address.length > 15 && "..."}
                                                            </span>
                                                        </div>
                                                        <div className="fix pull_right">
                                                            <p style={{ color: "ghostwhite" }}><strong style={{
                                                                color: "gold",
                                                                fontSize: "15px",
                                                                textShadow: "0 0 1px gold"
                                                            }}>{new Intl.NumberFormat().format(item.house.price).replace(/,/g, ' ')}</strong> Vnd/Day
                                                            </p></div>
                                                    </div>
                                                </div>
                                                <div className="property-image text-white">
                                                    <Link to={"/myaccount/see_reviews/" + item.house.id}><img
                                                        src={item.images[0].url} alt=""
                                                        style={{ width: "100%", height: "300px" }} /></Link>
                                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                                        <div className="hover-item">
                                                            <span>
                                                                {item.house.status.name === "USING" && <strong style={{ color: "#FFD700" }}>Using</strong>}
                                                                {item.house.status.name === "ORDERED" && <strong style={{ color: "#87CEEB" }}>Ordered</strong>}
                                                                {item.house.status.name === "BLOCKED" && <strong style={{ color: "darkorange" }}> Blocked</strong>}
                                                                {item.house.status.name === "READY" && <strong style={{ color: "#32CD32" }}>Ready</strong>}
                                                            </span>
                                                        </div>
                                                        <div className="hover-item">
                                                            <img className="mr-10" src="/images/icons/bed.png"
                                                                alt="" />
                                                            <strong>{item.house.numberOfBedrooms}</strong>
                                                        </div>
                                                        <div className="hover-item">
                                                            <img className="mr-10" src="/images/icons/shower.png"
                                                                alt="" />
                                                            <strong>{item.house.numberOfLivingRooms}</strong>
                                                        </div>
                                                        <div className="hover-item">
                                                            <i className='fa fa-heart mr-10' style={{ color: "red" }}></i>
                                                            <strong
                                                                style={{ textShadow: "0 0 2px red" }}>{item.house.numberOfHire}</strong>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='mt-16 text-center'>
                                                <button className="button buttonShadow mb-10 col-4"><Link
                                                    to={"/myaccount/edit_house/" + index}
                                                    style={{ color: "white" }}>Edit</Link></button>
                                                <button className="button buttonShadow mb-10 col-4"
                                                    onClick={() => handleUpdateStatus(item, index)}><Link
                                                        style={{ color: "white" }}>Status</Link>
                                                </button>

                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="pagination-content text-center block fix col-12">
                                    <div>
                                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                            (pageNumber) => (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() => handlePageChange(pageNumber)}
                                                    disabled={currentPage === pageNumber}
                                                    style={{
                                                        backgroundColor: currentPage === pageNumber ? '#95C41F' : 'snow',
                                                        color: currentPage === pageNumber ? 'white' : 'black',
                                                        boxShadow: "0 0 1px gold",
                                                        borderRadius: "5px",
                                                        marginBottom: "60px"
                                                    }}
                                                >
                                                    {pageNumber}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
            }
        </>
    )
}

export default MyHouses;