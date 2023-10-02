import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import customAxios from "../../services/api";

function VendorDetail() {
    const [vendor, setVendor] = useState({});
    const {id} = useParams();

    useEffect(() => {
        customAxios.get("admin/vendor/" + id)
            .then(function (res) {
                setVendor(res.data)
            })
            .catch(function (err) {
                console.log(err)
            })
    }, [])
    return (
        <>
            <div className="container distanceBody">
                <h2 className="headerInBody text-center mt-10 mb-20"><i className="fa fa-info-circle"></i> Information</h2>
                <table className="table">
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
                        <td>{vendor.account?.fullName== null ? <p className="text-danger">Not update</p> : <p>{vendor.account?.fullName}</p>}</td>
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
                        <td>{new Intl.NumberFormat().format(vendor.revenue)} VNĐ</td>
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
                <Link to={"/myaccount/vendors"}>
                    <button className="btn btn-info buttonShadow" style={{width:"20%"}}><i className="bi bi-back"></i> Back</button>
                </Link>
                <Link to={"/myaccount/chat/"+vendor.account?.id}>
                    <button className="btn btn-info buttonShadow ml-10" style={{width:"20%"}}><i className="bi bi-chat"></i> Chat</button>
                </Link>
            </div>
        </>
    )
}

export default VendorDetail;