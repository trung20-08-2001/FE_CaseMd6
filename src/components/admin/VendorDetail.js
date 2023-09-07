import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function VendorDetail() {
    const [vendor, setVendor] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get("http://localhost:8081/admin/vendor/" + id)
            .then(function (res) {
                setVendor(res.data)
            })
            .catch(function (err) {
                console.log(err)
            })
    }, [])
    return (
        <>
            <div className="container" style={{marginBottom: "50px", marginTop: "50px"}}>
                <h2>Information</h2>
                <table className="table table-borderless">
                    <tr>
                        <th>Avatar</th>
                        <td>
                            <img src={vendor.account?.avatar} alt="img" width={"150px"} height={"250px"}/></td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{vendor.account?.username}</td>
                    </tr>
                    <tr>
                        <th>Full Name</th>
                        <td>{vendor.account?.fullName== null ? <p className="text-danger">Chưa cập nhật</p> : <p>{vendor.account?.fullName}</p>}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>{vendor.account?.phone}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{vendor.account?.address}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{vendor.account?.status.name}</td>
                    </tr>
                    <tr>
                        <th>Revenue</th>
                        <td>${vendor.revenue}</td>
                    </tr>
                    {
                        vendor.account?.status.id !== 2 &&
                        <tr>
                            <th>House</th>
                            <td><Link to={"/"}>
                                See List House
                            </Link></td>
                        </tr>
                    }

                </table>
                <Link to={"/admin/vendors"}>
                    <button className="btn btn-info">Back</button>
                </Link>
            </div>
        </>
    )
}

export default VendorDetail;