import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import * as Yup from 'yup';
import "../assets/styleFormAddHouse.css";
import { storage } from "../config/configFirebase";
import customAxios from '../services/api';
import { getAllCategory } from "../services/categoryService";
import { findAllHouse, findHouseByAccount, findTopHouse, resetData, saveHouse } from '../services/houseService';
import ReactLoading from 'react-loading';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Please enter the house name')
        .matches(/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz0-9 ]*$/, 'Special characters are not allowed'),
    address: Yup.string()
        .required('Please enter the house address')
        .matches(/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz0-9 ]*$/, 'Special characters are not allowed'),
    numberOfBedrooms: Yup.string()
        .required('Please enter the number of bedrooms')
        .matches(/^(?:[1-3])$/, 'The number of bedrooms should be between 1 and 3.'),
    price: Yup.number()
        .min(0, 'Price must be greater than 0')
        .required('Please enter the price'),
    numberOfLivingRooms: Yup.string()
        .required('Please enter the number of living rooms')
        .matches(/^(?:[1-9]|10)$/, 'The number of bedrooms should be between 1 and 10.'),
    description: Yup.string()
        .required('Please enter the description')
});

const CreateHouse = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = useSelector(state => state.categories.categories);
    const [idCategory, setIdCategorye] = useState(1)


    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getAllCategory())
        }
    }, [])

    const handleImageChange = (e) => {
        const fileList = e.target.files;
        const fileArray = Array.from(fileList);
        setFiles(fileArray);

        if (e.target.files && e.target.files.length > 0) {
            const imagesArray = Array.from(e.target.files);
            Promise.all(
                imagesArray.map((image) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            resolve(e.target.result);
                        };
                        reader.onerror = function (error) {
                            reject(error);
                        };
                        reader.readAsDataURL(image);
                    });
                })
            )
                .then((results) => {
                    setSelectedImages(results);
                })
                .catch((error) => {
                    console.error('Error reading images:', error);
                });
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
        if (updatedImages.length === 0) {
            fileInputRef.current.value = null;
        }
    };


    const handleCategoryChange = (event) => {
        setIdCategorye(event.target.value)
    }

    const handleUploadMutilFile = (house) => {
        if (files.length !== 0) {
            const uploadPromises = files.map((file) => {
                const imgRef = ref(storage, `images/${file.name}`);
                return uploadBytes(imgRef, file)
                    .then(() => {
                        return getDownloadURL(imgRef);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
            Promise.all(uploadPromises)
                .then((urls) => {
                    let images = []
                    for (let url of urls) {
                        images.push({ url: url, type: "HOUSE", house: { id: house.id } });
                    }
                    dispatch(saveHouse({ house: house, images: images }))
                    handleSaveImageToDatabase(images)
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            let image = [{ url: "https://afdevinfo.com/wp-content/uploads/2017/10/thiet-ke-hinh-ngoi-nha-dep.jpg", type: "HOUSE", house: { id: house.id } }]
            dispatch(saveHouse({ house: house, images: image }))
            handleSaveImageToDatabase(image)
        }
    };


    const handleSaveImageToDatabase = (images) => {
        customAxios.post("/images/save", images)
            .then((response) => {
                displaySwalAlter();
            })
            .catch((error) => console.log(error))
    }

    const displaySwalAlter = () => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Congratulations on your  house create successful!',
            allowOutsideClick: true,
            willClose: (result) => {
                if (result.dismiss === Swal.DismissReason.backdrop) {
                    navigate("/myaccount/host"); // Chuyển trang khi nhấn vào bên ngoài vùng Swal
                } else {
                    navigate("/myaccount/host"); // Chuyển trang khi nhấn nút "OK" trong Swal
                }
            }
        })
    }

    const handleSubmit = (values, { resetForm }) => {
        validationSchema
            .validate(values, { abortEarly: false })
            .then(() => {
                let newHouse = { ...values, category: { id: idCategory }, numberOfHire: 0, account: { id: JSON.parse(localStorage.getItem('account')).id }, status: { id: 4, name: "READY" } }
                
                customAxios.post("/houses/save", newHouse)
                    .then(res => {
                        handleUploadMutilFile(res.data);
                    })
                    .catch(error => console.log(error));
                resetForm();
                fileInputRef.current.value = null;
                setSelectedImages([]);
            })
    };




    return (
        <>
         {/* <ReactLoading type={"spinningBubbles"} color={"black"} height={'20%'} width={'20%'}  /> */}
            <div className="row">
                <div className="agency-container distanceBody">
                    <h2 className="text-center mb-15 headerInBody" >Create House</h2>
                    <div className=" distanceBody">
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
                                            <label htmlFor='name' >Name house</label>
                                            <Field type="text" name="name" id="name" placeholder="Enter name house" className="mb-28" />
                                            {errors.name && touched.name ? (
                                                <p style={{ color: "red", fontSize: "20px" }}>{errors.name}</p>
                                            ) : null}

                                            <label htmlFor='numberOfBedrooms' >Number of bedrooms </label>
                                            <Field type="number" name="numberOfBedrooms" id="numberOfBedrooms" placeholder="Enter number of bedrooms" className="mb-28" />
                                            {errors.numberOfBedrooms && touched.numberOfBedrooms ? (
                                                <p style={{ color: "red", fontSize: "20px" }}>{errors.numberOfBedrooms}</p>
                                            ) : null}

                                            <label htmlFor='price' >Price</label>
                                            <Field type="number" name="price" id="price" placeholder="Enter price" className="mb-28" />
                                            {errors.price && touched.price ? (
                                                <p style={{ color: "red", fontSize: "20px" }}>{errors.price}</p>
                                            ) : null}


                                        </div>
                                        <div className="col-lg-6">
                                            <label htmlFor='address' >Address</label>
                                            <Field type="text" name="address" id="address" placeholder="Address" className="mb-28" />
                                            {errors.address && touched.address ? (
                                                <p style={{ color: "red", fontSize: "20px" }}>{errors.address}</p>
                                            ) : null}

                                            <label htmlFor='numberOfLivingRooms'>Number of livingroon</label>
                                            <Field type="number" name="numberOfLivingRooms" id="numberOfLivingRooms" placeholder="Enter number of living room" className="mb-28" />
                                            {errors.numberOfLivingRooms && touched.numberOfLivingRooms ? (
                                                <p style={{ color: "red", fontSize: "20px" }}>{errors.numberOfLivingRooms}</p>
                                            ) : null}

                                            <label htmlFor='category' >Category</label>
                                            <select name="category" id="category" className="mb-28" onChange={(event) => handleCategoryChange(event)}>
                                                {categories.map(category =>
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="col-lg-12">
                                            <label htmlFor='description' >Description</label>
                                            <Field as="textarea" name="description" id="description" placeholder="Enter description" style={{ height: "100px" }} className="mb-28" />
                                            {errors.description && touched.description ? (
                                                <p style={{ color: "red", fontSize: "20px" }}>{errors.description}</p>
                                            ) : null}

                                            <label htmlFor='file-upload-input'>Choose a picture of your house</label>
                                            <div className="file-upload">
                                                <input ref={fileInputRef} type="file" name="image" id="file-upload-input" multiple accept=".jpeg, .jpg, .png" onChange={handleImageChange} />
                                                <div className="file-upload-content" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    {selectedImages.length > 0 &&
                                                        selectedImages.map((image, index) => (
                                                            <div className="image-preview" key={index}>
                                                                <img className="file-upload-image" src={image} alt={`Image ${index + 1}`} style={{ width: "200px", height: "150px" }} />
                                                                <div className="image-title-wrap">
                                                                    <button type="button" onClick={() => handleRemoveImage(index)} className="remove-image">
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                            <button className=" button buttonShadow mt-20 mb-10" type="submit" style={{ width: "10%", marginLeft: "40%" }}><h3>Save</h3></button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateHouse;