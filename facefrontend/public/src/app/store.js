import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import authReducer from '../features/loginSlice'; 
export default configureStore(
    {
        reducer:{
            post: postReducer,
            auth : authReducer,
        },
    }
);