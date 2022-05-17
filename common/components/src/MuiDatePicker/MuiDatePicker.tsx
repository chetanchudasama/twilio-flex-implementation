import React, { useEffect, useState } from "react";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  DateTimePicker,
} from "material-ui-pickers";
import type { MouseEvent } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  Icon,
  IconButton,
  MuiThemeProvider,
  InputLabel,
} from "@material-ui/core";
import { DatePickerStyles, muiTheme } from "./MuiDatePicker.Styles";

export interface DateTimePickerProps {
  value: Date | string | null;
  label?: string;
  format?: string;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isRequired?: boolean;
  isDisabled?: boolean;
  error?: boolean;
  showDateTimePicker?: boolean;
  isOutlinedVariant?: boolean; // if true, component will be displayed as outlined input
  handleDateChange: (newDate: Date | null) => void;
}

export const MuiDatePicker: React.FC<DateTimePickerProps> = ({
  value,
  label,
  format,
  disableFutureDates,
  disablePastDates,
  minDate,
  maxDate,
  isRequired,
  isDisabled,
  error,
  showDateTimePicker,
  handleDateChange,
  isOutlinedVariant,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | string | null>(null);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const onValueChange = (newValue: Date) => {
    if (isDisabled) {
      return;
    }
    setSelectedDate(newValue);
    handleDateChange(newValue);
  };

  const handleClear = (event: MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      return;
    }
    event.stopPropagation();
    setSelectedDate(null);
    handleDateChange(null);
  };

  const props = {
    className: "date-picker",
    allowKeyboardControl: true,
    value: selectedDate,
    onChange: onValueChange,
    disableFuture: disableFutureDates || false,
    disablePast: disablePastDates || false,
    minDate,
    maxDate,
    disableOpenOnEnter: true,
    required: isRequired,
    error: !!error,
    disabled: isDisabled,
    fullWidth: true,
    InputProps: {
      endAdornment: selectedDate && !isDisabled && (
        <IconButton
          onClick={(e: MouseEvent<HTMLElement>) => handleClear(e)}
          className="clear-icon"
        >
          <Icon>clear</Icon>
        </IconButton>
      ),
    },
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <DatePickerStyles>
        {isOutlinedVariant && (
          <InputLabel
            shrink
            required={isRequired}
            className={`label ${!value && error ? "label-error" : ""}`}
          >
            {label}
          </InputLabel>
        )}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="picker">
            {showDateTimePicker ? (
              <DateTimePicker
                {...props}
                ampm={false}
                showTabs={false}
                label={!isOutlinedVariant ? label || "Select DateTime" : ""}
                format={format || "dd/MM/yyyy HH:mm"}
                helperText={
                  error
                    ? `${`The ${label || "DateTime"} field is required`}`
                    : ""
                }
                variant={isOutlinedVariant ? "outlined" : "standard"}
              />
            ) : (
              <DatePicker
                {...props}
                label={!isOutlinedVariant ? label || "Select Date" : ""}
                format={format || "dd/MM/yyyy"}
                helperText={
                  error ? `${`The ${label || "Date"} field is required`}` : ""
                }
                variant={isOutlinedVariant ? "outlined" : "standard"}
              />
            )}
          </div>
        </MuiPickersUtilsProvider>
      </DatePickerStyles>
    </MuiThemeProvider>
  );
};
