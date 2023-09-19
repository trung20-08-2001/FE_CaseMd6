import React from 'react'
import Banner from '../components/Banner'
import TopHouse from '../components/TopHouse'
import ListHouse from '../components/ListHouse'

function Home() {
    return (
        <>
            <div className="find-area pt-10 pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <form action="#" className="form-area">
                                    <div className="form-box mb-40 pl-15 pr-15">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Address"
                                        />
                                    </div>
                                    <div className="form-box mb-40 pl-15 pr-15">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Number of bedrooms"
                                        />
                                    </div>
                                    <div className="form-box mb-40 pl-15 pr-15">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Number of bathrooms"
                                        />
                                    </div>
                                    <div className="form-box mb-40 pl-15 pr-15">
                                        <div className="select">
                                            <select name="max-sqft" defaultValue={"0"}>
                                                <option value={0} disabled>
                                                    Price
                                                </option>
                                                <option>Below 300$</option>
                                                <option>Below 500$</option>
                                                <option>Below 1000$</option>
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
                                                <span >SEARCH PROPERTY</span>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
                <TopHouse />
                <ListHouse />
          
        </>
    )
}

export default Home
