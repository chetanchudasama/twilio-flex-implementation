import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CustomerDetailModel } from "@common/components";

import { AppState, namespace } from "../../../states";
import { LeadGenerationContent } from "./LeadGenerationContent";
import { StateToProps, DispatchToProps } from "./LeadGenerationContent.Props";

const mapStateToProps = (state: AppState): StateToProps => {
  const customer = Object.assign(
    new CustomerDetailModel(),
    state[namespace].customer.customer
  );
  return {
    applicationId: customer.applicationId ?? 0,
    customerName: customer.fullName,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeadGenerationContent);
