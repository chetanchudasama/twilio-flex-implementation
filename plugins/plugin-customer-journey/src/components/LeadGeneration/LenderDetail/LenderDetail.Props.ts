export interface StateToProps {
  lenderName: string;
}

export interface DispatchToProps {}

export type LenderDetailProps = StateToProps & DispatchToProps;
