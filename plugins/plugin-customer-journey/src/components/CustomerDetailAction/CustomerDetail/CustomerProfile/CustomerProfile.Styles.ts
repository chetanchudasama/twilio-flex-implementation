import { styled } from "@twilio/flex-ui";

export const CustomerProfileStyles = styled("div")({
  ".card-content": {
    width: "100%",
    margin: 5,
    paddingTop: 0,
  },
  ".card-action": {
    width: "100%",
  },
  ".customer-detail-title": {
    fontSize: "20px",
    fontWeight: 600,
  },
  ".update-detail-btn": {
    float: "right",
  },
  ".birthDate": {
    margin: "8px 0 4px 0",
  },
  ".birthDate .date-picker div": {
    paddingRight: 0,
  },
  ".birthDate .date-picker .clear-icon": {
    marginRight: 3,
  },
  ".birthDate .date-picker input": {
    padding: "15px 14px",
  },
  ".birthDate .picker p": {
    margin: "4px 0 0 0",
  },
});
