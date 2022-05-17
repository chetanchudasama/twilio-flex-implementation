import { BaseWizardStepProps, WizardStepWrapper } from "@common/components";
import { Grid, Tabs, Tab } from "@material-ui/core";
import * as Flex from "@twilio/flex-ui";

import React, { useState, useMemo, useEffect } from "react";
import { Manager } from "@twilio/flex-ui";

import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useApplicationService } from "../../../../services/application.service";
import { AppState } from "../../../../states";
import { CarSearchWrapperStyles } from "./CarSearchWrapper.Styles";
import { StateToProps, DispatchToProps } from "./CarSearchWrapper.Props";
import CarSearchResult from "../CarSearchResult/CarSearchResult.Container";
import { showErrorMessage } from "../../../../Notifications";
import CarSearchCriteria from "../CarSearchCriteria/CarSearchCriteria.Container";
import { useStaticService } from "../../../../services/static.service";
import { useVehicleService } from "../../../../services/vehicle.service";
import SavedCarsList from "../SavedCarsList/SavedCarsList.Container";
import { VehicleDetailModel } from "../../../../models/VehicleDetailModel";
import { VehicleSummaryDetailModel } from "../../../../models/VehicleSummaryDetailModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OwnProps {}

export type ComponentProps = StateToProps &
  DispatchToProps &
  OwnProps &
  BaseWizardStepProps;

