import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

// function EditProfile() {
//     const [account, setAccount] = useState({
//         id: 0,
//         username: "",
//         fullName: "",
//         phone: "",
//         address: "",
//         avatar: ""
//     });
//     const [previewImage, setPreviewImage] = useState("");
//     const {id} = useParams();
//     // const navigate = useNavigate();
//
//     useEffect(() => {
//         axios.get("http://localhost:8080/accounts/" + id)
//             .then(res => {
//                 setAccount(res.data)
//                 setPreviewImage(res.data.avatar)
//             })
//     }, []);
//
//     const handleInputChange = (e) => {
//         const {name, value} = e.target;
//         let obj = {...account, [name]: value}
//         setAccount(obj)
//     };
//
//     const MAX_WIDTH = 800;
//     const MAX_HEIGHT = 800;
//     const handleFileInputChange = (e) => {
//         // const file = e.target.files[0];
//         // setAccount({...account, avatar: file});
//         // if (file) {
//         //     setPreviewImage(URL.createObjectURL(file));
//         // }
//
//         // const file = e.target.files[0];
//         // const reader = new FileReader();
//         //
//         // reader.onload = function (event) {
//         //     const base64Data = event.target.result.split(',')[1]; // Lấy phần dữ liệu base64
//         //
//         //     setAccount((prevAccount) => ({
//         //         ...prevAccount,
//         //         avatar: base64Data,
//         //     }));
//         //
//         //     if (file) {
//         //         setPreviewImage(URL.createObjectURL(file));
//         //     }
//         // };
//         //
//         // reader.readAsDataURL(file);
//
//         const file = e.target.files[0];
//         const reader = new FileReader();
//
//         reader.onload = function (event) {
//             const image = new Image();
//             image.src = event.target.result;
//
//             image.onload = function () {
//                 const canvas = document.createElement("canvas");
//                 let width = image.width;
//                 let height = image.height;
//
//                 // Kiểm tra và thay đổi kích thước nếu vượt quá giới hạn
//                 if (width > MAX_WIDTH) {
//                     height *= MAX_WIDTH / width;
//                     width = MAX_WIDTH;
//                 }
//
//                 if (height > MAX_HEIGHT) {
//                     width *= MAX_HEIGHT / height;
//                     height = MAX_HEIGHT;
//                 }
//
//                 canvas.width = width;
//                 canvas.height = height;
//
//                 const ctx = canvas.getContext("2d");
//                 ctx.drawImage(image, 0, 0, width, height);
//
//                 const resizedBase64 = canvas.toDataURL("image/jpeg");
//
//                 setAccount((prevAccount) => ({
//                     ...prevAccount,
//                     avatar: resizedBase64,
//                 }));
//
//                 if (file) {
//                     setPreviewImage(URL.createObjectURL(file));
//                 }
//             };
//         };
//
//         reader.readAsDataURL(file);
//     };
//
//     const edit = (e) => {
//         e.preventDefault(); // Ngăn chặn sự kiện mặc định của form
//         const formData = new FormData();
//         formData.append("username", account.username);
//         formData.append("fullName", account.fullName);
//         formData.append("phone", account.phone);
//         formData.append("address", account.address);
//         formData.append("avatar", account.avatar);
//         axios.post("http://localhost:8080/accounts/edit/" + id, formData)
//             .then(res => {
//                 console.log(res)
//                 // navigate("/")
//             })
//     }
//
//     return (
//         <>
//             <div class="banner-area bg-2 bg-overlay-2 ptb-165">
//                 <div class="container">
//                     <div class="row">
//                         <div class="col-lg-12">
//                             <div class="banner-title text-center">
//                                 <h1 class="text-uppercase text-white">Edit Profile</h1>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div class="create-agency-area pt-115 pb-120">
//                 <div class="container">
//                     <div class="row">
//                         <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
//                             <div class="agency-container">
//                                 <h4 class="details-title text-center mb-43">Edit</h4>
//                                 <form>
//                                     <div class="row">
//                                         <div class="col-lg-6">
//                                             <label>Username</label>
//                                             <input type="text" value={account.username} onChange={handleInputChange}
//                                                    name="username" placeholder="Username" class="mb-28"/>
//                                             <label>Fullname</label>
//                                             <input type="text" value={account.fullName} onChange={handleInputChange}
//                                                    name="fullName" placeholder="Full name"
//                                                    class="mb-28"/>
//                                         </div>
//                                         <div class="col-lg-6">
//                                             <label>Phone</label>
//                                             <input type="text" value={account.phone} onChange={handleInputChange}
//                                                    name="phone" placeholder="Phone number" class="mb-28"/>
//                                             <label>Address</label>
//                                             <input type="text" value={account.address} onChange={handleInputChange}
//                                                    name="address" placeholder="Address" class="mb-40"/>
//                                         </div>
//                                         <div class="col-lg-6">
//                                             <input type="file" name="avatar" class="mb-28"
//                                                    onChange={handleFileInputChange}/>
//                                             <img id="preview"
//                                                  src={previewImage}
//                                                  alt="Preview" height="200" width="200"/>
//                                         </div>
//                                     </div>
//                                     <button onClick={edit}
//                                             className="register-btn button lemon pull-left">
//                                         Update
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


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
            })
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        let obj = {...account, [name]: value}
        setAccount(obj)
    };

    const edit = (e) => {
        e.preventDefault(); // Ngăn chặn sự kiện mặc định của form
        const formData = new FormData();
        formData.append("username", account.username);
        formData.append("fullName", account.fullName);
        formData.append("phone", account.phone);
        formData.append("address", account.address);
        formData.append("avatar", account.avatar);
        axios.post("http://localhost:8080/accounts/edit/" + id, formData)
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
                                            <label>Username</label>
                                            <input type="text" value={account.username} onChange={handleInputChange}
                                                   name="username" placeholder="Username" class="mb-28"/>
                                            <label>Fullname</label>
                                            <input type="text" value={account.fullName} onChange={handleInputChange}
                                                   name="fullName" placeholder="Full name"
                                                   class="mb-28"/>
                                        </div>
                                        <div class="col-lg-6">
                                            <label>Phone</label>
                                            <input type="text" value={account.phone} onChange={handleInputChange}
                                                   name="phone" placeholder="Phone number" class="mb-28"/>
                                            <label>Address</label>
                                            <input type="text" value={account.address} onChange={handleInputChange}
                                                   name="address" placeholder="Address" class="mb-40"/>
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="file" name="avatar" class="mb-28"
                                                   onChange={handleInputChange}/>
                                            <img
                                                 src={account.avatar}
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