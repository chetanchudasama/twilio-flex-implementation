import React from "react";
import { CustomerDetailModel } from "@common/components";
import { CustomerProfileProps } from "../CustomerProfile";

export const CustomerProfile: React.FC<CustomerProfileProps> = (props) => (
  <div className="customer-profile">
    <button
      type="button"
      className="update-detail-btn"
      onClick={() =>
        props.updateProfile(
          Object.assign(new CustomerDetailModel(), {
            firstName: "John",
            lastName: "Fred",
            maritalStatusId: 1,
            drivingLicenceTypeId: 1,
            emailAddress: "john@gmail.com",
            dateOfBirth: new Date("06-02-1990 00:00"),
          })
        )
      }
    >
      Update Details
    </button>
  </div>
);
