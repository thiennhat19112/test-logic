import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { closeDiaLogTreeView } from "../redux/dialogSlice";
import TreeViewCase from "../components/TreeViewCase";
const TreeView = () => {

  const dispatch = useDispatch();
  const { treeView } = useSelector((state) => state.digLog);
  const handleClose = () => {
    dispatch(closeDiaLogTreeView());
  };
  return (
    <Dialog fullWidth maxWidth="lg" open={treeView}>
      <DialogTitle >
        Case
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          className="float-end "
        >
          <CloseIcon />
        </IconButton>    
      </DialogTitle>
      <DialogContent>
        <TreeViewCase />
      </DialogContent>
    </Dialog>
  );
};

export default TreeView;
