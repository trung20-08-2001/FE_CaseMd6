import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

function UpRoleUserToVendor() {
    const [user, setUser] = useState();
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8081/accounts/searchAccount/" + id)
            .then(function (res) {
                console.log(res.data)
                setUser(res.data);
            })
    }, []);

    const handleUpRoleClick = (userId, action) => {
        const updatedVendors = (user) => {
            if (user.id === userId) {
                let newRoleId = user.role.id;
                let newStatusId = user.status.id;

                if (action === "ACCEPT") {
                    newRoleId = 2;
                    newStatusId = 1;
                } else if (action === "REJECT") {
                    newRoleId = 3;
                    newStatusId = 1;
                }

                return {
                    ...user,
                    ...user.account,
                    role: {
                        ...user.role,
                        id: newRoleId,
                    },
                    status: {
                        ...user.status,
                        id: newStatusId,
                    }
                };
            }
            return user;
        };
        setUser(updatedVendors);
        updateUseUpToVendor(userId, action);
    };

    const updateUseUpToVendor = (userId, action) => {
        let newRoleId = user?.role.id;
        let newStatusId = user?.status.id;

        if (action === "ACCEPT") {
            newRoleId = 2;
            newStatusId = 1;
        } else if (action === "REJECT") {
            newRoleId = 3;
            newStatusId = 1;
        }

        user.role.id = newRoleId;
        user.status.id = newStatusId;

        axios.post(`http://localhost:8081/accounts/createAccount`, user)
            .then((res) => {
                navigate("/admin/vendors")
            })
            .catch((err) => {
                console.log("Error updating user status:", err);
            });
    };

    return (
        <>
            <h2>Up Role</h2>
            <div className="container" style={{marginBottom: "50px", marginTop: "50px"}}>

                <table className="table table-borderless">
                    <tr>
                        <th>Username</th>
                        <td><p>{user?.username}</p></td>
                    </tr>
                    <tr>
                        <th>Full Name</th>
                        <td>{user?.fullName == null ? <p className="text-danger">No name</p> :
                            <p>{user?.fullName}</p>}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{user?.email == null ? <p className="text-danger">No email</p> : <p>{user?.email}</p>}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>{user?.phone == null ? <p className="text-danger">No phone number</p> :
                            <p>{user?.phone}</p>}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{user?.address == null ? <p className="text-danger">No address</p> :
                            <p>{user?.address}</p>}</td>

                    </tr>
                    <tr>
                        <th>Image Card Front</th>
                        <td>{user?.img1 == null ? <p className="text-danger">No Image Card Front</p> :
                            <img src={user?.img1} alt={"Card Front"} width={150}/>}</td>
                    </tr>
                    <tr>
                        <th>Image Card Back</th>
                        <td>{user?.img2 == null ? <p className="text-danger">Image Card Back</p> :
                            <img src={user?.img2} alt="Card Back" width={150}/>}</td>
                    </tr>
                </table>
                <button
                    className="btn btn-outline-success"
                    onClick={() => handleUpRoleClick(user?.id, "ACCEPT")}
                >
                    ACCEPT
                </button>
                <button style={{marginLeft:"10px"}}
                    className="btn btn-outline-danger"
                    onClick={() => handleUpRoleClick(user?.id, "REJECT")}
                >
                    Reject
                </button><br/>
                <p style={{marginTop: "50px"}}>
                <Link to={"/admin/vendors"}>
                    <button className="btn btn-info">Back</button>
                </Link></p>
            </div>

        </>
    )
}


export default UpRoleUserToVendor;