import { CustomSelect } from "@common/components";
import { MenuItem } from "@material-ui/core";
import React from "react";
import { VehicleSortingOptions } from "../../../common/enum";

type Props = {
  sort: VehicleSortingOptions;
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SortDropdown: React.FC<Props> = ({ sort, onSortChange }) => (
  <CustomSelect onChange={onSortChange} value={sort}>
    <MenuItem value={VehicleSortingOptions.PriceDescending}>
      Sort by: Price (High to Low)
    </MenuItem>
    <MenuItem value={VehicleSortingOptions.PriceAscending}>
      Sort by: Price (Low to High)
    </MenuItem>
    <MenuItem value={VehicleSortingOptions.AgeAscending}>
      Sort by: Age Ascending (Newest first)
    </MenuItem>
  </CustomSelect>
);
