import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Proptypes from "prop-types";
import { useState } from "react";
import DeleteComment from "../Utils/Comments functions/DeleteComment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function CommentDeleteModal({ open, setOpen, id }) {
  const handleClose = () => setOpen(false);
  const [isLoadingDeleteComment, setIsLoadingDeleteComment] = useState(false);

  const { deleteComment } = DeleteComment({
    id,
    setIsLoadingDeleteComment,
    setOpen,
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {isLoadingDeleteComment ? (
        <Box className="flex justify-center items-center p-4">
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Comment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this comment perminantly?
          </Typography>
          <Stack direction="row" justifyContent="end" gap={2} mt={1}>
            <Button onClick={handleClose} variant="contained" size="small">
              Cancel
            </Button>
            <Button
              onClick={() => deleteComment()}
              variant="contained"
              color="error"
              size="small"
            >
              Delete
            </Button>
          </Stack>
        </Box>
      )}
    </Modal>
  );
}

CommentDeleteModal.propTypes = {
  open: Proptypes.bool.isRequired,
  setOpen: Proptypes.func.isRequired,
  id: Proptypes.string.isRequired,
};
