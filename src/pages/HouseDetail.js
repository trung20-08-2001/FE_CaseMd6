import React, { useEffect, useState } from 'react';
import customAxios from "../services/api";
import Slide from "../components/Slide"
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const HouseDetail = () => {
    const [houseDTO, setHouseDTO] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [listFeedback, setListFeedback] = useState([]);
    const account = useSelector(state => state.account.account);
    const today = new Date().toISOString().split('T')[0];
    const { idHouse } = useParams()
    const [myFeedback, setMyFeedback] = useState("");
    const [numberOfStars, setNumberOfStars] = useState
        ({
            start: 0,
            starts: [1, 2, 3, 4, 5]
        });
    const [comment, setComment] = useState('');
    const navigate=useNavigate()

    useEffect(() => {
        customAxios.get("/feedBack/showFeedback/" + idHouse)
            .then(res => {
                setListFeedback(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
        customAxios.get("/feedBack/findFeedbackByHouseAndUser/" + account?.id + "/" + idHouse)
            .then(response =>
                setMyFeedback(response.data)
            )
            .catch(error =>
                console.log(error))
    }, []);

    const calculateBookingDetails = () => {
        if (startDate && endDate && endDate > startDate) {
            const startDateAsDate = new Date(startDate);
            const DateAndAsDate = new Date(endDate);
            const daysDifference = Math.floor((DateAndAsDate - startDateAsDate) / (1000 * 60 * 60 * 24));
            const pricePerDay = houseDTO.house.price;
            const total = daysDifference * pricePerDay;
            setNumberOfDays(daysDifference);
            setTotalPrice(total);
        }
    };


    const handleStartDateChange = (event) => {
        const selectedDate = event.target.value;
        if (selectedDate >= today) {
            setStartDate(selectedDate);
            if (endDate <= selectedDate) {
                setEndDate(null);
            }
            calculateBookingDetails()
        }
    };

    const handleEndDateChange = (event) => {
        const selectedDate = event.target.value;
        if (selectedDate >= today) {
            setEndDate(selectedDate);
        }

    };

    useEffect(() => {
        customAxios.get("/houses/searchhouse/" + idHouse)
            .then(res => {
                setHouseDTO(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        calculateBookingDetails()
    }, [endDate])


    const saveBill = () => {
        const bill = {
            dateCheckin: startDate,
            dateCheckout: endDate,
            totalPrice: houseDTO.house.price * numberOfDays,
            user: {
                id: account.id
            },
            vendor: {
                id: houseDTO.house.account.id
            },
            status: {
                id: 2
            },
            house: {
                id: houseDTO.house.id
            }
        };
        return customAxios.post("/order/saveBill", bill) // Return the promise here
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    };

    const saveFeedback = () => {
        if (account) {
            if (myFeedback !== "") {
                if (account.id === houseDTO.house.account.id) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Feedback thất bại',
                        text: 'Bạn không thể đánh giá nhà của mình',
                    });
                } else if (myFeedback.status.id === 2) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Feedback thất bại',
                        text: 'Bạn không thể đánh giá nhà khi bạn chưa sử dụng',
                    });
                } else if (myFeedback.status.id === 7) {
                    customAxios.post("/feedBack/addFeedBack", {
                        ...myFeedback,
                        numberOfStars: numberOfStars.start,
                        date: new Date(),
                        comment: comment,
                        status: { id: 1 }
                    })
                        .then(response => {
                            setNumberOfStars({
                                ...numberOfStars,
                                start: 0
                            });
                            setComment('')
                            setMyFeedback("")

                            Swal.fire({
                                icon: 'success',
                                title: 'Feedback thành công',
                            })
                            customAxios.get("/feedBack/showFeedback/" + idHouse)
                                .then(res => {
                                    setListFeedback(res.data);
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                        )
                        .catch(error => console.log(error))
                } else if (myFeedback.status.id === 1) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Feedback thất bại',
                        text: 'Bạn đã feedback rồi',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Feedback thất bại',
                    text: 'Bạn chưa thuê nhà này.',
                });
            }
        }else{
            Swal.fire({
                title: 'Feedback thất bại',
                icon: 'error',
                text: 'You are not logged in.',
                showCancelButton: true,
                confirmButtonText: "LOGIN",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }

            })
        }
    }


    const handleOrderHouse = () => {
        if (startDate >= endDate) {
            Swal.fire({
                icon: 'error',
                title: 'Đăng ký thất bại',
                text: 'Ngày bắt đầu phải cách ngày kết thúc ít nhất 1 ngày',
            });
        } else {
            customAxios.get("/order/" + startDate + "/" + endDate + "/" + 3)
                .then(response => {
                    if (response.data) {
                        return saveBill();
                    } else {
                        throw new Error('Invalid date or time');
                    }
                })
                .then(data => {
                    setStartDate(today)
                    setEndDate(today)
                    Swal.fire({
                        icon: 'success',
                        title: 'Thuê thành công!',
                        text: 'Bạn đã thuê nhà thành công',
                    });
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Thuê thất bại',
                        text: 'Nhà này đã có người thuê rồi.',
                    });
                });
        }
    };


    const changeStart = (start) => {
        setNumberOfStars({
            ...numberOfStars,
            start: start
        });
    }
    return (
        <>
            {houseDTO !== null &&
                <div className="property-area property-area-2 ptb-120">
                    <div className="container">
                        <div className="row property-details_wrap">
                            <div className="col-lg-4 pl-35 order-2">
                                <div className="single-sidebar-widget fix mb-40">
                                    <div className="sidebar-widget-title mb-30">
                                        <h5>{houseDTO.house.name}</h5>
                                    </div>
                                    <div className="bg-gray fix pl-10 pt-10 pr-10 pb-10 left-column mb-50">
                                        <div className=" mb-37">
                                            <img src="../images/icons/g-bed.png" alt="" className="pr-8" />
                                            <span> Bedroom {houseDTO.house.numberOfBedrooms}</span>
                                        </div>
                                        <div className="mb-37">
                                            <img
                                                src="../images/icons/g-shower.png"
                                                alt=""
                                                className="pr-8"
                                            />
                                            <span>Livingrooms {houseDTO.house.numberOfLivingRooms}</span>
                                        </div>

                                        <div className=" mb-35">
                                            <span className="price">Price: {houseDTO.house.price} VNĐ/DAY</span>
                                        </div>
                                        <div className=" mb-35">
                                            <img src="../images/icons/g-map.png" alt="" className="pr-8" />
                                            <span className="location">Address:
                                                {houseDTO.house.address}
                                            </span>
                                        </div>
                                        <div className=" mb-35">
                                            <span className="location">Stastus: {houseDTO.house.status.name}</span>
                                        </div>
                                    </div>
                                    <h5>Nhận phòng:</h5>
                                    <input className='mb-20' type="date" onChange={event => handleStartDateChange(event)} min={today} />
                                    <h5>Trả phòng:</h5>
                                    <input className='mb-20' type="date" onChange={event => handleEndDateChange(event)} min={today} />
                                    {numberOfDays > 0 && (
                                        <div>
                                            <p style={{ color: "red" }}>Số ngày thuê: {numberOfDays} ngày</p>
                                            <p style={{ color: "red" }}>Tổng tiền: {totalPrice} VNĐ</p>
                                        </div>
                                    )}
                                    <button className="btn btn-primary" style={{ marginLeft: "250px" }}
                                        onClick={handleOrderHouse}>Thuê
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-8 order-1">
                                <div className="property-image mb-57">
                                    <Slide images={houseDTO.images}
                                        styleImage={{ width: "600px", height: "400px" }}></Slide>
                                </div>
                                <div className="property-desc mb-56">
                                    <h4 className="details-title mb-22">Description</h4>
                                    {houseDTO.house.description}
                                </div>
                                <h4 className="details-title pb-8 mb-27"> Feedback</h4>
                                {
                                    listFeedback.map((f) => {

                                        return (
                                            <div className="comments fix pt-50" key={f.id}>

                                                <div className="single-comment fix mb-18">
                                                    <div className="author-image pull_left mr-23">
                                                        <img alt="" src={f.account.avatar}
                                                            style={{ width: "70px", height: "70px" }} />
                                                    </div>
                                                    <div className="comment-text fix">
                                                        <div className="author-info">
                                                            <h5 className="mb-8"><a href="#">{f.account.username}</a>
                                                            </h5>
                                                            <span className="block mb-11">{f.date}</span>
                                                            {numberOfStars.starts.map(item => {
                                                                if (item <= f.numberOfStars) return (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15"
                                                                        height="15" viewBox="0 0 16 16" key={item}
                                                                        onClick={() => changeStart(item)}>
                                                                        <polygon fill="yellow"
                                                                            points="8 0 9.09 4.94 14.17 5.75 10.82 9.81 11.64 14.86 8 12.5 4.36 14.86 5.18 9.81 1.83 5.75 6.91 4.94 8 0" />
                                                                    </svg>
                                                                )
                                                                else return (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15"
                                                                        height="15"
                                                                        viewBox="0 0 16 16" key={item}
                                                                        onClick={() => changeStart(item)}>
                                                                        <path
                                                                            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                                                                            fill="yellow" />
                                                                    </svg>
                                                                )
                                                            })}
                                                        </div>
                                                        <p className="mb-18">{f.comment} </p>
                                                    </div>
                                                </div>
                                            </div>)
                                    })}

                                <div className="new-comment-post mt-35">
                                    <h4 className="details-title pb-8 mb-27"> Review</h4>
                                    {numberOfStars.starts.map(item => {
                                        if (item <= numberOfStars.start) return (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30"
                                                height="30" viewBox="0 0 16 16" key={item}
                                                onClick={() => changeStart(item)}>
                                                <polygon fill="yellow"
                                                    points="8 0 9.09 4.94 14.17 5.75 10.82 9.81 11.64 14.86 8 12.5 4.36 14.86 5.18 9.81 1.83 5.75 6.91 4.94 8 0" />
                                            </svg>
                                        )
                                        else return (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                viewBox="0 0 16 16" key={item} onClick={() => changeStart(item)}>
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                                                    fill="yellow" />
                                            </svg>
                                        )
                                    })}
                                    <div className="comment-form mt-10">
                                        <textarea name="post-comment" cols="30" rows="10" placeholder="Write here"
                                            className="mb-34 bg-light" value={comment}
                                            onChange={(event) => {
                                                setComment(event.target.value)
                                            }}></textarea>
                                        <button className="button text-uppercase lemon pl-30 pr-30"
                                            onClick={saveFeedback}>Submit review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }

        </>
    );
};

export default HouseDetail;