import { CustomerDetailModel, CustomerDetailType } from "@common/components";
import { Grid } from "@material-ui/core";
import * as Flex from "@twilio/flex-ui";
import { Manager, TaskContextProps } from "@twilio/flex-ui";
import React, { useEffect, useMemo, useState } from "react";
import { showErrorMessage } from "../../Notifications";
import { useApplicationService } from "../../services/application.service";
import { AppState } from "../../states";
import CustomerBannerContainer from "../CustomerBannerWrapper/CustomerBannerWrapper.Container";
import DPADialogWrapper from "../DPADialogWrapper/DPADialogWrapper.Container";
import HistoryPanelWrapper from "../HistoryPanel/HistoryPanelWrapper/HistoryPanelWrapper.Container";
import Loading from "../LoadingComponent/Loading.Container";
import WizardContainer from "../Wizard/Wizard.Container";
import { CustomCRMViewContentProps } from "./CustomCRMViewContent.Props";
import { CustomCRMViewContentStyles } from "./CustomCRMViewContent.Styles";
import CustomerDetailActionContainer from "../CustomerDetailAction/CustomerDetailActionContent.Container";
import LeadGenerationWrapper from "../LeadGeneration/LeadGenerationWrapper/LeadGenerationWrapper.Container";

const allowedTaskStatus = ["accepted", "wrapping"];
const leadGenTaskType = "LG";

const CustomCRMViewContent: React.FC<
  CustomCRMViewContentProps & TaskContextProps
> = ({
  task,
  setCustomer,
  setHistoryDetailList,
  setSelectedAppId,
  selectedAppId,
  useZingWorkscreen,
  currentAppId,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const applicationService = useApplicationService(
    state.flex.session.ssoTokenPayload.token
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<boolean>(false);
  const [isDPAPassed, setIsDPAPassed] = useState<boolean>(true);
  const [customerDetailType, setCustomerDetailType] =
    useState<CustomerDetailType | null>(null);
  const [applicationId, setApplicationId] = useState<number>(0);
  const [showLeadGenerationTaskView, setShowLeadGenerationTaskView] =
    useState<boolean>(false);

  const taskStatus = useMemo(() => {
    return task?.status ?? "";
  }, [task]);

  useEffect(() => {
    if (allowedTaskStatus.includes(taskStatus)) {
      setShowLeadGenerationTaskView(
        !!(
          task?.attributes.type &&
          task?.attributes.type.toLowerCase() === leadGenTaskType.toLowerCase()
        )
      );
      setApplicationId(task?.attributes.applicationId);
    } else {
      currentAppId ? setApplicationId(currentAppId) : setApplicationId(0);
      setShowLeadGenerationTaskView(false);
    }
  }, [task?.attributes.applicationId, taskStatus, task?.attributes.type]);

  // if the development mode flag is set to true, always load the plugin
  // the flag should be set to false for production environments
  const devMode = process.env.REACT_APP_DEVELOPMENT_MODE || false;

  if (devMode) {
    // eslint-disable-next-line no-param-reassign
    useZingWorkscreen = true;
  }

  const showContent = useMemo(() => {
    if (
      isLoading ||
      error ||
      applicationId <= 0 ||
      !isDPAPassed ||
      !useZingWorkscreen ||
      showLeadGenerationTaskView
    ) {
      return false;
    }
    return applicationId > 0;
  }, [
    applicationId,
    isLoading,
    error,
    isDPAPassed,
    useZingWorkscreen,
    showLeadGenerationTaskView,
  ]);

  const showError = useMemo(() => {
    return applicationId > 0 ? error : false;
  }, [applicationId, error]);

  useEffect(() => {
    if (applicationId <= 0) {
      return;
    }
    // switch back to wizard when task is selected
    setCustomerDetailType(null);

    if (applicationId) {
      setIsLoading(true);
      applicationService
        .getBaseDetails(applicationId)
        .then((response) => {
          setCustomer(
            response.applicationId > 0 ? response : new CustomerDetailModel()
          );
        })
        .catch((_err) => {
          setIsError(true);
          console.log("ERROR GETTING BASE APP DETAILS", _err);
        })
        .finally(() => {
          setIsLoading(false);
        });

      // get history panel detail
      if (applicationId !== selectedAppId) {
        applicationService
          .getHistoryDetails(applicationId)
          .then((response) => {
            // store data in redux
            setHistoryDetailList(response.length > 0 ? response : []);
            setSelectedAppId(applicationId);
          })
          .catch((_err) => {
            showErrorMessage(
              "Error loading history panel detail, please try again!",
              "",
              true
            );
          });
      }
    } else {
      setCustomer(new CustomerDetailModel());
    }
    // TODO: fix dependencies here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  useEffect(() => {
    /** removing DPA listener temporarily */
    // Flex.Actions.addListener("afterAcceptTask", (payload) => {
    //   if (payload.task?.attributes.applicationId > 0) {
    //     setIsDPAPassed(payload.task?.attributes.dpaPassed === true);
    //   }
    // });
    Flex.Actions.registerAction(
      "updateCustomerDetail",
      async (payload: { customerDetailType: CustomerDetailType }) => {
        setCustomerDetailType(payload.customerDetailType);
      }
    );
    // listener for custom Flex action, to load wizard for respective applicationId
    Flex.Actions.registerAction(
      "openApplication",
      async (payload: { applicationId: number; type?: string }) => {
        if (payload.applicationId > 0) {
          setShowLeadGenerationTaskView(
            !!(
              payload.type &&
              payload.type.toLowerCase() === leadGenTaskType.toLowerCase()
            )
          );
          setApplicationId(payload.applicationId);
        }
      }
    );
  }, []);

  console.log("CHECK IF ZING", useZingWorkscreen);

  return useZingWorkscreen ? (
    <CustomCRMViewContentStyles>
      {isLoading && <Loading />}
      {showError && (
        <span className="missing-app-id">
          Unable to fetch the customer details!
        </span>
      )}
      {showLeadGenerationTaskView && <LeadGenerationWrapper />}
      {showContent && (
        <Grid container spacing={0} className="grid-container">
          <Grid xs={9} item className="content-left">
            <Grid container spacing={0}>
              <Grid xs={12} item className="customer-banner">
                <CustomerBannerContainer />
              </Grid>
              <Grid xs={12} item>
                {customerDetailType ? (
                  <CustomerDetailActionContainer
                    backToWizardStepper={() => {
                      setCustomerDetailType(null);
                    }}
                    customerDetailType={customerDetailType}
                  />
                ) : (
                  <WizardContainer applicationId={applicationId} />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={3} item>
            <HistoryPanelWrapper />
          </Grid>
        </Grid>
      )}
      {/* removing DPA component temporarily */}
      {/* {!isDPAPassed && (
        <DPADialogWrapper
          applicationId={applicationId}
          closeDPADialog={() => setIsDPAPassed(true)}
        />
      )} */}
    </CustomCRMViewContentStyles>
  ) : null;
};

export default CustomCRMViewContent;
