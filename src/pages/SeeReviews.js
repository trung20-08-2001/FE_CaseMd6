import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import AverageStarsFeedback from "./AverageStarsFeedback";
import StarFeedback from "./StarFeedback";
import ReactModal from "react-modal";
import loading from "../components/Loading";


const SeeReviews = () => {
    const [houses, setHouse] = useState([]);
    const [feedbacks, setFeedbacks] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage, setItemsPerPage] = useState(5); // Số mục trên mỗi trang
    // Tổng số trang
    const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
    const {idHouse} = useParams();
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
        axios.get("http://localhost:8081/houses/houseDetail/" + idHouse)
            .then(res => {
                console.log(res.data)
                setHouse(res.data)
                axios.get("http://localhost:8081/api/feedback/getAllFeedback/" + idHouse)
                    .then(res1 => {
                        console.log(res1.data)
                        setFeedbacks(res1.data)
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
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
        axios.post("http://localhost:8081/api/feedback/updateFeedback/" + fbId)
            .then(() => {
                window.location.reload();
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
    return (
        <>
            <div className="property-area property-area-2 ptb-20">
                <div className="container">
                    <div className="row property-details_wrap">
                        <div className="col-lg-4 pl-35 order-2">
                            <div className="single-sidebar-widget fix mb-40">
                                <div className="sidebar-widget-title mb-30">
                                    <h5>Search for Property</h5>
                                </div>
                                <form action="#" className="">
                                    <div className="form-box mb-18 pr-10">
                                        <div className="select">
                                            <select name="location">
                                                <option>Location</option>
                                                <option>Dhaka</option>
                                                <option>Shylet</option>
                                                <option>Khulna</option>
                                                <option>Barishal</option>
                                                <option>Chittagong</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-box mb-18 pl-10">
                                        <div className="select">
                                            <select name="sub-location">
                                                <option>Sub - Location</option>
                                                <option>Dhaka</option>
                                                <option>Shylet</option>
                                                <option>Khulna</option>
                                                <option>Barishal</option>
                                                <option>Chittagong</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-box mb-18 pr-10">
                                        <div className="select">
                                            <select name="min-sqft">
                                                <option>Min area (sqft)</option>
                                                <option>Dhaka</option>
                                                <option>Shylet</option>
                                                <option>Khulna</option>
                                                <option>Barishal</option>
                                                <option>Chittagong</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-box mb-400 pl-10">
                                        <div className="select">
                                            <select name="max-sqft">
                                                <option>Max area (sqft)</option>
                                                <option>Dhaka</option>
                                                <option>Shylet</option>
                                                <option>Khulna</option>
                                                <option>Barishal</option>
                                                <option>Chittagong</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-box pr-10">
                                        <div className="select">
                                            <select name="bedrooms">
                                                <option>No of Bedroom</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-box pl-10">
                                        <div className="select">
                                            <select name="bedrooms">
                                                <option>No of Bathroom</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-box large mt-8">
                                        <div className="price_filter">
                                            <div className="price_slider_amount mb-20">
                                                <div className="slider-values">
                                                    <span>Price Range</span>
                                                    <input
                                                        type="text"
                                                        className="amount"
                                                        name="price"
                                                        placeholder="Add Your Price"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
                                                <div
                                                    className="ui-slider-range ui-widget-header ui-corner-all"
                                                    style={{left: "9.09091%", width: "70.2479%"}}
                                                />
                                                <span
                                                    className="ui-slider-handle ui-state-default ui-corner-all"
                                                    tabIndex={0}
                                                    style={{left: "9.09091%"}}
                                                />
                                                <span
                                                    className="ui-slider-handle ui-state-default ui-corner-all"
                                                    tabIndex={0}
                                                    style={{left: "79.3388%"}}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            name="search_price"
                                            type="button"
                                            className="button search_price lemon mt-36"
                                        >
                <span>
                  <span>SEARCH PROPERTY</span>
                </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="single-sidebar-widget fix mb-60 d-none d-md-block">
                                <div className="sidebar-widget-title mb-32">
                                    <h5>Popular Property</h5>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 pr-9 mb-18 col-md-3">
                                        <div className="single-property hover-effect-two">
                                            <div className="property-title fix pl-18 pr-18 pt-9 pb-0 bg-violet">
                                                <div className="title-left">
                                                    <h4 className="text-white mb-12">
                                                        <a href="properties-details.html">Sizling de Villa</a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="property-image">
                                                <a
                                                    href="properties-details.html"
                                                    className="block dark-hover"
                                                >
                                                    <img src="images/properties/s-1.jpg" alt=""/>
                                                    <span className="img-button text-uppercase">
                      More Details
                    </span>
                                                </a>
                                            </div>
                                            <div className="property-title fix pl-18 pr-18 pt-9 pb-9 bg-violet">
                                                <h3>$52,354</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 pl-9 mb-18 col-md-3">
                                        <div className="single-property hover-effect-two">
                                            <div className="property-title fix pl-18 pr-18 pt-9 pb-0 bg-violet">
                                                <div className="title-left">
                                                    <h4 className="text-white mb-12">
                                                        <a href="properties-details.html">Zackson Heits</a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="property-image">
                                                <a
                                                    href="properties-details.html"
                                                    className="block dark-hover"
                                                >
                                                    <img src="images/properties/s-2.jpg" alt=""/>
                                                    <span className="img-button text-uppercase">
                      More Details
                    </span>
                                                </a>
                                            </div>
                                            <div className="property-title fix pl-18 pr-18 pt-9 pb-9 bg-violet">
                                                <h3>$65,435</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 pr-9 col-md-3">
                                        <div className="single-property hover-effect-two">
                                            <div className="property-title fix pl-18 pr-18 pt-9 pb-0 bg-violet">
                                                <div className="title-left">
                                                    <h4 className="text-white mb-12">
                                                        <a href="properties-details.html">Dom Plaza</a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="property-image">
                                                <a
                                                    href="properties-details.html"
                                                    className="block dark-hover"
                                                >
                                                    <img src="images/properties/s-3.jpg" alt=""/>
                                                    <span className="img-button text-uppercase">
                      More Details
                    </span>
                                                </a>
                                            </div>
                                            <div className="property-title fix pl-18 pr-18 pt-9 pb-9 bg-violet">
                                                <h3>$67,879</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 pl-9 col-md-3">
                                        <div className="single-property hover-effect-two">
                                            <div className="property-title fix pl-18 pr-18 pt-9 pb-0 bg-violet">
                                                <div className="title-left">
                                                    <h4 className="text-white mb-12">
                                                        <a href="properties-details.html">Rose de Villa</a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="property-image">
                                                <a
                                                    href="properties-details.html"
                                                    className="block dark-hover"
                                                >
                                                    <img src="images/properties/s-4.jpg" alt=""/>
                                                    <span className="img-button text-uppercase">
                      More Details
                    </span>
                                                </a>
                                            </div>
                                            <div className="property-title fix pl-18 pr-18 pt-9 pb-9 bg-violet">
                                                <h3>$87,345</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="single-sidebar-widget fix mb-60">
                                <div className="sidebar-widget-title mb-32">
                                    <h5>Our Agent</h5>
                                </div>
                                <div className="sidebar-agent">
                                    <div className="row">
                                        <div className="col-lg-4 mb-22 col-md-2 col-4">
                                            <div className="agent-hover">
                                                <a href="agent-details.html" className="block border mb-11">
                                                    <img src="images/team/s-1.jpg" alt=""/>
                                                </a>
                                                <h5>
                                                    <a href="agent-details.html" className="block">
                                                        Ross Taylor
                                                    </a>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-22 col-md-2 col-4">
                                            <div className="agent-hover">
                                                <a href="agent-details.html" className="block border mb-11">
                                                    <img src="images/team/s-2.jpg" alt=""/>
                                                </a>
                                                <h5>
                                                    <a href="agent-details.html" className="block">
                                                        Tom Cruse
                                                    </a>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-22 col-md-2 col-4">
                                            <div className="agent-hover">
                                                <a href="agent-details.html" className="block border mb-11">
                                                    <img src="images/team/s-3.jpg" alt=""/>
                                                </a>
                                                <h5>
                                                    <a href="agent-details.html" className="block">
                                                        Lisa Smith
                                                    </a>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-2 col-4">
                                            <div className="agent-hover">
                                                <a href="agent-details.html" className="block border mb-11">
                                                    <img src="images/team/s-4.jpg" alt=""/>
                                                </a>
                                                <h5>
                                                    <a href="agent-details.html" className="block">
                                                        Rosi Wiams
                                                    </a>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-2 col-4">
                                            <div className="agent-hover">
                                                <a href="agent-details.html" className="block border mb-11">
                                                    <img src="images/team/s-5.jpg" alt=""/>
                                                </a>
                                                <h5>
                                                    <a href="agent-details.html" className="block">
                                                        Evan Smith
                                                    </a>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-2 col-4">
                                            <div className="agent-hover">
                                                <a href="agent-details.html" className="block border mb-11">
                                                    <img src="images/team/s-6.jpg" alt=""/>
                                                </a>
                                                <h5>
                                                    <a href="agent-details.html" className="block">
                                                        Nail Albert
                                                    </a>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="single-sidebar-widget fix">
                                <div className="sidebar-widget-title mb-32">
                                    <h5>Tags</h5>
                                </div>
                                <ul className="tags">
                                    <li>
                                        <a href="properties-details.html" className="mb-15 mr-7">
                                            Real Estate
                                        </a>
                                    </li>
                                    <li>
                                        <a href="index1.html" className="mb-15 ml-7 mr-7">
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href="properties-details.html" className="mb-15 ml-7">
                                            Appartment
                                        </a>
                                    </li>
                                    <li>
                                        <a href="properties-details.html" className="mb-15 mr-7">
                                            Duplex Villa
                                        </a>
                                    </li>
                                    <li>
                                        <a href="properties-details.html" className="mb-15 ml-7">
                                            Buy Property
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {
                            houses.length !== 0 && (
                                <>
                                    <div className="col-lg-8 order-1">
                                        <h1 className="details-title mb-22">{houses.house.name}</h1>
                                        <div className="property-image mb-57">
                                            <img src={houses.images[0].url} alt=""/>
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
                                                    <div className="bg-gray fix pl-35 pt-42 pr-35 pb-39 left-column mb-56">
                                                        <div className="desc-info mb-37">
                                                            <img src="../images/icons/g-floor.png" alt="" className="pr-8"/>
                                                            <span>Area 450 sqft</span>
                                                        </div>
                                                        <div className="desc-info mb-37">
                                                            <img src="../images/icons/g-bed.png" alt="" className="pr-8"/>
                                                            <span>Bedroom {houses.house.numberOfBedrooms}</span>
                                                        </div>
                                                        <div className="desc-info mb-37">
                                                            <img
                                                                src="../images/icons/g-shower.png"
                                                                alt=""
                                                                className="pr-8"
                                                            />
                                                            <span>Bathroom {houses.house.numberOfLivingRooms}</span>
                                                        </div>
                                                        <div className="desc-info mb-37">
                                                            <img
                                                                src="../images/icons/g-garage.png"
                                                                alt=""
                                                                className="pr-8"
                                                            />
                                                            <span>{houses.house.category.name}</span>
                                                        </div>
                                                        <div className="desc-info mb-35">
                                                            <img src="../images/icons/kitchen.png" alt="" className="pr-8"/>
                                                            <span>Kitchen 2</span>
                                                        </div>
                                                        <div className="desc-info mb-35">
                                                            <span className="price">{houses.house.price} VND</span>
                                                        </div>
                                                        <div className="desc-info">
                                                            <img src="../images/icons/g-map.png" alt="" className="pr-8"/>
                                                            <span className="location">
                    {houses.house.address}
                  </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h4 className="details-title mb-38">Amenities</h4>
                                                    <div className="bg-gray fix pl-50 pr-50 pt-44 pb-38 right-column mb-56">
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9"/>
                                                            <span>Air Conditioning</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9"/>
                                                            <span>Bedding</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9"/>
                                                            <span>Balcony</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9"/>
                                                            <span>Cable TV</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9"/>
                                                            <span>Internet</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9"/>
                                                            <span>Parking</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9"/>
                                                            <span>Lift</span>
                                                        </div>
                                                        <div className="desc-info mb-26">
                                                            <i className="fa fa-check-square-o mr-9"/>
                                                            <span>Pool</span>
                                                        </div>
                                                        <div className="desc-info">
                                                            <i className="fa fa-check-square-o mr-9"/>
                                                            <span>Dishwasher</span>
                                                        </div>
                                                        <div className="desc-info">
                                                            <i className="fa fa-check-square-o mr-9"/>
                                                            <span>Toaster</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="comments fix pt-50">
                                                <div>
                                                    <div>
                                                        <h4 className="details-title pb-8 mb-27">{feedbacks.length} Feedback</h4>
                                                        <div style={{display: 'flex'}}>
                                                            <div style={{flex: '1'}}>
                                                                <AverageStarsFeedback houseId={idHouse}/>
                                                            </div>
                                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                                <button style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    marginRight: '1rem',
                                                                    backgroundColor: 'orangered'
                                                                }}>
                                                                    <span style={{marginRight: '0.5rem'}}>5 Sao</span>
                                                                </button>
                                                                <button style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    marginRight: '1rem',
                                                                    backgroundColor: 'orangered'
                                                                }}>
                                                                    <span style={{marginRight: '0.5rem'}}>4 Sao</span>
                                                                </button>
                                                                <button style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    marginRight: '1rem',
                                                                    backgroundColor: 'orangered'
                                                                }}>
                                                                    <span style={{marginRight: '0.5rem'}}>3 Sao</span>
                                                                </button>
                                                                <button style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    marginRight: '1rem',
                                                                    backgroundColor: 'orangered'
                                                                }}>
                                                                    <span style={{marginRight: '0.5rem'}}>2 Sao</span>
                                                                </button>
                                                                <button style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    marginRight: '1rem',
                                                                    backgroundColor: 'orangered'
                                                                }}>
                                                                    <span style={{marginRight: '0.5rem'}}>1 Sao</span>
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
                                                                            }}/></div>
                                                                        <div className="comment-text fix">
                                                                            <div className="author-info">
                                                                                <h5 className="mb-8">
                                                                                    <a href="#">{fb.account.username}</a>
                                                                                </h5>
                                                                                <div style={{float: "right"}}>
                                                                                    <select
                                                                                        style={{
                                                                                            borderRadius: "20px",
                                                                                            marginRight: "10px",
                                                                                            width: "70px",
                                                                                            height: "25px",
                                                                                            fontSize: '10px'
                                                                                        }}
                                                                                        value={selectedOption}
                                                                                        onChange={(e) => handleSelectChange(e, fb.id)}
                                                                                    >
                                                                                        <option style={{fontSize: "12px"}}
                                                                                                value={1}>Show
                                                                                        </option>
                                                                                        <option style={{fontSize: "12px"}}
                                                                                                value={3}>Hidden
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                                <span className="block mb-11">{fb.date}</span>
                                                                                <span className="block mb-11">
                                                                                <StarFeedback star={fb.numberOfStars}/>
                                                                            </span>
                                                                            </div>
                                                                            <p className="mb-18">
                                                                                {fb.comment}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr/>
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
                                                                    <button style={{backgroundColor: 'red'}}
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
                                                    {Array.from({length: totalPages}, (_, index) => index + 1).map(
                                                        (pageNumber) => (
                                                            <button
                                                                key={pageNumber}
                                                                onClick={() => handlePageChange(pageNumber)}
                                                                disabled={currentPage === pageNumber}
                                                                style={{
                                                                    backgroundColor: currentPage === pageNumber ? 'yellowgreen' : 'snow',
                                                                    color: currentPage === pageNumber ? 'white' : 'black',

                                                                }}
                                                                onClick={() => handlePageChange(pageNumber)}
                                                            >
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