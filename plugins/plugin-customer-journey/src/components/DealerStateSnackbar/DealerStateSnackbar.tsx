import React, { ReactFragment, useEffect, useMemo, useState } from "react";
import {
  Grid,
  SnackbarContent,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { Shared } from "@common/components";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";

import { styles } from "./DealerStateSnackbar.Styles";
import { DealerGuideDialog } from "../DealerGuideDialog/DealerGuideDialog";
import { DealerStateType } from "../../common/enum";
import { DealerStateSnackbarProps } from "./DealerStateSnackbar.Props";

type Props = WithStyles<typeof styles> & DealerStateSnackbarProps;

const DealerStateSnackbarContent: React.FC<Props> = ({
  declinedDate,
  dealerState,
  reasonForDeclined,
  classes,
}) => {
  const [message, setMessage] = useState<ReactFragment>();
  const [type, setType] = useState<"error" | "warning">("warning");
  const [openDealerGuide, setOpenDealerGuide] = useState(false);

  const IconType = useMemo(
    () => (type === "error" ? InfoIcon : WarningIcon),
    [type]
  );

  useEffect(() => {
    const declinedMessage = (
      <>
        <div>This dealer has been declined:</div>
        <ul className={classes.listType}>
          {declinedDate && reasonForDeclined && (
            <li>
              {`${Shared.getFormattedDate(
                declinedDate,
                "DD/MM/YY"
              )} - ${reasonForDeclined}`}
            </li>
          )}
        </ul>
        <br />
        <span className={classes.declinedMessageLink}>See below</span>
        {" for similar vehicle recommendations from approved dealers."}
      </>
    );

    const unknownMessage = (
      <>
        <div>
          This dealer is unknown to us. Please confirm the checks below:
        </div>
        <br />
        <ul className={classes.listType}>
          <li>Is the dealer VAT registered?</li>
          <li>Are they FCA Authorised with credit broking permissions?</li>
          <li>Do they have a forecourt and signing?</li>
          <li>Do they have a professional website?</li>
        </ul>
        <br />
        {"For more information, "}
        <button
          type="button"
          className={classes.link}
          onClick={() => {
            setOpenDealerGuide(true);
          }}
        >
          read our guide
        </button>
        .
      </>
    );

    const approvedForDCIMessage = (
      <>
        {
          "This dealer is approved for DCI only. For information on how to proceed, "
        }
        <button
          type="button"
          className={classes.link}
          onClick={() => {
            setOpenDealerGuide(true);
          }}
        >
          read this
        </button>
        .
      </>
    );

    switch (dealerState) {
      case DealerStateType.Declined:
        setMessage(declinedMessage);
        setType("error");
        break;
      case DealerStateType.Unknown:
        setMessage(unknownMessage);
        setType("warning");
        break;
      case DealerStateType.ApprovedForDCI:
        setMessage(approvedForDCIMessage);
        setType("warning");
        break;
      default:
        break;
    }
  }, [
    classes.declinedMessageLink,
    classes.link,
    classes.listType,
    dealerState,
    declinedDate,
    reasonForDeclined,
  ]);

  return (
    <>
      <Grid item xs={12} className={classes.root}>
        <SnackbarContent
          className={`${classes.snackbarContainer} ${classes[type]}`}
          message={
            <Grid className={classes.content}>
              <IconType className={`${classes.icon} ${classes.iconVariant}`} />
              <span>{message}</span>
            </Grid>
          }
        />
      </Grid>
      {openDealerGuide && (
        <DealerGuideDialog
          open={openDealerGuide}
          handleDialogClose={() => {
            setOpenDealerGuide(false);
          }}
          dealerState={dealerState}
        />
      )}
    </>
  );
};
export const DealerStateSnackbar = withStyles(styles)(
  DealerStateSnackbarContent
);
