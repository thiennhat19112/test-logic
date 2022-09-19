import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useSelector } from "react-redux";
import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

const TreeViewCase = () => {
  const { companys } = useSelector((state) => state.companys);
  const [valueSelect, setValueSelect] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const donvi = companys.filter((c) => c.ParentDepartmentOid === null);

  const phongBan = companys.filter(({ ParentDepartmentOid }) =>
    donvi.some((d) => d.Oid === ParentDepartmentOid)
  );
  const nhom = companys.filter(({ ParentDepartmentOid }) =>
    phongBan.some((p) => p.Oid === ParentDepartmentOid)
  );
  const data = () => {
    let tree = [];
    let temp = [];

    temp = phongBan.map((p) => {
      return {
        ...p,
        Departments: nhom.filter((n) => n.ParentDepartmentOid === p.Oid),
      };
    });

    tree = donvi.map((d) => {
      return {
        ...d,
        Departments: temp.filter((e) => e.ParentDepartmentOid === d.Oid),
      };
    });
    return tree;
  };

  const renderTree = (nodes) =>
    nodes.map((item) => (  
      <TreeItem nodeId={item.Oid} label={item.Name} key={item.Oid}>
        {item.Departments.length !== 0 ? renderTree(item.Departments) : null}
      </TreeItem>
    ));

  const handleChangeSelect = (e, newValue) => {
    setValueSelect(newValue);

    const Oids = newValue.map((value) => {
      return value.Oid;
    });

    setSelected(Oids);

    const ParentDepartmentOid = newValue.map((value) => {
      return value.ParentDepartmentOid;
    });

    const isPhongBan = phongBan.some((p) => Oids.includes(p.Oid));
    const isNhom = nhom.some((n) => Oids.includes(n.Oid));

    if (newValue.length === 0) {
      return setExpanded([]);
    }

    if (!isPhongBan & !isNhom) {
      const getDonVi = donvi.filter((d) => Oids.includes(d.Oid));
      const OidsDonvi = getDonVi.map((value) => {
        return value.Oid;
      });
      return setExpanded(OidsDonvi);
    }

    if (isPhongBan) {
      console.log(Oids);
      const getPhongBan = phongBan.filter((p) => Oids.includes(p.Oid));
      if (getPhongBan.length === 1) {
        setExpanded([getPhongBan[0].ParentDepartmentOid, getPhongBan[0].Oid]);
      } else {
        const OidsPhongBan = getPhongBan.map((value) => {
          return [value.Oid.toString(), value.ParentDepartmentOid.toString()];
        });
        setExpanded(OidsPhongBan.flat());
      }
    }

    if (isNhom) {
      const getPhongban = phongBan.find((p) =>
        ParentDepartmentOid.includes(p.Oid)
      );
      setExpanded([getPhongban.Oid, getPhongban.ParentDepartmentOid]);
    }
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  return (
    <Stack sx={{ height: "700px", margin: "10px" }} direction="row" spacing={2}>
      <FormControl sx={{ flex: 1 }} fullWidth>
        <Autocomplete
          value={valueSelect}
          onChange={(e, newValue) => handleChangeSelect(e, newValue)}
          multiple
          id="size-small-standard-multi"
          size="small"
          options={companys}
          getOptionLabel={(option) => option.Name}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option.Name}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Search" />
          )}
        />
      </FormControl>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flex: 1 }}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        {renderTree(data())}
      </TreeView>
    </Stack>
  );
};

export default TreeViewCase;
