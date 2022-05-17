import {
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { CustomMultiSelectStyles } from "./CustomMultiSelect.Styles";
import { ItemModel } from "../models/ItemModel";
import { VehicleModelData } from "../models/VehicleModelData";
import { VehicleMakeData } from "../models/VehicleMakeData";

interface CustomMultiSelectProps {
  value: string | number | number[] | string[];
  errors?: string[];
  onChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    child: React.ReactNode
  ) => void;
  onDelete: (value: string | number) => void;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
  itemList: VehicleModelData[] | ItemModel[] | VehicleMakeData[];
  placeholder?: string;
}

type Props = WithStyles<typeof CustomMultiSelectStyles> &
  CustomMultiSelectProps;

const CustomMultiSelectComponent: React.FC<Props> = (props) => {
  const {
    value,
    errors,
    onChange,
    onDelete,
    label,
    isRequired,
    disabled,
    itemList,
    placeholder,
    classes,
    children,
  } = props;

  const getChipLabel = (selectedValue: string | number) => {
    const itemValue = itemList.find((item) => item.id === selectedValue);
    return itemValue ? itemValue.name : "";
  };

  return (
    <FormControl
      fullWidth
      error={errors ? errors.length > 0 : undefined}
      margin="dense"
      className={classes.formControl}
    >
      {label && (
        <InputLabel
          shrink
          className={classes.label}
          required={!!isRequired}
          error={errors ? errors.length > 0 : false}
        >
          {label}
        </InputLabel>
      )}
      <Select
        multiple
        value={value}
        onChange={onChange}
        error={errors ? errors.length > 0 : undefined}
        input={<OutlinedInput labelWidth={0} name={label} margin="dense" />}
        margin="dense"
        className={`${label ? classes.selectWithLabel : classes.select} ${
          disabled ? classes.disabled : ""
        }`}
        disabled={disabled}
        renderValue={(selected) =>
          (selected as number[]).length > 0 &&
          ((selected as number[]).includes(-1) ? (
            placeholder
          ) : (
            <div className={classes.chips}>
              {(selected as number[]).map((selectedValue, index) => (
                <Chip
                  onDelete={() => onDelete(selectedValue)}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${label}-${index}`}
                  label={getChipLabel(selectedValue)}
                  className={classes.chip}
                />
              ))}
            </div>
          ))
        }
      >
        {children}
      </Select>
      {errors &&
        errors.map((e, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <FormHelperText error key={`${label}-${i}`}>
            {e}
          </FormHelperText>
        ))}
    </FormControl>
  );
};
export const CustomMultiSelect = withStyles(CustomMultiSelectStyles)(
  CustomMultiSelectComponent
);
