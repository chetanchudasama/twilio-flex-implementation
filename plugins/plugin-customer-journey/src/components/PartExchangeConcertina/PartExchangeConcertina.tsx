import { Shared, CustomInput } from "@common/components";
import React, { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import type { AppState } from "states";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Button,
  InputLabel,
} from "@material-ui/core";
import { Manager } from "@twilio/flex-ui";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { showErrorMessage } from "../../Notifications";
import { useApplicationService } from "../../services/application.service";
import { PartExchangeStyles } from "./PartExchangeConcertina.Styles";

export interface OwnProps {
  partExchangeRegistration?: string;
}

type PXValuation = number | string;

const errorMessage =
  "Error fetching Part Exchange Valuation, please try again!";
const panelName = "partExchangeConcertina";
const initialPriceDisplay = "--";
const toDisplayInfo = (s: PXValuation) =>
  s === initialPriceDisplay ? s : Shared.getFormattedCurrencyValue(Number(s));
const stringIsNullOrEmpty = (s?: string) =>
  s === "" || s === null || s === undefined;

export const PartExchangeConcertina: React.FC<OwnProps> = ({
  partExchangeRegistration,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [vehicleMileage, setVehicleMileage] = useState("");
  const [registration, setRegistration] = useState(partExchangeRegistration);
  const [glassTrade, setGlassTrade] =
    useState<PXValuation>(initialPriceDisplay);
  const [retailTransactedValue, setRetailTransactedValue] =
    useState<PXValuation>(initialPriceDisplay);
  const [retailAsking, setRetailAsking] =
    useState<PXValuation>(initialPriceDisplay);

  const handleTogglePanel = (panel: string) =>
    setExpanded((prevPanel) => (prevPanel !== panel ? panel : false));
  const state: AppState = Manager.getInstance().store.getState();
  const token: string = useMemo(
    () => state.flex.session.ssoTokenPayload.token ?? "",
    [state.flex.session.ssoTokenPayload]
  );

  // disable button whgen clicikeing

  const applicationService = useApplicationService(token);

  const onPartExchangeValuationClick = async () => {
    if (!registration || !vehicleMileage) {
      return;
    }

    try {
      setHasError(false);
      setButtonDisabled(true);
      setGlassTrade(initialPriceDisplay);
      setRetailAsking(initialPriceDisplay);
      setRetailTransactedValue(initialPriceDisplay);
      const response = await applicationService.getPartExchangeValuation(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        registration!, // not going to be undefined here as button will be disabled if it is
        Number(vehicleMileage)
      );

      if (response) {
        const { tradeValue, retailValue, retailTransacted } = response;
        setGlassTrade(tradeValue);
        setRetailAsking(retailValue);
        setRetailTransactedValue(retailTransacted);
      }
    } catch (e) {
      // notification?
      showErrorMessage(errorMessage, "", true);
      setHasError(true);
    } finally {
      setButtonDisabled(false);
    }
  };

  const onMileageChange = (mileage: string) => {
    if (Shared.isNumericValue(mileage) || mileage === "") {
      setVehicleMileage(mileage);
    }
  };

  return (
    <PartExchangeStyles>
      <ExpansionPanel
        expanded={expanded === panelName}
        onChange={() => handleTogglePanel(panelName)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
        >
          <div>Value PX</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container item xs={12}>
            <Grid item xs={5} className="vrm-container">
              <CustomInput
                label="VRM"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRegistration(e.target.value)
                }
                value={registration ?? ""}
              />
            </Grid>
            <Grid item xs={5} className="mileage-container">
              <CustomInput
                label="Mileage"
                onChange={(event) => onMileageChange(event.target.value)}
                value={vehicleMileage ?? ""}
              />
            </Grid>
            <Grid item xs={2} className="value-px-container">
              <Button
                className="value-px-btn"
                disabled={
                  buttonDisabled ||
                  stringIsNullOrEmpty(vehicleMileage?.toString()) ||
                  stringIsNullOrEmpty(registration)
                }
                onClick={onPartExchangeValuationClick}
              >
                Value PX
              </Button>
            </Grid>
            {hasError && (
              <Grid item xs={12} className="error-message">
                {errorMessage}
              </Grid>
            )}
            <Grid container className="panel-second-row" item xs={12}>
              <Grid item xs={4}>
                <InputLabel>Glass&apos;s Trade</InputLabel>
                <div id="px-glass-trade" className="value-px-item">
                  {toDisplayInfo(glassTrade)}
                </div>
              </Grid>
              <Grid item xs={4}>
                <InputLabel>Retail Transacted</InputLabel>
                <div id="px-retail-transacted" className="value-px-item">
                  {toDisplayInfo(retailTransactedValue)}
                </div>
              </Grid>
              <Grid item xs={4}>
                <InputLabel>Retail Asking</InputLabel>
                <div id="px-retail-asking" className="value-px-item">
                  {toDisplayInfo(retailAsking)}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </PartExchangeStyles>
  );
};
