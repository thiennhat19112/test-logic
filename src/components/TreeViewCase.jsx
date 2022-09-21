import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import { AddBox, DriveFileRenameOutlineRounded } from "@mui/icons-material";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { initCompanyValue } from "../innitValue";
import {
  addCompany,
  deleteOneComapany,
  editCompany,
} from "../redux/companySlice";

const TreeViewCase = () => {
  const { companys } = useSelector((state) => state.companys);
  const [valueSelect, setValueSelect] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  let action = useRef("");
  let _oldCompany = useRef({});
  let OidsSelect = useRef([]);

  let _Oid = useRef("");

  const dispatch = useDispatch();

  const { register, handleSubmit, reset, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      company: { Name: "" },
    },
  });

  const donvi = companys.filter((c) => c.ParentDepartmentOid === null);

  const phongBan = companys.filter(({ ParentDepartmentOid }) =>
    donvi.some((d) => d.Oid === ParentDepartmentOid)
  );

  const nhom = companys.filter(({ ParentDepartmentOid }) =>
    phongBan.some((p) => p.Oid === ParentDepartmentOid)
  );

  // const data = () => {
  //   let tree = [];
  //   let temp = [];

  //   temp = phongBan.map((p) => {
  //     return {
  //       ...p,
  //       Departments: nhom.filter((n) => n.ParentDepartmentOid === p.Oid),
  //     };
  //   });

  //   tree = donvi.map((d) => {
  //     return {
  //       ...d,
  //       Departments: temp.filter((e) => e.ParentDepartmentOid === d.Oid),
  //     };
  //   });
  //   return tree;
  // };

  const dataTree = (companys, Oid = null, link = "ParentDepartmentOid") => {
    return companys
      .filter((item) => item[link] === Oid)
      .map((item) => ({ ...item, Departments: dataTree(companys, item.Oid) }));
  };

  const renderTree = (nodes) =>
    nodes.map((item) => (
      <TreeItem
        nodeId={item.Oid}
        label={
          <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "inherit", flexGrow: 1 }}
            >
              {item.Name}
            </Typography>
            <Stack
              id={item.Oid}
              className="btn-container"
              direction="row"
              spacing={2}
            >
              <DriveFileRenameOutlineRounded
                onClick={(e) => handleEditTreeItem(e, item)}
              />
              <AddBox onClick={(e) => handleAddTreeItem(e, item.Oid)} />
              <IndeterminateCheckBoxRoundedIcon
                onClick={(e) => handleDeleteTreeItem(e, item.Oid)}
              />
            </Stack>
          </Box>
        }
        key={item.Oid}
      >
        {item?.Departments ? renderTree(item.Departments) : null}
      </TreeItem>
    ));

  const handleAddTreeItem = (e, Oid) => {
    action.current = "add";
    setOpenForm(true);
    _Oid.current = Oid;
    e.stopPropagation();
  };

  const handleEditTreeItem = (e, data) => {
    action.current = "edit";
    _oldCompany.current = data;
    setValue("company", {
      Name: _oldCompany.current.Name,
    });
    setOpenForm(true);
    e.stopPropagation();
  };

  const handleDeleteTreeItem = (e, Oid) => {
    dispatch(deleteOneComapany(Oid));
    setSelected([]);
    e.stopPropagation();
  };

  // const filter =  (Oids) => {
  //   let OidsSetlect = [];
  //   const x = companys.filter(c => Oids.includes(c.Oid));
  //   OidsSetlect = x.map(item => item.Oid);
  // }

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

  const onSubmit = (data) => {
    if (action.current === "edit") {
      const changeCompany = {
        ..._oldCompany.current,
        Name: data.company.Name,
        Departments: [],
      };
      dispatch(editCompany(changeCompany));
      reset();
      setOpenForm(false);
      return;
    }

    const newCompany = {
      ...initCompanyValue,
      Name: data.company.Name,
      ParentDepartmentOid: _Oid.current,
    };

    dispatch(addCompany(newCompany));
    reset();
    setOpenForm(false);
    setExpanded((prev) => {
      return [...prev, _Oid.current];
    });
  };

  console.log(dataTree(companys));

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
        aria-label=""
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flex: 1 }}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        {renderTree(dataTree(companys))}
      </TreeView>

      <Dialog fullWidth maxWidth="xs" open={openForm}>
        <DialogTitle>
          {action.current === "edit" ? "Edit" : "Add"}
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenForm(false)}
            aria-label="close"
            className="float-end "
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("company.Name")}
              autoFocus
              margin="dense"
              label={action.current === "edit" ? "Edit tree" : "Add tree"}
              type="text"
              fullWidth
              variant="standard"
            />
            {action.current === "edit" ? (
              <Button
                className="mt-5 float-end"
                type="submit"
                variant="contained"
              >
                Edit
              </Button>
            ) : (
              <Button
                className="mt-5 float-end"
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default TreeViewCase;
