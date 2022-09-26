import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Chip,
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
import { useRef } from "react";
import { deleteCompany } from "../redux/companySlice";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
} from "mdb-react-ui-kit";
import { openDiaLog } from "../redux/dialogSlice";
import { useNavigate } from "react-router-dom";

const TreeViewCase = () => {
  const { companys } = useSelector((state) => state.companys);
  const [valueSelect, setValueSelect] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const [confirmModal, setConFirmModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let _oldCompany = useRef({});
  let _Oid = useRef("");

  const dataTree = (companys, Oid = null, link = "ParentDepartmentOid") => {
    return companys
      .filter((item) => item[link] === Oid)
      .map((item) => ({ ...item, Departments: dataTree(companys, item.Oid) }));
  };

  const filter = (ParentDepartmentOid, Oids, arr, OidsSelect = []) => {
    OidsSelect.push([ParentDepartmentOid, Oids].flat());
    if (Array.isArray(ParentDepartmentOid)) {
      arr
        .filter((e) => ParentDepartmentOid.includes(e.Oid))
        .map((i) => filter([i.ParentDepartmentOid], [i.Oid], arr, OidsSelect));
    }
    return OidsSelect;
  };

  const renderTree = (nodes) => {
    return nodes.map((item) => (
      <TreeItem
        nodeId={item.Oid}
        label={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
              pr: 0,
              height: "50px",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "inherit", flexGrow: 1 }}
            >
              {item.Name}{" "}
              {item.Departments.length > 0 && `(${item.Departments.length})`}
            </Typography>

            {selected.includes(item.Oid) && (
              <Stack className="btn-container" direction="row" spacing={2}>
                <IconButton onClick={(e) => handleEditTreeItem(e, item)}>
                  <DriveFileRenameOutlineRounded sx={{ color: "#616161" }} />
                </IconButton>

                <IconButton onClick={(e) => handleAddTreeItem(e, item.Oid)}>
                  <AddBox sx={{ color: "#616161" }} />
                </IconButton>

                <IconButton onClick={(e) => handleModalConfirm(e, item)}>
                  <IndeterminateCheckBoxRoundedIcon sx={{ color: "#616161" }} />
                </IconButton>
              </Stack>
            )}
          </Box>
        }
        key={item.Oid}
      >
        {item?.Departments ? renderTree(item.Departments) : null}
      </TreeItem>
    ));
  };

  const findChildren =   (company,Departments,arr = []) => {
    arr.push(company);
    if (Departments.length > 0) {
      Departments.map(value => findChildren(value,value.Departments,arr));
    }

    return arr;
  }

  const handleAddTreeItem = (e, Oid) => {
    dispatch(openDiaLog());
    navigate(`/addtree/${Oid}`);
    _Oid.current = Oid;
    e.stopPropagation();
  };

  const handleEditTreeItem = (e, data) => {
    dispatch(openDiaLog());
    const { Oid } = data;
    navigate(`/edit/${Oid}`, { state: data });
    e.stopPropagation();
  };

  const handleModalConfirm = (e, data) => {
    _oldCompany.current = data;
    setConFirmModal(true);
    e.stopPropagation();
  };

  const handleDeleteTreeItem = () => {
    const companysDelete = findChildren(_oldCompany.current,_oldCompany.current.Departments);
    dispatch(deleteCompany(companysDelete));
    setConFirmModal(false);
  };

  const handleChangeSelect = (e, newValue) => {
    setValueSelect(newValue);
    const ParentDepartmentOid = newValue.map((value) => {
      return value.ParentDepartmentOid;
    });
    const Oids = newValue.map((value) => {
      return value.Oid;
    });
    // set Selected
    setSelected(Oids);

    //set expanded
    const expandedOids = filter(ParentDepartmentOid, Oids, companys)
      .flat()
      .filter((value) => value !== null);
    setExpanded(expandedOids);
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  return (
    <Stack
      sx={{ height: "700px", margin: "10px", overflow: "hidden" }}
      direction="row"
      spacing={2}
    >
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
        sx={{ flex: 1, height: "100%", overflow: "auto" }}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect
      >
        {renderTree(dataTree(companys))}
      </TreeView>

      <MDBModal
        animationDirection="bottom"
        show={confirmModal}
        tabIndex="-1"
        setShow={setConFirmModal}
      >
        <MDBModalDialog position="bottom">
          <MDBModalContent>
            <MDBModalBody className="py-3">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <p className="mb-0 text-center">
                  Bạn muốn xoá{" "}
                  <span className="fw-bolder">{_oldCompany.current.Name}</span>
                </p>
                <div className="d-flex mt-3">
                  <MDBBtn
                    color="success"
                    size="sm"
                    className="ms-2"
                    onClick={handleDeleteTreeItem}
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
    </Stack>
  );
};

export default TreeViewCase;
