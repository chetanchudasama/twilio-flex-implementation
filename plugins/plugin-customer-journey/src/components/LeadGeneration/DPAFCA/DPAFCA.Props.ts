export interface StateToProps {
  address: string;
  dateOfBirth: string;
}

export interface DispatchToProps {}

export type DPAFCAProps = StateToProps & DispatchToProps;
