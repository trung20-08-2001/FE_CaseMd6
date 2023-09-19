import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
    filterBathroom,
    filterBedroom,
    filterNameAddress,
    filterPriceHouse,
} from "../services/filterService";
import { filterSearchHouse } from "../redux/selector";
import { findAllHouse } from "../services/houseService";

const SearchHouse = () => {
    const dispatch = useDispatch();
    const resultSearch = useSelector(filterSearchHouse)

    useEffect(() => {
        if (resultSearch.length === 0) {
            dispatch(findAllHouse())
        }

    }, [])

    return (
        <>
            <div className="container">
                <div className="row align-items-center mt-20" >
                    <div className="col">
                        <input type="text"
                            className="form-control"
                            placeholder="Address"
                            name="nameAddress"
                            onChange={e => dispatch(filterNameAddress(e.target.value))}
                        />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder=" Bedroom" name="bedroom"
                            onChange={e => dispatch(filterBedroom(e.target.value))} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Bathroom" name="bedroom"
                            onChange={e => dispatch(filterBathroom(e.target.value))}
                        />
                    </div>
                    <div className="col">
                        <select name="priceHouse" className="form-control" 
                            onChange={e => dispatch(filterPriceHouse(e.target.value))}
                        >
                            <option selected value="0" disabled>Price</option>
                            <option value="500000">Below 500.000VNĐ</option>
                            <option value="1000000">Below 1.000.000VNĐ</option>
                            <option value="2000000">Below 2.000.000VNĐ</option>
                            <option value="3000000">Below 3.000.000VNĐ</option>
                            <option value="4000000">Below 4.000.000VNĐ</option>
                            <option value="5000000">Below 5.000.000VNĐ</option>
                        </select>
                    </div>
                </div>
                {resultSearch.length === 0 ?
                    <h1 className='text-center' style={{ color: "red" }}>There are no results, please search again</h1>
                    :
                    <>
                        <div className='row mt-20'>
                            {resultSearch.length !== 0 && resultSearch.map((item, index) => {
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
                                                        <i className='fa fa-heart mr-10' style={{ color: "red" }}></i>
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
                }
            </div>

        </>
    );
};

export default SearchHouse;