import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
    addBillHistoryHost,
    filterDateCheckin,
    filterDateCheckout,
    filterNameHouse,
    filterStatus
} from "../services/billService";
import { filterBillHistoryHost } from "../redux/selector";
import { Label } from "reactstrap";
import { seenNotification } from "../services/notificationService";
import customAxios from "../services/api";

function VendorTransactionHistory() {
    const bills_vendor = useSelector(filterBillHistoryHost)
    const hasNotifiaction = useSelector(state => state.bill.hasNotifiaction)

    const { id } = useParams();
    const dispatch = useDispatch()

    const [pageNumber, setPageNumber] = useState(0); // Trang hiện tại
    const billsPerPage = 10; // Số bill hiển thị trên mỗi trang
    const pagesVisited = pageNumber * billsPerPage;

    useEffect(() => {
        customAxios.get("bills_vendor/" + id)
            .then(function (res) {
                dispatch(addBillHistoryHost(res.data))
            })

    }, []);

    useEffect(() => {
        if (hasNotifiaction) {
            customAxios.get("bills_vendor/" + id)
                .then(function (res) {
                    dispatch(addBillHistoryHost(res.data))
                })
                dispatch(seenNotification())
        }

    }, [hasNotifiaction])


    const displayBills_vendor = bills_vendor
        .slice(pagesVisited, pagesVisited + billsPerPage)
        .map((bill) => {
            const userId = bill?.bill.vendor.id || '';
            const dateCheckin = bill?.bill.dateCheckin || 'No Checkin';
            const dateCheckout = bill?.bill.dateCheckout || 'No Checkout';
            const houseName = bill?.house.name || 'No House Name';
            const userName = bill?.bill.user.username || 'No User Name';
            const totalPrice = bill?.bill.totalPrice || 0;
            const status = bill?.bill.status.id === 2 ? "Pending" : bill?.bill.status.id === 6 ? "Using" :
                bill?.bill.status.id === 7 ? "Checked out" : bill?.bill.status.id === 8 ? "Canceled" : 'No Status';
            const statusColor = bill?.bill.status.id === 2 ? 'backgroundColorStatusPending' : bill?.bill.status.id === 6 ? 'backgroundColorStatusUsing' :
                bill?.bill.status.id === 7 ? 'backgroundColorStatusCheckout' : bill?.bill.status.id === 8 ? 'backgroundColorStatusCanceled' : '';

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
                        currentDate.setHours(0, 0, 0, 0,)
                        dateCheckout.setHours(0, 0, 0, 0,)
                        dateCheckin.setHours(0, 0, 0, 0,)

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
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Cannot Checkin',
                                    text: 'The Checkin date is ' + bill.bill.dateCheckin,
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
                        customAxios.get("bills_vendor/" + id)
                            .then(function (res) {
                                dispatch(addBillHistoryHost(res.data))
                            })
                    })
                    .catch((error) => {
                        console.log("Error updating bill and house status:", error);
                    });
            };
            return (
                <tr key={bill.bill.id} style={{ height: '1%' }}>
                    <td>{dateCheckin}</td>
                    <td>{dateCheckout}</td>
                    <td>{houseName}</td>
                    <td>{userName}</td>
                    <td><span style={{
                        fontWeight: "bold"
                    }}>{new Intl.NumberFormat().format(totalPrice).replace(/,/g, ' ')}</span> VNĐ
                    </td>
                    <td className="statusCenter"><p className={statusColor}>{status}</p></td>
                    <td>
                        <button style={{ width: "114px", fontWeight: 'bold', boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)" }}
                            className={bill.bill.status.id === 2 ? ("btn btn-outline-success buttonShadow"
                            ) : (bill.bill.status.id === 8 || bill.bill.status.id === 7) ? (null
                            ) : "btn btn-outline-secondary buttonShadow"}
                            onClick={() => handleBillClick(bill?.bill.id)}
                        >{bill.bill.status.id === 2 ? (`Checkin`
                        ) : (bill.bill.status.id === 8 || bill.bill.status.id === 7) ? (null
                        ) : `Checkout`}
                        </button>
                    </td>
                </tr>
            )
                ;
        });

    const pageCount = Math.ceil(bills_vendor.length / billsPerPage);

    const changePage = ({
        selected
    }) => {
        setPageNumber(selected);
    };


    const updateStatus_billAndHouse = (billId, updatedBills) => {
        const updatedStatus_bill = updatedBills.find((bill) => bill.bill.id === billId).bill;
        const updatedStatus_house = updatedBills.find((bill) => bill.bill.id === billId).house;
        const updateBillPromise = customAxios.post(`bills_vendor/${billId}/bill`, updatedStatus_bill)
            .then((res) => {
                if (updatedStatus_bill.status.id === 6) {
                    Swal.fire({
                        icon: 'success',
                        title: 'You have checked in!',
                        showConfirmButton: false, // Ẩn nút "OK"
                        timer: 1500 // Tự động đóng cửa sổ thông báo sau 1 giây (tuỳ chỉnh theo ý muốn)
                    })
                } else if (updatedStatus_bill.status.id === 7) {
                    Swal.fire({
                        icon: 'success',
                        title: 'You have checked out!',
                        showConfirmButton: false, // Ẩn nút "OK"
                        timer: 1500 // Tự động đóng cửa sổ thông báo sau 1 giây (tuỳ chỉnh theo ý muốn)
                    })
                }
            })
            .catch((err) => {
                console.log("Error updating bill status:", err);
            });

        const updateHousePromise = customAxios.post(`bills_vendor/${billId}/house`, updatedStatus_house)
            .then((res) => {
            })
            .catch((err) => {
                console.log("Error updating house status:", err);
            });

        return Promise.all([updateBillPromise, updateHousePromise]);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }} className="row mt-30">
                <div className="col-xl-3">
                    <Label htmlFor="nameHouse">Name House</Label>
                    <input
                        id="nameHouse"
                        type="text"
                        placeholder="Name house..."
                        onChange={e => dispatch(filterNameHouse(e.target.value))}
                        style={{ flex: 2, marginRight: '10px' }}
                    />
                </div>
                <div className="col-xl-3 ">
                    <Label htmlFor="dateCheckin">Date Checkin</Label>
                    <input
                        id="dateCheckin"
                        type="DATE"
                        onChange={e => dispatch(filterDateCheckin(e.target.value))}
                        style={{ flex: 2, marginRight: '10px' }}
                    />
                </div>
                <div className="col-xl-3">
                    <Label htmlFor="dateCheckout">Date Checkout</Label>
                    <input
                        id="dateCheckout"
                        type="DATE"
                        onChange={e => dispatch(filterDateCheckout(e.target.value))}
                        style={{ flex: 2, marginRight: '10px' }}
                    />
                </div>
                <div className="col-xl-3">
                    <Label htmlFor="status">Status</Label>
                    <select
                        id="status"
                        onChange={e => dispatch(filterStatus(e.target.value))}
                        style={{ flex: 2, marginRight: '10px' }}
                    >
                        <option value="ALL">All</option>
                        <option value="PENDING">PENDING</option>
                        <option value="USING">USING</option>
                        <option value="CHECKED_OUT">CHECKED_OUT</option>
                        <option value="CANCELED">CANCELED</option>
                    </select>
                </div>
            </div>

            <div className="container" style={{ marginBottom: "50px", marginTop: "50px" }}>
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