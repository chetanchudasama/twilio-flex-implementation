import { connect } from "react-redux";
import { Dispatch } from "redux";
import { QualifyDetail } from "./QualifyDetail";
import { AppState, namespace } from "../../../states";
import { StateToProps, DispatchToProps } from "./QualifyDetail.Props";

const mapStateToProps = (state: AppState): StateToProps => ({
  monthlyIncome:
    state[namespace].customer.customer?.bankDetails?.netMonthlyIncome ?? 0,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(QualifyDetail);
