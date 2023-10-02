import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import AverageStarsFeedback from "./AverageStarsFeedback";
import StarFeedback from "./StarFeedback";
import ReactModal from "react-modal";
import customAxios from '../services/api';

const SeeReviews = () => {
    const [houses, setHouse] = useState([]);
    const [feedbacks, setFeedbacks] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage, setItemsPerPage] = useState(5); // Số mục trên mỗi trang
    // Tổng số trang
    const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
    const { idHouse } = useParams();
    // Lấy mục trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = feedbacks.slice(indexOfFirstItem, indexOfLastItem);

    const [selectedOption, setSelectedOption] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [fbId, setFbId] = useState()
    const filteredCurrentItems = currentItems.filter(item =>
        item.status.id === 1
    );
  

    // Chuyển đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    useEffect(() => {
        customAxios.get("/houses/houseDetail/" + idHouse)
            .then(res => {
                setHouse(res.data)
            })
            .catch(function (err) {
                console.log(err)
            })
            customAxios.get("/api/feedback/getAllFeedback/" + idHouse)
            .then(res1 => {
                setFeedbacks(res1.data)
            })
            .catch(function (err) {
                console.log(err)
            })
    }, [])
    // Hàm xử lý khi giá trị của select thay đổi
    const handleSelectChange = (e, feedbackId) => {
        setIsOpen(true)
        setFbId(parseInt(feedbackId))
    };


    const handleConfirm = () => {
        customAxios.post("api/feedback/updateFeedback/" + fbId + "/" + idHouse)
            .then((res) => {
                setFeedbacks(res.data)
            })
            .catch(function (err) {
                console.log(err)
            })
        setIsOpen(false);
    };
    const handleCance = () => {
        setSelectedOption(1);
        setIsOpen(false);
    }

    const rate = (number) => {
        customAxios.get("api/feedback/getAllByStar/" + idHouse + "/" + number)
            .then(res => {
                setFeedbacks(res.data)
            })
    }
    const getAll = () => {
        customAxios.get("api/feedback/getAllFeedback/" + idHouse)
            .then(res => {
                setFeedbacks(res.data)
            })
    }
    const getByCmt = () => {
        customAxios.get("api/feedback/getAllFeedbackByComment/" + idHouse)
            .then(res => {
                setFeedbacks(res.data)
            })
    }

    return (
        <>
            <div className="ptb-20">
                <div className="container">
                    <div className="row property-details_wrap">
                        {
                            houses.length !== 0 && (
                                <>
                                    <div className=" order-1">
                                        <div className="text-center">
                                            <h4 className="mb-22 distanceBody headerInBody"><i className="bi bi-house-fill"></i> {houses.house.name}</h4>
                                            <div className="property-image mb-57">
                                                <img src={houses.images[0].url} alt="" style={{ boxShadow: "0 0 3px rgba(0,0,0,0.5)", borderRadius: "10px", width: "800px", height: "600px" }} />
                                            </div>
                                        </div>
                                        <div className="property-desc mb-56">
                                            <h4 className="details-title mb-22">Description</h4>
                                            <p className="mb-24">
                                                {houses.house.description}
                                            </p>

                                        </div>
                                        <div className="property-details">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <h4 className="details-title mb-38">Condition</h4>
                                                    <div className="bg-gray fix pl-35 pt-42 pr-35 pb-79 left-column mb-56">
                                                        <div className="desc-info mb-37">
                                                            <img src="/images/icons/g-map.png" alt="" className="pr-8" />
                                                            <span>{houses.house.address}</span>
                                                        </div>
                                                        <div className="desc-info mb-37">
                                                            <img src="/images/icons/g-bed.png" alt="" className="pr-8" />
                                                            <span>Bedroom <strong>{houses.house.numberOfBedrooms}</strong></span>
                                                        </div>
                                                        <div className="desc-info mb-37">
                                                            <img
                                                                src="/images/icons/g-shower.png"
                                                                alt=""
                                                                className="pr-8"
                                                            />
                                                            <span>Bathroom <strong>{houses.house.numberOfLivingRooms}</strong></span>
                                                        </div>
                                                        <div className="desc-info mb-37">
                                                            <img
                                                                src="/images/icons/g-garage.png"
                                                                alt=""
                                                                className="pr-8"
                                                            />
                                                            <span>{houses.house.category.name}</span>
                                                        </div>
                                                        <div className="desc-info mb-35">
                                                            <i className="fas fa-shield-alt"></i>
                                                            <span>
                                                            {houses.house.status.name === "USING" && <strong style={{ color: "#FFD700" }}> Using</strong>}
                                                            {houses.house.status.name === "ORDERED" && <strong style={{ color: "#87CEEB" }}> Ordered</strong>}
                                                            {houses.house.status.name === "BLOCKED" && <strong style={{ color: "darkorange" }}> Blocked</strong>}
                                                            {houses.house.status.name === "READY" && <strong style={{ color: "#32CD32" }}> Ready</strong>}
                                                        </span>
                                                        </div>
                                                        <div className="desc-info mb-35">
                                                            <i className="fa fa-money"></i>
                                                            <span> <strong style={{
                                                                color: "gold",
                                                                textShadow: "0 0 1px yellow"
                                                            }}>{new Intl.NumberFormat().format(houses.house.price)}</strong> Vnd/Day</span>

                                                        </div>
                                                        <div className="desc-info">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h4 className="details-title mb-38">Amenities</h4>
                                                    <div className="bg-gray fix pl-50 pr-50 pt-44 pb-38 right-column mb-56">
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9" />
                                                            <span>Air Conditioning</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9" />
                                                            <span>Bedding</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9" />
                                                            <span>Balcony</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9" />
                                                            <span>Cable TV</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9" />
                                                            <span>Internet</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9" />
                                                            <span>Parking</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9" />
                                                            <span>Lift</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9" />
                                                            <span>Pool</span>
                                                        </div>
                                                        <div className="desc-info">
                                                            <i className="fa fa-check-square-o mr-9" />
                                                            <span>Dishwasher</span>
                                                        </div>
                                                        <div className="desc-info">
                                                            <i className="fa fa-check-square-o mr-9" />
                                                            <span>Toaster</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="comments fix pt-10">
                                                <div className="bg-gray fix pl-35 pt-42 pr-35 pb-39 mb-56">
                                                    <div>
                                                        <h4 className="details-title pb-8 mb-27">{feedbacks.length} Feedback</h4>
                                                        <div style={{ flex: '1' }}>
                                                            <AverageStarsFeedback houseId={idHouse} />
                                                        </div>
                                                        <div style={{ display: 'flex' }}>
                                                            <button style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                marginRight: '1rem',
                                                                backgroundColor: 'orangered'
                                                            }} onClick={getAll}>
                                                                <span style={{ marginRight: '0.5rem' }}>All</span>
                                                            </button>
                                                            <button style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                marginRight: '1rem',
                                                                backgroundColor: 'orangered'
                                                            }} onClick={getByCmt}>
                                                                <span style={{ marginRight: '0.5rem' }}>Replied</span>
                                                            </button>
                                                        </div>
                                                        <br />
                                                        <div style={{ display: 'flex' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <button style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    marginRight: '1rem',
                                                                    backgroundColor: 'orangered'
                                                                }} onClick={() => {
                                                                    rate(5)
                                                                }}>
                                                                    <span style={{ marginRight: '0.5rem' }}>5 Sao</span>
                                                                </button>
                                                                <button style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    marginRight: '1rem',
                                                                    backgroundColor: 'orangered'
                                                                }} onClick={() => {
                                                                    rate(4)
                                                                }}>
                                                                    <span style={{ marginRight: '0.5rem' }}>4 Sao</span>
                                                                </button>
                                                                <button style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    marginRight: '1rem',
                                                                    backgroundColor: 'orangered'
                                                                }} onClick={() => {
                                                                    rate(3)
                                                                }}>
                                                                    <span style={{ marginRight: '0.5rem' }}>3 Sao</span>
                                                                </button>
                                                                <button style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    marginRight: '1rem',
                                                                    backgroundColor: 'orangered'
                                                                }} onClick={() => {
                                                                    rate(2)
                                                                }}>
                                                                    <span style={{ marginRight: '0.5rem' }}>2 Sao</span>
                                                                </button>
                                                                <button style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    marginRight: '1rem',
                                                                    backgroundColor: 'orangered'
                                                                }} onClick={() => {
                                                                    rate(1)
                                                                }}>
                                                                    <span style={{ marginRight: '0.5rem' }}>1 Sao</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            {
                                                feedbacks.length > 0 && filteredCurrentItems.length > 0 && filteredCurrentItems.map((fb) => {
                                                    return (
                                                        <>
                                                            <div>
                                                                <div className="comments fix pt-50">
                                                                    <div className="single-comment fix mb-18">
                                                                        <div className="author-image pull_left mr-23">
                                                                            <img alt="" src={fb.account.avatar} style={{
                                                                                width: '80px',
                                                                                height: '80px',
                                                                                borderRadius: '50%',
                                                                                objectFit: 'cover',
                                                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                                                            }} /></div>
                                                                        <div className="comment-text fix">
                                                                            <div className="author-info">
                                                                                <h5 className="mb-8">
                                                                                    <a href="#">{fb.account.username}</a>
                                                                                </h5>
                                                                                <div style={{ float: "right" }}>
                                                                                    <select
                                                                                        style={{
                                                                                            borderRadius: "20px",
                                                                                            marginRight: "10px",
                                                                                            width: "70px",
                                                                                            height: "25px",
                                                                                            fontSize: '10px'
                                                                                        }}
                                                                                        value={selectedOption}
                                                                                        onChange={(e) => handleSelectChange(e, fb.id)}>
                                                                                        <option style={{ fontSize: "12px" }}
                                                                                            value={1}>Show
                                                                                        </option>
                                                                                        <option style={{ fontSize: "12px" }}
                                                                                            value={3}>Hidden
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                                <span className="block mb-11">{fb.date}</span>
                                                                                <span className="block mb-11">
                                                                                    <StarFeedback star={fb.numberOfStars} />
                                                                                </span>
                                                                            </div>
                                                                            <p className="mb-18">
                                                                                {fb.comment}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                            </div>
                                                            <ReactModal
                                                                isOpen={isOpen}
                                                                contentLabel="Thông báo"
                                                                className="custom-modal"
                                                                overlayClassName="custom-overlay"
                                                            >
                                                                <h4>Confirm!</h4>
                                                                <p>Are you sure you want to hide this comment?.</p>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-end',
                                                                    marginTop: '20px'
                                                                }}>
                                                                    <button style={{
                                                                        margin: '0 10px',
                                                                        width: '100px',
                                                                        backgroundColor: 'yellowgreen'
                                                                    }} onClick={handleCance}>Cancel
                                                                    </button>
                                                                    <button style={{ backgroundColor: 'red' }}
                                                                        onClick={handleConfirm}>Agree
                                                                    </button>
                                                                </div>
                                                            </ReactModal>

                                                        </>
                                                    )
                                                })
                                            }
                                            <div className="pagination-content text-center block fix col-10">
                                                <div>
                                                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                                        (pageNumber) => (
                                                            <button
                                                                key={pageNumber}
                                                                onClick={() => handlePageChange(pageNumber)}
                                                                disabled={currentPage === pageNumber}
                                                                style={{
                                                                    backgroundColor: currentPage === pageNumber ? 'yellowgreen' : 'snow',
                                                                    color: currentPage === pageNumber ? 'white' : 'black',

                                                                }}>
                                                                {pageNumber}
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                </>
                            )
                        }
                    </div>
                </div>
            </div>

        </>
    );
};

export default SeeReviews;