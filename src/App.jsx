import Table from "./components/Table";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCompanys } from "./redux/companySlice";
import { BrowserRouter, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useRef } from "react";

function App() {
  let isMouted = useRef(false)
  const dispatch = useDispatch();
  useEffect(() => {
    // isMouted.current = true;
    // if(isMouted.current){
      
    // }
    // return ()=>{
    //   isMouted.current = false
    // }
    dispatch(getCompanys()); 
  }, []);

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Form />}></Route>
          <Route path="/edit/:name" element={<Form type={"edit"}/>}></Route> */}
          </Routes>
          <SnackbarProvider maxSnack={3}>
            <Table />
          </SnackbarProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
