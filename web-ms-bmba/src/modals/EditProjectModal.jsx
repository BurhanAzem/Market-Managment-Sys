import { Modal as BaseModal } from "@mui/base/Modal";
import * as MUI from "@mui/material";
import { css, styled } from "@mui/system";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import dayjs from "dayjs";
import { API_URL, GET_PROJECT_BY_ID_ENDPOINT } from "../Constants/Contants";
import ProjectStatusMenuChoose from "../Constants/ProjectStatusMenuChoose";
import EditProject from "../Utils/Projects/EditProject";
const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

export default function EditProjectModal({ open, setOpen, id, setProjects }) {
  const [editProjectForm, setEditProjectForm] = useState({
    projectId: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    projectStatus: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingToGetProject, setIsLoadingToGetProject] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("loginInfo"));

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = dateObject.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const SetEditProjectFormData = async () => {
    const url = new URL(`${API_URL}${GET_PROJECT_BY_ID_ENDPOINT}`);
    url.searchParams.append("projectId", id);
    setIsLoadingToGetProject(true);
    try {
      const res = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res && res.data) {
        let project = res.data;
        const startDate = formatDate(project["startDate"]);
        const endDate = formatDate(project["endDate"]);

        project.projectId = project.id;
        delete project.id;

        const updatedProject = {
          ...project,
          startDate: dayjs(startDate),
          endDate: dayjs(endDate),
        };

        setEditProjectForm(updatedProject);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingToGetProject(false);
    }
  };

  useEffect(() => {
    SetEditProjectFormData();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const { editProject } = EditProject({
      editProjectForm,
      setIsLoading,
      setProjects,
      handleClose,
    });
    editProject();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleStatusChange = (e) => {
    setEditProjectForm({ ...editProjectForm, projectStatus: e.target.value });
  };

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
          {isLoadingToGetProject ? (
            <ModalContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                minWidth: { xs: 340, md: 400 },
              }}
            >
              <MUI.CircularProgress />
            </ModalContent>
          ) : (
            <ModalContent sx={style}>
              <MUI.Stack py={0} direction="row" justifyContent="space-between">
                <MUI.Typography variant="h6" id="transition-modal-title">
                  Edit your project
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
                    value={editProjectForm.name}
                    onChange={(e) =>
                      setEditProjectForm({
                        ...editProjectForm,
                        name: e.target.value,
                      })
                    }
                  />
                  <MUI.TextField
                    required
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    value={editProjectForm.description}
                    onChange={(e) =>
                      setEditProjectForm({
                        ...editProjectForm,
                        description: e.target.value,
                      })
                    }
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
                          value={editProjectForm.startDate}
                          onChange={(e) =>
                            setEditProjectForm({
                              ...editProjectForm,
                              startDate: `${e.$y}-${e.$M + 1}-${e.$D}`,
                            })
                          }
                        />
                      </DemoItem>
                      <DemoItem label="End Date">
                        <DatePicker
                          defaultValue={yesterday}
                          disablePast
                          views={["year", "month", "day"]}
                          value={editProjectForm.endDate}
                          onChange={(e) =>
                            setEditProjectForm({
                              ...editProjectForm,
                              endDate: `${e.$y}-${e.$M + 1}-${e.$D}`,
                            })
                          }
                        />
                      </DemoItem>
                    </MUI.Stack>
                  </LocalizationProvider>
                  <ProjectStatusMenuChoose
                    ProjectForm={editProjectForm}
                    handleStatusChange={handleStatusChange}
                  />
                  <MUI.Stack width="100%" direction="row" gap={2}>
                    <LoadingButton
                      variant="contained"
                      loading={isLoading}
                      color="primary"
                      type="submit"
                    >
                      Update
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
          )}
        </MUI.Fade>
      </Modal>
    </div>
  );
}

EditProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  setProjects: PropTypes.func.isRequired,
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

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
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
  minWidth: { xs: 340, md: 400 },
  display: "flex",
  flexDirection: "column",
  gap: "10px",
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
