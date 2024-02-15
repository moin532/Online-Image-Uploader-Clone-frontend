import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdReviews } from "react-icons/md";

const Slidebar = () => {
  return (
    <Wrapper>
       
      <div className="image-ads">
        <img src="/images/ads1.jpg" alt="" />
      
       <hr></hr>
      </div>
      <div className="slidebar-main">
        
        <ul>
          <li>
            <NavLink to="/admin/dashboard" className="navbar-link ">
          <MdDashboard />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="navbar-link ">
            <PiUsersThreeFill />
              users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/images" className="navbar-link ">
              <MdReviews />
              Images
            </NavLink>
          </li>{" "}
         
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`

  .slidebar-main {
    color: white;
    height: 100vh;
    width: 35vh;
    display: flex;
    border-right: 2px solid white;
    margin-top: 0px;
   
  }

  .image-ads,
  img {
    width: 35vh;
    height: 30vh;
    margin-top: -5vh;

    animation: shake 8s ease-in-out infinite; /* Adjust the duration as needed */
    display: block;
  }
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0px);
    }
    25%,
    75% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(190px);
    }
  }

  .navbar-link {
    color: white;
    padding: 90px 0px 0px 44px;
    font-size: 32px;
    text-align: center;
    list-style: none;
    display: flex;
    padding-left: 45px;
   
  }

  .slidebar-main,
  li :hover {
    color: yellow;
  }

  @media screen and (max-width: 600px) {
    .image-ads,img{
      width:100%;
    }

    .slidebar-main {
      width:100%;
      margin: -51px 0px 0px 46px;

}

  }
`;
export default Slidebar;
