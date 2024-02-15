
import { LOGIN_FAIL,LOGIN_SUCESS,LOGIN_REQUEST, REGISTER_REQUEST, REGISTER_SUCESS ,REGISTER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCESS, LOAD_USER_FAIL, ADMIN_USER_REQUEST, ADMIN_USER_SUCESS, ADMIN_DELETE_USER_FAIL, ADMIN_DELETE_USER_SUCESS, CLEAR_ERRORS, ADMIN_USER_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_RESET} from "../constants/UserConstant";

export const userReducer = (state= { user:{} }, action )=>{

     switch (action.type) {
        case LOGIN_REQUEST:
          case REGISTER_REQUEST:
            case LOAD_USER_REQUEST:
              case ADMIN_USER_REQUEST:
            return {
                isAuthenticated:false,
                loading: true
            }

        case LOGIN_SUCESS:
          case REGISTER_SUCESS:
            case LOAD_USER_SUCESS:
            return {
              ...state,
                loading: false,
                isAuthenticated:true,
                user: action.payload
            }

        case ADMIN_USER_SUCESS:
          return{
            succes:true,
            users:action.payload
          }
        case LOGIN_FAIL:
          case REGISTER_FAIL:
            case ADMIN_USER_FAIL:
            return {
              ...state,
                loading: false,
                isAuthenticated:false,
                error: action.payload
            }

        case LOAD_USER_FAIL:
              return{
                  ...state,
                  loading:false,
                  isAuthenticated:false,
                  user:null,
                  error:action.payload
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


export const AdmindeleteUser = (state= { user:{} }, action)=>{
  switch (action) {

    case ADMIN_DELETE_USER_FAIL:
      return{
        ...state,
        loading:true
      }
      
    case ADMIN_DELETE_USER_SUCESS:
      return{
        isDeleted:action.payload,
        ...state,
        loading:false
      }

    case ADMIN_DELETE_USER_FAIL:
      return{
        isDeleted:false,
        ...state,
        loading:false
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


export const updatePasswordReducer = (state={}, action)=>{

  switch(action.type){
    case UPDATE_PASSWORD_REQUEST:
      return{
        ...state,
        loading:true,
      }

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isUpdated:true,
        isUpdated:action.payload
      }

    case UPDATE_PASSWORD_FAIL:
      return{
        loading:false,
        error:action.payload
      }

    case UPDATE_PASSWORD_RESET:
      return{
        isUpdated:false,
        ...state
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