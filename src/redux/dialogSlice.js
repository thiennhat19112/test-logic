import { createSlice } from "@reduxjs/toolkit";

 const digLogSlice = createSlice({
    name : "digLog",
    initialState : {
        open : false,
        viewByCat : false, 
        treeView : false, 
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
        openDiaLogTreeView : (state)=>{
            state.treeView = true
        },
        closeDiaLogTreeView : (state)=>{
            state.treeView = false
        },
    }
})

export const {openDiaLog,closeDiaLog,openDiaLogViewByCat,closeDiaLogViewByCat,openDiaLogTreeView,closeDiaLogTreeView} = digLogSlice.actions
export const digLogReducer = digLogSlice.reducer
export default digLogSlice;