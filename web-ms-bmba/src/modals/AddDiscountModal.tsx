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
import React, { FC, ReactElement, forwardRef, useEffect, useState } from "react";
import { RootActions } from "../redux/actionCreators/actionResultTypes";
import { AppDispatch, RootState } from "../redux/store/store";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { ActionType, ICloseAddDiscountModal } from "../redux/actionTypes/discountActionTypes";
import { IDiscount } from "../models/discount";
import { addDiscount } from "../redux/actionCreators/discountActions";


const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

export default function AddDiscountModal({
  productDiscountDto,
  discountId
}: {
  productDiscountDto?: IDiscount;
  discountId?: number;
}) {

  const dispatch = useDispatch<AppDispatch>();

  const isAddDiscountModalOpen: boolean = useSelector(
    (state: RootState) => state.discount.isAddDiscountModalOpen);

  const isLoading: boolean | null = useSelector(
    (state: RootState) => state.discount.loading);

  const [discount, setDiscount] = React.useState<IDiscount>({
    amount: 0.0,
    endDate: dayjs().toDate(),
    startDate: dayjs().subtract(1, 'day').toDate(),
  });
  const handleCloseModal = () => {
    dispatch<ICloseAddDiscountModal>({ type: ActionType.CLOSE_ADD_DISCOUNT_MODAL });
  };


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isAddDiscountModalOpen}
        // onClose={handleCloseModal}
        closeAfterTransition
      >


        <MUI.Fade in={true}>
          <ModalContent sx={style}>
            <MUI.Stack py={0} direction="row" justifyContent="space-between">
              <MUI.Typography variant="h6" id="transition-modal-title">
                Add Discount
              </MUI.Typography>
              <MUI.Button onClick={handleCloseModal} sx={{ color: "#000" }} >
                <CloseIcon />
              </MUI.Button>
            </MUI.Stack>
            <MUI.Divider />
            <MUI.Stack gap={2}>
              <MUI.TextField
                required
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                size="small"
                value={discount.amount} onChange={(event: { target: { value: any; }; }) => setDiscount(prevDiscount => ({ ...prevDiscount, amount: event.target.value }))}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MUI.Stack direction="row" gap={1}>
                  <DatePicker
                    label="Start Date"
                    disablePast
                    views={['year', 'month', 'day']}
                    value={dayjs(discount.startDate)}
                    onChange={(newValue) => {
                      if (newValue) {
                        setDiscount((prevDiscount) => ({
                          ...prevDiscount,
                          startDate: newValue.toDate(),
                        }));
                      }
                    }}
                  />
                  <DatePicker
                    label="End Date"
                    disablePast
                    views={['year', 'month', 'day']}
                    value={dayjs(discount.endDate)}
                    onChange={(newValue) => {
                      if (newValue) {
                        setDiscount((prevDiscount) => ({
                          ...prevDiscount,
                          endDate: newValue.toDate(),
                        }));
                      }
                    }}
                  />
                </MUI.Stack>
              </LocalizationProvider>

              <MUI.Stack width="100%" direction="row" gap={2}>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  color="primary"
                  onClick={() => { productDiscountDto=discount; dispatch(addDiscount(discount)) }}
                >
                  Add
                </LoadingButton>
                <MUI.Button
                  onClick={handleCloseModal}
                  variant="outlined"
                  color="error"
                >
                  Cancel
                </MUI.Button>
              </MUI.Stack>
            </MUI.Stack>
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
