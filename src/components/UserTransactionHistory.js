import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Swal from "sweetalert2";
import WebSocketConfig from "../config/configWebsocket";
import {useSelector} from "react-redux";

function UserTransactionHistory() {
    const [bills_User, setBills_User] = useState([]);
    const {id} = useParams();
    const [pageNumber, setPageNumber] = useState(0); // Trang hiện tại
    const billsPerPage = 10; // Số bill hiển thị trên mỗi trang
    const pagesVisited = pageNumber * billsPerPage;
    const account = useSelector(state => state.account.account)

    useEffect(() => {
        axios.get("http://localhost:8081/bills_user/" + id)
            .then(function (res) {
                setBills_User(res.data)
            })
    }, [])

    const handleCancelClick = (billID) => {
        const updatedBills = bills_User.map((bill) => {
            if (bill.bill.id === billID) {
                const newStatus = bill.bill.status.id === 2 ? "CANCELED" : bill.bill.status.name;
                const updatedBill = {...bill};
                updatedBill.bill.status.id = 8; // CANCELED
                updatedBill.bill.status.name = newStatus;
                updatedBill.house.status.id = 4; // READY
                return updatedBill;
            }
            return bill;
        });
        setBills_User(updatedBills);
        updateAfterCancel(billID);
    };

    const updateAfterCancel = (billID) => {
        const foundBill = bills_User.find((bill) => bill.bill.id === billID);
        const house = new FormData();
        house.append("idStatus", foundBill.house.status.id);
        const bill = new FormData();
        bill.append("idStatus", foundBill.bill.status.id);
        axios
            .post(`http://localhost:8081/bills_user/${billID}/bill`, bill)
            .then((res) => {
                let notification={type:"NOTIFICATION",content:account.username + " canceled the booking " + res.data.house.name}
                    WebSocketConfig.sendMessage("/private/" +res.data.vendor.id,notification)
                Swal.fire({
                    icon: 'success',
                    title: 'You have cancelled!',
                    showConfirmButton: false, // Ẩn nút "OK"
                    timer: 1500 // Tự động đóng cửa sổ thông báo sau 1 giây (tuỳ chỉnh theo ý muốn)
                })
                axios.get("http://localhost:8081/bills_user/" + id)
                .then(function (res) {
                    setBills_User(res.data)
                })
            })
            .catch((err) => {
                console.log("Error updating bill status:", err);
            });

        axios
            .post(`http://localhost:8081/bills_user/${billID}/house`, house)
            .then((res) => {
                console.log("House status updated successfully");
            })
            .catch((err) => {
                console.log("Error updating house status:", err);
            });
    };

    const displayBills_User = bills_User
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
                    style={{width: "114px", fontWeight: 'bold', boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)"}}
                    className="btn btn-outline-danger"
                    onClick={() => handleCancelClick(bill?.bill.id)}
                >Cancel</button>
            ) : null;

            return (
                <tr key={bill.bill.id} style={{height: '60px'}}>
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

    const pageCount = Math.ceil(bills_User.length / billsPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };


    return (
        <>

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