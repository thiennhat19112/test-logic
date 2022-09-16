import TableByCat from "./TableByCat";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

const data = {
  name: "Đơn vị",
  Type: "donvi",
  children: [
    {
      Type: "phongban",
      name: "Phòng ban",
      children: [
        {
          Type: "nhom",
          name: "Nhóm",
        },
      ],
    },
  ],
};

const FeatureViewByCat = () => {

  const [selectTypes, setSelectTypes] = useState(
    []
  );

  const handleType = (e) => {

    let Type = e.target.id;

    if (selectTypes.includes(Type)) {
      const index = selectTypes.indexOf(Type);
      selectTypes.splice(index, 1);
      setSelectTypes(() => {
        return [...selectTypes];
      });
    } else {
      setSelectTypes((prev) => {
        return [...prev, Type];
      });
    }

    console.log(selectTypes);
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.Type}
      nodeId={nodes.Type}
      label={
        <FormControlLabel
          control={
            <Checkbox
              id={nodes.Type}
              onChange={handleType}
              onClick={(e) => e.stopPropagation()}
            />
          }
          label={<>{nodes.name}</>}
          key={nodes.Type}
        />
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <div className="d-flex h-100 ">
      <div className=" w-25 sticky-sm-top h-100  p-2">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(data)}
        </TreeView>
      </div>
      <div className="w-75 h-100 p-2 overflow-auto scrollbar scrollbar-juicy-peach">
        <TableByCat Types = {selectTypes}/>
      </div>
    </div>
  );
};

export default FeatureViewByCat;
