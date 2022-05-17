import { BaseWizardStepProps, WizardStepWrapper } from "@common/components";
import React, { useEffect, useState } from "react";
import { Manager } from "@twilio/flex-ui";
import * as Flex from "@twilio/flex-ui";
import { Grid } from "@material-ui/core";
import { AppState } from "../../../../states";
import { StateToProps, DispatchToProps } from "./QuoteWrapper.Props";
import { useApplicationService } from "../../../../services/application.service";
import SavedQuoteList from "../SavedQuoteList/SavedQuoteList.Container";
import { QuoteWrapperStyles } from "./QuoteWrapper.Styles";
import Loading from "../../../LoadingComponent/Loading";
import { showErrorMessage } from "../../../../Notifications";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface QuoteProps {}

export type QuoteWrapperProps = BaseWizardStepProps &
  QuoteProps &
  StateToProps &
  DispatchToProps;

export const QuoteWrapper: React.FC<QuoteWrapperProps> = (props) => {
  const {
    applicationId,
    setSavedQuotes,
    moveForward,
    moveBackward,
    nextStep,
    previousStep,
  } = props;

  const state: AppState = Manager.getInstance().store.getState();
  const applicationService = useApplicationService(
    state.flex.session.ssoTokenPayload.token
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalQuotes, setTotalQuotes] = useState<number>(0);

  const onNext = () => {
    if (moveForward) {
      moveForward();
    }
  };
  const onPrevious = () => {
    if (moveBackward) {
      moveBackward();
    }
  };

  useEffect(() => {
    if (applicationId <= 0) {
      return;
    }
    setIsLoading(true);
    applicationService
      .getQuoteList(applicationId)
      .then((response) => {
        setTotalQuotes(response.length);
        setSavedQuotes(response || []);
      })
      .catch((error) => {
        showErrorMessage(
          "Error loading quote list, please try again!",
          "",
          true
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  useEffect(() => {
    Flex.Actions.registerAction("MoveToDealSheetStep", async () => {
      onNext();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuoteWrapperStyles>
      {isLoading && <Loading />}
      {!isLoading && (
        <WizardStepWrapper
          onNext={onNext}
          onPrevious={onPrevious}
          disableNext={!totalQuotes}
          nextStep={nextStep}
          previousStep={previousStep}
        >
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <SavedQuoteList backToCarSearch={onPrevious} />
              </Grid>
            </Grid>
          </Grid>
        </WizardStepWrapper>
      )}
    </QuoteWrapperStyles>
  );
};
