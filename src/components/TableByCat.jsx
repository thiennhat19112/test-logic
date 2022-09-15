import { MDBTable, MDBTableHead } from 'mdb-react-ui-kit'
import React from 'react'

const TableByCat = () => {

  return (
    <MDBTable className="mb-0" bordered>
      <MDBTableHead>
        <tr>
          <th>Name</th>
          <th>Adress</th>
          <th>Type</th>
          <th>Created</th>
        </tr>
      </MDBTableHead>
    </MDBTable>
  )
}

export default TableByCat