import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function Profile() {
    const [account, setAccount] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get("http://localhost:8081/accounts/searchAccount/" + id)
            .then(function (res) {
                console.log(res.data)
                setAccount(res.data)
            })
            .catch(function (err) {
                console.log(err)
            })
    }, []);

    return (
        <>
            <div className="container" style={{marginBottom: "50px", marginTop: "50px"}}>
                <h2>Profile</h2><br/>
                <table className="table table-borderless">
                    <tr>
                        <th>Avatar</th>
                        <td>{account?.avatar == null ?
                            <img src={"https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png"} alt="img"
                                 width={"150px"} height={"250px"}/> :
                            <img src={account?.avatar} alt="img" width={"150px"} height={"250px"}/>}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{account?.username == null ? <p className="text-danger">Chưa cập nhật</p> :
                            <p>{account?.username}</p>}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{account?.email == null ? <p className="text-danger">Chưa cập nhật</p> :
                            <p>{account?.email}</p>}</td>
                    </tr>
                    <tr>
                        <th>Full Name</th>
                        <td>{account?.fullName == null ? <p className="text-danger">Chưa cập nhật</p> :
                            <p>{account?.fullName}</p>}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>{account?.phone == null ? <p className="text-danger">Chưa cập nhật</p> :
                            <p>{account?.phone}</p>}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{account?.address == null ? <p className="text-danger">Chưa cập nhật</p> :
                            <p>{account?.address}</p>}</td>
                    </tr>
                    <tr>
                        <th>Front Of The Citizen Card</th>
                        <td>{account?.img1 == null ? <p className="text-danger">Chưa cập nhật</p> :
                            <img src={account?.img1} alt="img" width={"150px"} height={"250px"}/>}</td>
                    </tr>
                    <tr>
                        <th>Back Of The Citizen Card</th>
                        <td>{account?.img2 == null ? <p className="text-danger">Chưa cập nhật</p> :
                            <img src={account?.img2} alt="img" width={"150px"} height={"250px"}/>}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>{account?.role == null ? <p className="text-danger">Chưa cập nhật</p> :
                            <p>{account?.role.id === 1? 'Admin': account?.role.id ===2? 'Vendor' : 'Customer'}</p>}</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Profile;