import { createStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";

export const inputStyles = (): StyleRules =>
  createStyles({
    formControl: {},
    label: { fontSize: "19px" },
    input: {
      marginTop: 20,
    },
    disabled: {
      opacity: 0.8,
    },
  });
