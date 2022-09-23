import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import React from "react";
import { useSelector } from "react-redux";

const TableByCat = ({ Types }) => {
  const { companys } = useSelector((state) => state.companys);
  const fieldCompanys = companys.filter((company) =>
    Types.includes(company.Type)
  );
  return (
    <MDBTable className="mb-0" responsive bordered>
      <MDBTableHead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Adress</th>
          <th scope="col">Type</th>
          <th scope="col">Created</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {fieldCompanys.length === 0 ? (
          <tr>Không có dữ liệu</tr>
        ) : (
          fieldCompanys.map((company) => (
            <tr>
              <td>{company.Name}</td>
              <td>{company.Address}</td>
              <td>{company.Type}</td>
              <td>{company.Create}</td>
            </tr>
          ))
        )}
      </MDBTableBody>
    </MDBTable>
  );
};

export default TableByCat;
