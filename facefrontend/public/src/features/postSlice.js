import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name:"post",
    initialState:{
        value:[],
        isOpen: false,
        showCommentSection:false,
        showchatbotsection:false
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
          closeModal: (state) => {
            state.isOpen = false;
          },
          setShowCommentSection:(state)=>{
            state.showCommentSection = true;
          },
          setShowChatBotSection:(state)=>{
            state.showchatbotsection = true;}

    },


})
export const {addPost,addAllPost, openModal, closeModal,setShowCommentSection,setShowChatBotSection}= postSlice.actions;
export const selectPost=(state)=> state.post.value;

export default postSlice.reducer;