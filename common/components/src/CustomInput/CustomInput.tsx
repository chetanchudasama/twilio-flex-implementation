import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React from "react";
import { inputStyles } from "./CustomInput.Styles";

interface CustomSelectProps {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  errors?: string[];
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
  isRequired?: boolean;
  rows?: number;
  onBlur?: () => void;
}

type Props = WithStyles<typeof inputStyles> & CustomSelectProps;

const CustomInputContent: React.FC<Props> = (props) => {
  const {
    value,
    errors,
    onChange,
    label,
    placeholder,
    classes,
    startAdornment,
    endAdornment,
    disabled,
    isRequired,
    rows,
    onBlur,
  } = props;

  return (
    <FormControl
      fullWidth
      error={errors ? errors.length > 0 : undefined}
      margin="dense"
      className={classes.formControl}
    >
      <InputLabel
        shrink
        className={classes.label}
        required={!!isRequired}
        error={errors ? errors.length > 0 : false}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        labelWidth={0}
        value={value}
        onChange={onChange}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        error={errors ? errors.length > 0 : undefined}
        className={`${classes.input} ${disabled ? classes.disabled : ""}`}
        placeholder={placeholder}
        disabled={disabled}
        multiline={!!rows}
        rows={rows}
        onBlur={onBlur}
      />
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

export const CustomInput = withStyles(inputStyles)(CustomInputContent);
