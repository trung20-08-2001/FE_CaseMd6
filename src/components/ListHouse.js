import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findAllHouse } from '../services/houseService';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import "../assets/styleHouse.css"
function ListHouse() {

    const dispatch = useDispatch();
    const listHouse = useSelector(state => state.house.allHouse)

    useEffect(() => {
        if (listHouse.length === 0) {
            dispatch(findAllHouse())
        }
    }, [])

    return (
        <>
            <div className="property-area pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title mb-38 mt-31 text-center">
                                {/* <span className="opacity-text text-uppercase center">
                                        LIST HOUSE
                                    </span> */}
                                <h2 className="uppercase mb-25">LIST HOUSE</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {listHouse.length !== 0 ?
                            listHouse.map(item => {
                                return (
                                    < div className="col-lg-4 mb-20" key={item.house.id}>
                                        <div className="single-property hover-effect-two">
                                            <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                                <div className="title-left pull_left">
                                                    <h4 className="text-white mb-12">
                                                        <a href="properties-details.html">{item.house.name}</a>
                                                    </h4>
                                                    <span>
                                                        <span className="mr-10">
                                                            <img src="images/icons/map.png" alt="" />
                                                        </span>
                                                        {item.house.address}
                                                    </span>
                                                </div>
                                                <div className="fix pull_right">
                                                    <p style={{color:"whitesmoke"}}><strong style={{color:"#95c41f", fontSize:"15px"}}>{new Intl.NumberFormat().format(item.house.price).replace(/,/g, ' ')}</strong> VND/DAY</p>                                                </div>
                                            </div>
                                            <div className="property-image">
                                                <Link to={"houseDetail/"+item.house.id}><img src={item.images[0].url} alt="" style={{width:"100%",height:"300px"}} /></Link>
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
                                    </div >
                                )
                            })
                            :<Loading></Loading>
                            }

                    </div>
                </div>
            </div>
        </>
    )
}

export default ListHouse
