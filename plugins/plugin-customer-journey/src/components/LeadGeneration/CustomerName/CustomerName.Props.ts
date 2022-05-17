export interface StateToProps {
  firstName: string;
  fullName: string;
}

export interface DispatchToProps {}

export interface OwnProps {
  updateCustomerPreferredName: (preferredName: string) => void;
}

export type CustomerNameProps = StateToProps & DispatchToProps & OwnProps;
