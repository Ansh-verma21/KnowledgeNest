import {createSlice} from "@reduxjs/toolkit";
const initialState={//protecting route
    user:null,
    isAutenticated:false
}
const authSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        userLoggedIn:(state,action)=>{
            state.user=action.payload.user;
            state.isAutenticated =  true;
        },
        userLoggedOut:(state)=>{
            state.user=null;
            state.isAutenticated =false;
        }

    },
});

export const {userLoggedIn,userLoggedOut}=authSlice.actions;
export default authSlice.reducer;