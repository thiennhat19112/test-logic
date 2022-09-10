import { configureStore } from "@reduxjs/toolkit";
import { companyReducer } from "./companySlice";
const store = configureStore({
    reducer : {
        companys : companyReducer
    }
})

export default store;