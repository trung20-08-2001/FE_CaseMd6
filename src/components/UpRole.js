import React, {useState} from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {imageDb} from "../config/configFirebase";
import {v4} from "uuid";
import customAxios from '../services/api';

const validationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    fullName: Yup.string().required('FullName is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone is required')
});

const UpRole2 = () => {
    let account = JSON.parse(localStorage.getItem('account'));
    const [img1,setImg1] = useState();
    const [img2,setImg2] = useState();

    const handleImageChange = (e, setImage) => {
        const img = e.target.files[0];

        if (img !== null) {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, img)
                .then((value) => getDownloadURL(value.ref))
                .then((url) => setImage(url))
                .catch((error) => {
                    console.log("Upload error:", error);
                });
        }
    };

    const handleSubmit = (values, {setSubmitting, resetForm}) => {
        values.img1 = img1;
        values.img2 = img2;
        customAxios.post("admin/registration/req/" + account.id, values)
            .then(response => {
                // Xử lý response từ server (nếu cần)
                console.log(response);

                Swal.fire({
                    icon: 'success',
                    title: 'Sign Up Success!',
                    text: 'You have successfully registered. Waiting for approval from Admin.',
                });
                resetForm();
                setImg1(null)
                setImg2(null)

            })
            .catch(error => {
                // Xử lý lỗi (nếu có)
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: 'Please double check the entered fields',
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
        <div className="create-agency-area pt-30 pb-60">
            <div className="container">
                <h2 className="text-center mb-43 headerInBody">
                    Register to become a landlord
                </h2>
                <div className="row distanceBody table">
                    <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 ml-20 mr-20 mt-0">
                        <div className="agency-container">
                            <Formik initialValues={{
                                address: '', fullName: '', email: '', phone: '', img1: ''
                            }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}>
                                {({isSubmitting}) => (

                                    <Form action="#" method="post">
                                        <br/>
                                        <br/>
                                        <h4 className="details-title text-medium mb-23">
                                            Provide more information
                                        </h4>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    placeholder="Address"
                                                    className="mb-28"
                                                />
                                                <p style={{ color: "red" }} className="error-message">
                                                        <ErrorMessage name="address" component="div" className="error"/>

                                                    </p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <Field
                                                        type="text"
                                                        name="fullName"
                                                        placeholder="FullName"
                                                        className="mb-28"
                                                    />
                                                    <p style={{color: "red"}} className="error-message">
                                                        <ErrorMessage name="fullName" component="div"
                                                                      className="error"/>
                                                    </p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        className="mb-28"
                                                    />
                                                    <p style={{color: "red"}} className="error-message">
                                                        <ErrorMessage name="email" component="div" className="error"/>
                                                    </p>
                                                    <ErrorMessage name="email" component="div" className="error"/>
                                                </div>
                                                <div className="col-lg-6">
                                                    <Field
                                                        type="text"
                                                        name="phone"
                                                        placeholder="Phone"
                                                        className="mb-28"
                                                    />
                                                    <p style={{color: "red"}} className="error-message">
                                                        <ErrorMessage name="phone" component="div" className="error"/>

                                                    </p>
                                                    <ErrorMessage name="phone" component="div" className="error"/>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>ID card front face</label>
                                                    <input type="file" name="img1" accept=".jpeg, .jpg, .png"
                                                           onChange={(e) => handleImageChange(e, setImg1)}/>
                                                    {
                                                        img1 && (
                                                            <img src={img1} width={"500"} height={"300"}/>
                                                        )
                                                    }
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>ID card on the back</label>
                                                    <input type="file" name="img2" accept=".jpeg, .jpg, .png"
                                                           onChange={(e) => handleImageChange(e, setImg2)}/>
                                                    {
                                                        img2 && (
                                                            <img src={img2} width={"500"} height={"300"}/>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <br/>
                                                <br/>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="button buttonShadow">Up role
                                                </button>
                                            </div>
                                        </Form>)}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default UpRole2;