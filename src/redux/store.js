import { configureStore } from "@reduxjs/toolkit";
import { companyReducer } from "./companySlice";
import { digLogReducer } from "./dialogSlice";
const store = configureStore({
    reducer : {
        companys : companyReducer,
        digLog : digLogReducer
    }
})

export default store;