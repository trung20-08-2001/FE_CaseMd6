import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findAllHouse } from '../services/houseService';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import "../assets/styleHouse.css"

function ListHouse() {

    const dispatch = useDispatch();
    const listHouse = useSelector(state => state.house.allHouse)
    const account = useSelector(state => state.account.account)
    useEffect(() => {
        if (listHouse.length === 0) {
            dispatch(findAllHouse())
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage, setItemsPerPage] = useState(8); // Số mục trên mỗi trang
    // Tổng số trang
    const totalPages = Math.ceil(listHouse.length / itemsPerPage);
    // Lấy mục trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listHouse.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="property-area pb-60"
                style={{ background: "linear-gradient(245.59deg, #f9f9f9 0%, #f2f2f2 28.53%, #ebebeb 75.52%)" }}>
                <div className="container" style={{ maxWidth: "100%" }}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title mb-38 mt-31 text-center">
                                <h2 className="uppercase headerInBody mb-25" style={{ textShadow: "0 0 2px gold" }}>LIST
                                    HOUSE</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {currentItems.length !== 0 ?
                            currentItems.map(item => {
                                return (
                                    <div className="col-lg-3 mb-25" key={item.house.id}>
                                        <div className="scaleHouse">
                                            <Link to={"houseDetail/" + item.house.id}>
                                                <div className="single-property hover-effect-two">
                                                    <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet"
                                                        style={{
                                                            borderRadius: "18px 18px 0 0",
                                                            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
                                                        }}
                                                    >
                                                        <div className="title-left pull_left">
                                                            <h4 className="text-white mb-12">
                                                                <span style={{ color: "#fef1ec" }}>
                                                                    {item.house.name.slice(0, 15)}
                                                                    {item.house.name.length > 15 && "..."}
                                                                </span>
                                                            </h4>
                                                            <span style={{ color: "#fef1ec" }}>
                                                                <span className="mr-10">
                                                                    <img src="images/icons/map.png" alt="" />
                                                                </span>
                                                                {item.house.address.slice(0, 15)}
                                                                {item.house.address.length > 15 && "..."}                                                    </span>
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

                                                                <strong
                                                                    style={{ textShadow: "0 0 2px red" }}>{item.house.numberOfHire}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div >
                                )
                            })
                            : <Loading></Loading>
                        }
                        <div className="pagination-content text-center block fix col-12">
                            <div>
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                    (pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            disabled={currentPage === pageNumber}
                                            style={{
                                                backgroundColor: currentPage === pageNumber ? '#95C41F' : 'snow',
                                                color: currentPage === pageNumber ? 'white' : 'black',
                                                boxShadow: "0 0 1px gold",
                                                borderRadius: "5px"
                                            }}
                                        >
                                            {pageNumber}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListHouse
