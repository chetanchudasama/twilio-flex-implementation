import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "../../states";
import Loading from "./Loading";
import { StateToProps, DispatchToProps } from "./Loading.Props";

const mapStateToProps = (state: AppState): StateToProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
