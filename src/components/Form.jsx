import { useEffect, useRef, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { addCompany, editCompany } from "../redux/companySlice";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
const Form = () => {
  const [company, setCompany] = useState({
    Name: "",
  });
  const [checkedAgree, setCheckedAgree] = useState(false);
  const [errorElements, setErrorElement] = useState({
    Name: false,
  });


  console.log(errorElements.Agree);
  const checkbox = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigative = useNavigate();
  const type = location.pathname.split("/")[1];
  const param = location.pathname.split("/")[2];

  useEffect(() => {
    if (type === "edit") {
      const { Name, Address, Type, Oid, Created } = location.state;
      setCompany({
        Name: Name || "",
        Address: Address || "",
        Type: Type || "",
        Oid: Oid,
        Created: Created,
      });
    }
  }, [param]);

  const validate = () => {
    if (!company.Name.trim()) {
      setErrorElement((prev) => {
        return { ...prev, Name: true };
      });
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    if (type === "edit") {
      setCompany((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    } else {
      setCompany((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }

    setErrorElement((prev) => {
      return { ...prev, [e.target.name]: false };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    const isFormInValid = validate();
    if (!isFormInValid) {
      if (type === "edit") {
        dispatch(editCompany({ company, param }));
        navigative("/");
      } else {
        dispatch(addCompany(company));
      }

      setCompany({
        Name: "",
        Address: "",
        Type: "",
        Oid: "",
      });
      checkbox.current.checked = false;
    }
  };

  const handleReset = (e) => {
    setCompany({
      Name: "",
      Address: "",
      Type: "",
    });
    setErrorElement({
      Name: false,
    });
    checkbox.current.checked = false;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <div className="form-outline">
          <TextField
            error={errorElements.Name}
            name="Name"
            onChange={handleChange}
            value={company?.Name}
            label="Name"
            variant="outlined"
            defaultValue={type === "edit" ? company?.Name : ""}
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
          <option selected={company.Type === "donvi"} value="donvi">
            Đơn vị
          </option>
          <option selected={company.Type === "phongban"} value="phongban">
            Phòng ban
          </option>
          <option selected={company.Type === "nhom"} value="nhom">
            Nhóm
          </option>
        </select>
      </div>
      <FormControlLabel
        control={
          <Switch
            checked={checkedAgree}
            onChange={() => setCheckedAgree(!checkedAgree)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={"Đồng ý"}
      />
      {type === "edit" ? (
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Edit
        </button>
      ) : (
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Submit
        </button>
      )}
      <button
        onClick={handleReset}
        type="reset"
        className="btn btn-primary btn-block mb-4"
      >
        Reset
      </button>
    </form>
  );
};

export default Form;
