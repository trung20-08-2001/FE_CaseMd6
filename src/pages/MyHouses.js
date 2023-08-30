import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { findHouseByAccount } from '../services/houseService';
import { Link } from 'react-router-dom';

function MyHouses() {
    const dispatch = useDispatch();
    const myHouses = useSelector(state => state.house.myHouses)
    console.log(typeof myHouses);

    useEffect(() => {
        let account = JSON.parse(localStorage.getItem("account"))
        console.log("lenght", myHouses.lenght);
        dispatch(findHouseByAccount(account.id));
    }, [])
    console.log(myHouses);
    return (
        <>
            <div className="row single-property_area">
                {myHouses.map(item => {
                    return(
                        <div className="col-md-6 mb-40">
                    <div className="single-property hover-effect-two">
                        <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                            <div className="title-left pull_left">
                                <h4 className="text-white mb-12">
                                    <a >{item.house.name}</a>
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
                            <Link to="edit_house"  className="block dark-hover">
                                <img src={item.images[0].url} alt="" />
                                <span className="img-button text-uppercase">Edit</span>
                                <span className="p-tag bg-lemon">FOR SALE</span>
                            </Link>
                            <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                <div className="hover-item">
                                    {/* <img className="mr-10" src="../images/icons/floor.png" alt="" /> */}
                                    <span></span>
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
                                    {/* <img className="mr-10" src="../images/icons/garage.png" alt="" /> */}
                                    <i className='fa fa-heart mr-10' style={{color:"red"}}></i>
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
}

export default MyHouses;
