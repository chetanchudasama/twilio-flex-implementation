import React from "react";
import { VehicleSearchRequestModel } from "../../../../../models/VehicleSearchRequestModel";

interface MockProps {
  setFilters: (vehicleSearchRequest: VehicleSearchRequestModel) => void;
}

const MockCarSearchCriteria: React.FC<MockProps> = ({ setFilters }) => (
  <div>
    <button
      type="button"
      className="search-btn"
      onClick={() =>
        setFilters(
          Object.assign(new VehicleSearchRequestModel(), {
            distance: 4,
          })
        )
      }
    >
      Search
    </button>
  </div>
);

export default MockCarSearchCriteria;
