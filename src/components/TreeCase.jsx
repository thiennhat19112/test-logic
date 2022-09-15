import React, { useState } from "react";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Checkbox, FormControlLabel } from "@mui/material";

const data = {
  name: "Đơn vị",
  ParentDepartmentOid: "2f616a88-39ba-43af-a765-e18b680f53ea",
  children: [
    {
      ParentDepartmentOid: "0a8037fe-adf7-483a-b6ec-81d538222804",
      name: "Phòng ban",
      children: [
        {
          ParentDepartmentOid: "a86b960d-3ea8-409b-a398-60b5c72341fe",
          name: "Nhóm",
        },
      ],
    },
  ],
};

const TreeCase = () => {
  const [selectParentDepartmentOid, setSelectParentDepartmentOid] = useState([]);

  const handleParentDepartmentOid = (e) => {
    let ParentDepartmentOid = e.target.id;
    let ParentDepartmentOids = [];
    ParentDepartmentOids = selectParentDepartmentOid;
    
    if (ParentDepartmentOids.includes(ParentDepartmentOid)) {
     const index = ParentDepartmentOids.indexOf(ParentDepartmentOid);
     
      ParentDepartmentOids = ParentDepartmentOids.splice(index,1)
      console.log(ParentDepartmentOids);
       setSelectParentDepartmentOid(ParentDepartmentOids);
    }

    if (!ParentDepartmentOids.includes(ParentDepartmentOid)) {
     ParentDepartmentOids.push(ParentDepartmentOid);
      setSelectParentDepartmentOid(ParentDepartmentOids);
    }

    console.log(selectParentDepartmentOid);

  };


  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.ParentDepartmentOid}
      nodeId={nodes.ParentDepartmentOid}
      label={
        <FormControlLabel
          control={
            <Checkbox
              id={nodes.ParentDepartmentOid}
              onChange={handleParentDepartmentOid}
              onClick={(e) => e.stopPropagation()}
            />
          }
          label={<>{nodes.name}</>}
          key={nodes.ParentDepartmentOid}
        />
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
};

export default TreeCase;
