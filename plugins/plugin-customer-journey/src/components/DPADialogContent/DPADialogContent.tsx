import {
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import ReactCodeInput from "react-code-input";
import { borderStyle } from "@common/components";
import { DPADialogContentStyles } from "./DPADialogContent.Styles";

export interface DPADialogContentProps {
  pin?: string;
  postCode?: string;
  dateOfBirth?: string;
  onDPAFailed: () => void;
  onDPAConfirm: () => void;
  onSetNewPin: (pin: string) => void;
}

const DPADialog: React.FC<DPADialogContentProps> = ({
  pin,
  postCode,
  dateOfBirth,
  onDPAFailed,
  onDPAConfirm,
  onSetNewPin,
}) => {
  const [formattedPin, setFormattedPin] = useState<string[]>(
    Object.assign([], pin ?? "")
  );
  const [newPin, setNewPin] = useState("");
  const [userInfo, setUserInfo] = useState({
    checkedPostCode: false,
    checkedDOB: false,
  });
  const [randomNumberPositions, setRandomNumberPositions] = useState<string[]>(
    []
  );
  const [isMounted, setIsMounted] = useState(false);

  const pinCodeProps: any = {
    inputStyle: {
      fontFamily: "Open Sans",
      margin: "10px",
      MozAppearance: "textfield",
      width: "81px",
      height: "80px",
      fontSize: "30px",
      textAlign: "center",
      border: borderStyle,
    },
  };

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (pin) {
      const confirmPin = Object.assign([], pin ?? "") as string[];
      const randomDigit = Math.ceil(Math.random() * 4) + 1;
      if (randomDigit === 2) {
        confirmPin[randomDigit] = "-";
        confirmPin[0] = "-";
        setFormattedPin(confirmPin);
        setIsMounted(true);
        setRandomNumberPositions(["second", "fourth"]);
      } else {
        confirmPin[randomDigit - 2] = "-";
        confirmPin[randomDigit - 3] = "-";
        setFormattedPin(confirmPin);
        setIsMounted(true);
        if (randomDigit === 3) {
          setRandomNumberPositions(["third", "fourth"]);
        } else if (randomDigit === 4) {
          setRandomNumberPositions(["first", "fourth"]);
        } else {
          setRandomNumberPositions(["first", "second"]);
        }
      }
    }
  }, [pin]);

  useEffect(() => {
    if (inputRef.current !== null) {
      document
        .querySelectorAll("input")
        .forEach((node: HTMLInputElement) =>
          node.setAttribute("placeholder", "-")
        );
    }
  });

  const handleCheckedUserDetails = (event: any, property: string) => {
    setUserInfo({ ...userInfo, [property]: event.target.checked });
  };

  return (
    <DPADialogContentStyles>
      {pin && isMounted && (
        <>
          <div className="confirm-pin-message">
            Can you confirm the {randomNumberPositions[0]} and{" "}
            {randomNumberPositions[1]} character of your PIN please?
          </div>
          <div className="input-box">
            <ReactCodeInput
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...pinCodeProps}
              value={formattedPin}
              inputMode="numeric"
              type="text"
              name="pinCode"
              fields={4}
              className="confirm-pin-input"
            />
          </div>
          <div className="action-button-div">
            <Button
              variant="contained"
              className="button-red"
              onClick={onDPAFailed}
            >
              Failed
            </Button>
            <Button
              variant="contained"
              className="button-green button-confirm"
              onClick={onDPAConfirm}
            >
              Confirm
            </Button>
          </div>
        </>
      )}
      <div className="dialog-bottom-div">
        <div className="confirm-detail-message">
          If not set, confirm Postcode, DOB and then Set PIN
        </div>
        <FormControl>
          <FormGroup>
            <FormControlLabel
              className="form-control-label"
              control={
                <Checkbox
                  value="checkedPostCode"
                  checked={userInfo.checkedPostCode}
                  onChange={(event) =>
                    handleCheckedUserDetails(event, "checkedPostCode")
                  }
                />
              }
              label={`Postcode (${postCode || "-"})`}
            />
            <FormControlLabel
              className="form-control-label"
              control={
                <Checkbox
                  value="checkedDOB"
                  checked={userInfo.checkedDOB}
                  onChange={(event) =>
                    handleCheckedUserDetails(event, "checkedDOB")
                  }
                />
              }
              label={`Date of Birth (${dateOfBirth || "-"})`}
            />
          </FormGroup>
        </FormControl>
        <div className="confirm-pin-message">Then Set PIN</div>
        <div className="input-box-set-pin">
          <ReactCodeInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...pinCodeProps}
            ref={inputRef}
            value={newPin}
            onChange={(value) => setNewPin(value)}
            inputMode="numeric"
            type="number"
            name="setPinCode"
            fields={4}
            className="set-pin-input"
          />
        </div>
        <div className="action-button-div">
          <Button
            variant="contained"
            className={`set-pin-btn${
              !userInfo.checkedPostCode ||
              !userInfo.checkedDOB ||
              newPin.length < 4
                ? " disabled-button"
                : ""
            }`}
            onClick={() => onSetNewPin(newPin!)}
            disabled={
              !userInfo.checkedPostCode ||
              !userInfo.checkedDOB ||
              newPin.length < 4
            }
          >
            Set PIN
          </Button>
        </div>
      </div>
    </DPADialogContentStyles>
  );
};
export default DPADialog;
