import { Modal as BaseModal } from "@mui/base/Modal";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import * as MUI from "@mui/material";
import { css, styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useState } from "react";

import axios from "axios";
import dayjs from "dayjs";
import { API_URL, EDIT_TICKET_ENDPOINT } from "../Constants/Contants";
import ticketPriorityColors from "../Constants/TicketPriorityColors";
import { GetAllProjectMembers } from "../Utils/Projects/GetAllProjectMembers";
import GetAllTicketsForProject from "../Utils/Tickets/GetAllTickets";

const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

export default function EditTicketModal({
  open,
  setOpen,
  setToggle,
  selectedTicket,
  projectId,
  setTickets,
}) {
  const [newTicketForm, setNewTicketForm] = useState({
    ticketId: selectedTicket.id,
    projectId: projectId,
    assigneeId: selectedTicket.assigneeId,
    name: selectedTicket.name,
    description: selectedTicket.description,
    startDate: selectedTicket.startDate,
    dueDate: selectedTicket.dueDate,
    ticketPriority: selectedTicket.ticketPriority,
    ticketStatus: selectedTicket.ticketStatus,
  });

  const [selectedAssignee, setSelectedAssignee] = useState({});
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [getTickets, setGetTickets] = useState({});

  const { getTickets } = GetAllTicketsForProject({
    setIsLoading,
    setTickets,
    projectId,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { getMembers } = await GetAllProjectMembers({
        setIsLoading,
        projectId,
        setMembers,
      });
      getMembers();
    };

    fetchData();
  }, [projectId]);

  console.log(selectedTicket);

  const submitForm = async (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem("loginInfo"));
    setIsLoading(true);

    try {
      const res = await axios.put(
        `${API_URL}${EDIT_TICKET_ENDPOINT}`,
        newTicketForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setToggle((prev) => !prev);
        getTickets();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setNewTicketForm({
      projectId: "",
      assigneeId: "",
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
      ticketPriority: "",
      ticketStatus: "",
    });
    setOpen(false);
  };
  const handlePriorityChange = (e) => {
    setNewTicketForm({ ...newTicketForm, ticketPriority: e.target.value });
  };

  const handleStatusChange = (e) => {
    setNewTicketForm({ ...newTicketForm, ticketStatus: e.target.value });
  };

  const handleAssigneeChange = (e) => {
    console.log(e.target.value);
    setNewTicketForm({ ...newTicketForm, assigneeId: e.target.value.id });
    setSelectedAssignee(e.target.value);
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterToColorMapping = {};
  for (const letter of letters) {
    letterToColorMapping[letter] = {
      backgroundColor: getRandomColor(),
      color: "#fff",
    };
  }

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <MUI.Fade in={open}>
          <ModalContent sx={style}>
            <MUI.Stack py={0} direction="row" justifyContent="space-between">
              <MUI.Typography variant="h6" id="transition-modal-title">
                Update ticket
              </MUI.Typography>
              <MUI.Button sx={{ color: "#000" }} onClick={handleClose}>
                <CloseIcon />
              </MUI.Button>
            </MUI.Stack>
            <MUI.Divider />
            <form onSubmit={submitForm}>
              <MUI.Stack gap={2}>
                <MUI.TextField
                  required
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={newTicketForm.name}
                  onChange={(e) =>
                    setNewTicketForm({
                      ...newTicketForm,
                      name: e.target.value,
                    })
                  }
                />
                <MUI.TextField
                  required
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  value={newTicketForm.description}
                  onChange={(e) =>
                    setNewTicketForm({
                      ...newTicketForm,
                      description: e.target.value,
                    })
                  }
                  multiline
                  rows={4}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MUI.Stack direction="row" gap={1}>
                    <DemoItem label="End Date">
                      <DatePicker
                        disablePast
                        views={["year", "month", "day"]}
                        value={dayjs(newTicketForm.dueDate)}
                        onChange={(e) =>
                          setNewTicketForm({
                            ...newTicketForm,
                            dueDate: `${e.$y}-${e.$M + 1}-${e.$D}`,
                          })
                        }
                      />
                    </DemoItem>
                  </MUI.Stack>
                </LocalizationProvider>
                <MUI.FormControl fullWidth>
                  <MUI.InputLabel id="demo-simple-select-label">
                    Priority
                  </MUI.InputLabel>
                  <MUI.Select
                    required
                    value={newTicketForm.ticketPriority}
                    label="Status"
                    onChange={handlePriorityChange}
                  >
                    <MUI.MenuItem value="Low">
                      <MUI.Chip
                        style={ticketPriorityColors["Low"]}
                        sx={{ width: 70, height: 20, fontSize: "12px" }}
                        label="Low"
                      />
                    </MUI.MenuItem>
                    <MUI.MenuItem value="Medium">
                      <MUI.Chip
                        style={ticketPriorityColors["Medium"]}
                        sx={{ width: 70, height: 20, fontSize: "12px" }}
                        label="Medium"
                      />
                    </MUI.MenuItem>
                    <MUI.MenuItem value="High">
                      <MUI.Chip
                        style={ticketPriorityColors["High"]}
                        sx={{ width: 70, height: 20, fontSize: "12px" }}
                        label="High"
                      />
                    </MUI.MenuItem>
                  </MUI.Select>
                </MUI.FormControl>
                <MUI.FormControl fullWidth>
                  <MUI.InputLabel id="demo-simple-select-label">
                    Status
                  </MUI.InputLabel>
                  <MUI.Select
                    required
                    value={newTicketForm.ticketStatus}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MUI.MenuItem value="InProgress">InProgress</MUI.MenuItem>
                    <MUI.MenuItem value="Completed">Completed</MUI.MenuItem>
                    <MUI.MenuItem value="Canceled">Canceled</MUI.MenuItem>
                    <MUI.MenuItem value="Pending">Pending</MUI.MenuItem>
                  </MUI.Select>
                </MUI.FormControl>
                <MUI.FormControl fullWidth>
                  <MUI.InputLabel id="demo-simple-select-label">
                    Assignee
                  </MUI.InputLabel>
                  <MUI.Select
                    required
                    value={selectedAssignee}
                    label="Assignee"
                    onChange={handleAssigneeChange}
                  >
                    {members &&
                      members.map((member) => (
                        <MUI.MenuItem value={member} key={member.Id}>
                          <MUI.Stack width="100%" direction="row" gap={2}>
                            <MUI.Avatar
                              sx={{
                                width: 20,
                                height: 20,
                                fontSize: "12px",
                                bgcolor:
                                  letterToColorMapping[
                                    member.name && member.name[0].toUpperCase()
                                  ],
                                color: "#fff",
                              }}
                            >
                              {member.name && member.name[0].toUpperCase()}
                            </MUI.Avatar>
                            <span>{member.name}</span>
                          </MUI.Stack>
                        </MUI.MenuItem>
                      ))}
                  </MUI.Select>
                </MUI.FormControl>

                <MUI.Stack width="100%" direction="row" gap={2}>
                  <LoadingButton
                    onClick={() => {
                      setNewTicketForm({
                        ...newTicketForm,
                        dueDate: selectedTicket.dueDate,
                      });
                    }}
                    loading={isLoading}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Save
                  </LoadingButton>
                  <MUI.Button
                    onClick={handleClose}
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

EditTicketModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
  selectedTicket: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  setTickets: PropTypes.func.isRequired,
};

const Backdrop = forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <MUI.Fade in={open}>
      <div ref={ref} {...other} />
    </MUI.Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

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

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: { xs: 400, md: 500 },
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
