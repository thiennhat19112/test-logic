import Table from "./pages/Table";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCompanys } from "./redux/companySlice";
import { BrowserRouter, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useRef } from "react";
import ViewByCat from "./pages/ViewByCat";
import TreeView from "./pages/TreeView";

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
            <ViewByCat/>
            <TreeView />
          </SnackbarProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
