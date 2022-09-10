import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { memo, useEffect, useRef, useState } from "react";
import { deleteCompany, reloadCompany } from "../redux/companySlice";
import moment from "moment";

const Table = () => {
  const { status, companys } = useSelector((state) => state.companys);
  const [companyChecked, setCompanyChecked] = useState([]);
  const checkAllElement = useRef(false);
  const isMounted = useRef(false);
  const [checkedAll, setCheckAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (company) => {
    setCompanyChecked([]);
    const { Name, Address, Type, Oid, Created } = company[0];
    navigate(`/edit/${Oid}`, { state: { Name, Address, Type, Oid, Created } });
  };

  const handleReload = (e) => {
    checkAllElement.current.checked = false;
    dispatch(reloadCompany());
    e.preventDefault();
  };

  const handleChangeCheckedCompany = (company) => {
    const OidsChecked = [];
    companyChecked.map(item=>{
      return OidsChecked.push(item.Oid)
    })
    const ischecked = OidsChecked.includes(company.Oid);
    if (ischecked) {
      const index = companyChecked.findIndex(item => item.Oid === company.Oid);
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

  const handleDelete = (e) => {
    if (window.confirm(`Xóa ${companyChecked.length} item`)) {
      dispatch(deleteCompany(companyChecked));
      setCompanyChecked([]);
      setCheckAll(false);
    }
    e.preventDefault();
  };

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const checkedCheckBoxAll = () => {
    if (isMounted.current) {
      if (companys.length === 0) return false;
      if (companyChecked.length === companys.length) return true;
    }
    return false;
  };

  const checkedCheckboxElement = (Oid)=>{
    const OidsChecked = [];
    companyChecked.map(item=>{
      return OidsChecked.push(item.Oid)
    })
    return OidsChecked.includes(Oid);
  }

  return (
    <div className="table">
      <div className="float-end">
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
          onClick={handleDelete}
          className="mx-2"
          color="danger"
        >
          Xóa
        </MDBBtn>
        <button
          onClick={handleReload}
          type="button"
          className="btn btn-info float-end"
        >
          Đồng bộ
        </button>
      </div>
      <MDBTable>
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
          {status === "loading" && "Loading"}
          {status === "idle" &&
            companys.map((company) => (
              <tr key={company?.Oid}>
                <input
                  type="checkbox"
                  checked={checkedCheckboxElement(company?.Oid)}
                  onChange={() => handleChangeCheckedCompany(company)}
                />
                <td>{company?.Name}</td>
                <td>{company?.Address}</td>
                <td>{company?.Type}</td>
                <td>
                  {moment(company?.Created).format("dd-MM-YYYY, h:mm:ss a")}
                </td>
                <td></td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default memo(Table);
