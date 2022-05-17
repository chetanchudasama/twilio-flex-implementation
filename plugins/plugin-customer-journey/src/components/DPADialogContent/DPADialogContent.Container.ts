import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "../../states";
import { StateToProps, DispatchToProps } from "./DPADialogContent.Props";

import DPADialog from "./DPADialogContent";

const mapStateToProps = (state: AppState): StateToProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DPADialog);
