import { CustomerDetailModel } from "@common/components";
import { Action } from "./actionTypes";

const SET_CUSTOMER = "SET_CUSTOMER";
const SET_CUSTOMER_DETAILS = "SET_CUSTOMER_DETAILS";
const SET_TERM = "SET_TERM";

export interface CustomerState {
  customer?: CustomerDetailModel;
  term: number | null;
}

const initialState: CustomerState = {
  term: null,
};

export class Actions {
  public static setCustomer = (customer: CustomerDetailModel): Action => ({
    type: SET_CUSTOMER,
    payload: { customer },
  });

  public static setCustomerDetails = (
    key: keyof CustomerDetailModel,
    value: any
  ): Action => ({ type: SET_CUSTOMER_DETAILS, payload: { key, value } });

  public static setTerm = (value: number): Action => ({
    type: SET_TERM,
    payload: { value },
  });
}

export function reduce(
  state: CustomerState = initialState,
  action: Action
): CustomerState {
  switch (action.type) {
    case SET_CUSTOMER: {
      return {
        ...state,
        customer: action.payload.customer,
      };
    }
    case SET_CUSTOMER_DETAILS: {
      const updatedCustomer = Object.assign(state.customer || {}, {
        [action.payload.key]: action.payload.value,
      }) as unknown as CustomerDetailModel;
      return {
        ...state,
        customer: updatedCustomer,
      };
    }
    case SET_TERM: {
      const { value } = action.payload;
      return {
        ...state,
        term: value === -1 ? null : value || null,
      };
    }
    default:
      return state;
  }
}
