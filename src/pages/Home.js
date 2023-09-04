import React from 'react'
import Banner from '../components/Banner'

function Home() {
    return (

        <>
            <div className="find-area pt-10 pb-10">
                <div className="container">
                    <Banner></Banner>
                </div>
            </div>
            <div className="find-area pt-10 pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center mb-55">
                                <h2 className="uppercase"> Search house </h2>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="row">
                                <form action="#" className="form-area">
                                    <div className="form-box mb-40 pl-15 pr-15">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Địa chỉ"
                                        />
                                    </div>
                                    <div className="form-box mb-40 pl-15 pr-15">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Số phòng ngủ"
                                        />
                                    </div>
                                    <div className="form-box mb-40 pl-15 pr-15">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Số phòng tắm"
                                        />
                                    </div>
                                    <div className="form-box mb-40 pl-15 pr-15">
                                        <div className="select">
                                            <select name="max-sqft" defaultValue={"0"}>
                                                <option value={0} disabled>
                                                    Giá
                                                </option>
                                                <option>Dưới 300$</option>
                                                <option>Dưới 500$</option>
                                                <option>Dưới 1000$</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div
                                        className="form-box pl-15 pr-15 large"
                                        style={{ marginLeft: "13%" }}
                                    >
                                        <button
                                            name="search_price"
                                            type="button"
                                            className="button search_price lemon pull_right ml-30 mr-6"
                                        >
                                            <span>
                                                <span>SEARCH PROPERTY</span>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="property-area pt-10 pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title mb-38 mt-31 text-center">
                                {/* <span className="opacity-text text-uppercase center">
                                        TOP 5 HOUSE
                                    </span> */}
                                <h2 className="uppercase mb-25">TOP 5 HOUSE</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-lg-4 mb-20">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Friuli-Venezia Giulia</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            568 E 1st Ave, Miami
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$52,354</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/1.jpg" alt="" />
                                        <span className="img-button text-uppercase">
                                            More Details
                                        </span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/floor.png"
                                                alt=""
                                            />
                                            <span>450 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>5</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/shower.png"
                                                alt=""
                                            />
                                            <span>3</span>
                                        </div>
                                        <div className="hover-item">
                                            <i className="fa fa-heart mr-10" style={{ color: "red" }} />
                                            {/*                                            <img class="mr-10" src="images/icons/garage.png" alt="">*/}
                                            <span>2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-20">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Masons de Villa</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            354 D 1st Ave, New Yourk
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$62,354</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/2.jpg" alt="" />
                                        <span className="img-button text-uppercase">
                                            More Details
                                        </span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/floor.png"
                                                alt=""
                                            />
                                            <span>550 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>6</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/shower.png"
                                                alt=""
                                            />
                                            <span>4</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/garage.png"
                                                alt=""
                                            />
                                            <span>3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-20">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Seraton de Villa</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            568 E 1st Ave, Miami
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$45,354</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/3.jpg" alt="" />
                                        <span className="img-button text-uppercase">
                                            More Details
                                        </span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/floor.png"
                                                alt=""
                                            />
                                            <span>350 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>4</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/shower.png"
                                                alt=""
                                            />
                                            <span>3</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/garage.png"
                                                alt=""
                                            />
                                            <span>1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-20">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Friuli-Venezia Giulia</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            568 E 1st Ave, Miami
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$52,354</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/1.jpg" alt="" />
                                        <span className="img-button text-uppercase">
                                            More Details
                                        </span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/floor.png"
                                                alt=""
                                            />
                                            <span>450 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>5</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/shower.png"
                                                alt=""
                                            />
                                            <span>3</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/garage.png"
                                                alt=""
                                            />
                                            <span>2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-20">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Friuli-Venezia Giulia</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            568 E 1st Ave, Miami
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$52,354</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/1.jpg" alt="" />
                                        <span className="img-button text-uppercase">
                                            More Details
                                        </span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/floor.png"
                                                alt=""
                                            />
                                            <span>450 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>5</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/shower.png"
                                                alt=""
                                            />
                                            <span>3</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/garage.png"
                                                alt=""
                                            />
                                            <span>2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-20">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Friuli-Venezia Giulia</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            568 E 1st Ave, Miami
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$52,354</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/1.jpg" alt="" />
                                        <span className="img-button text-uppercase">
                                            More Details
                                        </span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/floor.png"
                                                alt=""
                                            />
                                            <span>450 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>5</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/shower.png"
                                                alt=""
                                            />
                                            <span>3</span>
                                        </div>
                                        <div className="hover-item">
                                            <img
                                                className="mr-10"
                                                src="images/icons/garage.png"
                                                alt=""
                                            />
                                            <span>2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
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
                        <div className="col-xl-4 col-md-6 mb-40">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Friuli-Venezia Giulia</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            568 E 1st Ave, Miami
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$52,354</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/4.jpg" alt="" />
                                        <span className="img-button text-uppercase">More Details</span>
                                        <span className="p-tag bg-lemon">FOR SALE</span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/floor.png" alt="" />
                                            <span>450 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>5</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/shower.png" alt="" />
                                            <span>3</span>
                                        </div>
                                        <div className="hover-item">
                                            <i className="fa fa-heart mr-10" style={{ color: "red" }} />
                                            {/*                                        <img class="mr-10" src="images/icons/garage.png" alt="">*/}
                                            <span>2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-40">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Masons de Villa</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            354 D 1st Ave, New Yourk
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$62,354</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/5.jpg" alt="" />
                                        <span className="img-button text-uppercase">More Details</span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/floor.png" alt="" />
                                            <span>550 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>6</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/shower.png" alt="" />
                                            <span>4</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/garage.png" alt="" />
                                            <span>3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-40">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Seraton de Villa</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            568 E 1st Ave, Miami
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$45,354</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/6.jpg" alt="" />
                                        <span className="img-button text-uppercase">More Details</span>
                                        <span className="p-tag bg-light-violet">FOR RENT</span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/floor.png" alt="" />
                                            <span>350 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>4</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/shower.png" alt="" />
                                            <span>3</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/garage.png" alt="" />
                                            <span>1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Hastech de House</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            457 E New Town, Colorado
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$78,322</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/7.jpg" alt="" />
                                        <span className="img-button text-uppercase">More Details</span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/floor.png" alt="" />
                                            <span>450 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>5</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/shower.png" alt="" />
                                            <span>3</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/garage.png" alt="" />
                                            <span>2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Zacsion De Villa</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            23 A 3rd Bra, Dence
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$22,876</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/8.jpg" alt="" />
                                        <span className="img-button text-uppercase">More Details</span>
                                        <span className="p-tag bg-light-violet">FOR RENT</span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/floor.png" alt="" />
                                            <span>550 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>6</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/shower.png" alt="" />
                                            <span>4</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/garage.png" alt="" />
                                            <span>3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="single-property hover-effect-two">
                                <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                    <div className="title-left pull_left">
                                        <h4 className="text-white mb-12">
                                            <a href="properties-details.html">Radsion de Villa</a>
                                        </h4>
                                        <span>
                                            <span className="mr-10">
                                                <img src="images/icons/map.png" alt="" />
                                            </span>
                                            254 1st Ave, Hawaii
                                        </span>
                                    </div>
                                    <div className="fix pull_right">
                                        <h3>$90,654</h3>
                                    </div>
                                </div>
                                <div className="property-image">
                                    <a href="properties-details.html" className="block dark-hover">
                                        <img src="images/properties/9.jpg" alt="" />
                                        <span className="img-button text-uppercase">More Details</span>
                                        <span className="p-tag bg-lemon">FOR SALE</span>
                                    </a>
                                    <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/floor.png" alt="" />
                                            <span>350 sqft</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/bed.png" alt="" />
                                            <span>4</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/shower.png" alt="" />
                                            <span>3</span>
                                        </div>
                                        <div className="hover-item">
                                            <img className="mr-10" src="images/icons/garage.png" alt="" />
                                            <span>1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           

        </>
    )
}

export default Home
