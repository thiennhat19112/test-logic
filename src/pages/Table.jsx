import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { memo, useRef, useState } from "react";
import { deleteCompany, reloadCompany } from "../redux/companySlice";
import moment from "moment";
import Form from "../components/Form";
import { useSnackbar } from "notistack";
import {
  closeDiaLog,
  openDiaLog,
  openDiaLogTreeView,
} from "../redux/dialogSlice";
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { openDiaLogViewByCat } from "../redux/dialogSlice";

const Table = () => {
  const { status, companys } = useSelector((state) => state.companys);
  const { open } = useSelector((state) => state.digLog);
  const [companyChecked, setCompanyChecked] = useState([]);
  const [confirmModal, setConFirmModal] = useState(false);
  const checkAllElement = useRef(false);
  const [checkedAll, setCheckAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const { enqueueSnackbar } = useSnackbar();

  const handleEdit = (company) => {
    dispatch(openDiaLog());
    setCompanyChecked(() => {
      return company;
    });
    const { Oid } = company[0];
    navigate(`/edit/${Oid}`, { state: { ...company[0] } });
  };

  const handleClickOpenDialog = () => {
    dispatch(openDiaLog());
  };

  const handleCloseDialog = () => {
    dispatch(closeDiaLog());
    navigate("/");
  };

  const handleReload = (e) => {
    checkAllElement.current.checked = false;
    dispatch(reloadCompany());
    e.preventDefault();
  };

  const handleChangeCheckedCompany = (company) => {
    const OidsChecked = [];
    companyChecked.map((item) => {
      return OidsChecked.push(item.Oid);
    });
    const ischecked = OidsChecked.includes(company.Oid);
    if (ischecked) {
      const index = companyChecked.findIndex(
        (item) => item.Oid === company.Oid
      );
      companyChecked.splice(index, 1);
      setCompanyChecked((prev) => {
        return [...companyChecked];
      });
    } else {
      setCompanyChecked((prev) => {
        return [...prev, company];
      });
    }
  };

  const handleSelectAll = () => {
    const ischecked = checkAllElement.current.checked;
    if (ischecked) {
      setCompanyChecked(() => {
        return [...companys];
      });
    } else {
      setCompanyChecked([]);
    }
    setCheckAll(!checkedAll);
  };

  const findChildren = (company, arr = []) => {

    arr.push(company);
   
    const Oids = company.map(c => c.Oid);
    const children = companys.filter((item) =>
      Oids.includes(item.ParentDepartmentOid)
    );
    if(children.length !== 0){
      findChildren(children, arr);
    }
    return arr;
  };

  const handleDelete = (e, variant) => {
    const companysDelete = findChildren(companyChecked).flat();
    console.log(companysDelete);
    dispatch(deleteCompany(companysDelete));
    setCompanyChecked([]);
    setCheckAll(false);
    enqueueSnackbar("Xóa thành công!", { variant });
    setConFirmModal(false);
    e.preventDefault();
  };

  const checkedCheckBoxAll = () => {
    if (companys.length === 0) return false;
    if (companyChecked.length === companys.length) return true;
    return false;
  };

  const checkedCheckboxElement = (Oid) => {
    const OidsChecked = [];
    companyChecked.map((item) => {
      return OidsChecked.push(item.Oid);
    });
    return OidsChecked.includes(Oid);
  };

  const handleViewByCat = () => {
    dispatch(openDiaLogViewByCat());
  };

  const handleTreeView = () => {
    dispatch(openDiaLogTreeView());
  };

  return (
    <div className="p-4">
      <div className="float-end my-2">
        <MDBBtn
          className="mx-2"
          color="success"
          onClick={handleClickOpenDialog}
        >
          Thêm mới
        </MDBBtn>
        <MDBBtn
          onClick={() => handleEdit(companyChecked)}
          className="mx-2"
          color="info"
          disabled={!(companyChecked.length === 1)}
        >
          Sửa
        </MDBBtn>
        <MDBBtn
          disabled={!(companyChecked.length > 0)}
          onClick={() => setConFirmModal(true)}
          className="mx-2"
          color="danger"
        >
          Xóa
        </MDBBtn>
        <MDBBtn
          disabled={status === "loading"}
          onClick={handleReload}
          type="button"
          className="secondary mx-2"
        >
          Đồng bộ
        </MDBBtn>
        <MDBBtn
          type="button"
          onClick={handleViewByCat}
          className="secondary mx-2"
        >
          Xem theo loai
        </MDBBtn>
        <MDBBtn
          type="button"
          onClick={handleTreeView}
          className="secondary mx-2"
        >
          Tree view
        </MDBBtn>
      </div>
      {status === "loading" && (
        <CircularProgress className="position-absolute top-50 start-50 translate-middle" />
      )}
      {status === "idle" && (
        <MDBTable className="mb-0" bordered>
          <MDBTableHead>
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  name="flexCheck"
                  value="all"
                  checked={checkedCheckBoxAll()}
                  ref={checkAllElement}
                />
              </th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Type</th>
              <th scope="col">Created</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {companys.length === 0 ? (
              <tr>"Không có dữ liệu!"</tr>
            ) : (
              companys.map((company) => (
                <tr key={company?.Oid}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedCheckboxElement(company?.Oid)}
                      onChange={() => handleChangeCheckedCompany(company)}
                    />
                  </td>
                  <td>{company?.Name}</td>
                  <td>{company?.Address}</td>
                  <td>{company?.Type}</td>
                  <td>
                    {moment(company?.Created).format("dd-MM-YYYY, h:mm:ss a")}
                  </td>
                </tr>
              ))
            )}
          </MDBTableBody>
        </MDBTable>
      )}
      {/* modal */}
      <Dialog fullWidth maxWidth="lg" open={open}>
        <DialogTitle className="d-flex justify-content-between">
          {type === "edit" ? "Sửa" : "Thêm"}
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Form />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      {/* confirm */}
      <MDBModal
        animationDirection="bottom"
        show={confirmModal}
        tabIndex="-1"
        setShow={setConFirmModal}
      >
        <MDBModalDialog position="bottom" frame>
          <MDBModalContent>
            <MDBModalBody className="py-3">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <p className="mb-0 text-center">
                  Bạn có muốn xóa !
                </p>
                <div className="d-flex mt-3">
                  <MDBBtn
                    color="success"
                    size="sm"
                    className="ms-2"
                    onClick={(e) => handleDelete(e, "success")}
                  >
                    Đồng ý
                  </MDBBtn>
                  <MDBBtn
                    color="danger"
                    onClick={() => setConFirmModal(false)}
                    size="sm"
                    className="ms-2"
                  >
                    Đóng
                  </MDBBtn>
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default memo(Table);
