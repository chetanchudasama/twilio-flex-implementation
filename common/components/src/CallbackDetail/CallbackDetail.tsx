import { Icon, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { CallbackStyles } from "./CallbackDetail.Styles";
import { Shared } from "../shared/Shared";
import { CallbackDialog } from "../CallbackDialog/CallbackDialog";

export interface CallbackDetailProps {
  callbackBooked?: Date;
  setCallbackDetail: (callback: Date | null, note?: string) => void;
}

export const CallbackDetail: React.FC<CallbackDetailProps> = ({
  callbackBooked,
  setCallbackDetail,
}) => {
  const [openCallbackDialog, setOpenCallbackDialog] = useState(false);

  useEffect(() => {
    setOpenCallbackDialog(false);
  }, [callbackBooked]);

  return (
    <CallbackStyles>
      <div className={callbackBooked ? "callback-booked" : ""}>
        {callbackBooked ? (
          <div>
            <div>Call back booked</div>
            <div>
              <span className="callback-date">
                {Shared.getFormattedDate(callbackBooked, "DD/MM/YYYY, HH:mm")}
              </span>
              <span>
                <Icon
                  className="edit-icon"
                  onClick={() => setOpenCallbackDialog(true)}
                >
                  edit
                </Icon>
              </span>
            </div>
          </div>
        ) : (
          <Button
            variant="outlined"
            className="callback-btn"
            onClick={() => setOpenCallbackDialog(true)}
          >
            <Icon className="callback-icon" fontSize="small">
              phone_enabled
            </Icon>
            Set Callback
          </Button>
        )}
      </div>
      {openCallbackDialog && (
        <CallbackDialog
          open={openCallbackDialog}
          callbackBooked={callbackBooked}
          setCallbackDetail={setCallbackDetail}
          handleCloseDialog={() => {
            setOpenCallbackDialog(false);
          }}
        />
      )}
    </CallbackStyles>
  );
};
