import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { storage } from "../config/configFirebase";
import { getAllCategory } from "../services/categoryService";
import { saveHouse } from '../services/houseService';
import { saveImage, saveImageURL } from '../services/imageService';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Please enter the house name')
        .matches(/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz ]*$/, 'Special characters are not allowed'),
    address: Yup.string()
        .required('Please enter the house address')
        .matches(/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz ]*$/, 'Special characters are not allowed'),
    numberOfBedrooms: Yup.string()
        .required('Please enter the number of bedrooms')
        .matches(/^(?:[1-3])$/, 'The number of bedrooms should be between 1 and 3.'),
    price: Yup.number()
        .required('Please enter the price'),
    numberOfLivingRooms: Yup.string()
        .required('Please enter the number of living rooms')
        .matches(/^(?:[1-9]|10)$/, 'The number of bedrooms should be between 1 and 10.'),
    description: Yup.string()
        .required('Please enter the descriptioC')
});

const CreateHouse = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const imageURL = useSelector(state => state.image.imageURL)
    const categories = useSelector(state => state.categories.categories);
    const [idCategory, setIdCategorye] = useState(1)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage({
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
                    dispatch(saveImageURL(url))
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleCategoryChange = (event) => {
        setIdCategorye(event.target.value)
    }

    const handleSubmit = (values) => {
        
        validationSchema
            .validate(values, { abortEarly: false })
            .then(() => {
                let newHouse = { ...values, category: { id: idCategory }, account: { id: JSON.parse(localStorage.getItem('account')).id }, status: { id: 4 } }
                axios.post("http://localhost:8080/houses/save",newHouse)
                .then(res=>{
                    dispatch(saveHouse(res.data));
                    dispatch(saveImage({ url: imageURL, type: "HOUSE", house: { id: res.data.id } }))
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Congratulations on your successful house creation!',
                });
            })
    };

    return (
        <>
            <div className="row">
                <div className="agency-container">
                    <h4 className="details-title text-center mb-43">Create House</h4>
                    <Formik
                        initialValues={{
                            name: '',
                            numberOfBedrooms: '',
                            price: '',
                            address: '',
                            numberOfLivingRooms: '',
                            category: 0,
                            description: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <Field type="text" name="name" placeholder="Enter name house" className="mb-28" />
                                        {errors.name && touched.name ? (
                                            <p style={{ color: "red" }}>{errors.name}</p>
                                        ) : null}


                                        <Field type="number" name="numberOfBedrooms" placeholder="Emter number of bedrooms" className="mb-28" />
                                        {errors.numberOfBedrooms && touched.numberOfBedrooms ? (
                                            <p style={{ color: "red" }}>{errors.numberOfBedrooms}</p>
                                        ) : null}

                                        <Field type="number" name="price" placeholder="Enter price" className="mb-28" />
                                        {errors.price && touched.price ? (
                                            <p style={{ color: "red" }}>{errors.price}</p>
                                        ) : null}


                                        <Field type="file" name="image" accept=".jpeg, .jpg, .png" onChange={handleImageChange} className="mb-28" />
                                        {selectedImage && (
                                            <img src={selectedImage.url} alt={selectedImage.name} style={{ height: "200px", width: "100%" }} className="mb-40" />
                                        )}


                                        {selectedImage === null && (
                                            <img src="https://afdevinfo.com/wp-content/uploads/2017/10/thiet-ke-hinh-ngoi-nha-dep.jpg" alt="Image default" style={{ height: "200px", width: "100%" }} className="mb-40" />
                                        )}
                                    </div>
                                    <div className="col-lg-6">
                                        <Field type="text" name="address" placeholder="Address" className="mb-28" />
                                        {errors.address && touched.address ? (
                                            <p style={{ color: "red" }}>{errors.address}</p>
                                        ) : null}


                                        <Field type="number" name="numberOfLivingRooms" placeholder="Enter number of living room" className="mb-28" />
                                        {errors.numberOfLivingRooms && touched.numberOfLivingRooms ? (
                                            <p style={{ color: "red" }}>{errors.numberOfLivingRooms}</p>
                                        ) : null}


                                        <select name="category" className="mb-28" onChange={(event) => handleCategoryChange(event)}>
                                            {categories.map(category =>
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            )}
                                        </select>


                                        <Field as="textarea" name="description" placeholder="Enter description" style={{ height: "270px" }} className="mb-28" />
                                        {errors.description && touched.description ? (
                                            <p style={{ color: "red" }}>{errors.description}</p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-success btn-submit">Create</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default CreateHouse;