import {useEffect, useState} from "react";
import axios from "axios";

function ShowVendor() {
    let account=JSON.parse(localStorage.getItem("account"));
    const [vendors, setVendors] = useState([]);
    const handleVendorClick = (vendorId) => {
        const updatedVendors = vendors.map((vendor) => {
            if (vendor.account.id === vendorId) {
                const newStatus = vendor.account.status.name === "ACTIVE" ? "BLOCK" : "ACTIVE";
                console.log(vendor.account.status.name)
                return {
                    ...vendor,
                    account: {
                        ...vendor.account,
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
        const updatedVendor = vendors.find((vendor) => vendor.account.id === vendorId);
        console.log(updatedVendor)
        const newStatus = updatedVendor.account.status.name === "ACTIVE" ? "BLOCK" : "ACTIVE";
        console.log(updatedVendor.account.status.name)
        const accountData = {name: newStatus};

        axios
            .post(`http://localhost:8080/admin/vendor/${vendorId}/status`, accountData)
            .then((res) => {
                console.log("Vendor status updated:", res.data.status.name);
            })
            .catch((err) => {
                console.log("Error updating vendor status:", err);
            });
    };

    useEffect(() => {
        axios.get("http://localhost:8080/admin/vendors")
            .then(res => {
                setVendors(res.data);
            })
            .catch(function (err) {
                console.log(err)
            })
    }, []);


    return (
        <>

            <div className="container" style={{marginBottom: "50px", marginTop: "50px"}}>
                <h2>List Vendor</h2>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Revenue</th>
                        <th>Number of houses</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        vendors.length > 0 && vendors.map((vendor) => {
                            return (
                                <tr>
                                    <td>{vendor.account.fullName}</td>
                                    <td>{vendor.account.phone}</td>
                                    <td>{vendor.revenue}</td>
                                    <td>{vendor.countHouse}</td>
                                    <td>
                                        {vendor.account.status.name}
                                    </td>
                                    <td>
                                        <i
                                            className={vendor.account.status.name === "ACTIVE" ? "fa fa-unlock" : "fa fa-lock"}
                                            onClick={() => handleVendorClick(vendor.account.id)}
                                        ></i>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ShowVendor;