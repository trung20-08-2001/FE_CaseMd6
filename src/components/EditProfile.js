import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function EditProfile() {
    const [account, setAccount] = useState({
        id: 0,
        username: "",
        fullName: "",
        phone: "",
        address: "",
        avatar: ""
    });
    const [previewImage, setPreviewImage] = useState("");
    const {id} = useParams();
    // const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/accounts/" + id)
            .then(res => {
                setAccount(res.data)
                setPreviewImage(res.data.avatar)
            })
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        let obj = {...account, [name]: value}
        setAccount(obj)
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAccount({...account, avatar: file});
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const edit = () => {
        axios.post("http://localhost:8080/accounts/edit/" + id, account)
            .then(res => {
                console.log(res)
                // navigate("/")
            })
    }

    return (
        <>
            <div class="banner-area bg-2 bg-overlay-2 ptb-165">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="banner-title text-center">
                                <h1 class="text-uppercase text-white">Edit Profile</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="create-agency-area pt-115 pb-120">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                            <div class="agency-container">
                                <h4 class="details-title text-center mb-43">Edit</h4>
                                <form>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <input type="text" value={account.username} onChange={handleInputChange}
                                                   name="username" placeholder="Username" class="mb-28"/>
                                            <input type="text" value={account.fullName} onChange={handleInputChange}
                                                   name="fullName" placeholder="Full name"
                                                   class="mb-28"/>
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="text" value={account.phone} onChange={handleInputChange}
                                                   name="phone" placeholder="Phone number" class="mb-28"/>
                                            <input type="text" value={account.address} onChange={handleInputChange}
                                                   name="address" placeholder="Address" class="mb-40"/>
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="file" name="avatar" class="mb-28"
                                                   onChange={handleFileInputChange}/>
                                            <img id="preview"
                                                 src={previewImage}
                                                 alt="Preview" height="200" width="200"/>
                                        </div>
                                    </div>
                                    <button onClick={edit}
                                            className="register-btn button lemon pull-left">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default EditProfile;