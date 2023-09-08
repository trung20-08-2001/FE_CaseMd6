import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Search = (props) => {
    const [houses, setHouses] = useState([])
    const [nameHouse, setNameHouse] = useState('');
    const [selectValue, setSelectValue] = useState(0);
    const [searchClicked, setSearchClicked] = useState(false);
    let account = JSON.parse(localStorage.getItem("account"))
    const setIsSearch = props.onChange;
    const isSearchChanged = props.isSearchChanged;

    useEffect(() => {
        if (searchClicked) {
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
            // setSearchClicked(false);
        }
    }, [searchClicked, nameHouse, selectValue]);

    useEffect(() => {
        if (nameHouse === "") {
            setIsSearch()
        }
    }, [nameHouse])

    const handleSearch = () => {
        setIsSearch()
        setSearchClicked(true);
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

            {isSearchChanged === true &&
                <>
                    <br/>
                    <>
                        <div className="row single-property_area">

                            {houses.length !== 0 && houses.map((item) => {
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
                                                <Link to={"/host/edit_house/" + item.id}
                                                      className="block dark-hover">
                                                    {item.images[0].url === undefined ?
                                                        <img src={item.images[0]} alt="Image house"
                                                             style={{width: "100%", height: "250px"}}/>
                                                        : <img src={item.images[0].url} alt="Image house"
                                                               style={{width: "100%", height: "250px"}}/>}
                                                    <span className="img-button text-uppercase">Edit</span>
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

            }

        </>
    );
};

export default Search;