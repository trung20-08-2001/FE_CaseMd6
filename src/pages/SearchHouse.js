import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {
    filterBathroom,
    filterBedroom,
    filterNameAddress,
    filterPriceHouse,
} from "../services/filterService";

import {filterSearchHouse} from "../redux/selector";
import {findAllHouse} from "../services/houseService";
import {Link} from "react-router-dom";
import NoResult from "./NoResult";

const SearchHouse = () => {
    const dispatch = useDispatch();
    const resultSearch = useSelector(filterSearchHouse)

    useEffect(() => {
        if (resultSearch.length === 0) {
            dispatch(findAllHouse())
        }

    }, [])

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm mô phỏng việc tải dữ liệu (thay thế bằng logic thực tế)
    const fetchData = () => {
        setTimeout(() => {
            setData([
                // Dữ liệu mẫu ở đây
            ]);
            setLoading(false);
        }, 2000); // Mô phỏng độ trễ 2 giây
    };

    // Gọi fetchData khi thành phần được tạo (hoặc bất kỳ khi nào bạn muốn)
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row align-items-center mt-20">
                    <div className="col">
                        <input type="text"
                               className="form-control"
                               placeholder="Address"
                               name="nameAddress"
                               onChange={e => dispatch(filterNameAddress(e.target.value))}
                        />
                    </div>
                    <div className="col">
                        <input type="number" min={0} className="form-control" placeholder=" Bedroom" name="bedroom"
                               onChange={e => dispatch(filterBedroom(e.target.value))}/>
                    </div>
                    <div className="col">

                        <input type="number" min={0} className="form-control" placeholder="Bathroom" name="bedroom"
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
            </div>
                {resultSearch.length === 0 ?
                    <NoResult></NoResult>
                    :
                    <>
                        <div className='row mt-20'>
                            {resultSearch.length !== 0 && resultSearch.map((item, index) => {
                                return (
                                    <>

                                        <div className="col-lg-3 mb-25" key={item.house.id}>
                                            <div className="scaleHouse">
                                                <Link to={"/houseDetail/"+item.house.id}>
                                                <div className="single-property hover-effect-two">
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
                                                            <span style={{color: "#fef1ec"}}>
                                                        <span className="mr-10">
                                                            <img src="images/icons/map.png" alt=""/>
                                                        </span>
                                                                {item.house.address}
                                                    </span>
                                                        </div>
                                                        <div className="fix pull_right">
                                                            <p style={{color: "ghostwhite"}}><strong style={{
                                                                color: "gold",
                                                                fontSize: "15px",
                                                                textShadow: "0 0 1px gold"
                                                            }}>{new Intl.NumberFormat().format(item.house.price).replace(/,/g, ' ')}</strong> Vnd/Day
                                                            </p></div>
                                                    </div>
                                                    <div className="property-image text-white">
                                                        <Link to={"/houseDetail/" + item.house.id}><img
                                                            src={item.images[0].url} alt=""
                                                            style={{width: "100%", height: "300px"}}/></Link>
                                                        <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                                            <div className="hover-item">
                                                                <span>{item.house.status.name === "READY"? <strong style={{color:"#32CD32"}}>Ready</strong>:<p style={{color:"#ea4335"}}>Ordered</p> }</span>
                                                            </div>
                                                            <div className="hover-item">
                                                                <img className="mr-10" src="../images/icons/bed.png"
                                                                     alt=""/>
                                                                <strong>{item.house.numberOfBedrooms}</strong>
                                                            </div>
                                                            <div className="hover-item">
                                                                <img className="mr-10" src="../images/icons/shower.png"
                                                                     alt=""/>
                                                                <strong>{item.house.numberOfLivingRooms}</strong>
                                                            </div>
                                                            <div className="hover-item">
                                                                <i className='fa fa-heart mr-10' style={{color: "red"}}></i>

                                                                <strong style={{textShadow:"0 0 2px red"}}>{item.house.numberOfHire}</strong>
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
                }


        </>
    );
};

export default SearchHouse;