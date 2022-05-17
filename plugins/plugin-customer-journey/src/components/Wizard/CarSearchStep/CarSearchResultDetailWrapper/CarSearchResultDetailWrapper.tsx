import { SnackbarMessage } from "@common/components";
import React, { useMemo, useState } from "react";
import * as Flex from "@twilio/flex-ui";
import { Manager } from "@twilio/flex-ui";
import { AppState } from "../../../../states";
import { useApplicationService } from "../../../../services/application.service";
import { ChannelType } from "../../../../common/enum";
import { showErrorMessage } from "../../../../Notifications";
import { SendCarRequestModel } from "../../../../models/SendCarRequestModel";
import { VehicleSummaryDetailModel } from "../../../../models/VehicleSummaryDetailModel";
import { VehicleDetailModel } from "../../../../models/VehicleDetailModel";
import CarSearchResultDetail from "../CarSearchResultDetail/CarSearchResultDetail";
import {
  StateToProps,
  DispatchToProps,
} from "./CarSearchResultDetailWrapper.Props";

import { useVehicleService } from "../../../../services/vehicle.service";

export interface CarSearchResultDetailWrapperProp {
  vehicleDetail: VehicleSummaryDetailModel | VehicleDetailModel;
}

export type ComponentProps = StateToProps &
  DispatchToProps &
  CarSearchResultDetailWrapperProp;

const CarSearchResultDetailWrapper: React.FC<ComponentProps> = ({
  applicationId,
  vehicleDetail,
  savedVehicles,
  mobileNumber,
  postCode,
  setSavedVehicles,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const applicationService = useApplicationService(
    state.flex.session.ssoTokenPayload.token
  );

  const phoenixToken: string = useMemo(() => {
    return state.crm?.crmState?.phoenixToken ?? "";
  }, [state.crm?.crmState?.phoenixToken]);

  const vehicleService = useVehicleService(
    state.flex.session.ssoTokenPayload.token,
    phoenixToken
  );
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarButtonText, setSnackbarButtonText] = useState("");

  const resetSnackbarDetail = () => {
    setShowSnackbar(false);
    setSnackbarMessage("");
    setSnackbarButtonText("");
  };

  const handleSendCarDetail = async (channelType: ChannelType) => {
    resetSnackbarDetail();
    try {
      const sendCarDetailModel: SendCarRequestModel = new SendCarRequestModel();
      sendCarDetailModel.applicationId = applicationId;
      sendCarDetailModel.smsTypeId = channelType;
      sendCarDetailModel.mobileNumber = mobileNumber;
      sendCarDetailModel.vehicleSearchUrl = vehicleDetail.dealer.url;

      await applicationService.sendCarDetail(sendCarDetailModel);
      setSnackbarMessage(
        `Car detail sent via ${ChannelType[channelType]} successfully!`
      );
      setShowSnackbar(true);
    } catch (error) {
      showErrorMessage("Something went wrong, please try again!", "", true);
    }
  };

  const handleSaveCarDetail = async () => {
    resetSnackbarDetail();

    try {
      const carDetail = await vehicleService.getVehicleDetail(
        vehicleDetail.vehicleId,
        postCode
      );

      const isCarAlreadySaved = savedVehicles.some(
        (v) => v.vehicleId === vehicleDetail.vehicleId
      );

      let newSavedVehicles = [...savedVehicles];

      if (isCarAlreadySaved) {
        newSavedVehicles = savedVehicles.filter(
          (v) => v.vehicleId !== vehicleDetail.vehicleId
        );
      } else {
        newSavedVehicles.push(carDetail);
      }

      await applicationService.updateSavedVehicles(
        applicationId,
        newSavedVehicles
      );

      // show snackbar message
      if (isCarAlreadySaved) {
        setSnackbarMessage("This car has been removed from saved cars.");
        setSnackbarButtonText("View Saved Cars");
      } else {
        setSnackbarMessage("This car has been added to saved cars.");
        setSnackbarButtonText("View Saved Cars");
      }
      setShowSnackbar(true);

      setSavedVehicles(newSavedVehicles);
    } catch (error) {
      showErrorMessage("Something went wrong, please try again!", "", true);
    }
  };

  const handleCloseSnackbar = (isButtonClicked: boolean) => {
    if (snackbarButtonText && isButtonClicked) {
      Flex.Actions.invokeAction("MoveToCarSearchStep", { tabIndex: 1 });
    }
    resetSnackbarDetail();
  };

  return (
    <>
      <CarSearchResultDetail
        vehicleDetail={vehicleDetail}
        sendCarDetail={handleSendCarDetail}
        saveCarDetail={handleSaveCarDetail}
        isCarSaved={savedVehicles.some(
          (vehicle: VehicleDetailModel) =>
            vehicle.vehicleId === vehicleDetail.vehicleId
        )}
      />

      {showSnackbar && (
        <SnackbarMessage
          open={showSnackbar}
          message={snackbarMessage}
          buttonText={snackbarButtonText}
          handleCloseSnackbar={handleCloseSnackbar}
        />
      )}
    </>
  );
};

export default CarSearchResultDetailWrapper;
