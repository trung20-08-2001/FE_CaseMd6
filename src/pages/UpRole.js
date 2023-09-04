import React, {useState} from 'react';
import {useSelector} from "react-redux";

const UpRole = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const imageURL = useSelector(state => state.image.imageURL)

    return (
        <>
            <div className="create-agency-area pt-115 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                            <div className="agency-container">
                                <h4 className="details-title text-center mb-43">
                                    Trở thành người cho thuê
                                </h4>
                                <form action="#" method="post">

                                    <h4 className="details-title text-medium mb-23 pt-24">
                                         Cập nhập thêm các thông tin cần thiết
                                    </h4>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <input
                                                type="text"
                                                name="add_1"
                                                placeholder="Address"
                                                className="mb-28"
                                            />
                                            <input
                                                type="text"
                                                name="fullname"
                                                placeholder="Full Name"
                                                className="mb-28"
                                            />

                                        </div>
                                        <div className="col-lg-6">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                className="mb-28"
                                            />

                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder="Phone"
                                                className="mb-28"
                                            />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="property-package">
                                <h4 className="details-title text-medium mb-24 pt-30">
                                    Select a Package
                                </h4>
                                <div className="row">
                                    <div className="col-lg-4 pl-12 pr-12 text-center">
                                        <div className="single-package">
                                            <div className="package-title bg-violet pt-23 pb-23">
                                                <h4 className="text-white text-uppercase">Basic</h4>
                                            </div>
                                            <div className="package-list pt-37 pb-25">
                                                <span className="block dark mb-25">Fee $0</span>
                                                <span className="block mb-27">Property Sumbit 1</span>
                                                <span className="block mb-27">Agent Profiles 1</span>
                                                <span className="block mb-27">Agent Profiles 1</span>
                                                <span className="block mb-43">No Featured Properties</span>
                                                <button type="button" className="button text-white">
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 pl-12 pr-12 text-center">
                                        <div className="single-package">
                                            <div className="package-title bg-violet pt-23 pb-23">
                                                <h4 className="text-white text-uppercase">SILVER</h4>
                                            </div>
                                            <div className="package-list pt-37 pb-25">
                                                <span className="block dark mb-25">Fee $15</span>
                                                <span className="block mb-27">Property Sumbit 30</span>
                                                <span className="block mb-27">Agent Profiles 15</span>
                                                <span className="block mb-27">Agent Profiles 10</span>
                                                <span className="block mb-43">Featured Properties</span>
                                                <button type="button" className="button text-white">
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 pl-12 pr-12 text-center">
                                        <div className="single-package">
                                            <div className="package-title bg-violet pt-23 pb-23">
                                                <h4 className="text-white text-uppercase">Gold</h4>
                                            </div>
                                            <div className="package-list pt-37 pb-25">
                                                <span className="block dark mb-25">Fee $28</span>
                                                <span className="block mb-27">Property Sumbit unlimited</span>
                                                <span className="block mb-27">Agent Profiles unlimited</span>
                                                <span className="block mb-27">Agent Profiles unlimited</span>
                                                <span className="block mb-43">Featured Properties</span>
                                                <button type="button" className="button text-white">
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpRole;