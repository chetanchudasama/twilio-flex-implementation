import {
  CustomerBanner,
  ThirdPartyAuthorizationDetail,
  VulnerableCustomerInformation,
  Shared,
  CustomerDetailType,
} from "@common/components";
import { Actions, Manager } from "@twilio/flex-ui";
import React from "react";
import moment from "moment";
import {
  CustomNotificationType,
  showErrorMessage,
  showMessage,
} from "../../Notifications";
import { useApplicationService } from "../../services/application.service";
import { AppState } from "../../states";
import { CustomerCallbackRequestModel } from "../../models/CustomerCallbackRequestModel";
import { UpdateDetailRequestModel } from "../../models/UpdateDetailRequestModel";
import type {
  DispatchToProps,
  StateToProps,
} from "./CustomerBannerWrapper.Props";

type Props = StateToProps & DispatchToProps;

const CustomerBannerWrapper: React.FC<Props> = (props) => {
  const {
    applicationId,
    isCustomerAvailable,
    canMakeCall,
    mobileNumber,
    setCustomerDetails,
    addNoteDetail,
  } = props;
  const state: AppState = Manager.getInstance().store.getState();
  const applicationService = useApplicationService(
    state.flex.session.ssoTokenPayload.token
  );

  const makeCallHandler = () => {
    if (canMakeCall && mobileNumber) {
      const payload = {
        destination: props.mobileNumber,
      };
      Actions.invokeAction("StartOutboundCall", payload);
    }
  };

  const saveThirdPartyDetailHandlerFunction = async (
    thirdPartyAuthorizationInfo: ThirdPartyAuthorizationDetail | null
  ) => {
    const updateRequestList: UpdateDetailRequestModel[] = [
      {
        op: "replace",
        path: "/thirdPartyAuthorization",
        value: thirdPartyAuthorizationInfo,
      },
      {
        op: "replace",
        path: "/hasThirdPartyAuthorization",
        value: !!thirdPartyAuthorizationInfo,
      },
    ];

    try {
      await applicationService.updateBaseApplicationDetail(
        applicationId,
        updateRequestList
      );
      setCustomerDetails(
        "thirdPartyAuthorization",
        thirdPartyAuthorizationInfo
      );
      setCustomerDetails(
        "hasThirdPartyAuthorization",
        !!thirdPartyAuthorizationInfo
      );
      // show success message
      showMessage(
        CustomNotificationType.SuccessNotification,
        "Third party authorization detail updated successfully!"
      );
    } catch (error) {
      showErrorMessage("Something went wrong, please try again!", "", true);
    }
  };

  const saveVulnerabilityHandler = async (
    vulnerableCustomerDetail: VulnerableCustomerInformation | null
  ) => {
    const updateRequestList: UpdateDetailRequestModel[] = [
      {
        op: "replace",
        path: "/vulnerableCustomerInformation",
        value: vulnerableCustomerDetail,
      },
      {
        op: "replace",
        path: "/hasVulnerableCustomerReported",
        value: !!vulnerableCustomerDetail,
      },
    ];
    try {
      await applicationService.updateBaseApplicationDetail(
        props.applicationId,
        updateRequestList
      );
      setCustomerDetails(
        "hasVulnerableCustomerReported",
        !!vulnerableCustomerDetail
      );
      setCustomerDetails(
        "vulnerableCustomerInformation",
        vulnerableCustomerDetail
      );
      // show success message
      showMessage(
        CustomNotificationType.SuccessNotification,
        "Customer vulnerability detail updated successfully!"
      );
    } catch (error) {
      showErrorMessage("Something went wrong, please try again!", "", true);
    }
  };

  const handleSetCallbackDetail = async (
    callbackDate: Date | null,
    reason = ""
  ) => {
    if (callbackDate) {
      // submit callback detail
      const callbackDetailModel: CustomerCallbackRequestModel =
        new CustomerCallbackRequestModel();
      callbackDetailModel.callbackDate = moment(callbackDate).utc();
      callbackDetailModel.note = reason;
      try {
        await applicationService.submitCallbackDetail(
          applicationId,
          callbackDetailModel
        );
        setCustomerDetails("callbackBooked", callbackDate);
        addNoteDetail(
          `Callback booked (${Shared.getFormattedDate(
            callbackDate,
            "DD/MM/YYYY HH:mm"
          )})\n${reason}`,
          false
        );
      } catch (error) {
        showErrorMessage("Something went wrong, please try again!", "", true);
      }
    } else {
      // delete callback detail
      const updateRequestList = [
        {
          op: "replace",
          path: "/callbackBooked",
          value: null,
        },
      ];
      try {
        await applicationService.updateBaseApplicationDetail(
          applicationId,
          updateRequestList
        );
        setCustomerDetails("callbackBooked", null);
      } catch (error) {
        showErrorMessage("Something went wrong, please try again!", "", true);
      }
    }
  };

  const updateCustomerDetail = (type: CustomerDetailType) => {
    Actions.invokeAction("updateCustomerDetail", {
      customerDetailType: type,
    });
  };

  const banner = (
    <CustomerBanner
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      saveThirdPartyDetailHandler={saveThirdPartyDetailHandlerFunction}
      saveVulnerableCustomerInformation={saveVulnerabilityHandler}
      setCallbackDetail={handleSetCallbackDetail}
      makeCall={makeCallHandler}
      updateCustomerDetail={updateCustomerDetail}
    />
  );

  return <>{isCustomerAvailable ? banner : null}</>;
};

export default CustomerBannerWrapper;
