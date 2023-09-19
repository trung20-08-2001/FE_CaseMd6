import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findTopHouse } from '../services/houseService';
import Loading from './Loading';

function TopHouse() {
    const dispatch = useDispatch();
    const topHouse = useSelector(state => state.house.topHouse);

    useEffect(() => {
        if (topHouse.length === 0) {
            dispatch(findTopHouse())
        }
    }, [])

    // CSS cho hiệu ứng hover
    const hoverEffectStyle = {
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    };

    const hoverStyle = {
        transform: 'scale(1.05)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    };

    return (
        <>
            <div className="property-area pt-10 pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title mb-38 mt-31 text-center">
                                <h2 className="uppercase mb-25">TOP HOUSE</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {topHouse.length !== 0 ?
                            topHouse.map(item => {
                                return (
                                    <div className="col-lg-4 mb-20" key={item.house.id} style={hoverEffectStyle}>
                                        <div className="single-property hover-effect-two" style={hoverStyle}>
                                            <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                                <div className="title-left pull_left">
                                                    <h4 className="text-white mb-12">
                                                        <a>
                                                            {item.house.name.slice(0, 15)}
                                                            {item.house.name.length > 15 && " ..."}
                                                        </a>
                                                    </h4>
                                                    <span>
                                                        <span className="mr-10">
                                                            <img src="images/icons/map.png" alt="" />
                                                        </span>
                                                        {item.house.address}
                                                    </span>
                                                </div>
                                                <div className="fix pull_right">
                                                    <h3>{new Intl.NumberFormat().format(item.house.price).replace(/,/g, ' ')}VND/DAY</h3>

                                                </div>
                                            </div>
                                            <div className="property-image">
                                                <img src={item.images.length !== 0 ? item.images[0].url : ""} alt="" style={{ width: "100%", height: "300px" }} />
                                                <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                                    <div className="hover-item">
                                                        <span>{item.house.status.name}</span>
                                                    </div>
                                                    <div className="hover-item">
                                                        <img className="mr-10" src="../images/icons/bed.png" alt="" />
                                                        <span>{item.house.numberOfBedrooms}</span>
                                                    </div>
                                                    <div className="hover-item">
                                                        <img className="mr-10" src="../images/icons/shower.png" alt="" />
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
                            })
                            : <Loading></Loading>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopHouse;
