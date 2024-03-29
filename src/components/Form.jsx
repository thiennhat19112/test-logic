import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany, editCompany } from "../redux/companySlice";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import {
  Autocomplete,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { closeDiaLog } from "../redux/dialogSlice";
import { styled } from "@mui/system";
import { initCompanyValue } from "../innitValue";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useRef } from "react";

const InputContainer = styled("div")`
  display: flex;
  gap: 1rem;
`;

const Form = () => {
  const [checkedAgree, setCheckedAgree] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigative = useNavigate();
  const type = location.pathname.split("/")[1];
  const Oid = location.pathname.split("/")[2];
  const { companys } = useSelector((state) => state.companys);
  const getCompany = companys.find((item) => item?.Oid === Oid);
  const optionEdit = companys.filter((item) => item.Oid !== getCompany?.Oid);
  const { enqueueSnackbar } = useSnackbar();
  let isMounted = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mode : "onChange",
      company: initCompanyValue,
    },
  });

  const onSubmit = (data) => {
    const variant = "success";
    let ParentDepartmentOid = null;
    console.log(data.company);
    data.company.ParentDepartmentOid &&
      (ParentDepartmentOid = data.company.ParentDepartmentOid.Oid);

    let { company } = data;
    company = { ...company, ParentDepartmentOid: ParentDepartmentOid };
    if (!checkedAgree) return setAgreeError(true);
    if (type === "edit") {
      dispatch(editCompany({ ...company, Oid: Oid }));
      dispatch(closeDiaLog());
      navigative("/");
      enqueueSnackbar("Sửa thành công!", { variant });
    } else {
      dispatch(addCompany(company));
      dispatch(closeDiaLog());
      enqueueSnackbar("Thêm thành công!", { variant });
    }
  };

  const handleReset = (e) => {
    setValue("company", initCompanyValue);
    setCheckedAgree(false);
    setAgreeError(false);
    reset();
  };

  const handleChangAgree = (e) => {
    setCheckedAgree(!checkedAgree);
    setAgreeError(checkedAgree);
  };

  const setDefaultValueParentDepartmentOid = () => {
    if (type === "edit") {
      return companys.find(
        (item) => getCompany?.ParentDepartmentOid === item.Oid
      );
    }

    if (type === "addtree") {
      return getCompany;
    }

    return null;
  };

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      if (type === "edit") {
        const company = getCompany;
        setValue("company", {
          Name: company.Name || "",
          Idc: company.Idc || "",
          Type: company.Type || "",
          DepartmentByParentGroupOid: company.DepartmentByParentGroupOid || "",
          Ordinal: company.Ordinal || "",
          BeneficiaryBankCodeDvcqg: company.BeneficiaryBankCodeDvcqg || "",
          Address: company.Address || "",
          PhoneNumber: company.PhoneNumber || "",
          Email: company.Email || "",
          Photo: company.Photo || "",
          ReceivingLevel: company.ReceivingLevel || "",
          StaffPhoneNumber: company.StaffPhoneNumber || "",
          HeadPhoneNumber: company.HeadPhoneNumber || "",
          StaffEmail: company.StaffEmail || "",
          EmailOfTheHead: company.EmailOfTheHead || "",
          EmailCchc1: company.EmailCchc1 || "",
          EmailCchc2: company.EmailCchc2 || "",
          AgencyNameSms: company.AgencyNameSms || "",
          PostalCode: company.PostalCode || "",
          IsNhanHslienThong: company.IsNhanHslienThong || "",
          TaxCode: company.TaxCode || "",
          CountryManagementCode: company.CountryManagementCode || "",
          IsCheckInvoicePrinting: company.IsCheckInvoicePrinting || "",
          InvoiceSymbolNumber: company.InvoiceSymbolNumber || "",
          BeneficiaryAccountNumber: company.BeneficiaryAccountNumber || "",
          BeneficiaryAccountName: company.BeneficiaryAccountName || "",
          StateTreasuryAccountNumber: company.StateTreasuryAccountNumber || "",
          StateTreasuryAccountCode: company.StateTreasuryAccountCode || "",
          StateTreasuryAccountName: company.StateTreasuryAccountName || "",
          IsConnectResidential: company.IsConnectResidential || "",
          KeyConnectElectronicResidential:
            company.KeyConnectElectronicResidential || "",
          Hrmoid: company.Hrmoid || "",
          HrmchaOid: company.HrmchaOid || "",
          IsParent: company.IsParent || "",
          JoinUnit: company.JoinUnit || "",
          JoninUnitGroup: company.JoninUnitGroup || "",
          BeneficiaryBankNameDvcqg: company.BeneficiaryBankNameDvcqg || "",
          ParentDepartmentOid: setDefaultValueParentDepartmentOid(),
        });
      } else if (type === "addtree") {
        setValue("company", {
          ...initCompanyValue,
          ParentDepartmentOid: setDefaultValueParentDepartmentOid(),
        });
      }
    }
    return () => {
      isMounted.current = false;
    };
  }, [Oid]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.Name", { required: true })}
          error={!!errors?.company?.Name}
          label="Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.Idc", { required: true })}
          error={!!errors?.company?.Idc}
          label="Idc"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.BeneficiaryBankCodeDvcqg", { required: true })}
          error={!!errors?.company?.BeneficiaryBankCodeDvcqg}
          label="BeneficiaryBankCodeDvcqg"
          variant="outlined"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.DepartmentByParentGroupOid", {
            required: true,
          })}
          error={!!errors?.company?.DepartmentByParentGroupOid}
          label="DepartmentByParentGroupOid"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.Ordinal", { required: true })}
          error={!!errors?.company?.Ordinal}
          label="Ordinal"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          {...register("company.Address", { required: true })}
          error={!!errors?.company?.Address}
          label="Address"
          variant="outlined"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.PhoneNumber", { required: true })}
          error={!!errors?.company?.PhoneNumber}
          label="PhoneNumber"
          variant="outlined"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 10,
            minLength: 10,
          }}
          fullWidth
        />
        <TextField
          {...register("company.Email", { required: true })}
          error={!!errors?.company?.Email}
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
        />
        <TextField
          {...register("company.JoninUnitGroup", { required: true })}
          error={!!errors?.company?.JoninUnitGroup}
          label="JoninUnitGroup"
          variant="outlined"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.Photo", { required: true })}
          error={!!errors?.company?.Photo}
          label="Photo"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.ReceivingLevel", { required: true })}
          error={!!errors?.company?.ReceivingLevel}
          label="ReceivingLevel"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.HeadPhoneNumber", { required: true })}
          error={!!errors?.company?.HeadPhoneNumber}
          label="HeadPhoneNumber"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </InputContainer>

      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.StaffPhoneNumber", { required: true })}
          error={!!errors?.company?.StaffPhoneNumber}
          label="StaffPhoneNumber"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />

        <TextField
          {...register("company.StaffEmail", { required: true })}
          error={!!errors?.company?.StaffEmail}
          label="StaffEmail"
          variant="outlined"
          fullWidth
          type="email"
        />
        <TextField
          {...register("company.EmailOfTheHead", { required: true })}
          error={!!errors?.company?.EmailOfTheHead}
          label="EmailOfTheHead"
          variant="outlined"
          type="mail"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.TaxCode", { required: true })}
          error={!!errors?.company?.TaxCode}
          label="TaxCode"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.CountryManagementCode", { required: true })}
          error={!!errors?.company?.CountryManagementCode}
          label="CountryManagementCode"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.PostalCode", { required: true })}
          error={!!errors?.company?.PostalCode}
          label="PostalCode"
          variant="outlined"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.EmailCchc1", { required: true })}
          error={!!errors?.company?.EmailCchc1}
          label="EmailCchc1"
          variant="outlined"
          fullWidth
          type="email"
        />
        <TextField
          {...register("company.EmailCchc2", { required: true })}
          error={!!errors?.company?.EmailCchc2}
          label="EmailCchc2"
          variant="outlined"
          fullWidth
          type="email"
        />

        <Controller
          {...register("company.ParentDepartmentOid")}
          control={control}
          render={({ field: { onChange, value, ...props } }) => (
            <Autocomplete
              defaultValue={setDefaultValueParentDepartmentOid()}
              
              fullWidth
              options={type === "edit" ? optionEdit : companys}
              getOptionLabel={(option) => `${option.Name}`}
              renderInput={(params) => (
                <TextField {...params}  label="ParentDepartmentOid" />
              )}
              onChange={(_, data) => onChange(data)}
            />
          )}
        />
      </InputContainer>

      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.InvoiceSymbolNumber", { required: true })}
          error={!!errors?.company?.InvoiceSymbolNumber}
          label="InvoiceSymbolNumber"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          {...register("company.BeneficiaryAccountNumber", { required: true })}
          error={!!errors?.company?.BeneficiaryAccountNumber}
          label="BeneficiaryAccountNumber"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          {...register("company.BeneficiaryAccountName", { required: true })}
          error={!!errors?.company?.BeneficiaryAccountName}
          label="BeneficiaryAccountName"
          variant="outlined"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.BeneficiaryBankNameDvcqg", { required: true })}
          error={!!errors?.company?.BeneficiaryBankNameDvcqg}
          label="BeneficiaryBankNameDvcqg"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.StateTreasuryAccountNumber", {
            required: true,
          })}
          error={!!errors?.company?.StateTreasuryAccountNumber}
          label="StateTreasuryAccountNumber"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          {...register("company.StateTreasuryAccountCode", { required: true })}
          error={!!errors?.company?.StateTreasuryAccountCode}
          label="StateTreasuryAccountCode"
          variant="outlined"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.StateTreasuryAccountName", { required: true })}
          error={!!errors?.company?.StateTreasuryAccountName}
          label="StateTreasuryAccountName"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.KeyConnectElectronicResidential", {
            required: true,
          })}
          error={!!errors?.company?.KeyConnectElectronicResidential}
          label="KeyConnectElectronicResidential"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.Hrmoid", { required: true })}
          error={!!errors?.company?.Hrmoid}
          label="Hrmoid"
          variant="outlined"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-4">
        <TextField
          {...register("company.JoinUnit", { required: true })}
          error={!!errors?.company?.JoinUnit}
          label="JoinUnit"
          variant="outlined"
          fullWidth
        />

        <TextField
          {...register("company.AgencyNameSms", { required: true })}
          error={!!errors?.company?.AgencyNameSms}
          label="AgencyNameSms"
          variant="outlined"
          fullWidth
        />

        <Controller
          {...register("company.Type", { required: true })}
          control={control}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControl fullWidth error={!!errors?.company?.Type}>
              <InputLabel id="demo-simple-select-helper-label ">
                Type
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-helper-label"
                label="Type"
                value={value}
                onChange={onChange}
              >
                <MenuItem value="">Type</MenuItem>
                <MenuItem value="donvi">Đơn vị </MenuItem>
                <MenuItem value="phongban">Phòng ban </MenuItem>
                <MenuItem value="nhom">Nhóm</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="company.IsCheckInvoicePrinting"
          control={control}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={value}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={onChange}
                />
              }
              label={"IsCheckInvoicePrinting"}
            />
          )}
        ></Controller>
        <Controller
          name="company.IsParent"
          control={control}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={value}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={onChange}
                />
              }
              label={"IsParent"}
            />
          )}
        ></Controller>
        <Controller
          name="company.IsConnectResidential"
          control={control}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={value}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={onChange}
                />
              }
              label={"IsConnectResidential"}
            />
          )}
        ></Controller>
        <Controller
          name="company.IsNhanHslienThong"
          control={control}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={value}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={onChange}
                />
              }
              label={"IsNhanHslienThong"}
            />
          )}
        ></Controller>
      </InputContainer>

      <div className="form-outline my-5">
        <FormControlLabel
          control={
            <Checkbox
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

      <div className="d-flex justify-content-end">
        {type === "edit" ? (
          <Button
            type="submit"
            variant="contained"
            className="mx-2"
            color="success"
          >
            Edit
          </Button>
        ) : (
          <Button className="mx-2" type="submit" variant="contained">
            Submit
          </Button>
        )}
        <Button
          variant="contained"
          className="mx-2"
          onClick={handleReset}
          type="reset"
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default Form;
