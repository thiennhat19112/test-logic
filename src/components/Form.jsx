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
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
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
  const Oid = location.pathname.split("/")[2];
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      company: initCompanyValue,
    },
  });
  console.log(watch());
  const Type = watch("company.Type");
  const onSubmit = (data) => {
    const variant = "success";
    const { company } = data;
    console.log({ ...company, Oid: Oid });
    if (!checkedAgree) return setAgreeError(true);
    if (type === "edit") {
      dispatch(editCompany({ ...company, Oid: Oid }));
      navigative("/");
      dispatch(closeDigLog());
      enqueueSnackbar("Sửa thành công!", { variant });
    } else {
      dispatch(addCompany(company));
      dispatch(closeDigLog());
      enqueueSnackbar("Thêm thành công!", { variant });
    }
    setCompany(initCompanyValue);
  };

  const handleReset = (e) => {
    setCompany(initCompanyValue);
    setValue("company", initCompanyValue);
    setCheckedAgree(false);
    setAgreeError(false);
    reset();
  };

  const handleChangAgree = (e) => {
    setCheckedAgree(!checkedAgree);
    setAgreeError(checkedAgree);
  };

  useEffect(() => {
    if (type === "edit") {
      console.log(location.state);
      const company = location.state;
      setCompany(company);
      setValue("company", {
        Name: company.Name || "",
        Idc: company.Idc || "",
        Type: company.Type || "",
        ParentDepartmentOid : company.company || "",
        DepartmentByParentGroupOid : company.DepartmentByParentGroupOid || "",
        Ordinal : company.Ordinal || "",
        Address : company.Address || "",
        PhoneNumber : company.PhoneNumber || "",
        Email : company.Email || "",
        Photo : company.Photo || "",
        ReceivingLevel : company.ReceivingLevel || "",
        StaffPhoneNumber : company.StaffPhoneNumber || "",
        HeadPhoneNumber : company.HeadPhoneNumber || "",
        StaffEmail : company.StaffEmail || "",
        EmailOfTheHead : company.EmailOfTheHead || "",
        EmailCchc1 : company.EmailCchc1 || "",
        EmailCchc2 : company.EmailCchc2 || "",
        AgencyNameSms : company.AgencyNameSms || "",
        PostalCode : company.PostalCode || "",
        IsNhanHslienThong : company.IsNhanHslienThong || "",
        TaxCode : company.TaxCode || "",
        CountryManagementCode : company.CountryManagementCode || "",
        IsCheckInvoicePrinting : company.IsCheckInvoicePrinting || "",
        InvoiceSymbolNumber : company.InvoiceSymbolNumber || "",
        BeneficiaryAccountNumber : company.BeneficiaryAccountNumber || "",
        BeneficiaryAccountName : company.BeneficiaryAccountName || "",
        StateTreasuryAccountNumber : company.StateTreasuryAccountNumber || "",
        StateTreasuryAccountCode : company.StateTreasuryAccountCode || "",
        StateTreasuryAccountName : company.StateTreasuryAccountName || "",
        IsConnectResidential : company.IsConnectResidential || "",
        KeyConnectElectronicResidential : company.KeyConnectElectronicResidential || "",
        Hrmoid : company.Hrmoid || "",
        HrmchaOid : company.HrmchaOid || "",
        IsParent : company.IsParent || "",
        JoinUnit : company.JoinUnit || "",
        JoninUnitGroup : company.JoninUnitGroup || "",
        Departments : company.Departments || "",
      });
    }
  }, [Oid]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <InputContainer className="form-outline my-2">
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
         <select {...register("company.ParentDepartmentOid", { required: true })} label="ParentDepartmentOid">
         <option value="">ParentDepartmentOid</option>
          <option selected={watch(company.ParentDepartmentOid) === "donvi"} value="a">
            Nguyen van a
          </option>
        </select>
      </InputContainer>

      <InputContainer className="form-outline my-2">
        <TextField
          {...register("company.DepartmentByParentGroupOid", { required: true })}
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
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          {...register("company.Address", { required: true })}
          error={!!errors?.company?.Address}
          label="Address"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.PhoneNumber", { required: true })}
          error={!!errors?.company?.PhoneNumber}
          label="PhoneNumber"
          variant="outlined"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-2">
        <select {...register("company.Type", { required: true })} label="Type">
          <option value="">Type</option>
          <option selected={watch(company.Type) === "donvi"} value="donvi">
            Đơn vị
          </option>
          <option
            selected={watch(company.Type) === "phongban"}
            value="phongban"
          >
            Phòng ban
          </option>
          <option selected={watch(company.Type) === "nhom"} value="nhom">
            Nhóm
          </option>
        </select>
        <TextField
          {...register("company.Email", { required: true })}
          error={!!errors?.company?.Email}
          label="Email"
          variant="outlined"
          fullWidth
          email
        />
        <TextField
          {...register("company.JoninUnitGroup", { required: true })}
          error={!!errors?.company?.JoninUnitGroup}
          label="JoninUnitGroup"
          variant="outlined"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-2">
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
          {...register("company.StaffPhoneNumber", { required: true })}
          error={!!errors?.company?.StaffPhoneNumber}
          label="StaffPhoneNumber"
          variant="outlined"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-2">
        <TextField
          {...register("company.StaffPhoneNumber", { required: true })}
          error={!!errors?.company?.StaffPhoneNumber}
          label="StaffPhoneNumber"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          {...register("company.HeadPhoneNumber", { required: true })}
          error={!!errors?.company?.HeadPhoneNumber}
          label="HeadPhoneNumber"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          {...register("company.StaffEmail", { required: true })}
          error={!!errors?.company?.StaffEmail}
          label="StaffEmail"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.EmailOfTheHead", { required: true })}
          error={!!errors?.company?.EmailOfTheHead}
          label="EmailOfTheHead"
          variant="outlined"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-2">
        <TextField
          {...register("company.EmailCchc1", { required: true })}
          error={!!errors?.company?.EmailCchc1}
          label="EmailCchc1"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.EmailCchc2", { required: true })}
          error={!!errors?.company?.EmailCchc2}
          label="EmailCchc2"
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
      </InputContainer>

      <InputContainer className="form-outline my-2">
        <TextField
          {...register("company.IsNhanHslienThong", { required: true })}
          error={!!errors?.company?.IsNhanHslienThong}
          label="IsNhanHslienThong"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.TaxCode", { required: true })}
          error={!!errors?.company?.TaxCode}
          label="TaxCode"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          {...register("company.CountryManagementCode", { required: true })}
          error={!!errors?.company?.CountryManagementCode}
          label="CountryManagementCode"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.InvoiceSymbolNumber", { required: true })}
          error={!!errors?.company?.InvoiceSymbolNumber}
          label="InvoiceSymbolNumber"
          variant="outlined"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-2">
        <TextField
          {...register("company.EmailCchc1", { required: true })}
          error={!!errors?.company?.EmailCchc1}
          label="EmailCchc1"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.EmailCchc2", { required: true })}
          error={!!errors?.company?.EmailCchc2}
          label="EmailCchc2"
          variant="outlined"
          fullWidth
        />
         <TextField
          {...register("company.IsCheckInvoicePrinting", { required: true })}
          error={!!errors?.company?.IsCheckInvoicePrinting}
          label="IsCheckInvoicePrinting"
          variant="outlined"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-2">
        <TextField
          {...register("company.InvoiceSymbolNumber", { required: true })}
          error={!!errors?.company?.InvoiceSymbolNumber}
          label="InvoiceSymbolNumber"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          {...register("company.BeneficiaryAccountNumber", { required: true })}
          error={!!errors?.company?.BeneficiaryAccountNumber}
          label="BeneficiaryAccountNumber"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          {...register("company.BeneficiaryAccountName", { required: true })}
          error={!!errors?.company?.BeneficiaryAccountName}
          label="BeneficiaryAccountName"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.BeneficiaryBankCodeDvcqg", { required: true })}
          error={!!errors?.company?.BeneficiaryBankCodeDvcqg}
          label="BeneficiaryBankCodeDvcqg"
          variant="outlined"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-2">
        <TextField
          {...register("company.BeneficiaryBankNameDvcqg", { required: true })}
          error={!!errors?.company?.BeneficiaryBankNameDvcqg}
          label="BeneficiaryBankNameDvcqg"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.StateTreasuryAccountNumber", { required: true })}
          error={!!errors?.company?.StateTreasuryAccountNumber}
          label="StateTreasuryAccountNumber"
          variant="outlined"
          fullWidth
        />
         <TextField
          {...register("company.StateTreasuryAccountCode", { required: true })}
          error={!!errors?.company?.StateTreasuryAccountCode}
          label="StateTreasuryAccountCode"
          variant="outlined"
          fullWidth
        />
      </InputContainer>

      <InputContainer className="form-outline my-2">
        <TextField
          {...register("company.StateTreasuryAccountName", { required: true })}
          error={!!errors?.company?.StateTreasuryAccountName}
          label="StateTreasuryAccountName"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.IsConnectResidential", { required: true })}
          error={!!errors?.company?.IsConnectResidential}
          label="IsConnectResidential"
          variant="outlined"
          fullWidth
        />
         <TextField
          {...register("company.KeyConnectElectronicResidential", { required: true })}
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

      <InputContainer className="form-outline my-2">
        <TextField
          {...register("company.IsParent", { required: true })}
          error={!!errors?.company?.IsParent}
          label="IsParent"
          variant="outlined"
          fullWidth
        />
        <TextField
          {...register("company.Departments", { required: true })}
          error={!!errors?.company?.Departments}
          label="Departments"
          variant="outlined"
          fullWidth
        />
         <TextField
          {...register("company.JoinUnit", { required: true })}
          error={!!errors?.company?.JoinUnit}
          label="JoinUnit"
          variant="outlined"
          fullWidth
        />
      </InputContainer>


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
