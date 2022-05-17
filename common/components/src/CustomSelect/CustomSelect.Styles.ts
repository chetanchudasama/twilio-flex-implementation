import { createStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";

export const selectStyles = (): StyleRules =>
  createStyles({
    formControl: {},
    label: { fontSize: "19px" },
    select: {},
    selectWithLabel: {
      marginTop: 20,
    },
    disabled: {
      opacity: 0.5,
    },
  });
