import React from 'react'
import Banner from '../components/Banner'
import TopHouse from '../components/TopHouse'
import ListHouse from '../components/ListHouse'

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
           
                <TopHouse />
                <ListHouse />
          
        </>
    )
}

export default Home
