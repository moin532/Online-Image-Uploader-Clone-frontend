import React,{useEffect} from 'react';
import { ThemeProvider } from "styled-components";
import Header from './Header';
import {Route,Routes, BrowserRouter as Router, Outlet, useNavigate} from 'react-router-dom';
import Footer from './components/Footer';
import { GlobalStyle } from './styles/GlobalStyle';
import Homee from './Home/Homee';
import { ToastContainer} from 'react-toastify';
import Al_images from './Home/Al_images';
import LoginSignup from './user/LoginSignup';
import {useSelector,useDispatch} from "react-redux";
import PortfolioUser from './user/PortfolioUser';
import { LoadUser } from './actions/UserAction';
import UserOption from './user/UserOption';
import UploadImage from './user/UploadImage';
import DetailsImage from './Home/DetailsImage';
import Dashboard from './admin/Dashboard';
import AdminImageList from './admin/AdminImageList';
import AdminUser from './admin/AdminUser';
import ProtectedRoute from './admin/ProtectedRoute'
import ErrorPage from './errorCatch/ErrorPage';
import PasswordUpdate from './user/PasswordUpdate';
import About from './components/About';
import Contact from './components/Contact';
const App = () => {

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "#fff",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      footer_bg: "0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
      mycolor:"rgb(4 11 18)",
      neon:"#fff"
    },
    media: {
      mobile: "768px",  
      tab: "998px",
    },
  };


  const dispatch = useDispatch();
  const { isAuthenticated,user } = useSelector(
    (state) => state.user
  );


  useEffect(() => {
    if(localStorage.getItem('userDataa')){
      dispatch(LoadUser());
      
    }  
  }, [dispatch]);


  
  
  return (
   
     <>
     <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Router>
      <Header/>
    

      
      {/* <Homee/> */}
     {isAuthenticated && <UserOption user={user}/>}
      <Routes>
      <Route path="/" exact element={<Homee/>}></Route>
      <Route exact path="/image/:id" element={<DetailsImage/>} /> 
      <Route path="/images" exact element={<Al_images/>}></Route>
      <Route path="/images/:keyword"  element={<Al_images/>}></Route>
      <Route path="/login"  exact element={<LoginSignup />}></Route>
      <Route path="/account" exact element={ isAuthenticated &&<PortfolioUser user={user}/>}></Route>
      <Route path="/upload"  exact element={isAuthenticated && <UploadImage/>}></Route>

     {/* //admin route */}
      <Route path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard/>} />} />   
{/* 
       <Route path="/admin/images" element={<ProtectedRoute element={<AdminImageList/>} />} />   
      <Route   path="/admin/users" element={<ProtectedRoute element={<AdminUser/>} />}  />
           */}
      <Route path="/admin/images"   element={ <AdminImageList/>}></Route>
      <Route path="/admin/users"  element={ <AdminUser/>}></Route> 
      <Route path="/password/update"  exact element={<PasswordUpdate/>}></Route>


      <Route path="/about"  exact element={<About/>}></Route>
      <Route path="/contact"  exact element={<Contact/>}></Route>


  
      


    </Routes>
    <Footer/>
      </Router>
     </ThemeProvider>
    <ToastContainer position="bottom-right" theme="colored"/>
    </>
  )
}

export default App
