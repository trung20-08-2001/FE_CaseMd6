import React, {useState} from 'react';
import * as Yup from "yup";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Swal from "sweetalert2";

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

    const handlePreviewImg1 = e => {
        const file= e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setImg1(file)
    }
    const handlePreviewImg2 = e => {
        const file= e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setImg2(file)
    }


    const handleSubmit = (values, {setSubmitting}) => {
        values.img1 = img1.preview;
        values.img2 = img2.preview;
        axios.post("http://localhost:8081/admin/registration/req/" + account.id, values)
            .then(response => {
                // Xử lý response từ server (nếu cần)
                console.log(response);

                Swal.fire({
                    icon: 'success',
                    title: 'Sign Up Success!',
                    text: 'You have successfully registered. Waiting for approval from Admin.',
                });

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
                                                <p style={{ color: "red" }} className="error-message">
                                                    <ErrorMessage name="fullName" component="div" className="error"/>
                                                </p>

                                            </div>
                                            <div className="col-lg-6">
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    className="mb-28"
                                                />
                                                <p style={{ color: "red" }} className="error-message">
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
                                                <p style={{ color: "red" }} className="error-message">
                                                    <ErrorMessage name="phone" component="div" className="error"/>

                                                </p>
                                                <ErrorMessage name="phone" component="div" className="error"/>
                                            </div>
                                            <div className="col-lg-6">

                                                <label>ID card front face</label>

                                                <input type="file" name="img1" accept=".jpeg, .jpg, .png" onChange={handlePreviewImg1}  />

                                                {
                                                    img1 && (
                                                        <img src={img1.preview}  width={"500"} height={"300"}/>
                                                    )
                                                }


                                            </div>
                                            <div className="col-lg-6">


                                                <label>ID card on the back</label>

                                                <input type="file" name="img2" accept=".jpeg, .jpg, .png" onChange={handlePreviewImg2}  />

                                                {
                                                    img2 && (
                                                        <img src={img2.preview}  width={"500"} height={"300"}/>
                                                    )
                                                }


                                            </div>

                                        </div>
                                        <div>
                                            <br/>
                                            <br/>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="button buttonShadow w-25">Up Role</button>
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