import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import customAxios from "../../services/api";

function ShowVendor() {
    const [vendors, setVendors] = useState([]);
    // da sua
    const [pageNumber, setPageNumber] = useState(0); // Trang hiện tại
    const vendorsPerPage = 5; // Số vendor hiển thị trên mỗi trang
    const pagesVisited = pageNumber * vendorsPerPage;
    // end

    useEffect(() => {
        customAxios.get("admin/vendors")
            .then(res => {
                setVendors(res.data);
            })
            .catch(function (err) {
                console.log(err)
            })
    }, []);

    // da sua
    const displayVendors = vendors
        .slice(pagesVisited, pagesVisited + vendorsPerPage)
        .map((vendor) => {
            const statusColor = vendor.account.status.name === "ACTIVE" ? "backgroundColorStatusActive" : vendor.account.status.name=== "BLOCKED"?"backgroundColorStatusBlocked": "backgroundColorStatusPending";
            const statusName = vendor.account.status.name === "ACTIVE" ? "Active" : vendor.account.status.name=== "BLOCKED"? "Blocked":"Pending";
            return (
                <tr key={vendor.account.id}>
                    <td >{vendor.account.fullName == null ? <p className="text-danger">Not update</p> : <p>{vendor.account.fullName}</p>}</td>
                    <td>{vendor.account.email == null ? <p className="text-danger">Not update</p> : <p>{vendor.account.email}</p>}</td>
                    <td>{vendor.account.phone}</td>
                    <td><span>{new Intl.NumberFormat().format(vendor.revenue)}</span> VNĐ</td>
                    <td className="text-center">{vendor.countHouse}</td>
                    <td>
                        <Link to={`/myaccount/vendor/detail/${vendor.account.id}`} className="seeDetails">
                            See Details
                        </Link>
                    </td>
                    <td className="statusCenter"><p className={statusColor}>{statusName}</p></td>
                    <td>
                        {vendor.account.status.id === 2 ? (
                            <div>
                                <Link className="btn btn-outline-info buttonShadow" to={`/myaccount/vendor/upRole/${vendor.account.id}`}>
                                    Up Role
                                </Link>
                            </div>
                        ) : (
                            <i
                                style={{cursor:"pointer", fontSize: "30px", fontWeight:"bold"}}
                                className={
                                    vendor.account.status.name === "ACTIVE"
                                        ? "fa fa-unlock"
                                        : "fa fa-lock"
                                }
                                onClick={() => handleVendorClick(vendor.account.id)}
                            ></i>
                        )}
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(vendors.length / vendorsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    // end

    const handleVendorClick = (vendorId) => {
        const updatedVendors = vendors.map((vendor) => {
            if (vendor.account.id === vendorId) {
                const newStatus = vendor.account.status.name === "ACTIVE" ? "BLOCKED" : "ACTIVE";
                let newRoleId = vendor.account.role.id;

                return {
                    ...vendor,
                    account: {
                        ...vendor.account,
                        role: {
                            ...vendor.account.role,
                            id: newRoleId,
                        },
                        status: {
                            ...vendor.account.status,
                            name: newStatus,
                        },
                    },
                };
            }
            return vendor;
        });
        setVendors(updatedVendors);
        updateVendorStatus(vendorId);
    };

    const updateVendorStatus = (vendorId) => {
        const updatedAccount = vendors.find((vendor) => vendor.account.id === vendorId).account;
        updatedAccount.status.id = updatedAccount.status.id === 1 ? 3 : 1;
        if (updatedAccount.status.name === "ACTIVE") {
            Swal.fire({
                icon: 'warning',
                title: 'Lock!',
                showConfirmButton: false, // Ẩn nút "OK"
                timer: 1000 // Tự động đóng cửa sổ thông báo sau 1 giây (tuỳ chỉnh theo ý muốn)
            });
        }
        if (updatedAccount.status.name === "BLOCKED") {
            Swal.fire({
                icon: 'success',
                title: 'Unlock',
                showConfirmButton: false, // Ẩn nút "OK"
                timer: 1000 // Tự động đóng cửa sổ thông báo sau 1 giây (tuỳ chỉnh theo ý muốn)
            });
        }
        customAxios.post(`accounts/createAccount`, updatedAccount)
            .then((res) => {

            })
            .catch((err) => {
                console.log("Error updating vendor status:", err);
            });
    };

    const handleUpRoleClick = (vendorId, action) => {
        const updatedVendors = vendors.map((vendor) => {
            if (vendor.account.id === vendorId) {
                let newRoleId = vendor.account.role.id;
                let newStatusId = vendor.account.status.id;

                if (action === "ACCEPT") {
                    newRoleId = 2;
                    newStatusId = 1;
                } else if (action === "REJECT") {
                    newRoleId = 3;
                    newStatusId = 1;
                }

                return {
                    ...vendor,
                    account: {
                        ...vendor.account,
                        role: {
                            ...vendor.account.role,
                            id: newRoleId,
                        },
                        status: {
                            ...vendor.account.status,
                            id: newStatusId,
                        },
                    },
                };
            }
            return vendor;
        });
        setVendors(updatedVendors);
        updateUseUpToVendor(vendorId, action);
    };

    const updateUseUpToVendor = (vendorId, action) => {
        const updatedAccount = vendors.find((vendor) => vendor.account.id === vendorId).account;
        let newRoleId = updatedAccount.role.id;
        let newStatusId = updatedAccount.status.id;

        if (action === "ACCEPT") {
            newRoleId = 2;
            newStatusId = 1;
        } else if (action === "REJECT") {
            newRoleId = 3;
            newStatusId = 1;
        }

        updatedAccount.role.id = newRoleId;
        updatedAccount.status.id = newStatusId;

        customAxios.post(`accounts/createAccount`, updatedAccount)
            .then((res) => {
                if (updatedAccount.role.id == 3) {
                    customAxios.post('/send-email/'+updatedAccount.email)
                    console.log(updatedAccount.email)
                }
                window.location.reload();

            })
            .catch((err) => {
                console.log("Error updating vendor status:", err);
            });
    };

    return (
        <>

             <div className="container distanceBody">
                <h4 className='text-center pb-20 mt-20 headerInBody'>List account vendor</h4>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Revenue</th>
                            <th>Count of houses</th>
                            <th>Detail</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayVendors}
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

export default ShowVendor;