import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../styles/StyleButton";
import { createImages, clearErrors } from "../actions/imageAction";
import { useSelector, useDispatch } from "react-redux";
import { IoImagesSharp } from "react-icons/io5";
import { FaSpellCheck } from "react-icons/fa";
import { MdShortText } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../constants/ImageConstant";
import { toast } from "react-toastify";

const UploadImage = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { loading, error, succes } = useSelector((state) => state.newaddImage);
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [created, setcreated] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  // console.log(user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (succes) {
      toast.success("Product Created Successfully");
      Navigate("/");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, Navigate, succes]);

  const createProductSubmitHandler = (e) => {
    const userid = user._id;
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("created", created);
    myForm.set("user_create_Id", userid);
    myForm.set("user_create_name", user.name);
    myForm.set("user_create_email", user.email);
    myForm.append("images", images);

    // images.forEach((image) => {
    //   console.log(image);
    //   myForm.append("images", image);
    // });

    dispatch(createImages(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Wrapper>
      <div className="dashboard">
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Upload Image</h1>

            <div>
              {/* <SpellcheckIcon /> */}
              <input
                type="text"
                placeholder="Image Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <textarea
                placeholder="Image Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
                required
              ></textarea>
            </div>

            <div></div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {/* {imagesPreview.map((image, index) => ( */}
              <img src={imagesPreview} alt="Product Preview" />
              {/* ))} */}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>

            {loading? (
                 <p className="note">Loading...Wait a movement</p>
              ) : (
               
                <p className="note">Note: Email willl be send after Upload image</p>
                   
              )}


          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`

.note , p{
  text-decoration: underline;
    color: #040405;
}



  .newProductContainer {
    width: 100%;
    box-sizing: border-box;
    background-color: rgb(221, 221, 221);
    border-left: 1px solid rgba(0, 0, 0, 0.158);
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .newProductContainer h1 {
    color: rgba(0, 0, 0, 0.733);
    font: 300 2rem "Roboto";
    text-align: center;
  }

  .createProductForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 3vmax;
    justify-content: space-evenly;
    height: 74%;
    width: 64vh;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);
  }

  .createProductForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .createProductForm > div > input,
  .createProductForm > div > select,
  .createProductForm > div > textarea {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax;
    outline: none;
  }

  .createProductForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  #createProductFormFile > input {
    display: flex;
    padding: 0%;
  }

  #createProductFormFile > input::file-selector-button {
    cursor: pointer;
    width: 100%;
    z-index: 2;
    height: 5vh;
    border: none;
    margin: 0%;
    font: 400 0.8vmax cursive;
    transition: all 0.5s;
    padding: 0 1vmax;
    color: rgba(0, 0, 0, 0.623);
    background-color: rgb(255, 255, 255);
  }

  #createProductFormFile > input::file-selector-button:hover {
    background-color: rgb(235, 235, 235);
  }

  #createProductFormImage {
    width: 100%;
    overflow: auto;
  }

  #createProductFormImage > img {
    width: 3vmax;
    margin: 0 0.5vmax;
  }
  #createProductBtn {
    border: none;
    background-color: tomato;
    color: white;
    font: 300 0.9vmax "Roboto";
    width: 100%;
    padding: 0.8vmax;
    cursor: pointer;
    transition: all 0.5s;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
  }

  #createProductBtn:hover {
    background-color: rgb(179, 66, 46);
  }

  @media screen and (max-width: 600px) {
    .newProductContainer h1 {
      font-size: 42px;
      color: black;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }
    .newProductContainer {
      background-color: rgb(255, 255, 255);
    }
    .createProductForm {
      padding: 5vmax;
      width: 45vh;
    }

    .createProductForm > div > input,
    .createProductForm > div > select,
    .createProductForm > div > textarea {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax;
    }

    .createProductForm > div > svg {
      font-size: 2.8vmax;
    }

    #createProductFormFile > img {
      width: 8vmax;
      border-radius: 100%;
    }

    #createProductFormFile > input::file-selector-button {
      height: 7vh;
      font: 400 1.8vmax;
    }

    #createProductBtn {
      font: 300 1.9vmax "Roboto";
      padding: 1.8vmax;
    }
  }
`;
export default UploadImage;
