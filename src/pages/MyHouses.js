import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {findHouseByAccount} from '../services/houseService';
import {Link} from 'react-router-dom';
import {getAllCategory} from '../services/categoryService';
import axios from "axios";

function MyHouses() {
    const dispatch = useDispatch();
    const myHousesDTO = useSelector(state => state.house.myHousesDTO)
    const categories = useSelector(state => state.categories.categories);
    const [isHidden,setIsHidden] = useState(true)
    useEffect(() => {
        let account = JSON.parse(localStorage.getItem("account"))
        if (myHousesDTO.length === 0) {
            dispatch(findHouseByAccount(account.id));
        }
        if (categories.length === 0) {
            dispatch(getAllCategory())
        }
    }, [])
    const [houses, setHouses] = useState([])
    const [nameHouse, setNameHouse] = useState('');
    const [selectValue, setSelectValue] = useState(0);
    let account = JSON.parse(localStorage.getItem("account"))
    useEffect(() => {
        if (nameHouse !== '' && selectValue !== 0) {
            axios
                .get(
                    'http://localhost:8081/houses/getAllHouseByNameAndStatus/' +
                    nameHouse +
                    '/' +
                    selectValue +
                    '/' +
                    account.id
                )
                .then((res) => {
                    console.log(res);
                    setHouses(res.data);
                })
                .catch((error) => console.log(error));
        }
        if (nameHouse === '' && selectValue !== 0) {
            axios
                .get('http://localhost:8081/houses/getAllHouseByStatus/' + selectValue + '/' + account.id)
                .then((res) => {
                    console.log(res);
                    setHouses(res.data);
                })
                .catch((error) => console.log(error));
        }
        if (nameHouse !== '' && selectValue === 0) {
            axios
                .get('http://localhost:8081/houses/getAllHouseByName/' + nameHouse + '/' + account.id)
                .then((res) => {
                    console.log(res);
                    setHouses(res.data);
                })
                .catch((error) => console.log(error));
        }
        if (nameHouse === '' && selectValue === 0) {
            axios.get("http://localhost:8081/houses/findHouseByAccount/" + account.id)
                .then(res => {
                    console.log(res)
                    setHouses(res.data)
                })
                .catch((error) => console.log(error));
        }

    }, [ nameHouse, selectValue]);

    const handleSearch = () => {
        setIsHidden(false)
    };

    return (
        <>
            {
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <input
                        name="nameHouse"
                        type="text"
                        placeholder="Tên nhà..."
                        value={nameHouse}
                        onChange={e => setNameHouse(e.target.value)}
                        style={{flex: 2, marginRight: '10px'}}
                    />
                    <select
                        name="select"
                        value={selectValue}
                        onChange={e => setSelectValue(parseInt(e.target.value))}
                        style={{flex: 2, marginRight: '10px'}}
                    >
                        <option value={0}>All</option>
                        <option value={4}>READY</option>
                        <option value={5}>ORDERED</option>
                        <option value={6}>USING</option>
                    </select>
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={handleSearch}
                        style={{flex: 1}}
                    >
                        Tìm kiếm
                    </button>
                </div>

            }
            <br/>
            {myHousesDTO.length === 0 ?
                <h1 className='text-center' style={{color: "red"}}>You don't have any house to rent yet</h1>
                :
                <>
                    {isHidden ? (
                        <>
                            <div className="row single-property_area">

                                {myHousesDTO.length !== 0 && myHousesDTO.map((item, index) => {

                                    return (

                                        <div className="col-md-6 mb-40" key={item.house.id}>
                                            <div className="single-property hover-effect-two">
                                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                                    <div className="title-left pull_left">
                                                        <h4 className="text-white mb-12">
                                                            <a>{item.house.name}</a>
                                                        </h4>
                                                        <span>
                                                <span className="mr-10">
                                                    <img src="../images/icons/map.png" alt=""/>
                                                </span>
                                                            {item.house.address}
                                            </span>
                                                    </div>
                                                    <div className="fix pull_right">
                                                        <h3>{item.house.price} VNĐ/DAY</h3>
                                                    </div>
                                                </div>
                                                <div className="property-image">


                                                    <Link to={"/see_reviews/" + item.house.id} className="block dark-hover">
                                                        {item.images[0].url === undefined ?
                                                            <img src={item.images[0]} alt="Image house"
                                                                 style={{width: "100%", height: "250px"}}/>
                                                            : <img src={item.images[0].url} alt="Image house"
                                                                   style={{width: "100%", height: "250px"}}/>}
                                                            <span className="img-button text-uppercase">
                                                                <Link to={"/host/edit_house/" + index} className="block dark-hover" style={{color:"white"}}>Edit</Link>
                                                            </span>
                                                        <span className="p-tag bg-lemon">FOR SALE</span>
                                                    </Link>
                                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                                        <div className="hover-item">
                                                            {/* <img className="mr-10" src="../images/icons/floor.png" alt="" /> */}
                                                            <span>{item.house.status.name}</span>
                                                        </div>
                                                        <div className="hover-item">
                                                            <img className="mr-10" src="../images/icons/bed.png"
                                                                 alt=""/>
                                                            <span>{item.house.numberOfBedrooms}</span>
                                                        </div>
                                                        <div className="hover-item">
                                                            <img className="mr-10" src="../images/icons/shower.png"
                                                                 alt=""/>
                                                            <span>{item.house.numberOfLivingRooms}</span>
                                                        </div>
                                                        <div className="hover-item">
                                                            {/* <img className="mr-10" src="../images/icons/garage.png" alt="" /> */}
                                                            <i className='fa fa-heart mr-10' style={{color: "red"}}></i>
                                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                                                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                                                </svg> */}
                                                            <span>{item.house.numberOfHire}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )
                    :
                        (
                            <>
                                <br/>
                                <>
                                    <div className="row single-property_area">

                                        {houses.length > 0 && houses.map((item) => {
                                            return (
                                                <div className="col-md-6 mb-40" key={item.id}>
                                                    <div className="single-property hover-effect-two">
                                                        <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                                            <div className="title-left pull_left">
                                                                <h4 className="text-white mb-12">
                                                                    <a>{item.house.name}</a>
                                                                </h4>
                                                                <span>
                                                <span className="mr-10">
                                                    <img src="../images/icons/map.png" alt=""/>
                                                </span>
                                                                    {item.house.address}
                                            </span>
                                                            </div>
                                                            <div className="fix pull_right">
                                                                <h3>{item.house.price} VNĐ/DAY</h3>
                                                            </div>
                                                        </div>
                                                        <div className="property-image">
                                                            <Link to={"/see_reviews/" + item.house.id} className="block dark-hover">
                                                                {item.images[0].url === undefined ?
                                                                    <img src={item.images[0]} alt="Image house"
                                                                         style={{width: "100%", height: "250px"}}/>
                                                                    : <img src={item.images[0].url} alt="Image house"
                                                                           style={{width: "100%", height: "250px"}}/>}
                                                                <span className="img-button text-uppercase">
                                                                <Link to={"/host/edit_house/" + item.house.id} className="block dark-hover" style={{color:"white"}}>Edit</Link>
                                                            </span>
                                                                <span className="p-tag bg-lemon">FOR SALE</span>
                                                            </Link>

                                                            <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                                                <div className="hover-item">
                                                                    {/* <img className="mr-10" src="../images/icons/floor.png" alt="" /> */}
                                                                    <span>{item.house.status.name}</span>
                                                                </div>
                                                                <div className="hover-item">
                                                                    <img className="mr-10" src="../images/icons/bed.png"
                                                                         alt=""/>
                                                                    <span>{item.house.numberOfBedrooms}</span>
                                                                </div>
                                                                <div className="hover-item">
                                                                    <img className="mr-10" src="../images/icons/shower.png"
                                                                         alt=""/>
                                                                    <span>{item.house.numberOfLivingRooms}</span>
                                                                </div>
                                                                <div className="hover-item">
                                                                    {/* <img className="mr-10" src="../images/icons/garage.png" alt="" /> */}
                                                                    <i className='fa fa-heart mr-10' style={{color: "red"}}></i>

                                                                    <span>{item.house.numberOfHire}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            </>
                        )
                    }
                </>
            }
        </>
    )
}

export default MyHouses;
