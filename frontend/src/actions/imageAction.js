import axios from "axios";
import {
  ALL_IMAGES_REUEST,
  ALL_IMAGES_SUCESS,
  ALL_IMAGES_FAIL,
  CLEAR_ERRORS,
  ALL_IMAGES_DETAILS_REUEST,
  ALL_IMAGES_DETAILS_SUCESS,
  ALL_IMAGES_DETAIL_FAIL,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  ADMIN_IMAGE_FAIL,
  ADMIN_IMAGE_REQUEST,
  ADMIN_IMAGE_SUCCESS,
  ADMIN_DELETE_IMAGE_FAIL,
  ADMIN_DELETE_IMAGE_REQUEST,
  ADMIN_DELETE_IMAGE_SUCCESS,
  NEW_LIKE_SUCCESS,
  NEW_LIKE_FAIL,
  NEW_LIKE_REQUEST
} from "../constants/ImageConstant";


// const backapi = "https://online-image-uploader-clone.vercel.app/";

export const getImage =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_IMAGES_REUEST,
      });

      const { data } = await axios.get(
        `https://online-image-uploader-clone.vercel.app/api/v1/images?keyword=${keyword}`
      );

      dispatch({
        type: ALL_IMAGES_SUCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_IMAGES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get all image
const token = JSON.parse(localStorage.getItem("userDataa"));

export const getImageDetails = (id) => async(dispatch) => {


  try {
    dispatch({
      type: ALL_IMAGES_DETAILS_REUEST,
    });

    // const config = {
    //   headers: {
    //     authorization: `${token}`
    //   },
    // };

    const { data } = await axios.get(
      `https://online-image-uploader-clone.vercel.app/api/v1/image/${id}`
    );

    
    dispatch({
      type: ALL_IMAGES_DETAILS_SUCESS,
      payload: data.imagess,
    });
  } catch (error) {
    dispatch({
      type: ALL_IMAGES_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};



export const createImages = (productData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });

    const config = {
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data"
      },
    };
    
    const { data } = await axios.post(`https://online-image-uploader-clone.vercel.app/api/v1/image/new`,productData,config);
   
    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const addREview =(reviewData)=>async(dispatch)=>{

  try {
    dispatch({
      type:NEW_REVIEW_REQUEST,
    })

  
      const config = {
      headers: {
        authorization: `${token}`,
        "Content-Type": "application/json"
      },
    };

    const {data} = await axios.put('https://online-image-uploader-clone.vercel.app/api/v1/review',reviewData,config)
    
    dispatch({
      type:NEW_REVIEW_SUCCESS,
      payload:data.success
    })
  } catch (error) {
    dispatch({
      type:NEW_REVIEW_FAIL,
      payload:error.response.data.message
    })
  }

}

export const NewLike =(likeData)=>async(dispatch)=>{

  try {
    dispatch({
      type:NEW_LIKE_REQUEST,
    })

    const { config } = {
      headers: { "Content-Type": "application/json" }
    };

    const {data} = await axios.put('https://online-image-uploader-clone.vercel.app/api/v1/user/like',likeData,config)
    
    dispatch({
      type:NEW_LIKE_SUCCESS,
      payload:data.success
    })
  } catch (error) {
    dispatch({
      type:NEW_LIKE_FAIL,
      payload:error.response.data.message
    })
  }

}


export const getALLAdminImages = ()=>async(dispatch)=>{
  try {
    dispatch({
      type:ADMIN_IMAGE_REQUEST,
    });
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };

    const {data} = await axios.get('https://online-image-uploader-clone.vercel.app/api/v1/admin/images',config);

    dispatch({
      type:ADMIN_IMAGE_SUCCESS,
      payload:data.imagesAdmin
    })
  } catch (error) {
    dispatch({
      type:ADMIN_IMAGE_FAIL,
      payload:error.response.data.message
    })
    
  }

}


export const admindelte = (id)=> async(dispatch)=>{

  try {
    dispatch({
      type:ADMIN_DELETE_IMAGE_REQUEST
    })

    const {data} = await axios.delete(`https://online-image-uploader-clone.vercel.app/api/v1/image/${id}`);

    dispatch({
      type:ADMIN_DELETE_IMAGE_SUCCESS,
      data:data.succes
    })
  } catch (error) {
    dispatch({
      type:ADMIN_DELETE_IMAGE_FAIL,
      payload:error.response.data.message
    })
  }


}





//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
