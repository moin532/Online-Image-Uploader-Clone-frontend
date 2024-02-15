import React,{Fragment,useRef,useState,useEffect} from 'react'
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { MdMarkEmailRead } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import {useDispatch,useSelector} from "react-redux"
import { login,clearErrors,register } from '../actions/UserAction';
import {  toast } from 'react-toastify';
import { useNavigate,useParams } from "react-router-dom"

const LoginSignup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {location} = useParams();

  const {loading,error,isAuthenticated} = useSelector((state) => state.user);


  let reloadCount = 0;
  //window reloading
  useEffect(() => {
    if(reloadCount > 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, [reloadCount]);


 const loginTab = useRef(null);               //!.........1
 const registerTab = useRef(null);
 const switcherTab = useRef(null);

 const [ loginEmail, setLoginEmail] = useState("");  //!.........3
 const [loginPassword, setLoginPassword] = useState("");

 const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
 const { name,email, password  } = user;

 
  const [avatar, setAvatar] = useState("/images/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/images/Profile.png");


 const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));

  };

 

  //making form when send data
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };
 
  
  
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value }); //pass the value myform
    }
  };

  const redirect = location ? location.split("=")[1] : "/account";
  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
  
    if (isAuthenticated) {
      navigate(redirect);
    }
  
  }, [dispatch,error,redirect,isAuthenticated,navigate]);
 


 const switchTabs = (e, tab) => {            //!..........2
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };





  return (
    <Wrapper>
       {
        loading ? (<Loader/>):
        (
          
          <Fragment>
            <div className="LoginSignUpContainer">
              <div className="LoginSignUpBox">
                <div>
                  <div className="login_signUp_toggle">
                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                  </div>
                  <button ref={switcherTab}></button>
                </div>
                <form
                  className="loginForm"
                  ref={loginTab}
                  onSubmit={loginSubmit}
                >
                  <div className="loginEmail">
                    <MdMarkEmailRead />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <FaUnlock />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <Link to="/password/forgot">Forget Password ?</Link>
                  <input type="submit" value="Login" className="loginBtn" />
                </form>


                <form
                  className="signUpForm"
                  ref={registerTab}
                  encType="multipart/form-data"  //?we upoad also photo
                  onSubmit={registerSubmit}
                >
                  <div className="signUpName">
                    <FaRegUser />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpEmail">
                  <MdMarkEmailRead />
                    <input
                      type="email"
                      placeholder="Enter a valid Email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpPassword">
                  <FaUnlock />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                    />
                  </div>

                  <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                    />
                  </div>
                  <input type="submit" value="Register" className="signUpBtn" />
                </form>
              </div>
            </div>
          </Fragment>
        )
       }
    </Wrapper>
  )
}

const Wrapper = styled.section`

.LoginSignUpContainer {
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);
  top: 0%;
  left: 0;
}

.LoginSignUpBox {
  background-color: white;
  width: 25vw;
  height: 70vh;
  box-sizing: border-box;
  overflow: hidden;
}
.login_signUp_toggle {
  display: flex;
  height: 3vmax;
}
.login_signUp_toggle > p {
  color: black;
  font: 300 1vmax ;
  transition: all 0.5s;
  cursor: pointer;
  display: grid;
  place-items: center;
  width: 100%;
}
.login_signUp_toggle > p:hover {
  color: tomato;
}

.LoginSignUpBox > div > button {
  background-color: tomato;
  height: 3px;
  width: 50%;
  border: none;
  transition: all 0.5s;
}

.loginForm,
.signUpForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 2vmax;
  justify-content: space-evenly;
  height: 70%;
  transition: all 0.5s;
}

.signUpForm {
  transform: translateY(-100%) translateX(-100vmax);
}

.loginForm > div,
.signUpForm > div {
  display: flex;
  width: 100%;
  align-items: center;
}
.loginForm > div > input,
.signUpForm > div > input {
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax ;
  outline: none;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.loginForm > div > svg,
.signUpForm > div > svg {
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}

.loginForm > a {
  color: black;
  text-decoration: none;
  align-self: flex-end;
  transition: all 0.5s;
  font: 500 0.8vmax ;
}

.loginForm > a:hover {
  color: blue;
}

#registerImage > img {
  width: 3vmax;
  border-radius: 100%;
}
#registerImage > input {
  display: flex;
  padding: 0%;
}

#registerImage > input::file-selector-button {
  cursor: pointer;
  width: 100%;
  z-index: 2;
  height: 5vh;
  border: none;
  margin: 0%;
  font: 400 0.8vmax;
  transition: all 0.5s;
  padding: 0 1vmax;
  color: black;
  background-color: rgb(255, 255, 255);
}

#registerImage > input::file-selector-button:hover {
  background-color: rgb(235, 235, 235);
}
.loginBtn,
.signUpBtn {
  border: none;
  width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 2.5px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
} 

.loginBtn:hover,
.signUpBtn:hover {
  background-color: rgb(179, 66, 46);
}

.shiftToLeft {
  transform: translateX(-100%);
}
.shiftToNeutral {
  transform: translateX(0%);
}

.shiftToNeutralForm {
  transform: translateX(0%) translateY(-100%);
}

.shiftToRight {
  transform: translateX(100%);
}

@media screen and (max-width: 600px) {
  .LoginSignUpContainer {
    background-color: white;
  }
  .LoginSignUpBox {
    width: 100vw;
    height: 95vh;
  }
  .login_signUp_toggle {
    height: 5vmax;
  }
  .login_signUp_toggle > p {
    font: 300 1.5vmax ;
  }

  .loginForm,
  .signUpForm {
    padding: 5vmax;
  }

  .loginForm > div > input,
  .signUpForm > div > input {
    padding: 2.5vmax 5vmax;
    font-size: 27px;
  }

  .loginForm > div > svg,
  .signUpForm > div > svg {
    font-size: 2.8vmax;
  }

  .loginForm > a {
    font-size: 22px;    
  }

  #registerImage > img {
    width: 8vmax;
    border-radius: 100%;
  }

  #registerImage > input::file-selector-button {
    height: 7vh;
    font: 400 1.8vmax ;
  }

  .loginBtn,
  .signUpBtn {
    font: 300 1.9vmax "Roboto";
    padding: 1.8vmax;
  }
}



`
export default LoginSignup
