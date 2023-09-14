import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findAllHouse } from '../services/houseService';
import Loading from './Loading';
import { Link } from 'react-router-dom';

function ListHouse() {

    const dispatch = useDispatch();
    const listHouse = useSelector(state => state.house.allHouse)

    useEffect(() => {
        if (listHouse.length === 0) {
            dispatch(findAllHouse())
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage, setItemsPerPage] = useState(6); // Số mục trên mỗi trang
    // Tổng số trang
    const totalPages = Math.ceil(listHouse.length / itemsPerPage);
    // Lấy mục trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listHouse.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
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
                        {currentItems.length !== 0 ?
                            currentItems.map(item => {
                                return (
                                    < div className="col-lg-4 mb-20" key={item.house.id}>
                                        <div className="single-property hover-effect-two">
                                            <div className="property-title fix pl-18 pr-18 pt-22 pb-18 bg-violet">
                                                <div className="title-left pull_left">
                                                    <h4 className="text-white mb-12">
                                                        <a href="properties-details.html">{item.house.name}</a>
                                                    </h4>
                                                    <span>
                                                        <span className="mr-10">
                                                            <img src="images/icons/map.png" alt="" />
                                                        </span>
                                                        {item.house.address}
                                                    </span>
                                                </div>
                                                <div className="fix pull_right">
                                                    <h3>{item.house.price}VND/DAY</h3>
                                                </div>
                                            </div>
                                            <div className="property-image">
                                                <Link to={"houseDetail/"+item.house.id}><img src={item.images[0].url} alt="" style={{width:"100%",height:"300px"}} /></Link>
                                                <div className="hover-container pl-15 pr-15 pt-16 pb-15">
                                                    <div className="hover-item">
                                                        <span>{item.house.status.name}</span>
                                                    </div>
                                                    <div className="hover-item">
                                                        <img className="mr-10" src="../images/icons/bed.png" alt="" />
                                                        <span>{item.house.numberOfBedrooms}</span>
                                                    </div>
                                                    <div className="hover-item">
                                                        <img className="mr-10" src="../images/icons/shower.png" alt="" />
                                                        <span>{item.house.numberOfLivingRooms}</span>
                                                    </div>
                                                    <div className="hover-item">
                                                        <i className='fa fa-heart mr-10' style={{ color: "red" }}></i>
                                                       
                                                        <span>{item.house.numberOfHire}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                )
                            })
                            :<Loading></Loading>
                            }
                        <div className="pagination-content text-center block fix col-12">
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

                                            }}
                                        >
                                            {pageNumber}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ListHouse
