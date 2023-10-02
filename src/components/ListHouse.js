import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePageCurrent, findAllHouse } from '../services/houseService';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import "../assets/styleHouse.css"
import CustomPagination from './CustomPagination';

function ListHouse() {

    const dispatch = useDispatch();
    const currentPage=useSelector(state=>state.house.allHouse.data.currentPage);
    const content = useSelector(state => state.house.allHouse.data.content)
    const totalPages = useSelector(state => state.house.allHouse.data.totalPages)
    const loading = useSelector(state => state.house.allHouse.loading)
    const account = useSelector(state => state.account.account)

    const setCurrentPage=(number)=>{
        dispatch(changePageCurrent(number))
    }
    useEffect(() => {
        if (content[currentPage] === undefined) {
           dispatch(findAllHouse({ page: currentPage, size: 8 }))
        }
    }, [currentPage])

    return (
        <>
            <div className="property-area pb-60"
                style={{ background: "linear-gradient(245.59deg, #f9f9f9 0%, #f2f2f2 28.53%, #ebebeb 75.52%)" }}>
                <div className="container" style={{ maxWidth: "100%" }}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title mb-38 mt-31 text-center">
                                <h2 className="uppercase headerInBody mb-25" style={{ textShadow: "0 0 2px gold" }}>LIST HOUSE</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {loading ?
                            <Loading />
                            :
                            content[currentPage]?.length !== 0 &&
                            content[currentPage]?.map(item => {
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
                        }
                    </div>
                </div>
                {!loading &&
                    <div className="d-flex justify-content-center">
                        <CustomPagination totalPages={totalPages} setPageCurrent={(number) => setCurrentPage(number)} pageCurrent={currentPage+1} />
                    </div>
                }
            </div>

        </>
    )
}

export default ListHouse
