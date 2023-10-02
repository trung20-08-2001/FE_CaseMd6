import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Swal from "sweetalert2";
import WebSocketConfig from "../config/configWebsocket";
import {useDispatch, useSelector} from "react-redux";
import { Label } from "reactstrap";
import {
    addBillHistoryUser,
    filterDateCheckin,
    filterDateCheckout,
    filterNameHouse,
    filterStatus
} from "../services/billService";
import { filterBillHistoryUser } from "../redux/selector";
import { saveNotification } from "../services/notificationService";
import customAxios from "../services/api";

function UserTransactionHistory() {
    const dispatch=useDispatch()
    const resultSearch=useSelector(filterBillHistoryUser)
    const {id} = useParams();
    const [pageNumber, setPageNumber] = useState(0); // Trang hiện tại
    const billsPerPage = 10; // Số bill hiển thị trên mỗi trang
    const pagesVisited = pageNumber * billsPerPage;
    const account = useSelector(state => state.account.account)

    useEffect(() => {
        customAxios.get("bills_user/" + id)
            .then(function (res) {
                dispatch(addBillHistoryUser(res.data));
            })
    }, [])

    const handleCancelClick = (billID) => {
        const updatedBills = resultSearch.map((bill) => {
            if (bill.bill.id === billID) {
                const newStatus = bill.bill.status.id === 2 ? "CANCELED" : bill.bill.status.name;
                return {
                    ...bill,
                    bill: {
                        ...bill.bill,
                        status: {
                            id: 8,
                            name: newStatus
                        },
                    },
                    house: {
                        ...bill.house,
                        status: {
                            id: 4,
                        }
                    }
                }
            }
            return bill;
        });
        updateAfterCancel(billID, updatedBills)
    };

    const updateAfterCancel = (billID, updatedBills) => {
        const foundBill = updatedBills.find((bill) => bill.bill.id == billID);
        customAxios
            .post(`bills_user/bill`, foundBill.bill)
            .then((res) => {
                let notification = { content: (account.fullName === null ? account.username : account.fullName) + " canceled the booking " + res.data.house.name, url: `/myaccount/bills_vendor/${res.data.vendor.id}`, account: { id: res.data.vendor.id } }
                saveNotification(notification)
                    .then((response) => WebSocketConfig.sendMessage("/private/" + res.data.vendor.id, { ...response.data, type: "NOTIFICATION" }))
                    .catch((err) => console.log(err))
                Swal.fire({
                    icon: 'success',
                    title: 'You have cancelled!',
                    showConfirmButton: false, // Ẩn nút "OK"
                    timer: 1500 // Tự động đóng cửa sổ thông báo sau 1 giây (tuỳ chỉnh theo ý muốn)
                })
                customAxios.get("bills_user/" + id)
                    .then(function (res) {
                        dispatch(addBillHistoryUser(res.data));
                    })
            })
            .catch((err) => {
                console.log("Error updating bill status:", err);
            });

        customAxios
            .post(`bills_user/house`, foundBill.house)
            .then((res) => {
                console.log("House status updated successfully");
            })
            .catch((err) => {
                console.log("Error updating house status:", err);
            });
    };

    const displayBills_User = resultSearch
        .slice(pagesVisited, pagesVisited + billsPerPage)
        .map((bill) => {
            const userId = bill?.bill.user.id || '';
            const dateCheckin = bill?.bill.dateCheckin || 'No Checkin';
            const dateCheckout = bill?.bill.dateCheckout || 'No Checkout';
            const houseName = bill?.house.name || 'No Name';
            const totalPrice = bill?.bill.totalPrice || 0;
            const address = bill?.house.address || 'No Address';
            const status = bill?.bill.status.id === 2 ? "Pending" : bill?.bill.status.id === 6 ? "Using" :
                bill?.bill.status.id === 7 ? "Checked out" : bill?.bill.status.id === 8 ? "Canceled" : 'No Status';
            const statusColor = bill?.bill.status.id === 2 ? 'backgroundColorStatusPending' : bill?.bill.status.id === 6 ? 'backgroundColorStatusUsing' :
                bill?.bill.status.id === 7 ? 'backgroundColorStatusCheckout' : bill?.bill.status.id === 8 ? 'backgroundColorStatusCanceled' : '';

            // Tính toán thời gian đặt thuê
            const checkinDate = new Date(dateCheckin);
            const currentDate = new Date();
            const diffInTime = Math.abs(currentDate - checkinDate);
            const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

            // Kiểm tra nếu thời gian đặt thuê lớn hơn 1 ngày, hiển thị nút "Cancel"
            const cancelButton = (diffInDays > 1 && bill.bill.status.id === 2) ? (
                <button
                    style={{ width: "114px", fontWeight: 'bold', boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)" }}
                    className="btn btn-outline-danger buttonShadow"
                    onClick={() => handleCancelClick(bill?.bill.id)}
                >Cancel</button>
            ) : null;

            return (
                <tr key={bill.bill.id} style={{ height: '60px' }}>
                    <td>{dateCheckin}</td>
                    <td>{dateCheckout}</td>
                    <td>{houseName}</td>
                    <td><span style={{
                        fontWeight: "bold"
                    }}>{new Intl.NumberFormat().format(totalPrice).replace(/,/g, ' ')}</span> VNĐ
                    </td>
                    <td>{address}</td>
                    <td className="statusCenter"><p className={statusColor}>{status}</p></td>
                    <td>{cancelButton}</td>
                </tr>
            );
        });

    const pageCount = Math.ceil(resultSearch.length / billsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
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

            <div className="container distanceBody">
                <h4 className='text-center pb-20 headerInBody'>Transaction history</h4>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Date CheckIN</th>
                            <th>Date CheckOut</th>
                            <th>Name House</th>
                            <th>Total Price</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayBills_User}
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

export default UserTransactionHistory;