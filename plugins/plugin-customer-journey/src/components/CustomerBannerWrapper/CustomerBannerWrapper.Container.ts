import {
  CustomerBannerProps,
  CustomerDetailModel,
  Shared,
} from "@common/components";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState, namespace } from "../../states";
import { Actions } from "../../states/customer";
import CustomerBannerWrapper from "./CustomerBannerWrapper";
import { HistoryDetailActions } from "../../states/historyDetail";
import { getWorkerIsAvailableForOutboundCall } from "../../states/selectors";

export interface StateToProps extends CustomerBannerProps {
  isCustomerAvailable: boolean;
  applicationId: number;
  canMakeCall: boolean;
}

export interface DispatchToProps {
  setCustomer: (customer: CustomerDetailModel) => void;
  setCustomerDetails: (key: keyof CustomerDetailModel, value: any) => void;
  addNoteDetail: (content: string, isImportant: boolean) => void;
}

const mapStateToProps = (state: AppState): StateToProps => {
  const customer: CustomerDetailModel = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );
  const name = customer.fullName;
  const dob = Shared.getFormattedDate(customer.dateOfBirth, "DD/MM/YYYY");
  const {
    address,
    mobileNumber,
    emailAddress,
    callbackBooked,
    applicationId,
    hasThirdPartyAuthorization,
    thirdPartyAuthorization,
    hasVulnerableCustomerReported,
    vulnerableCustomerInformation,
  } = customer;

  const canMakeCall = getWorkerIsAvailableForOutboundCall(state);
  const { applicationStatusName } = customer.applicationStatus;
  const { lenderName, tierName } = customer.preferredLender;
  const apr = customer.preferredLender.apr ?? 0;
  return {
    isCustomerAvailable: !!state[namespace].customer.customer,
    name,
    dob,
    address,
    mobileNumber,
    emailAddress,
    callbackBooked,
    applicationId,
    hasThirdPartyAuthorization,
    applicationStatusName,
    hasVulnerableCustomerReported,
    thirdPartyAuthorization,
    vulnerableCustomerInformation,
    saveThirdPartyDetailHandler: () => {},
    saveVulnerableCustomerInformation: () => {},
    setCallbackDetail: () => {},
    canMakeCall,
    makeCall: () => {},
    lenderName,
    apr,
    tierName,
    updateCustomerDetail: () => {},
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  setCustomer: bindActionCreators(Actions.setCustomer, dispatch),
  setCustomerDetails: bindActionCreators(Actions.setCustomerDetails, dispatch),
  addNoteDetail: bindActionCreators(
    HistoryDetailActions.addNoteDetail,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerBannerWrapper);
