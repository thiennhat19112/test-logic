import Form from "./components/Form";
import Table from "./components/Table";
import "./App.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCompanys } from "./redux/companySlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanys());
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Form />}></Route>
          <Route path="/edit/:name" element={<Form type={"edit"}/>}></Route> */}
        </Routes>
        <Table />
      </BrowserRouter>
    </div>
  );
}

export default App;
