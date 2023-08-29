import React from 'react'

function CreateHouse() {
    return (
        <>
            <div className='row'>
                <div className="col-lg-12">
                    <h4 className="sub-title mb-40">Step # 2</h4>
                    <h4 className="details-title mb-35">Details Information</h4>
                </div>
                <div className="col-lg-6 pr-25">
                    <h4 className="details-title text-small mb-16">Location</h4>
                    <div className="select pb-33">
                        <select name="location">
                            <option>Location here</option>
                            <option>Dhaka</option>
                            <option>Shylet</option>
                            <option>Khulna</option>
                            <option>Barishal</option>
                            <option>Chittagong</option>
                        </select>
                    </div>
                    <h4 className="details-title text-small mb-16">Property Type</h4>
                    <div className="select pb-33">
                        <select name="type">
                            <option>Property Type</option>
                            <option>Appartment</option>
                            <option>Duplex</option>
                            <option>Building</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-6 pr-25">
                    <h4 className="details-title text-small mb-16">Sub Location</h4>
                    <div className="select pb-33">
                        <select name="sub-location">
                            <option>Sub - Location</option>
                            <option>Dhaka</option>
                            <option>Shylet</option>
                            <option>Khulna</option>
                            <option>Barishal</option>
                            <option>Chittagong</option>
                        </select>
                    </div>
                    <h4 className="details-title text-small mb-16">Status</h4>
                    <div className="select pb-33">
                        <select name="status">
                            <option>Sale</option>
                            <option>Booking</option>
                            <option>Sold</option>
                        </select>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateHouse
