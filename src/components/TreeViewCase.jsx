import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const TreeViewCase = () => {
  const { companys } = useSelector((state) => state.companys);
  const data = () => {
    let tree = [];
    const donvi = companys.filter((c) => c.Type === "donvi");
    const phongban = companys.filter((c) => c.Type === "phongban");
    tree = donvi.map((d) => {
      return {
        ...d,
        Departments: phongban.filter(
          ({ ParentDepartmentOid }) =>
            d.ParentDepartmentOid === ParentDepartmentOid
        ),
      };
    });
    console.log(tree);
    return tree;
  };

  //   const tree = [
  //     {
  //       id: "1",
  //       name: "Đơn vị",
  //       Type: "donvi",
  //       children: [],
  //     },
  //     {
  //       id: "2",
  //       name: "Phòng ban",
  //       Type: "phongban",
  //       children: [],
  //     },
  //     {
  //       id: "3",
  //       name: "Nhóm",
  //       Type: "nhom",
  //       children: [],
  //     },
  //   ];

  //   const data = () => {
  //     const groupCompanysByType = companys.reduce((r, c) => {
  //       const { Type, ...other } = c;
  //       r[Type] = [
  //         ...(r[Type] || []),
  //         {
  //           Type,
  //           ...other,
  //         },
  //       ];
  //       return r;
  //     }, {});

  //     tree.forEach((v, i, arr) => {
  //       if (Object.keys(groupCompanysByType).includes(v.Type)) {
  //         v.children = groupCompanysByType[v.Type];
  //       }
  //     });

  //     return tree;
  //   };

  const renderTree = (nodes) =>
    nodes.map((item) => (
      <TreeItem nodeId={item.Oid} label={item.Name} key={item.Oid}>
        {item.Departments.length !== 0 ? renderTree(item.Departments) : null}
      </TreeItem>
    ));

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1 }}
    >
      {renderTree(data())}
    </TreeView>
  );
};

export default TreeViewCase;
