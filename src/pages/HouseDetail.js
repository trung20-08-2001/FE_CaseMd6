import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const HouseDetail = () => {
    const [house, setHouse] = useState({});

    const {index} = useParams();
    console.log(index)

    // useEffect(() => {
    //     axios.get("http://localhost:8081/houses/searchhouse/" + idHouse)
    //         .then(data => {
    //             setHouse(data.data);
    //         })
    //         .catch(function (err) {
    //             console.log(err)
    //         })
    // }, []);

    return (
        <>
            <div className="property-area property-area-2 ptb-120">
                <div className="container">
                    <div className="row property-details_wrap">
                        <div className="col-lg-4 pl-35 order-2">
                            <div className="single-sidebar-widget fix mb-40">
                                <div className="sidebar-widget-title mb-30">
                                    <h5>{house.name}</h5>
                                </div>
                                <div className="bg-gray fix pl-35 pt-42 pr-35 pb-39 left-column mb-56">
                                    <div className="desc-info mb-37">
                                        <img src="images/icons/g-bed.png" alt="" className="pr-8"/>
                                        <span>Bedroom 5</span>
                                    </div>
                                    <div className="desc-info mb-37">
                                        <img
                                            src="images/icons/g-shower.png"
                                            alt=""
                                            className="pr-8"
                                        />
                                        <span>Bathroom 3</span>
                                    </div>

                                    <div className="desc-info mb-35">
                                        <span className="price">52,350 VNĐ/NGAY</span>
                                    </div>
                                    <div className="desc-info">
                                        <img src="images/icons/g-map.png" alt="" className="pr-8"/>
                                        <span className="location">
                    568 E 1st Ave, Ney Jersey, USA
                  </span>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-primary" style={{marginLeft: "120px"}}>Thuê
                                    Ngay
                                </button>
                            </div>


                        </div>
                        <div className="col-lg-8 order-1">
                            <div className="property-image mb-57">
                                <img src="images/properties/large-1.jpg" alt=""/>
                            </div>
                            <div className="property-desc mb-56">
                                <h4 className="details-title mb-22">Description</h4>
                                <p className="mb-24">
                                    <span>Dom-Inno is</span> ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor incididunt ut labore etlor
                                    magna iqua. Ut enim ad minim veniam, quis nostrud exercitation
                                    ullamco laboris nisi ut quipx ea codo loremed consequat. Duis aute
                                    irure dolor in reprehenderit in voluptate velit esse cillum dolo
                                </p>
                                <p className="mb-28">
                                    Dom-Inno is the Best should be the consectetur adipiscing elit, sed
                                    do eiusmod tempor incidint ut labore lore gna iqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                    eacm emod tempor nt ut labore lore magna iqua. Ut enim ad minim
                                    veniamco laboris nisi ut aliqu
                                </p>
                                <p>
                                    Dom-Inno is the Best should be the consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore lore gna iqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex eacm
                                </p>
                            </div>
                            <div className="comments fix pt-50">
                                <h4 className="details-title pb-8 mb-27">3 Feedback</h4>
                                <div className="single-comment fix mb-18">
                                    <div className="author-image pull_left mr-23">
                                        <img alt="" src="images/comment/1.jpg"/>
                                    </div>
                                    <div className="comment-text fix">
                                        <div className="author-info">
                                            <h5 className="mb-8"><a href="#">David Backhum</a></h5>
                                            <span className="block mb-11">6 hour ago</span>
                                        </div>
                                        <p className="mb-18">There are some business lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do eiu tempor inc ididunt ut labore et
                                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrudt </p>
                                    </div>
                                </div>
                                <div className="single-comment fix mb-18">
                                    <div className="author-image pull_left mr-23">
                                        <img alt="" src="images/comment/2.jpg"/>
                                    </div>
                                    <div className="comment-text fix">
                                        <div className="author-info">
                                            <h5 className="mb-8"><a href="#">Saniya Mirza</a></h5>
                                            <span className="block mb-11">8 hour ago</span>
                                        </div>
                                        <p className="mb-18">There are some business lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do eiu tempor inc ididunt ut labore et
                                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrudt </p>
                                    </div>
                                </div>
                                <div className="single-comment fix">
                                    <div className="author-image pull_left mr-23">
                                        <img alt="" src="images/comment/3.jpg"/>
                                    </div>
                                    <div className="comment-text fix">
                                        <div className="author-info">
                                            <h5 className="mb-8"><a href="#">Lionel Messi</a></h5>
                                            <span className="block mb-11">10 hour ago</span>
                                        </div>
                                        <p className="mb-18">There are some business lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed do eiu tempor inc ididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrudt </p>
                                    </div>
                                </div>
                            </div>
                            <div className="new-comment-post mt-35">
                                <h4 className="details-title pb-8 mb-27">Leave a Review</h4>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <form action="#" method="post">
                                    <div className="comment-form">
                                        <textarea name="post-comment" cols="30" rows="10" placeholder="Write here"
                                                  className="mb-34 bg-light"></textarea>
                                        <button className="button text-uppercase lemon pl-30 pr-30" type="submit"
                                                value="">Submit review
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};

export default HouseDetail;
