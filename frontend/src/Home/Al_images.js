import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../styles/StyleButton";
import { clearErrors, getImage } from "../actions/imageAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../src/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import Search from "../components/search";
import { useParams } from "react-router-dom";


const Al_images = () => {
  const dispatch = useDispatch();
  const  { keyword } = useParams();

  const { loading, image, error} = useSelector(
    (state) => state.images
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getImage(keyword));
  }, [dispatch, error,keyword]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Wrapper className="section">
          <h2 className="common-heading">Our All  Collections</h2>
          <Search/>
          <div className="container grid grid-three-column">
            {image &&
              image.map((image) => (
                <div className="card">
                  <NavLink to={`/image/${image._id}`}>
                    <figure>
                      {/* <img src="" alt="first" /> */}
                      <img src={image.images[0].url} alt={image.name} />
                    </figure>
                    <div className="card-data">
                      <h3>{image.name}</h3>
                      {/* <p>wow this is a super image</p> */}

                      <Button className="btn">open</Button>
                    </div>
                  </NavLink>
                </div>
              ))}
            )
          </div>
        </Wrapper>
      )}
    </Fragment>
  );
};

const Wrapper = styled.section`
  .common-heading {
    text-align: center;
    color: #9e9e9e;
    text-decoration: underline;
  }
  padding: 9rem 0;
  /* background-color: ${({ theme }) => theme.colors.bg}; */

  .container {
    max-width: 120rem;
  }

  .card {
    border: 0.1rem solid rgb(170 170 170 / 40%);
    .card-data {
      padding: 0 2rem;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
      color: white;
    }
    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(98 84 243);
      font-size: 1.4rem;

      &:hover {
        background-color: rgb(98 84 243);
        color: #fff;
      }
    }
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .grid-three-column {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-two-column,
    .grid-three-column {
      grid-template-columns: 1fr;
    }

    .searchBox > input[type="submit"] {
      width: 22%;
    height: 43px;
    margin-top: 0px;
}
  }
`;

export default Al_images;
