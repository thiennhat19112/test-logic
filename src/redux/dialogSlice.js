import { createSlice } from "@reduxjs/toolkit";

 const digLogSlice = createSlice({
    name : "digLog",
    initialState : {
        open : false,
        viewByCat : false
    },
    reducers : {
        openDiaLog : (state)=>{
            state.open = true
        },
        closeDiaLog : (state) =>{
            state.open = false
        },
        openDiaLogViewByCat : (state)=>{
            state.viewByCat = true
        },
        closeDiaLogViewByCat : (state)=>{
            state.viewByCat = false
        },
    }
})

export const {openDiaLog,closeDiaLog,openDiaLogViewByCat,closeDiaLogViewByCat} = digLogSlice.actions
export const digLogReducer = digLogSlice.reducer
export default digLogSlice;