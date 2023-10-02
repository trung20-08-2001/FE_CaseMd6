import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findTopHouse } from '../services/houseService';
import Loading from './Loading';
import { Link } from "react-router-dom";


function TopHouse() {
    const dispatch = useDispatch();
    const topHouse = useSelector(state => state.house.topHouse.data);
    const loading = useSelector(state => state.house.topHouse.loading);
    const account = useSelector(state => state.account.account);
    useEffect(() => {
        if (topHouse.length === 0) {
            dispatch(findTopHouse())
        }
    }, [])

    return (
        <>
            <div className="property-area pt-10 pb-10" style={{
                background: "linear-gradient(245.59deg, #f9f9f9 0%, #f2f2f2 28.53%, #ebebeb 75.52%)",
                borderBottom: "1px solid #95C41F"
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title mb-38 mt-31 text-center">
                                <h2 className="uppercase mb-25 headerInBody" style={{ textShadow: "0 0 2px gold" }}><i
                                    className="fa fa-trophy" style={{ color: "gold" }}></i> TOP HOUSE</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {!loading ?
                            topHouse.map(item => {
                                return (
                                    < div className="col-lg-4 mb-20" key={item.house.id}>
                                        <div className="scaleHouse">
                                            <Link to={"/houseDetail/" + item.house.id}>
                                                <div className="single-property hover-effect-two">
                                                    <div
                                                        className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet"
                                                        style={{
                                                            borderRadius: "18px 18px 0 0",
                                                            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
                                                        }}
                                                    >
                                                        <div className="title-left pull_left">
                                                            <h4 className="text-white mb-12">
                                                                <span style={{ color: "#fef1ec" }}>
                                                                    {item.house.name.slice(0, 15)}
                                                                    {item.house.name.length > 15 && " ..."}
                                                                </span>
                                                            </h4>
                                                            <span style={{ color: "#fef1ec" }}>
                                                                <  span className="mr-10">
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
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="property-image text-white">
                                                        <img src={item.images.length !== 0 ? item.images[0].url : ""}
                                                            alt="" style={{ width: "100%", height: "300px" }} />
                                                        <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                                            <div className="hover-item">
                                                                <span>{account != null ?
                                                                    <span>{item.house.status.name === "BLOCKED" ?
                                                                        <strong
                                                                            style={{ color: "darkorange", textShadow: "0 0 3px darkorange" }}> Blocked</strong>
                                                                        :
                                                                        item.house.status.name === "USING" ? <strong
                                                                            style={{ color: "#FFD700", textShadow: "0 0 3px #FFD700" }}>Using</strong> :
                                                                            <strong
                                                                                style={{ color: "#32CD32", textShadow: "0 0 3px #32CD32" }}>Ready</strong>
                                                                    }</span> :
                                                                    <span>{item.house.status.name === "USING" ?
                                                                        <strong style={{ color: "#FFD700", textShadow: "0 0 3px #FFD700" }}>Using</strong> :
                                                                        item.house.status.name === "BLOCKED" ?
                                                                            <strong
                                                                                style={{ color: "darkorange", textShadow: "0 0 3px darkorange" }}> Blocked</strong> :
                                                                            <strong
                                                                                style={{ color: "#32CD32", textShadow: "0 0 3px #32CD32" }}>Ready</strong>

                                                                    }</span>
                                                                }</span>
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
                                                                <i className='fa fa-heart mr-10'
                                                                    style={{ color: "red" }}></i>

                                                                <strong>{item.house.numberOfHire}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <Loading />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopHouse