import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";

function VendorTransactionHistory() {
    const [bills_vendor, setBills_vendor] = useState([]);
    const {id} = useParams();
    const [nameHouse, setNameHouse] = useState('');
    const [selectValue, setSelectValue] = useState(0);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [filter, setFilter] = useState(bills_vendor);
    const dispatch = useDispatch()

    const [pageNumber, setPageNumber] = useState(0); // Trang hiện tại
    const billsPerPage = 10; // Số bill hiển thị trên mỗi trang
    const pagesVisited = pageNumber * billsPerPage;

    useEffect(() => {
        axios.get("http://localhost:8081/bills_vendor/" + id)
            .then(function (res) {
                setBills_vendor(res.data);
            })
    }, []);

    const displayBills_vendor = bills_vendor
        .slice(pagesVisited, pagesVisited + billsPerPage)
        .map((bill) => {
            const userId = bill?.bill.vendor.id || '';
            const dateCheckin = bill?.bill.dateCheckin || 'No Checkin';
            const dateCheckout = bill?.bill.dateCheckout || 'No Checkout';
            const houseName = bill?.house.name || 'No House Name';
            const userName = bill?.bill.user.username || 'No User Name';
            const totalPrice = bill?.bill.totalPrice || 0;
            const status = bill?.bill.status.name || 'No Status';

            const handleBillClick = (billId) => {
                const updatedBills = bills_vendor.map((bill) => {
                    if (bill.bill.id === billId) {
                        const currentDate = new Date()
                        const year = currentDate.getFullYear();
                        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                        const day = String(currentDate.getDate()).padStart(2, '0');
                        const formattedDate = `${year}-${month}-${day}`;

                        const dateCheckout = new Date(bill.bill.dateCheckout);
                        const dateCheckin = new Date(bill.bill.dateCheckin);
                        currentDate.setHours(0,0,0,0,)
                        dateCheckout.setHours(0,0,0,0,)
                        dateCheckin.setHours(0,0,0,0,)

                        if (bill.bill.status.id === 2) {
                            if (dateCheckin <= currentDate) {
                                // Checkin is allowed
                                const newIdStatus_bill = 6; // USING
                                const newNameStatus_bill = 'USING';
                                const newIdStatus_house = 5; // ORDERED
                                const newNameStatus_house = 'ORDERED';

                                return {
                                    ...bill,
                                    bill: {
                                        ...bill.bill,
                                        status: {
                                            ...bill.bill.status,
                                            id: newIdStatus_bill,
                                            name: newNameStatus_bill
                                        }
                                    },
                                    house: {
                                        ...bill.house,
                                        status: {
                                            ...bill.house.status,
                                            id: newIdStatus_house,
                                            name: newNameStatus_house
                                        }
                                    }
                                };
                            } else {
                                // Show error message when trying to checkin before the current date
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Cannot Checkin',
                                    text: 'The Checkin date is in the future.',
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        } else if (bill.bill.status.id === 6) {
                            let totalPrice = bill.bill.totalPrice;
                            if (typeof totalPrice === 'string') {
                                totalPrice = parseFloat(totalPrice.replace('$', ''));
                            }

                            const timeDifference = dateCheckout.getTime() - currentDate.getTime();
                            const timeDifference1 = dateCheckout.getTime() - dateCheckin.getTime();
                            if (timeDifference >= 0) {
                                const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
                                const daysDifference1 = Math.ceil(timeDifference1 / (1000 * 3600 * 24));

                                let updatedTotalPrice = totalPrice - (daysDifference * 0.7 * bill.house.price);
                                if (dateCheckin.getTime() === currentDate.getTime()) {
                                    updatedTotalPrice = (totalPrice - bill.house.price * daysDifference1) + (updatedTotalPrice + bill.house.price - bill.house.price * 0.3);
                                    if (daysDifference === 1) {
                                        updatedTotalPrice = (totalPrice - bill.house.price * daysDifference1) + bill.house.price;
                                    }
                                }
                                return {
                                    ...bill,
                                    bill: {
                                        ...bill.bill,
                                        dateCheckout: formattedDate,
                                        totalPrice: `${updatedTotalPrice.toFixed(0)}`,
                                        status: {
                                            id: 7,
                                            name: 'CHECKED_OUT',
                                        }
                                    },
                                    house: {
                                        ...bill.house,
                                        status: {
                                            id: 4,
                                            name: 'READY',
                                        }
                                    }
                                };
                            } else {
                                const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
                                const updatedTotalPrice = totalPrice + (-daysDifference * bill.house.price);
                                return {
                                    ...bill,
                                    bill: {
                                        ...bill.bill,
                                        dateCheckout: formattedDate,
                                        totalPrice: `${updatedTotalPrice.toFixed(0)}`,
                                        status: {
                                            id: 7,
                                            name: 'CHECKED_OUT',
                                        }
                                    },
                                    house: {
                                        ...bill.house,
                                        status: {
                                            id: 4,
                                            name: 'READY',
                                        }
                                    }
                                };
                            }
                        }
                    }
                    return bill;
                });

                updateStatus_billAndHouse(billId, updatedBills)
                    .then(() => {
                        setBills_vendor(updatedBills);
                    })
                    .catch((error) => {
                        console.log("Error updating bill and house status:", error);
                    });
            };
            return (
                <tr key={bill.bill.id} style={{height: '60px'}}>
                    <td>{dateCheckin}</td>
                    <td>{dateCheckout}</td>
                    <td>{houseName}</td>
                    <td>{userName}</td>
                    <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
                    <td>{status}</td>
                    <td>
                        <button style={{width: "114px"}}
                                className={bill.bill.status.id === 2 ? ("btn btn-outline-success"
                                ) : (bill.bill.status.id === 8 || bill.bill.status.id === 7) ? (null
                                ) : "btn btn-outline-secondary"}
                                onClick={() => handleBillClick(bill?.bill.id)}
                        >{bill.bill.status.id === 2 ? (`Checkin`
                        ) : (bill.bill.status.id === 8 || bill.bill.status.id === 7) ? (null
                        ) : `Checkout`}
                        </button>
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(bills_vendor.length / billsPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };


    const updateStatus_billAndHouse = (billId, updatedBills) => {
        const updatedStatus_bill = updatedBills.find((bill) => bill.bill.id === billId).bill;
        const updatedStatus_house = updatedBills.find((bill) => bill.bill.id === billId).house;
        const updateBillPromise = axios.post(`http://localhost:8081/bills_vendor/${billId}/bill`, updatedStatus_bill)
            .then((res) => {
                if (updatedStatus_bill.status.id === 6) {
                    Swal.fire({
                        icon: 'success',
                        title: 'You have Checked in!',
                        showConfirmButton: false, // Ẩn nút "OK"
                        timer: 1500 // Tự động đóng cửa sổ thông báo sau 1 giây (tuỳ chỉnh theo ý muốn)
                    })
                } else if (updatedStatus_bill.status.id === 7) {
                    Swal.fire({
                        icon: 'success',
                        title: 'You have Checked out!',
                        showConfirmButton: false, // Ẩn nút "OK"
                        timer: 1500 // Tự động đóng cửa sổ thông báo sau 1 giây (tuỳ chỉnh theo ý muốn)
                    })
                }
            })
            .catch((err) => {
                console.log("Error updating bill status:", err);
            });

        const updateHousePromise = axios.post(`http://localhost:8081/bills_vendor/${billId}/house`, updatedStatus_house)
            .then((res) => {
            })
            .catch((err) => {
                console.log("Error updating house status:", err);
            });

        return Promise.all([updateBillPromise, updateHousePromise]);
    };

    const handleSearch = () => {
        if (nameHouse !== "" && startDate !== null && endDate !== null) {

        }
    }

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center'}} className="mt-30">
                <input
                    name="nameHouse"
                    type="text"
                    placeholder="Name house..."
                    onChange={e => dispatch({type: "bill/findBillHistoryHost", payload: e.target.value})}
                    style={{flex: 2, marginRight: '10px'}}
                />
                <input
                    name="nameHouse"
                    type="DATE"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    style={{flex: 2, marginRight: '10px'}}
                />
                <input
                    name="nameHouse"
                    type="DATE"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    style={{flex: 2, marginRight: '10px'}}
                />
                <select
                    name="select"
                    value={selectValue}
                    onChange={e => setSelectValue(parseInt(e.target.value))}
                    style={{flex: 2, marginRight: '10px'}}
                >
                    <option value={0}>All</option>
                    <option value={5}>ORDERED</option>
                    <option value={6}>USING</option>
                    <option value={7}>CHECK_OUT</option>
                    <option value={8}>CANCELED</option>
                </select>
                <button
                    type="button"
                    className="btn btn-outline-danger"

                    style={{flex: 1}}
                >
                    Search
                </button>
            </div>

            <div className="container" style={{marginBottom: "50px", marginTop: "50px"}}>
                <h4 className='text-center pb-20'>Renting a house</h4>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Date CheckIN</th>
                        <th>Date CheckOut</th>
                        <th>Name House</th>
                        <th>Customer</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayBills_vendor}
                    </tbody>
                </table>
                {/* Phân trang */}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                    pageLinkClassName={"pagination__link--number"}
                    pageClassName={"pagination__item"}

                />
            </div>

        </>
    )
}

export default VendorTransactionHistory;