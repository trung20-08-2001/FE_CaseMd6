import React from 'react'
import { findAllCategory } from '../services/categoryService'

function CreateHouse() {
    const res=findAllCategory();
    console.log(res);

    return (
        <>
            <div className="row">
                <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                    <div className="agency-container">
                        <h4 className="details-title text-center mb-43">
                            Create House
                        </h4>
                        <div className="row">
                            <div className="col-lg-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name house"
                                    className="mb-28"
                                />
                                <input
                                    type="number"
                                    name="numberOfBadroom"
                                    placeholder="Number of badrooms"
                                    className="mb-28"
                                />

                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    className="mb-28"
                                />
                            </div>
                            <div className="col-lg-6">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    className="mb-28"
                                />
                                <input
                                    type="number"
                                    name="numberOfLivingRoom"
                                    placeholder="Number of living room"
                                    className="mb-28"
                                />
                                <select>
                                
                                    <option>Nhà 1 tầng</option>
                                    <option>Nhà 1 tầng</option>
                                    <option>Nhà 1 tầng</option>
                                    <option>Nhà 1 tầng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateHouse
