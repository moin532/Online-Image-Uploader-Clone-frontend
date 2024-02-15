import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addREview,
  clearErrors,
  getImageDetails,
  NewLike,
} from "../actions/imageAction";
import { Container } from "../styles/Container";
import { Button } from "../styles/StyleButton";
import ReviewCard from "./ReviewCard";
import styled from "styled-components";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { NEW_REVIEW_RESET, NEW_LIKE_RESET } from "../constants/ImageConstant";
import { IoMdDownload } from "react-icons/io";
import Heart from "react-animated-heart";

const DetailsImage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);
  const [comment, setComments] = useState([]);
  const [isClick, setClick] = useState(false); //perform liked button
  const [buttonClicked, setButtonClicked] = useState(false); //perform cliked disabled button

  // const [userid, setuserid] = useState()
  // let [username, setusername] = useState()
  // const [comment, setComments] = useState({ user: '', content: '' });

  const { image, loading, error } = useSelector((state) => state.imageDetails);
  const { succes, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const toggleComments = () => {
    if (isAuthenticated) {
      setShowComments(!showComments);
    } else {
      toast.success("pls login to acces this resource");
    }
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("comment", comment);
    myForm.set("imageId", id);

    dispatch(addREview(myForm));

    setShowComments(!showComments);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (succes) {
      toast.success(" Added succesfully");
      dispatch({ type: NEW_REVIEW_RESET });
      dispatch({ type: NEW_LIKE_RESET });
    }

    dispatch(getImageDetails(id));
  }, [dispatch, id, succes]);

  if (!image) {
    return <div>Loading...Image Cannot Fetch </div>;
  }

  const handleImageDownload = () => {
    const currentURL = window.location.href;

    // For simplicity, let's assume you have a hardcoded image URL
    const imageUrl = String(currentURL);

    // Create a hidden anchor element
    const anchor = document.createElement("a");
    anchor.style.display = "none";

    // Set the anchor's href attribute to the image URL
    anchor.href = imageUrl;

    // Set the download attribute to specify the filename
    anchor.download = "image.jpg";

    // Append the anchor to the document
    document.body.appendChild(anchor);

    // Trigger a click event on the anchor to initiate the download
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };

  const performedLike = () => {
    if (!buttonClicked) {
      if (isAuthenticated) {
        const myForm = new FormData();
        const like = 1;
        myForm.set("likes", like);
        myForm.set("imageId", id);

        dispatch(NewLike(myForm));

        setClick(!isClick);
      }

      if (!isAuthenticated) {
        toast.info(" Pls Login to access This");
      }

      setButtonClicked(true);
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <Container className="container">
          <div className="grid">
            <div className="image-screen">
              {image.images &&
                image.images.map((item, i) => <img key={i} src={item.url} />)}
            </div>

            <div className="App">
              <Heart
                isClick={isClick}
                onClick={() => performedLike()}
                disabled={buttonClicked}
              />
              <p id="length">
                Likes:<span>{image.userLikes.length} </span>
              </p>
            </div>

            {/* dwld button */}
            <div className="product-data">
              <div className="my-btn">
                <Button onClick={handleImageDownload}>
                  <IoMdDownload /> Download a image{" "}
                </Button>
              </div>
              <h2>{image.name}</h2>
              {/* <Stars stars={stars}  reviews={reviews}/> */}
              <p>
                num of Reviews: <span>{image.numOfReviews} </span>
              </p>
              <p className="product-data-price">
                user Name:
                {/* <span>{image.userCreate[0].user_create_name}</span> */}
              </p>
              <p className="product-data-price">
                {/* user Email:<span>{image.userCreate[0].user_create_email}</span> */}
              </p>
            
              <p className="product-data-price">
                user createTime:
                <span className="myspan">{image.createdAt.slice(0, 10)}</span>
              </p>
              <p className="product-data-price ">
                description:{" "}
                <span className="product-data-real-price">
                  {image.description}
                </span>
              </p>
            </div>

            <button onClick={toggleComments} className="submitReview ">
              {showComments ? "Hide Comments" : "sumbit Review"}
            </button>

            {/* Review submit section............................... */}
            {showComments && (
              <div>
                {/* <ul>
            {comment.map((comment, index) => (
              <li key={index}>
                <strong>{comment.user}:</strong> {comment.content}
              </li>
            ))}
          </ul> */}
                <div className="review-card">
                  <textarea
                    placeholder="Add a comment..."
                    name="content"
                    value={comment}
                    onChange={(e) => setComments(e.target.value)}
                  />

                  <Button onClick={reviewSubmitHandler}>Add Comment</Button>
                </div>
              </div>
            )}

            <h2>Images Reviews..</h2>
            {image.reviews && image.reviews[0] ? (
              <div className="reviews">
                {image.reviews &&
                  image.reviews.map((reviews) => (
                    <ReviewCard key={reviews._id} reviews={reviews} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .submitReview {
    height: 6.8vh;
    border: none;
    background-color: tomato;
    font: 500 1.8vmax "Roboto";
    border-radius: 12px;
    padding: 0.6vmax 2vmax;
    margin: 1vmax 0;
    color: white;
    cursor: pointer;
    transition: all 0.5s;
    outline: none;
  }

  .submitReview:hover {
    background-color: rgb(197, 68, 45);
    transform: scale(1.1);
  }
  #length {
    margin-top: -37px;
    margin-left: 7px;
  }

  #length,
  p {
    color: #c44f4f;
    font-size: 25px;
  }

  .App {
    margin-bottom: -83px;
  }

  .my-btn {
    margin-top: -28px;
    margin-left: 111vh;
  }

  span {
    padding-left: 16px;
    font-family: emoji;
    color: white;
    font-size: 22px;
  }
  h2 {
    align-items: center;
  }
  .container {
    padding: 9rem 0;
  }
  .image-screen {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  .image-screen,
  img {
    width: 100%;
    height: 100%;
  }
  .product_images {
    display: flex;
    align-items: center;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
      color: #83c459;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .reviews {
    display: flex;
    overflow: auto;
  }
  .review-card {
    margin-top: -17px;
    display: flex;
    justify-content: center;
  }
  textarea {
    width: 100vh;
    height: 10vh;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
  }

  .noReviews {
    font: 400 1.3vmax "Gill Sans";
    text-align: center;
    color: whitesmoke;
    text-shadow: rgb(250 116 142) 0px 0px 10px, rgb(243, 243, 247) 0px 0px 20px,
      rgb(216, 113, 42) 0px 0px 30px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .image-screen {
      margin-left: 1px;
      width: 40%;
      height: 100%;
    }

    .App {
      padding-left: 17px;
    }
    .product-data {
      padding-left: 17px;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }

    .review-card {
      width: 392px;
      margin-right: 300px;
    }
    .submitReview {
      height: 43px;
      font-size: 24px;
      width: 50vmax;
    }

    .reviews {
      display: grid;
      overflow: auto;
    }
  }
`;
export default DetailsImage;
