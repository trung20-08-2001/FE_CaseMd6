import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCategory } from '../../services/categoryService';
import { editHouse, findHouseByAccount } from '../../services/houseService';
import "./style.css"
import Swal from 'sweetalert2';
import customAxios from '../../services/api';
import { filterHouseByNameAndStatus } from '../../redux/selector';
import { nameHouseSearch, filterStatusHouse } from '../../services/filterService';

function MyHouses() {
    const dispatch = useDispatch();
    const myHousesDTO = useSelector(filterHouseByNameAndStatus)
    const categories = useSelector(state => state.categories.categories);
    const [isSearchChanged, setIsSearchChanged] = useState(false);
    const [houses, setHouses] = useState([])
    const [nameHouse, setNameHouse] = useState('');
    const [selectValue, setSelectValue] = useState(0);

    useEffect(() => {
        let account = JSON.parse(localStorage.getItem("account"))
        if (myHousesDTO.length === 0) {
            dispatch(findHouseByAccount(account.id));
        }
        if (categories.length === 0) {
            dispatch(getAllCategory())
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage, setItemsPerPage] = useState(6); // Số mục trên mỗi trang
    // Tổng số trang
    const totalPages = Math.ceil(myHousesDTO.length / itemsPerPage);
    // Lấy mục trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = myHousesDTO.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = () => {
        if (isSearchChanged) {
            setIsSearchChanged(false)
        } else {
            setIsSearchChanged(true)
        }
    };

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
            <div style={{ display: 'flex', alignItems: 'center' }} className='mt-20'>
                <input
                    name="nameHouse"
                    type="text"
                    placeholder="Address"

                    onChange={e => dispatch(nameHouseSearch(e.target.value))}
                    style={{ flex: 2, marginRight: '10px' }}
                />
                <select
                    name="select"
                    onChange={e => dispatch(filterStatusHouse(e.target.value))}
                    style={{ flex: 2, marginRight: '10px' }}
                >
                    <option value={"ALL"}>All</option>
                    <option value={"READY"}>READY</option>
                    <option value={"ORDERED"}>ORDERED</option>
                    <option value={"USING"}>USING</option>
                    <option value={"BLOCKED"}>BLOCK</option>
                </select>
            </div>
            {myHousesDTO.length === 0 ?
                <h1 className='text-center' style={{ color: "red" }}>You don't have any house to rent yet</h1>
                :
                <>
                    <div className='row mt-20'>
                        {currentItems.length !== 0 && currentItems.map((item, index) => {
                            return (
                                <div className="col-md-6  card_house mb-40 " key={item.house.id}>
                                    <div className="single-property hover-effect-two bg-violet">
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
                                                            <a href="properties-details.html">{item.house.name}</a>
                                                        </h4>
                                                        <span style={{color: "#fef1ec"}}>
                                                        <span className="mr-10">
                                                            <img src="images/icons/map.png" alt=""/>
                                                        </span>
                                                            {item.house.address}
                                                    </span>
                                                    </div>
                                                    <div className="fix pull_right">
                                                        <p style={{color: "ghostwhite"}}><strong style={{
                                                            color: "gold",
                                                            fontSize: "15px",
                                                            textShadow: "0 0 1px gold"
                                                        }}>{new Intl.NumberFormat().format(item.house.price).replace(/,/g, ' ')}</strong> Vnd/Day
                                                        </p></div>
                                                </div>
                                                <div className="property-image text-white">
                                                    <Link to={"houseDetail/" + item.house.id}><img
                                                        src={item.images[0].url} alt=""
                                                        style={{width: "100%", height: "300px"}}/></Link>
                                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                                        <div className="hover-item">
                                                            <span>{item.house.status.name === "READY"? <strong style={{color:"#32CD32"}}>Ready</strong>:<p style={{color:"#ea4335"}}>Ordered</p> }</span>
                                                        </div>
                                                        <div className="hover-item">
                                                            <img className="mr-10" src="../images/icons/bed.png"
                                                                 alt=""/>
                                                            <strong>{item.house.numberOfBedrooms}</strong>
                                                        </div>
                                                        <div className="hover-item">
                                                            <img className="mr-10" src="../images/icons/shower.png"
                                                                 alt=""/>
                                                            <strong>{item.house.numberOfLivingRooms}</strong>
                                                        </div>
                                                        <div className="hover-item">
                                                            <i className='fa fa-heart mr-10' style={{color: "red"}}></i>

                                                            <strong style={{textShadow:"0 0 2px red"}}>{item.house.numberOfHire}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-10' >
                                            <button className="button fill mb-10"> <Link to={"/myaccount/edit_house/" + index} style={{ color: "white" }} >EDIT</Link></button>
                                            <button className="button fill mb-10" onClick={() => handleUpdateStatus(item, index)}>UPDATE STATUS</button>
                                            <button className="button fill mb-10" ><Link to={"/myaccount/see_reviews/" + item.house.id} style={{ color: "white" }} >DETAIL</Link></button>
                                        </div>
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
                                                backgroundColor: currentPage === pageNumber ? 'yellowgreen' : 'snow',
                                                color: currentPage === pageNumber ? 'white' : 'black',

                                            }}
                                        >
                                            {pageNumber}
                                        </button>
                                    )
                                )}
                            </div>
                            <br/>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default MyHouses;