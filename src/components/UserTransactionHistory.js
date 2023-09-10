import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Swal from "sweetalert2";

function UserTransactionHistory() {
    const [bills_User, setBills_User] = useState([]);
    const {id} = useParams();
    // da sua
    const [pageNumber, setPageNumber] = useState(0); // Trang hiện tại
    const billsPerPage = 5; // Số bill hiển thị trên mỗi trang
    const pagesVisited = pageNumber * billsPerPage;
    // end

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
                const updatedBill = { ...bill };
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
                Swal.fire({
                    icon: 'success',
                    title: 'You have Cancelled!',
                    showConfirmButton: false, // Ẩn nút "OK"
                    timer: 1500 // Tự động đóng cửa sổ thông báo sau 1 giây (tuỳ chỉnh theo ý muốn)
                })
                console.log("Bill status updated successfully");
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

    // da sua
    const displayBills_User = bills_User
        .slice(pagesVisited, pagesVisited + billsPerPage)
        .map((bill) => {
            const userId = bill?.bill.user.id || '';
            const dateCheckin = bill?.bill.dateCheckin || 'No Checkin';
            const dateCheckout = bill?.bill.dateCheckout || 'No Checkout';
            const houseName = bill?.house.name || 'No Name';
            const totalPrice = '$'+bill?.bill.totalPrice || '$0';
            const address = bill?.house.address || 'No Address';
            const status = bill?.bill.status.name || 'No Status';

            // Tính toán thời gian đặt thuê
            const checkinDate = new Date(dateCheckin);
            const currentDate = new Date();
            const diffInTime = Math.abs(currentDate - checkinDate);
            const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

            // Kiểm tra nếu thời gian đặt thuê lớn hơn 1 ngày, hiển thị nút "Cancel"
            const cancelButton = (diffInDays > 1 && bill.bill.status.id === 2) ? (
                <button className="btn btn-outline-danger"
                        onClick={() => handleCancelClick(bill?.bill.id)}
                >Cancel</button>
            ) : null;

            return (
                <tr key={userId} style={{height:'60px'}}>
                    <td>{dateCheckin}</td>
                    <td>{dateCheckout}</td>
                    <td>{houseName}</td>
                    <td>{totalPrice}</td>
                    <td>{address}</td>
                    <td>{status}</td>
                    <td>{cancelButton}</td>
                </tr>
            );
        });

    const pageCount = Math.ceil(bills_User.length / billsPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };
    // end


    return (
        <>

            <div className="container" style={{marginBottom: "50px", marginTop: "50px"}}>
                <h4 className='text-center pb-20'>Transaction History</h4>

                <table className="table table-hover">
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