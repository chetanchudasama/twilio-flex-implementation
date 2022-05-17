import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React from "react";
import { selectStyles } from "./CustomSelect.Styles";

interface CustomSelectProps {
  value: string | number | number[];
  errors?: string[];
  onChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    child: React.ReactNode
  ) => void;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
  renderValue?: (
    value:
      | (string | number | boolean | any)
      | (string | number | boolean | any)[]
      | undefined
  ) => React.ReactNode | undefined;
}

type Props = WithStyles<typeof selectStyles> & CustomSelectProps;

const CustomSelectContent: React.FC<Props> = (props) => {
  const {
    value,
    errors,
    onChange,
    label,
    classes,
    isRequired,
    renderValue,
    disabled,
    children,
  } = props;

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
        value={value}
        onChange={onChange}
        error={errors ? errors.length > 0 : undefined}
        input={<OutlinedInput labelWidth={0} name={label} margin="dense" />}
        margin="dense"
        className={`${label ? classes.selectWithLabel : classes.select} ${
          disabled ? classes.disabled : ""
        }`}
        renderValue={renderValue}
        disabled={disabled}
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

export const CustomSelect = withStyles(selectStyles)(CustomSelectContent);
