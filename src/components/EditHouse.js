import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import "../assets/styleFormAddHouse.css";
import Slide from './Slide';
import { storage } from "../config/configFirebase";
import customAxios from '../services/api';
import { getAllCategory } from "../services/categoryService";
import { editHouse, findAllHouse, findHouseByAccount, findTopHouse, resetData } from '../services/houseService';



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

const EditHouse = () => {
  const account = JSON.parse(localStorage.getItem('account'));
  const myHousesDTO = useSelector(state => state.house.myHousesDTO);
  const categories = useSelector(state => state.categories.categories);

  const { indexHouseEdit } = useParams();
  const fileInputRef = useRef(null);

  const [house, setHouse] = useState(myHousesDTO[indexHouseEdit]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [idCategory, setIdCategorye] = useState(1)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (myHousesDTO.length === 0) {
      dispatch(findHouseByAccount(account.id))
        .then(result => {
          setHouse(result.payload[indexHouseEdit])
        });
    } else {
      setHouse(myHousesDTO[indexHouseEdit])
    }
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
          let images = []
          for (let result of results) {
            const image = { url: result, type: "HOUSE", house: { id: house.id } };
            images.push(image);
          }
          setSelectedImages(images);
        })
        .catch((error) => {
          console.error('Error reading images:', error);
        });
    } else {
      setSelectedImages([]);
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
          customAxios.post("/images/updateImageHouse/" + house.id, images)
            .then((response) => {
             dispatch(resetData())
            })
            .catch((error) => console.log(error))
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const displaySwalAlter = () => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Congratulations on your  house edit successful',
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
        if (selectedImages.length === 0) {
          dispatch(editHouse({ house: newHouse, images: house.images, indexHouseEdit }));
        } else {
          dispatch(editHouse({ house: newHouse, images: selectedImages, indexHouseEdit }))
        }
        displaySwalAlter();
        customAxios.post("/houses/save", newHouse)
          .then(res => {
            if (selectedImages.length !== 0) {
              handleUploadMutilFile(res.data);
            }
          })
          .catch(error => console.log(error));
        resetForm();
        fileInputRef.current.value = null;
        setSelectedImages([]);
      })
      .catch(error => console.log(error));
  };

  return (
    <>{house !== undefined && categories !== undefined &&
      <div className="row">
        <div className="agency-container distanceBody">
          <h2 className="text-center mb-25 headerInBody">Edit House</h2>
          <div className='d-flex justify-content-center mb-50 col-12' >
            <Slide images={house.images} styleImage={{ height: "200px", width: "500px" }}></Slide>
          </div>
          <Formik
            initialValues={{
              id: house.house.id,
              numberOfHire: house.house.numberOfHire,
              name: house.house.name,
              numberOfBedrooms: house.house.numberOfBedrooms,
              price: house.house.price,
              address: house.house.address,
              numberOfLivingRooms: house.house.numberOfLivingRooms,
              idCategory: house.house.category.id,
              description: house.house.description,
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
                    <select name="idCategory" id="category" className="mb-28" defaultValue={house.house.category.id} onChange={handleCategoryChange}>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
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
                              <img className="file-upload-image" src={image.url} alt={`Image ${index + 1}`} style={{ width: "200px", height: "150px" }} />
                              <div className="image-title-wrap">
                                <button type="button" onClick={() => handleRemoveImage(index)} className="remove-image">
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <button className="button buttonShadow mt-30 mb-10" type="submit" style={{ width: "10%", marginLeft: "40%"}}><h3>Save</h3></button>
                </div>
              </Form>
            )}
          </Formik>

        </div>
      </div>}
    </>
  );
};

export default EditHouse;