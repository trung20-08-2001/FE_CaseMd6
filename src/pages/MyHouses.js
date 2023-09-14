import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from "../components/Search";
import { getAllCategory } from '../services/categoryService';
import { editHouse, findHouseByAccount } from '../services/houseService';
import "./style2.css"
import Swal from 'sweetalert2';
import customAxios from '../services/api';
import { filterHouseByNameAndStatus } from '../redux/selector';
import { nameHouseSearch, filterStatusHouse } from '../services/filterService';

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
                    placeholder="Tên nhà..."

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
                        {myHousesDTO.length !== 0 && myHousesDTO.map((item, index) => {
                            return (
                                <div className="col-md-6  card_house mb-40 " key={item.house.id}>
                                    <div className="single-property hover-effect-two bg-violet">
                                        <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                            <div className="title-left pull_left">
                                                <h4 className="text-white mb-12">
                                                    <a>{item.house.name}</a>
                                                </h4>
                                                <span>
                                                    <span className="mr-10">
                                                        <img src="../images/icons/map.png" alt="" />
                                                    </span>
                                                    {item.house.address}
                                                </span>
                                            </div>
                                            <div className="fix pull_right">
                                                <h3>{item.house.price} VNĐ/DAY</h3>
                                            </div>
                                        </div>
                                        <div className="property-image">

                                            {item.images[0].url === undefined ?
                                                <img src={item.images[0]} alt="Image house"
                                                    style={{ width: "100%", height: "250px" }} />
                                                : <img src={item.images[0].url} alt="Image house"
                                                    style={{ width: "100%", height: "250px" }} />}
                                            <span className="p-tag bg-lemon">FOR SALE</span>

                                            <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                                <div className="hover-item">
                                                    {/* <img className="mr-10" src="../images/icons/floor.png" alt="" /> */}
                                                    <span>{item.house.status.name}</span>
                                                </div>
                                                <div className="hover-item">
                                                    <img className="mr-10" src="../images/icons/bed.png"
                                                        alt="" />
                                                    <span>{item.house.numberOfBedrooms}</span>
                                                </div>
                                                <div className="hover-item">
                                                    <img className="mr-10" src="../images/icons/shower.png"
                                                        alt="" />
                                                    <span>{item.house.numberOfLivingRooms}</span>
                                                </div>
                                                <div className="hover-item">
                                                    {/* <img className="mr-10" src="../images/icons/garage.png" alt="" /> */}
                                                    <i className='fa fa-heart mr-10' style={{ color: "red" }}></i>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
            </svg> */}
                                                    <span>{item.house.numberOfHire}</span>
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
                    </div>
                </>
            }
        </>
    )
}

export default MyHouses;