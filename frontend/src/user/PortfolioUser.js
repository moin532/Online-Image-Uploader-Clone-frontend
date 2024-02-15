import React, { Fragment,useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PortfolioUser = ({user}) => {

  return (
    <Wrapper>
    <Fragment>
      {/* {loading ? (
        "loading"
      ) : ( */}
        <Fragment>
          {/* <MetadaData title={`${user.name}'s Profile`} /> */}
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>

            {/* <img src={user.avatar ? user.avatar.url:"/images/Profile.png"}  alt={user.name}/> */}
            {/* condition ? expressionIfTrue : expressionIfFalse; */}
          

              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name:</h4>
                <p>{user.name}</p>
                
              </div>
              <div>
                <h4>Email:</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On:</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/upload">Upload Now</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      {/* )} */}
    </Fragment>
  </Wrapper>
  )
}


const Wrapper = styled.section`
.profileContainer {
  display: flex;
  height: 100vh;
  width: 100vw;

  top: 0%;
  left: 0%;
  max-width: 100%;
 
}

.profileContainer > div {
  display: flex;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profileContainer > div:first-child > h1 {
  color: white;
  font: 500 2.2vmax "Roboto";
  transform: translateX(-10vmax) translateY(-2vmax);
}

.profileContainer > div:first-child > img {
  width: 20vmax;
  border-radius: 100%;
  transition: all 0.5s;
}

.profileContainer > div:first-child > img:hover {
  transform: scale(1.05);
}

.profileContainer > div:first-child > a {
  border: none;
  background-color: tomato;
  font: 400 1vmax "Roboto";
  color: white;
  text-decoration: none;
  padding: 0.5vmax;
  width: 30%;
  margin: 4vmax;
  text-align: center;
  transition: all 0.5s;
}

.profileContainer > div:first-child > a:hover {
  background-color: rgb(204, 78, 56);
}

.profileContainer > div:last-child {
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 5vmax;
  box-sizing: border-box;
}

.profileContainer > div:last-child > div > h4 {
  color: white;
  font: 400 1.2vmax "Roboto";
}

.profileContainer > div:last-child > div > p {
  color: white;
  font: 400 1vmax ;
  margin: 0.2vmax;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.profileContainer > div:last-child > div:last-child {
  display: flex;
  flex-direction: column;
  width: 60%;
}

.profileContainer > div:last-child > div:last-child > a {
  border: none;
  background-color: tomato;
  font: 400 1vmax "Roboto";
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: white;
  text-decoration: none;
  padding: 0.5vmax;
  text-align: center;
  transition: all 0.5s;
  margin: 1vmax 0;
}

.profileContainer > div:last-child > div:last-child > a:hover {
  background-color: rgb(31, 31, 31);
}

@media screen and (max-width: 600px) {
  .profileContainer {
    flex-direction: column;
  }

  .profileContainer > div:first-child > h1 {
    font: 500 3.2vmax "Roboto";
    transform: translateY(-2vmax);
  }

  .profileContainer > div:first-child > a {
    font: 400 1.7vmax "Roboto";
    padding: 1vmax;
  }

  .profileContainer > div:last-child {
    text-align: center;
    margin-top: -173px;
    align-items: center;
  }

  .profileContainer > div:last-child > div > h4 {
    font: 400 2.5vmax "Roboto";
  }

  .profileContainer > div:last-child > div > p {
    font: 400 2vmax;
    margin: 0.5vmax 0;
    font-size:28px;
  }

  .profileContainer > div:last-child > div:last-child > a {
    font: 400 1.8vmax "Roboto";
    padding: 1vmax;
    margin: 2vmax 0;
  
  }
}
`;

export default PortfolioUser
