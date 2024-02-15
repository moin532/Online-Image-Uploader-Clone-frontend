import {
  LOGIN_FAIL,
  LOGIN_SUCESS,
  LOGIN_REQUEST,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCESS,
  REGISTER_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCESS,
  ADMIN_USER_FAIL,
  ADMIN_USER_REQUEST,
  ADMIN_USER_SUCESS,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_SUCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
} from "../constants/UserConstant";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://online-image-uploader-clone.vercel.app/api/v1/login`,
      { email, password },
      config
    );

    console.log(data);

    dispatch({
      type: LOGIN_SUCESS,
      payload: data,
    });
    localStorage.setItem("userDataa", JSON.stringify( data.token));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://online-image-uploader-clone.vercel.app/api/v1/register",
      userData,
      config,
      { withCredentials: true, credentials: "include" }
    );

    dispatch({
      type: REGISTER_SUCESS,
      payload: data.user,
    });
   
    localStorage.setItem("userDataa", JSON.stringify(data.token));
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const LoadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    // let items = JSON.parse(localStorage.getItem("userDataa"));
 
    // let id = items._id;
    
    // if (!items) {
    //   return console.error("An error occurred:");
    // }

    // if (items === undefined) {
    //   localStorage.clear();
    //   return (items = []);
    // }
    const token = JSON.parse(localStorage.getItem("userDataa"));
    const config = {
      headers: {
            authorization: `${token}`
          },
    }

    const { data } = await axios.get(`https://online-image-uploader-clone.vercel.app/api/v1/me`,config); //apiiiiiiiiiiiiiiii
   
    dispatch({
      type: LOAD_USER_SUCESS,
      payload: data.user.userdata      ,
    });

  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const AdminUSer = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_USER_REQUEST,
    });

    const { data } = await axios.get(
      "https://online-image-uploader-clone.vercel.app/api/v1/admin/users"
    );

    dispatch({
      type: ADMIN_USER_SUCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const AdminDeleteUser = (id)=>async(dispatch)=>{
  try {
    dispatch({type:ADMIN_DELETE_USER_REQUEST});

    const {data} = await axios.delete(`https://online-image-uploader-clone.vercel.app/api/v1/admin/user/${id}`);

    dispatch({
      type:ADMIN_DELETE_USER_SUCESS,
      payload:data.succes
    })
    
  } catch (error) {
    dispatch({
      type:ADMIN_DELETE_USER_FAIL,
      payload:error.response.data.message
    })
    
  }
}


export const UpdatePassword = (userdata)=> async  (dispatch)=>{

  try {

    dispatch({
      type:UPDATE_PASSWORD_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

  

    const {data} = await axios.put('https://online-image-uploader-clone.vercel.app/api/v1/password/update',userdata,config)

    dispatch({
      type:UPDATE_PASSWORD_SUCCESS,
      payload: data.user
    })
    
  } catch (error) {
    dispatch({
      type:UPDATE_PASSWORD_FAIL,
      payload:error.response.data.message
    })
    
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
