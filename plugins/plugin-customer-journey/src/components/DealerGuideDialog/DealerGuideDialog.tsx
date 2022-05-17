import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { DealerStateType } from "../../common/enum";
import { DealerGuideStyles } from "./DealerGuideDialog.Styles";
import { DealerGuideDialogProps } from "./DealerGuideDialog.Props";

export const DealerGuideDialog: React.FC<DealerGuideDialogProps> = ({
  open,
  handleDialogClose,
  dealerState,
}) => {
  const unknownDealerAgentGuide = (
    <Grid container>
      <Grid item xs={12} className="sub-heading">
        Provisional Dealer Checks
      </Grid>
      <Grid item xs={12}>
        <Grid className="padding-bottom">
          The following checks can help indicate whether a dealer is likely to
          pass the Dealer Set-up process:
        </Grid>
        <Grid className="padding-bottom">
          <ul className="unknown-guide-list">
            <li>Do they have a professional website?</li>
            <li>
              Do they offer their own finance options or work with other
              lenders?
            </li>
            <li>Do they display clear contact details?</li>
            <li>
              Is the car that the customer is looking to purchase advertised
              online?
            </li>
            <li>Have images of stock been taken on their premises?</li>
            <li>Do they have clear signage displaying the dealership name?</li>
          </ul>
        </Grid>
        <Grid className="padding-bottom">
          If you&apos;re not sure whether the dealer will pass, email&nbsp;
          <a
            href="mailto:DSU@carfinance247.co.uk"
            className="link"
            target="blank"
          >
            DSU@carfinance247.co.uk
          </a>
          &nbsp;who may be able to run additional checks on your behalf.
        </Grid>
      </Grid>
      <Grid item xs={12} className="sub-heading">
        Next Steps
      </Grid>
      <Grid item xs={12}>
        If the vehicle is available and the customer wishes to proceed, the
        dealer will receive the relevant set-up form and a request for any
        required documents. We’ll also request an invoice when we issue
        documentation to the customer.
      </Grid>
    </Grid>
  );

  const approvedForDCIDealerAgentGuide = (
    <Grid container>
      <Grid item xs={12} className="padding-bottom">
        The Approved DCI process allows us to work with dealers that typically
        won’t work with external finance companies.You can find the Call Guide
        for these deals&nbsp;
        <a
          className="link"
          href="https://cf247.sharepoint.com/:f:/s/resources/EnK9sqnMalVBjqKZ2NuzERABBbpx-A6SLt_uDZxk158sOA?e=HqnKrE"
          target="blank"
        >
          here
        </a>
        .
      </Grid>
      <Grid item xs={12} className="padding-bottom">
        <Grid className="padding-bottom">
          You&apos;ll need to complete the template (found in Email Templates)
          and contact the customer confirming the documents they’ll need to get
          from the dealer:
        </Grid>
        <Grid>
          <ul className="approved-for-dci-list">
            <li>
              An invoice or order form from the dealer in the customer’s name
              (not CF247)
            </li>
            <li>
              A bank giro from the dealer with their sort code and account
              number
            </li>
            <li>A selfie of the customer holding their driving licence</li>
          </ul>
        </Grid>
      </Grid>
      <Grid item xs={12} className="sub-heading">
        We MUST receive all these documents before submitting a deal sheet.
      </Grid>
      <Grid item xs={12}>
        <ul className="approved-for-dci-list">
          <li>
            Upload all the documents onto the deal sheet under “Dealer
            requirements to be provided by the customer”
          </li>
          <li>
            Make sure the invoice is uploaded to “Invoice from dealer” and the
            giro is uploaded to “Dealer bank details”
          </li>
          <li>
            Please note that all dealer information will be removed from Phoenix
            as we won’t be communicating directly with the dealer
          </li>
          <li>
            Once the deal sheet has been submitted, the Docs Out team will
            prepare the documentation as normal and send the customer a
            “Confirmation of Vehicle Purchase Agreement”
          </li>
          <li>
            The customer must sign and return this agreement alongside their
            normal finance documents. It’s the Account Managers’ responsibility
            to chase the customer for these documents
          </li>
        </ul>
      </Grid>
    </Grid>
  );

  return (
    <DealerGuideStyles onClose={handleDialogClose} open={open} maxWidth="sm">
      <DialogTitle className="dialog-title">
        {dealerState === DealerStateType.Unknown && "Unknown to CarFinance 247"}
        {dealerState === DealerStateType.ApprovedForDCI &&
          "Approved DCI Process"}
        <IconButton className="close-icon" onClick={handleDialogClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="dialog-content">
        {dealerState === DealerStateType.Unknown && unknownDealerAgentGuide}
        {dealerState === DealerStateType.ApprovedForDCI &&
          approvedForDCIDealerAgentGuide}
      </DialogContent>
      <DialogActions className="dialog-action">
        <Button
          onClick={handleDialogClose}
          variant="text"
          color="secondary"
          className="close-btn"
        >
          Close
        </Button>
      </DialogActions>
    </DealerGuideStyles>
  );
};
