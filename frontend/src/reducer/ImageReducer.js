import {
  ALL_IMAGES_REUEST,
  ALL_IMAGES_SUCESS,
  ALL_IMAGES_FAIL,
  CLEAR_ERRORS,
  ALL_IMAGES_DETAILS_REUEST,
  ALL_IMAGES_DETAILS_SUCESS,
  ALL_IMAGES_DETAIL_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  NEW_PRODUCT_RESET,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ADMIN_IMAGE_REQUEST,
  ADMIN_IMAGE_FAIL,
  ADMIN_IMAGE_SUCCESS,
  ADMIN_DELETE_IMAGE_REQUEST,
  ADMIN_DELETE_IMAGE_SUCCESS,
  ADMIN_DELETE_IMAGE_FAIL,
  NEW_LIKE_REQUEST,
  NEW_LIKE_SUCCESS,
  NEW_LIKE_FAIL,
  NEW_LIKE_RESET
} from "../constants/ImageConstant";

export const imageReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case ALL_IMAGES_REUEST:
      case ADMIN_IMAGE_REQUEST:
      return {
        loading: true,
        image: [],
      };

    case ALL_IMAGES_SUCESS:
      return {
        loading: false,
        image: action.payload.images,
        imageCount: action.payload.imageCount,
      };

      case ADMIN_IMAGE_SUCCESS:
        return{
          succes:true,
          images:action.payload

        }

    case ALL_IMAGES_FAIL:
      case ADMIN_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state
        
  }
};



export const imageDetailReducer = (state = { imagess: {} }, action) => {
    switch (action.type) {
      case ALL_IMAGES_DETAILS_REUEST:
        return {
          loading: true,
         ...state
        };
  
      case ALL_IMAGES_DETAILS_SUCESS:
        return {
          loading: false,
          image: action.payload,
         
        };
  
      case ALL_IMAGES_DETAIL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
       return state
    }
  };
  

  export const newImageReducer = (state = { image: {} }, action) => {
    switch (action.type) {
      case  UPLOAD_IMAGE_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case  UPLOAD_IMAGE_SUCCESS:
        return {
          loading: false,
          succes: action.payload.succes,
          product: action.payload.image,
        };
      case  UPLOAD_IMAGE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        
      case  NEW_PRODUCT_RESET:
        return {
          ...state,
          succes: false,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

export const newReviewReducer = (state = {},action)=>{

  switch(action.type){
    case NEW_REVIEW_REQUEST:
      case NEW_LIKE_REQUEST:
      return{
        loading:true,
        ...state
      }

    case NEW_LIKE_SUCCESS:
      return{
        loading:false,
        succes:true,
        
      }

    case NEW_REVIEW_SUCCESS:
      return{
        loading:false,
        succes:action.payload
      }

    case NEW_REVIEW_FAIL:
      case NEW_LIKE_FAIL:
      return{
        loading:false,
        error:action.payload,
        ...state
      }

    case NEW_REVIEW_RESET:
      case NEW_LIKE_RESET:
      return{
        ...state,
        succes:false,
        loading:false
      }

    default:
      return state

    }
  }


export const AdminDelete = (state={},action)=>{
  switch (action.type) {
    case ADMIN_DELETE_IMAGE_REQUEST:
      return{
        ...state,
        loading: true,
      }

    case ADMIN_DELETE_IMAGE_SUCCESS:
      return{
        loading:false,
        ...state,
        isDeleted:action.payload,
      }

    case ADMIN_DELETE_IMAGE_FAIL:
      return{
        loading:false,
        ...state,
        isDeleted:false
      }      
    
    case CLEAR_ERRORS:
      return{
        ...state,
        error:null
      }
  
    default:
      return state
  }

}

