import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import customAxios from "../../services/api";

function UpRoleUserToVendor() {
    const [user, setUser] = useState();
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        customAxios.get("accounts/searchAccount/" + id)
            .then(function (res) {
                setUser(res.data);
            })
    }, []);

    const handleUpRoleClick = (userId, action) => {
        const updatedVendors = (user) => {
            if (user.id === userId) {
                let newRoleId = user.role.id;
                let newStatusId = user.status.id;

                if (action === "Accept") {
                    newRoleId = 2;
                    newStatusId = 1;
                } else if (action === "Reject") {
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

        if (action === "Accept") {
            newRoleId = 2;
            newStatusId = 1;
        } else if (action === "Reject") {
            newRoleId = 3;
            newStatusId = 1;
        }

        user.role.id = newRoleId;
        user.status.id = newStatusId;

        customAxios.post(`accounts/createAccount`, user)
            .then((res) => {
                if (user.role.id == 3) {
                    customAxios.post('send-email/'+user.email)
                }
                navigate("/myaccount/vendors")
            })
            .catch((err) => {
                console.log("Error updating user status:", err);
            });
    };

    return (
        <>
            <div className="container distanceBody" style={{marginBottom:"4%"}}>
                <h2 className="headerInBody text-center mt-10 mb-20"><i className="bi bi-arrow-up-circle-fill"></i> Up Role</h2>

                <table className="table">
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
                    <tr>
                        <th>Action</th>
                        <td>
                            <button
                                className="btn btn-outline-success buttonShadow"
                                onClick={() => handleUpRoleClick(user?.id, "Accept")}
                            >
                                Accept
                            </button>
                            <button style={{marginLeft:"10px"}}
                                    className="btn btn-outline-danger buttonShadow"
                                    onClick={() => handleUpRoleClick(user?.id, "Reject")}
                            >
                                Reject
                            </button>
                        </td>
                    </tr>
                </table>
                <Link to={"/myaccount/vendors"} >
                    <button className="button btn-info buttonShadow" style={{width:"20%"}}><i className="bi bi-back"></i>Back</button>
                </Link>
            </div>

        </>
    )
}


export default UpRoleUserToVendor;