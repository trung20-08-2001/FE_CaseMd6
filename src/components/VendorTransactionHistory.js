import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

function VendorTransactionHistory() {
    const [bills_vendor, setBills_vendor] = useState([]);
    const {id} = useParams();
    // da sua
    const [pageNumber, setPageNumber] = useState(0); // Trang hiện tại
    const billsPerPage = 5; // Số bill hiển thị trên mỗi trang
    const pagesVisited = pageNumber * billsPerPage;
    // end

    useEffect(() => {
        axios.get("http://localhost:8081/bills_vendor/" + id)
            .then(function (res) {
                setBills_vendor(res.data);
            })
    }, []);

    // da sua
    const displayBills_vendor = bills_vendor
        .slice(pagesVisited, pagesVisited + billsPerPage)
        .map((bill) => {
            const userId = bill?.bill.vendor.id || '';
            const dateCheckin = bill?.bill.dateCheckin || 'No Checkin';
            const dateCheckout = bill?.bill.dateCheckout || 'No Checkout';
            const houseName = bill?.house.name || 'No House Name';
            const userName = bill?.bill.user.name || 'No User Name';
            const totalPrice = '$' + bill?.bill.totalPrice || '$0';
            const status = bill?.bill.status.name || 'No Status';

            return (
                <tr key={userId} style={{height: '60px'}}>
                    <td>{dateCheckin}</td>
                    <td>{dateCheckout}</td>
                    <td>{houseName}</td>
                    <td>{userName}</td>
                    <td>{totalPrice}</td>
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
    // end

    const handleBillClick = (billId) => {
        const updatedBills = bills_vendor.map((bill) => {
            if (bill.bill.id === billId) {
                let newIdStatus_bill = bill.bill.status.id;
                let newNameStatus_bill = bill.bill.status.name;

                let newIdStatus_house = bill.house.status.id;
                let newNameStatus_house = bill.house.status.name;

                if (bill.bill.status.id === 2) {
                    newIdStatus_bill = 6; //USING
                    newNameStatus_bill = 'USING'
                    newIdStatus_house = 5; //ORDERED
                    newNameStatus_house = 'ORDERED'
                } else if (bill.bill.status.id === 6) {
                    newIdStatus_bill = 7; //CHECKED_OUT
                    newNameStatus_bill = 'CHECKED_OUT'
                    newIdStatus_house = 4; //READY
                    newNameStatus_house = 'READY'
                }

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

    return (
        <>

            <div className="container" style={{marginBottom: "50px", marginTop: "50px"}}>
                <h4 className='text-center pb-20'>Renting a House</h4>

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