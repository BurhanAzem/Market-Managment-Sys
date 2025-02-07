import { Modal as BaseModal } from "@mui/base/Modal";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import * as MUI from "@mui/material";
import { css, styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { FC, ReactElement, forwardRef, useEffect, useState } from "react";


const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

export default function AddSupplierModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;// Assuming projectId is of type string
}) {
  const [newTicketForm, setNewTicketForm] = useState({
    projectId: '',
    assigneeId: "",
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
    ticketPriority: "",
    ticketStatus: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState({});
  const [members, setMembers] = useState([]);

  useEffect(() => {
  }, []);

  // const submitForm = async () => {
  //   e.preventDefault();
   
  // };

  // const handleClose = () => {
  //   setNewTicketForm({
  //     projectId: "",
  //     assigneeId: "",
  //     name: "",
  //     description: "",
  //     startDate: "",
  //     dueDate: "",
  //     ticketPriority: "",
  //     ticketStatus: "",
  //   });
  //   setOpen(false);
  // };
  // const handlePriorityChange = (e) => {
  //   setNewTicketForm({ ...newTicketForm, ticketPriority: e.target.value });
  // };

  // const handleStatusChange = (e) => {
  //   setNewTicketForm({ ...newTicketForm, ticketStatus: e.target.value });
  // };

  // const handleAssigneeChange = (e) => {
  //   console.log(e.target.value);
  //   setNewTicketForm({ ...newTicketForm, assigneeId: e.target.value.id });
  //   setSelectedAssignee(e.target.value);
  // };

  // const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // const letterToColorMapping = {};
  // for (const letter of letters) {
  //   letterToColorMapping[letter] = {
  //     backgroundColor: getRandomColor(),
  //     color: "#fff",
  //   };
  // }

  // function getRandomColor() {
  //   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  // }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        // slots={{ backdrop: StyledBackdrop }}
      >


        <MUI.Fade in={true}>
          <ModalContent sx={style}>
            <MUI.Stack py={0} direction="row" justifyContent="space-between">
              <MUI.Typography variant="h6" id="transition-modal-title">
                Create a new project
              </MUI.Typography>
              <MUI.Button sx={{ color: "#000" }} >
                <CloseIcon />
              </MUI.Button>
            </MUI.Stack>
            <MUI.Divider />
            <form>
              <MUI.Stack gap={2}>
                <MUI.TextField
                  required
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  size="small"
                  // value={newProjectForm.name}
                  // onChange={(e) =>
                  //   setNewProjectForm({
                  //     ...newProjectForm,
                  //     name: e.target.value,
                  //   })
                  // }
                />
                <MUI.TextField
                  required
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  // value={newProjectForm.description}
                  // onChange={(e) =>
                  //   setNewProjectForm({
                  //     ...newProjectForm,
                  //     description: e.target.value,
                  //   })
                  // }
                  multiline
                  rows={4}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MUI.Stack direction="row" gap={1}>
                    <DemoItem label="Start Date">
                      <DatePicker
                        defaultValue={today}
                        disablePast
                        views={["year", "month", "day"]}
                        // value={newProjectForm.startDate}
                        // onChange={(e) =>
                        //   setNewProjectForm({
                        //     ...newProjectForm,
                        //     startDate: `${e.$y}-${e.$M + 1}-${e.$D}`,
                        //   })
                        // }
                      />
                    </DemoItem>
                    <DemoItem label="End Date">
                      <DatePicker
                        defaultValue={yesterday}
                        disablePast
                        views={["year", "month", "day"]}
                        // value={newProjectForm.endDate}
                        // onChange={(e) =>
                        //   setNewProjectForm({
                        //     ...newProjectForm,
                        //     endDate: `${e.$y}-${e.$M + 1}-${e.$D}`,
                        //   })
                        // }
                      />
                    </DemoItem>
                  </MUI.Stack>
                </LocalizationProvider>
                {/* <ProjectStatusMenuChoose
                  ProjectForm={newProjectForm}
                  handleStatusChange={handleStatusChange}
                /> */}
                <MUI.Stack width="100%" direction="row" gap={2}>
                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Add
                  </LoadingButton>
                  <MUI.Button
                    // onClick={handleClose}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </MUI.Button>
                </MUI.Stack>
              </MUI.Stack>
            </form>
          </ModalContent>
        </MUI.Fade>
      </Modal>
    </div>
  );
}



const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: { xs: 340, md: 400 },
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
