import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {storage} from "../config/configFirebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {login} from "../services/accountService";
import customAxios from "../services/api";

function EditProfile() {
    const [account, setAccount] = useState({
        id: 0,
        username: "",
        fullName: "",
        phone: "",
        address: "",
        avatar: "",
        password: "",
        role: {id: 0},
        status: {id: 0}
    });
    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState(null)
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        customAxios.get("/accounts/searchAccount/" + id)
            .then(res => {
                setPreviewImage(res.data.avatar);
                setAccount(res.data)
            })
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAccount({...account, [name]: value})
    };

    const edit = (e) => {
        localStorage.setItem("account",JSON.stringify(account));
        dispatch(login(account));
        customAxios.post("/accounts/edit", account)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully!',
                    showConfirmButton: false, // Ẩn nút "OK"
                    timer: 1500 // Tự động đóng cửa sổ thông báo sau 1 giây (tuỳ chỉnh theo ý muốn)
                })
            })
    }

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setPreviewImage(imageUrl);
                setImage({
                    ...image,
                    url: reader.result,
                    name: file.name,
                });
            };
            reader.readAsDataURL(file);
            const imgRef = ref(storage, `images/${file.name}`);
            uploadBytes(imgRef, file)
                .then(() => {
                    return getDownloadURL(imgRef);
                })
                .then((url) => {
                    setAccount({...account, avatar: url})
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    const UpdateProfileSchema = Yup.object().shape({
        // username: Yup.string().required("không được để trống").matches(/^[a-zA-Z0-9]*$/, 'Phải là chữ hoặc số'),
        // phone: Yup.string().matches(/^\d{10,12}$/, 'Số điện thoại phải có từ 10 đến 12 chữ số').required('Vui lòng nhập số điện thoại'),
        // fullName: Yup.string().required('không được để trống').matches(/^[a-zA-ZÀ-ỹ]+$/, 'Phải là chữ'),
        // address: Yup.string().required('không được để trống').matches(/^[\w\s,./-À-ỹ]+$/, 'Địa chỉ không hợp lệ'),
    });

    return (
        <>
            <Formik
                initialValues={{
                    username: account.username,
                    phone: account.phone,
                    fullName: account.fullName,
                    address: account.address
                }}
                validationSchema={UpdateProfileSchema}
                onSubmit={async values => {
                    try {
                        const response = await customAxios.post("/accounts/", values);
                        if (response.data === '') {
                            await customAxios.post("/accounts/edit", values);
                            await Swal.fire({
                                icon: 'success',
                                title: 'Cập nhật thành công!',
                                text: 'Bạn đã cập nhật thành công',
                            });
                        } else {
                            await Swal.fire({
                                icon: 'error',
                                title: 'Cập nhật thất bại',
                                text: 'Bạn đã cập nhật không thành công.',
                            });
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }}
            >
                <Form>
                    <div className="create-agency-area pt-15 pb-60">
                        <div className="container">
                            <h4 className="details-title text-center mb-43 headerInBody"><i className="fas fa-edit"></i> Edit</h4>
                            <div className="row table distanceBody">
                                <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                                    <div className="agency-container">
                                        <div className="row">
                                            <div className="col-lg-6">

                                                <input type="hidden" value={account.status.name}
                                                       onChange={handleInputChange}
                                                       name="status" placeholder="status" className="mb-28"/>

                                                <input type="hidden" value={account.role.name}
                                                       onChange={handleInputChange}
                                                       name="role" placeholder="role" className="mb-28"/>
                                                <input type="hidden" value={account.password}
                                                       onChange={handleInputChange}
                                                       name="password" placeholder="password" className="mb-28"/>
                                                <label>Username</label>
                                                <Field readOnly={true} type="text" value={account.username} onChange={handleInputChange}
                                                       name="username" placeholder="Username" className="mb-28"/>
                                                <ErrorMessage name="username" component="div"
                                                              className="error-message"/>
                                                <label>Fullname</label>
                                                <Field type="text" value={account.fullName} onChange={handleInputChange}
                                                       name="fullName" placeholder="Full name"
                                                       className="mb-28"/>
                                                <ErrorMessage name="fullName" component="div"
                                                              className="error-message"/>

                                            </div>
                                            <div className="col-lg-6">
                                                <label>Phone</label>

                                                <Field type="text" value={account.phone} onChange={handleInputChange}
                                                       name="phone" placeholder="Phone number" className="mb-28"/>
                                                <ErrorMessage name="phone" component="div"
                                                              className="error-message"/>
                                                <label>Address</label>
                                                <Field type="text" value={account.address} onChange={handleInputChange}
                                                       name="address" placeholder="Address" className="mb-40"/>
                                                <ErrorMessage name="address" component="div"
                                                              className="error-message"/>
                                            </div>
                                            <div className="col-lg-6">
                                                    <input type="file" name="avatar" placeholder="Ảnh" accept=".jpeg, .jpg, .png" onChange={(event) => handleChangeImage(event)}/>
                                                    {previewImage && (
                                                        <img src={previewImage} alt="Image" className="preview-image"/>
                                                    )}
                                            </div>
                                        </div>
                                        <button style={{cursor: 'pointer', marginLeft:"36%", width:"30%"}} type={"button"} onClick={edit}
                                                className="button buttonShadow">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default EditProfile;