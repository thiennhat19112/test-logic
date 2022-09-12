import { createSlice } from "@reduxjs/toolkit";

 const digLogSlice = createSlice({
    name : "digLog",
    initialState : {
        open : false
    },
    reducers : {
        openDigLog : (state)=>{
            state.open = true
        },
        closeDigLog : (state) =>{
            state.open = false
        }
    }
})

export const {openDigLog,closeDigLog} = digLogSlice.actions
export const digLogReducer = digLogSlice.reducer
export default digLogSlice;