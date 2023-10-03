import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { findHouseTopSearch } from "../services/houseService";
import { Link } from "react-router-dom";
import Loading from '../components/Loading'


function TopSearch() {
    const dispatch = useDispatch()
    const topSearch = useSelector(state => state.house.topSearch.data);
    const loading=useSelector(state=>state.house.topSearch.loading)

    useEffect(() => {
        if (topSearch.length === 0) {
            dispatch(findHouseTopSearch())
        }
    }, [])


    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title mb-38 mt-31 text-center">
                        <h2 className="uppercase headerInBody mb-25" style={{ textShadow: "0 0 2px gold" }}>TOP SEARCH</h2>
                    </div>
                </div>
            </div>
            <div className='row mt-20'>
                {loading ? <Loading/>:
                topSearch.length !== 0 && topSearch.map((item, index) => {
                    return (
                        <>
                            <div className="col-lg-3 mb-25" key={item.house.id}>
                                <div className="scaleHouse">
                                    <Link to={"/houseDetail/" + item.house.id}>
                                        <div className="single-property hover-effect-two">
                                            <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet"
                                                style={{
                                                    borderRadius: "18px 18px 0 0",
                                                    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
                                                }}
                                            >
                                                <div className="title-left pull_left">
                                                    <h4 className="text-white mb-12">
                                                        {item.house.name}
                                                    </h4>
                                                    <span style={{ color: "#fef1ec" }}>
                                                        <span className="mr-10">
                                                            <img src="images/icons/map.png" alt="" />
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
                                    </Link>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default TopSearch
