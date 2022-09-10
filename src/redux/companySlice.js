import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const companySlice = createSlice({
  name: "company",
  initialState: { status: "idle", companys: [] },
  reducers: {
    addCompany: (state, action) => {
      console.log(1);
      const id = Math.random().toString(16).substr(2, 8);
      const Created = new Date()
      const newCompany = {...action.payload, Oid : id,Created : Created}
      state.companys.unshift(newCompany);
    },

    editCompany: (state, action) => {
      console.log(action.payload.company);
      const index = state.companys.findIndex(
        (item) => item.Oid === action.payload.param
      );
      state.companys.splice(index, 1, action.payload.company);
    },

    deleteCompany: (state, action) => {
      const Oids = [];
      action.payload.map(element =>{
        return Oids.push(element.Oid)
      })
      state.companys = state.companys.filter(
        (c) => !Oids.includes(c.Oid)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanys.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCompanys.fulfilled, (state, action) => {
        state.companys = action.payload;
        state.status = "idle";
      })
      .addCase(reloadCompany.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(reloadCompany.fulfilled, (state, action) => {
        state.companys = action.payload;
        state.status = "idle";
      });
  },
});

export const getCompanys = createAsyncThunk(
  "company/reloadCompanys",
  async () => {
    const URL =
      "https://nguoidung-react-api.azurewebsites.net/api/v1/Department/";
    const TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InN1cHBvcnRAcHNjdGVsZWNvbS5jb20udm4iLCJVc2VyTmFtZSI6ImFkbWluIiwiVXNlcklkIjoiIiwiVW5pdElkIjoiIiwiRGVwYXJ0bWVudElkIjoiIiwiQ2xpZW50cyI6IiIsIlJvbGVOYW1lcyI6IiIsIkdyb3VwTmFtZXMiOiIiLCJBdXRob3JpemVyX0lkcyI6IiIsIkF1dGhvcml6ZXJfVW5pdElkcyI6IiIsIkF1dGhvcml6ZXJfRGVwYXJ0bWVudElkcyI6IiIsImp0aSI6ImY2YjQ4OTIyLTFlNDMtNGRlZC1iNzE5LTc4MjFhMjQ1MGUyMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE2NjE3NDg0NTAsImV4cCI6MTY2NTM0ODQ1MCwiaXNzIjoicHNjdGVsZWNvbS5jb20udm4iLCJhdWQiOiJTZXJ2aWNlQ2xpZW50In0.msvvRxT_XkNJ_xvj9Ev9-gay6hIL2XSW8pJo6ls-5uI";
    const API_KEY = "R/yYUbEgGxv/aH/LKGzeSw==";
    const OPTION = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        ApiKey: API_KEY,
      },
    };
    const res = await axios.get(URL, OPTION);
    const data = await res.data;
    return data;
  }
);

export const reloadCompany = createAsyncThunk(
  "company/getCompanys",
  async (_, { getState }) => {
    const URL =
      "https://nguoidung-react-api.azurewebsites.net/api/v1/Department/";
    const TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InN1cHBvcnRAcHNjdGVsZWNvbS5jb20udm4iLCJVc2VyTmFtZSI6ImFkbWluIiwiVXNlcklkIjoiIiwiVW5pdElkIjoiIiwiRGVwYXJ0bWVudElkIjoiIiwiQ2xpZW50cyI6IiIsIlJvbGVOYW1lcyI6IiIsIkdyb3VwTmFtZXMiOiIiLCJBdXRob3JpemVyX0lkcyI6IiIsIkF1dGhvcml6ZXJfVW5pdElkcyI6IiIsIkF1dGhvcml6ZXJfRGVwYXJ0bWVudElkcyI6IiIsImp0aSI6ImY2YjQ4OTIyLTFlNDMtNGRlZC1iNzE5LTc4MjFhMjQ1MGUyMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE2NjE3NDg0NTAsImV4cCI6MTY2NTM0ODQ1MCwiaXNzIjoicHNjdGVsZWNvbS5jb20udm4iLCJhdWQiOiJTZXJ2aWNlQ2xpZW50In0.msvvRxT_XkNJ_xvj9Ev9-gay6hIL2XSW8pJo6ls-5uI";
    const API_KEY = "R/yYUbEgGxv/aH/LKGzeSw==";
    const OPTION = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        ApiKey: API_KEY,
      },
    };
    const res = await axios.get(URL, OPTION);
    const data = await res.data;
    const { companys } = getState().companys;
    const temp = [...data, ...companys];
    const uniqueIds = [];
    const result = temp.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.Oid);
      if (!isDuplicate) {
        uniqueIds.push(element.Oid);
        return true;
      }
      return false;
    });
    return result.sort((prev,current) =>{ return current.Created > prev.Created ? 1 : -1 });
  }
);

export const { addCompany, editCompany, deleteCompany } = companySlice.actions;
export const companyReducer = companySlice.reducer;
export default companySlice;
