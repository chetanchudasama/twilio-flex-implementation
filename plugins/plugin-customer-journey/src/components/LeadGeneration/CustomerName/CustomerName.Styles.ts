import { black, defaultSnackbarColor, theme } from "@common/components";
import { fade } from "@material-ui/core/styles/colorManipulator";
import styled from "react-emotion";

export const CustomerNameStyles = styled("div")({
  padding: "24px 24px 24px 60px",
  ".heading": {
    fontSize: 20,
    lineHeight: "24px",
    fontWeight: 600,
    color: black,
  },
  ".custom-input": {
    width: 293,
    marginTop: "0 !important",
    marginBottom: "0 !important",
  },
  ".custom-input > div": {
    marginTop: "0 !important",
    height: 40,
  },
  ".customer-name-toggle": {
    paddingBottom: "2px !important",
  },
  ".root": {
    padding: 4,
    backgroundColor: defaultSnackbarColor,
    borderRadius: 3,
    width: "fit-content",
    boxShadow: "none",
  },
  ".button": {
    "&:first-child": {
      marginLeft: 0,
    },
    "&:last-child": {
      marginRight: 0,
    },
    marginLeft: 2,
    marginRight: 2,
    fontWeight: 600,
    borderRadius: "3px !important",
    color: `${fade(theme.palette.common.black, 0.6)} !important`,
    padding: theme.spacing.unit * 4,
  },
  ".selected": {
    backgroundColor: `${theme.palette.common.white} !important`,
    color: `${theme.palette.secondary.main} !important`,
    boxShadow:
      "0px 1px 5px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 3px 1px -2px rgb(0 0 0 / 12%)",
    borderRadius: "3px !important",
  },
  ".label": {
    textTransform: "none",
  },
});
