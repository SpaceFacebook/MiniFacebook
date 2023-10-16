import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name:"post",
    initialState:{
        value:[],
        isOpen: false,
        showCommentSection:false,
        showchatbotsection:false,
        showChatBot : false,
    },
    reducers:{
        addPost:(state,action)=>{
            state.value.unshift(action.payload);
        },
        addAllPost:(state,action)=>{
            state.value = action.payload;
        },
        openModal: (state) => {
            state.isOpen = true;
          },
          setshowChatBot:(state,action)=>{
            state.showChatBot=action.payload;
          },
          closeModal: (state, action) => {
            state.isOpen =action.payload;
          },
          setShowCommentSection:(state)=>{
            state.showCommentSection = true;
          },
          setShowChatBotSection:(state)=>{
            state.showchatbotsection = true;}

    },


})
export const {addPost,addAllPost, openModal, closeModal,setShowCommentSection,setShowChatBotSection,setshowChatBot}= postSlice.actions;
export const selectPost=(state)=> state.post.value;

export default postSlice.reducer;