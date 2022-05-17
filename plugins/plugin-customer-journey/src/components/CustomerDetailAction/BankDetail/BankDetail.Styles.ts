import styled from "react-emotion";
import { Card } from "@material-ui/core";

export const BankDetailStyles = styled(Card)({
  ".card-content": {
    width: "100%",
    margin: 5,
  },
  ".card-action": {
    width: "100%",
    textAlign: "right",
  },
  ".bank-detail-header": {
    fontSize: "20px",
    fontWeight: 600,
  },
});
