import { useEffect, useRef, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { addCompany, editCompany } from "../redux/companySlice";
import { useLocation, useNavigate } from "react-router-dom";
const Form = ({ type }) => {
  const [company, setCompany] = useState({});
  const checkbox = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigative = useNavigate();
  const param = location.pathname.split("/")[2];

  useEffect(() => {
    if (type === "edit") {
      const { Name, Address, Type,Oid, Created } = location.state;
      setCompany({
        Name: Name || "",
        Address: Address || "",
        Type: Type || "",
        Oid : Oid,
        Created: Created
      });
    }
  }, [param]);

  const handleChange = (e) => {
    if(type === "edit"){
      setCompany((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }else{
      setCompany((prev) => {
        return { ...prev, [e.target.name]: e.target.value};
      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const ischecked = checkbox.current.checked;
    if (!ischecked) return window.alert("Bạn chưa đồng ý!");
    dispatch(addCompany(company));
    setCompany({
      Name: "",
      Address:"",
      Type: "",
      Oid :""
    });
    checkbox.current.checked = false;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const ischecked = checkbox.current.checked;
    if (!ischecked) return window.alert("Bạn chưa đồng ý!");
    dispatch(editCompany({ company, param }));
    window.alert("sửa thành công");
    setCompany({
      Name: "",
      Address:"",
      Type: "",
      Oid :"",
    });
    checkbox.current.checked = false;
    navigative("/");
  };

  const handleReset = (e) => {
    setCompany({
      Name: "",
      Address: "",
      Type: "",
    });
    checkbox.current.checked = false;
  };

  return (
    <form className="form">
      <div className="form-outline mb-4">
        <div className="form-outline">
          <MDBInput
            onChange={handleChange}
            name="Name"
            label="Name"
            id="form1"
            type="text"
            value={company?.Name}
          />
        </div>
      </div>
      <div className="form-outline mb-4">
        <MDBInput
          onChange={handleChange}
          name="Address"
          label="Address"
          id="form1"
          type="text"
          value={company?.Address}
        />
      </div>
      <div className="form-outline mb-4">
        <select onChange={handleChange} name="Type" label="Type">
          <option value="">Type</option>
          <option selected={company.Type === "donvi"} value="donvi">Đơn vị</option>
          <option selected={company.Type === "phongban"} value="phongban">Phòng ban</option>
          <option selected={company.Type === "nhom"} value="nhom">Nhóm</option>
        </select>
      </div>
      <input id="checkbox" type="checkbox" ref={checkbox} />
      <label htmlFor="checkbox">Đông ý</label>
      {type === "edit" ? (
        <button
          onClick={(e) => handleEdit(e)}
          type="submit"
          className="btn btn-primary btn-block mb-4"
        >
          Edit
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary btn-block mb-4"
        >
          Submit
        </button>
      )}
      <button
        onClick={handleReset}
        type="button"
        className="btn btn-primary btn-block mb-4"
      >
        Reset
      </button>
      
    </form>
  );
};

export default Form;
