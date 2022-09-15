import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDiaLogViewByCat } from "../redux/dialogSlice";
import CloseIcon from "@mui/icons-material/Close";
import FeatureViewByCat from "../components/FeatureViewByCat";
const ViewByCat = () => {
  const { viewByCat } = useSelector((state) => state.digLog);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeDiaLogViewByCat());
  };
  return (
    <Dialog fullWidth maxWidth="lg" open={viewByCat}>
      <DialogTitle className="d-flex justify-content-between">
        Xem Theo Loai
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          className="float-end"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="overflow-hidden vh-100">
        <FeatureViewByCat className="h-100" />
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default ViewByCat;
