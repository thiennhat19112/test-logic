
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCompany, editCompany } from "../redux/companySlice";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { useSnackbar } from "notistack";
import { closeDigLog } from "../redux/dialogSlice";
import { styled } from "@mui/system";
import { initCompanyValue } from "../innitValue";
import { useRef } from "react";
import { useForm } from "react-hook-form";
const InputContainer = styled("div")`
  display: flex;
  gap: 1rem;
`;

const Form = () => {
  const [company, setCompany] = useState(initCompanyValue);
  const [checkedAgree, setCheckedAgree] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigative = useNavigate();
  const type = location.pathname.split("/")[1];
  const param = location.pathname.split("/")[2];
  const { enqueueSnackbar } = useSnackbar();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue ,
    formState: { errors }
  } = useForm();


  const onSubmit = (data) => {
    const variant = "success"
    if(!checkedAgree) return setAgreeError(true);
   if(type === "edit"){
    console.log(data);
    dispatch(editCompany({...location.state,data}));
    navigative("/");
    dispatch(closeDigLog())
    enqueueSnackbar('Sửa thành công!', { variant });
   }else{
    console.log(data);
    dispatch(addCompany(data))
    dispatch(closeDigLog())
    enqueueSnackbar('Thêm thành công!', { variant });
   }
   setCompany(initCompanyValue)
  };

  const handleReset = (e) => {
    setCompany(initCompanyValue);

    setCheckedAgree(false);
    setAgreeError(false);
  };

  const handleChangAgree = (e) => {
    setCheckedAgree(!checkedAgree);
    setAgreeError(checkedAgree);
  };

  useEffect(() => {
    if (type === "edit") {
      const company = location.state;
      setValue({
        "Name": company.Name || "",
        "Idc": company.Idc || "",
      });
    }
  }, [param]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <InputContainer className="form-outline my-2" spacing={3}>
        <TextField
          error= {errors.Name}
          {...register("Name",{ required: true })}
          label="Name"
          variant="outlined"
          fullWidth
        />
        <TextField
        error= {errors.Idc}
          {...register("Idc",{ required: true })}
          label="Idc"
          variant="outlined"
          fullWidth
        />
      </InputContainer>
      <div className="form-outline mb-4">
        <select {...register("Type",{ required: true })} label="Type">
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
      <div className="form-outline">
        <FormControlLabel
          control={
            <Switch
              checked={checkedAgree}
              onChange={handleChangAgree}
              inputProps={{ "aria-label": "controlled" }}
              name="Agree"
            />
          }
          label={"Đồng ý"}
        />
        {agreeError && <span style={{ color: "red" }}>Ban chua dong y</span>}
      </div>
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
