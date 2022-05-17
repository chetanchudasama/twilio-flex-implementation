import { createStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";

export const CustomMultiSelectStyles = (): StyleRules =>
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
    chips: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: "-10px",
      marginBottom: "-10px",
    },
    chip: {
      margin: "2px",
      borderRadius: "5px",
      fontSize: "14px",
    },
  });
