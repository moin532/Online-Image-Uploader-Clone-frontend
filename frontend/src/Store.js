import {legacy_createStore,combineReducers,applyMiddleware} from "redux";

import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {newImageReducer, imageDetailReducer, imageReducer ,newReviewReducer, AdminDelete} from "./reducer/ImageReducer";
import { userReducer ,AdmindeleteUser,updatePasswordReducer} from "./reducer/UserReducer";

const reducer = combineReducers({
    images:imageReducer,
    imageDetails:imageDetailReducer,
    user:userReducer,
    newaddImage:newImageReducer,
    newReview:newReviewReducer,
    deleteImage:AdminDelete,
    dltuser :AdmindeleteUser,
    updPassword :updatePasswordReducer


});

let initialState = {}

const middleware = [thunk];

const store = legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store