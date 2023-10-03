import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
    filterBathroom,
    filterBedroom,
    filterNameAddress,
    filterPriceMin,
    filterPriceMax
} from "../services/filterService";

import { filterSearchHouse } from "../redux/selector";
import { findAllHouse, findHousePageSearch, findHouseTopSearch, saveHouseToServer } from "../services/houseService";
import { useNavigate } from "react-router-dom";
import Slider from '@mui/material/Slider';
import { Label } from 'reactstrap';
import TopSearch from '../components/TopSearch';

function valuetext(value) {
    return `${new Intl.NumberFormat().format(value).replace(/,/g, ' ')} VNĐ`;
}

const minDistance = 1000000;

const SearchHouse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allHouse = useSelector(state => state.house.housePageSearch)
    const resultSearch = useSelector(filterSearchHouse)
    const priceMin = useSelector(state => state.house.priceMin)
    const priceMax = useSelector(state => state.house.priceMax)
    const searched = useSelector(state => state.house.searched)

    const [price, setPrice] = useState([priceMin, priceMax]);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 10000000 - minDistance);
                setPrice([clamped, clamped + minDistance]);
                if (clamped <= 1000000) {
                    dispatch(filterPriceMin(0))
                    dispatch(filterPriceMax(newValue[1]))
                } else {
                    dispatch(filterPriceMin(newValue[0]))
                    dispatch(filterPriceMax(newValue[1]))
                }
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setPrice([clamped - minDistance, clamped]);
                if (clamped <= 1000000) {
                    dispatch(filterPriceMin(newValue[0]))
                    dispatch(filterPriceMax(1000000))
                } else {
                    dispatch(filterPriceMax(newValue[1]))
                    dispatch(filterPriceMin(newValue[0]))
                }
            }
        } else {
            setPrice(newValue);
            dispatch(filterPriceMin((newValue[0])))
            dispatch(filterPriceMax((newValue[1])))
        }
    };

    useEffect(() => {
        if (allHouse.length === 0) {
            dispatch(findHousePageSearch())
        }
    }, [])


    const handleClick = (house) => {
        saveHouseToServer({ ...house, searchVolume: house.searchVolume + 1 })
            .then(() => {
                dispatch(findAllHouse({page:0,size:100}))
                dispatch(findHouseTopSearch())
            })
            .catch((err) => { console.log(err); })
        navigate("/houseDetail/" + house.id)

    }

    return (
        <>
            <div className="container">
                <div className="row align-items-center mt-20">
                    <div className="col-xl-3 col-sm-6">
                        <Label>Address</Label>
                        <input type="text"
                            className="form-control"
                            placeholder="Address"
                            name="nameAddress"
                            onChange={e => dispatch(filterNameAddress(e.target.value))}
                            value={useSelector(state=>state.house.nameAddress)}
                        />
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <Label>Bedroom</Label>
                        <input type="number" min={0} className="form-control" placeholder=" Bedroom" name="bedroom"
                            onChange={e => dispatch(filterBedroom(e.target.value))}
                            value={useSelector(state=>state.house.bedroom)}
                        />
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <Label>Bathroom</Label>
                        <input type="number" min={0} className="form-control" placeholder="Bathroom" name="bedroom"
                            onChange={e => dispatch(filterBathroom(e.target.value))}
                            value={useSelector(state=>state.house.bathroom)}
                        />
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <Label>Price</Label>
                        <Slider
                            getAriaLabel={() => 'Minimum distance shift'}
                            value={price}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            valueLabelFormat={valuetext}
                            disableSwap
                            max={10000000}
                            min={0}
                        />
                    </div>
                </div>
            </div>
            {resultSearch.length === 0 ?
                searched &&
                <>
                    <div className="row mt-20">
                        <div className="col-lg-12">
                            <div className="section-title mb-38 mt-31 text-center">
                                <h2 className="uppercase headerInBody mb-25" style={{ textShadow: "0 0 2px gold" }}>NO RESULT FOUND </h2>
                            </div>
                        </div>
                    </div>
                </>

                :
                <>
                    <div className="row mt-20">
                        <div className="col-lg-12">
                            <div className="section-title mb-38 mt-31 text-center">
                                <h2 className="uppercase headerInBody mb-25" style={{ textShadow: "0 0 2px gold" }}>FOUND {resultSearch.length} RESULT  </h2>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-20'>
                        {resultSearch.length !== 0 && resultSearch.map((item, index) => {
                            return (
                                <>

                                    <div className="col-lg-3 mb-25" key={item.house.id}>
                                        <div className="scaleHouse">

                                            <div className="single-property hover-effect-two" onClick={() => handleClick(item.house)}>
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
                                                        <span style={{ color: "#fef1ec" }}>
                                                            <span className="mr-10">
                                                                <img src="images/icons/map.png" alt="" />
                                                            </span>
                                                            {item.house.address}
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
                                                <div className="property-image text-white">
                                                    <img
                                                        src={item.images[0].url} alt=""
                                                        style={{ width: "100%", height: "300px" }} />
                                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                                        <div className="hover-item">
                                                            <span><strong style={{ color: "#32CD32" }}>Ready</strong></span>
                                                        </div>
                                                        <div className="hover-item">
                                                            <img className="mr-10" src="../images/icons/bed.png"
                                                                alt="" />
                                                            <strong>{item.house.numberOfBedrooms}</strong>
                                                        </div>
                                                        <div className="hover-item">
                                                            <img className="mr-10" src="../images/icons/shower.png"
                                                                alt="" />
                                                            <strong>{item.house.numberOfLivingRooms}</strong>
                                                        </div>
                                                        <div className="hover-item">
                                                            <i className='fa fa-heart mr-10' style={{ color: "red" }}></i>

                                                            <strong style={{ textShadow: "0 0 2px red" }}>{item.house.numberOfHire}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <hr style={{ color: "green" }} />
                </>
            }
            <TopSearch />
        </>
    );
};

export default SearchHouse;