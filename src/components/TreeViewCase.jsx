import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useSelector } from "react-redux";

const TreeViewCase = () => {
  const { companys } = useSelector((state) => state.companys);
  const data = () => {
    let tree = [];
    let temp = [];
    const donvi = companys.filter((c) => c.ParentDepartmentOid === null);
    const phongBan = companys.filter(({ ParentDepartmentOid }) => (donvi.some((d) => d.Oid === ParentDepartmentOid)));
    const nhom = companys.filter(({ParentDepartmentOid}) => phongBan.some(p => p.Oid === ParentDepartmentOid));

    temp = phongBan.map(p => {
      return {
        ...p,
        Departments : nhom.filter(n => n.ParentDepartmentOid === p.Oid)
      }
    })

    tree = donvi.map((d) => {
      return {
        ...d,
        Departments: temp.filter((e) => e.ParentDepartmentOid === d.Oid),
      };
    });

    

    // const phongban = companys.filter((c) => c.Type === "phongban");
    // const nhom = companys.filter((c) => c.Type === "nhom");

    // temp = phongban.map((p) => {
    //   return {
    //     ...p,
    //     Departments: nhom.filter(
    //       ({ ParentDepartmentOid }) =>
    //         p.ParentDepartmentOid === ParentDepartmentOid
    //     ),
    //   };
    // });

    // console.log(temp);

    // tree = donvi.map((d) => {
    //   return {
    //     ...d,
    //     Departments: temp.filter(
    //       ({ ParentDepartmentOid }) =>
    //         d.ParentDepartmentOid === ParentDepartmentOid
    //     ),
    //   };
    // });

    // const gruopData = tree.reduce((t,{Departments}) =>{
    //    const x = Departments.map(d =>{
    //     return {
    //         ...d,
    //         Departments : nhom.filter(({ParentDepartmentOid}) => d.ParentDepartmentOid === ParentDepartmentOid)
    //     }
    //    })

    //    t = [...t,x]
    //    return x;
    // })

    // console.log(tree);
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