const CarSearchWrapper: React.FC<ComponentProps> = ({
  applicationId,
  filters,
  hasSavedQuotes,
  savedVehicleCount,
  isVehicleStaticDataFetched,
  postCode,
  setVehicleStaticDataFetched,
  setVehicleSearchDropdownData,
  moveForward,
  moveBackward,
  setSavedVehicles,
  setSavedQuotes,
  setVehicles,
  setTotalVehicles,
  nextStep,
  previousStep,
  vrmFilters,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const applicationService = useApplicationService(
    state.flex.session.ssoTokenPayload.token
  );
  const token: string = useMemo(() => {
    return state.flex.session.ssoTokenPayload.token ?? "";
  }, [state.flex.session.ssoTokenPayload]);

  const phoenixToken: string = useMemo(() => {
    console.log(
      "SETTING PHOENIX TOKEN MEMO WITH VALUE",
      state.crm?.crmState?.phoenixToken
    );
    return state.crm?.crmState?.phoenixToken ?? "";
  }, [state.crm?.crmState?.phoenixToken]);

  const staticService = useStaticService(token, phoenixToken);
  const vehicleService = useVehicleService(token, phoenixToken);

  const [currentTab, setTab] = useState<number>(0);

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
    applicationService.getQuoteList(applicationId).then((response) => {
      setSavedQuotes(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  useEffect(() => {
    if (applicationId <= 0) {
      return;
    }
    applicationService.getSavedVehicles(applicationId).then((response) => {
      setSavedVehicles(
        response.map((r) => Object.assign(new VehicleDetailModel(), r))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  useEffect(() => {
    // get vehicle search dropdown data
    if (isVehicleStaticDataFetched) {
      return;
    }

    staticService
      .getVehicleSearchDropdownData()
      .then((response) => {
        // TODO - decide where to return these from
        // Hard code distances for now
        response.distance = [1, 2, 3, 4, 5, 10, 15, 20, 30, 50, 100, 200, 300];

        setVehicleSearchDropdownData(response);
        setVehicleStaticDataFetched(true);
      })
      .catch((error) => {
        showErrorMessage("Something went wrong, please try again!", "", true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchVehicle = () => {
    // eslint-disable-next-line no-param-reassign
    filters.postcode = postCode;
    vehicleService
      .vehicleSearch(filters)
      .then((response) => {
        setVehicles(
          response.vehicles.map((v) =>
            Object.assign(new VehicleSummaryDetailModel(), v)
          )
        );
        setTotalVehicles(response.total);
      })
      .catch((error) => {
        showErrorMessage("Something went wrong, please try again!", "", true);
      });
  };

  useEffect(() => {
    if (filters.distance) {
      searchVehicle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    Flex.Actions.registerAction(
      "MoveToCarSearchStep",
      async (payload: { tabIndex: number }) => {
        setTab(payload.tabIndex);
      }
    );
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setTab(value);
  };

  const [height, setHeight] = useState("fit-content");

  useEffect(() => {
    let timeout: any = null;
    const calculateHeight = () => {
      // get twilio header height
      const twilioHeading =
        document.getElementsByClassName("Twilio-MainHeader");
      let twilioHeadingHeight = 0;
      if (twilioHeading && twilioHeading.length) {
        twilioHeadingHeight = (twilioHeading[0] as HTMLElement).offsetHeight;
      }
      const customerBanner = document.getElementsByClassName("customer-banner");
      let customerBannerHeight = 0;
      if (customerBanner && customerBanner.length) {
        customerBannerHeight = (customerBanner[0] as HTMLElement).offsetHeight;
      }

      const actionContainer =
        document.getElementsByClassName("actionContainer");
      let actionContainerHeight = 0;
      if (actionContainer && actionContainer.length) {
        actionContainerHeight = (actionContainer[0] as HTMLElement)
          .offsetHeight;
      }

      const stepper = document.getElementsByClassName("stepper");
      let stepperHeight = 0;
      if (stepper && stepper.length) {
        stepperHeight = (stepper[0] as HTMLElement).offsetHeight;
      }

      const tabContainer = document.getElementsByClassName("tab-container");
      let tabContainerHeight = 0;
      if (tabContainer && tabContainer.length) {
        tabContainerHeight = (tabContainer[0] as HTMLElement).offsetHeight;
      }

      timeout = setTimeout(() => {
        let h = "fit-content";
        if (
          twilioHeadingHeight > 0 ||
          customerBannerHeight > 0 ||
          actionContainerHeight > 0 ||
          stepperHeight > 0 ||
          tabContainerHeight > 0
        ) {
          h = `${
            window.innerHeight -
            twilioHeadingHeight -
            customerBannerHeight -
            actionContainerHeight -
            stepperHeight -
            tabContainerHeight -
            15
          }px`;
        }
        if (h !== height) {
          setHeight(h);
        }
      }, 0);
    };
    // update height on window resize
    document.addEventListener("pointermove", calculateHeight);
    calculateHeight();
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("pointermove", calculateHeight);
    };
  }, [height, currentTab]);

  useEffect(() => {
    if (vrmFilters.vrm) {
      vehicleService
        .vehicleSearchByVRM(vrmFilters)
        .then((response) => {
          if (response.vehicles && response.vehicles.length > 0) {
            setVehicles(
              response.vehicles.map((v) =>
                Object.assign(new VehicleSummaryDetailModel(), v)
              )
            );
          }
          setTotalVehicles(response.total);
        })
        .catch(() => {
          showErrorMessage("Something went wrong, please try again!", "", true);
        });
    }
  }, [setTotalVehicles, setVehicles, vehicleService, vrmFilters]);

  return (
    <CarSearchWrapperStyles>
      <WizardStepWrapper
        onNext={onNext}
        onPrevious={onPrevious}
        disableNext={!hasSavedQuotes}
        classes={{
          content: "wizard-content",
        }}
        nextStep={nextStep}
        previousStep={previousStep}
      >
        <Grid item xs={12}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} className="tab-container">
              <Tabs
                value={currentTab}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                centered
              >
                <Tab
                  value={0}
                  label={
                    <>
                      <SearchIcon className="tab-icon" />
                      <span className="tab-title">car search</span>
                    </>
                  }
                />
                <Tab
                  value={1}
                  label={
                    <>
                      <FavoriteIcon className="tab-icon" />
                      <span className="tab-title">{`Saved Cars (${savedVehicleCount})`}</span>
                    </>
                  }
                />
              </Tabs>
            </Grid>
            <Grid item xs={12} className="tab-content" style={{ height }}>
              {currentTab === 0 && (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={16}
                >
                  <Grid item xs={12}>
                    <CarSearchCriteria />
                  </Grid>
                  <Grid item xs={12}>
                    <CarSearchResult />
                  </Grid>
                </Grid>
              )}
              {currentTab === 1 && (
                <Grid item xs={12}>
                  <SavedCarsList />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </WizardStepWrapper>
    </CarSearchWrapperStyles>
  );
};

export default CarSearchWrapper;
