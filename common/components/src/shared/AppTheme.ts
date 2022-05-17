import { createMuiTheme, Theme } from "@material-ui/core/styles";
import {
  convertHexToRGB,
  fade,
} from "@material-ui/core/styles/colorManipulator";

export const primary = "#f26a52";
export const secondary = "#5f4dd5";
export const darkPurpleHover = "#423595";
export const darkPurple = "#332495";
export const lightPurple = fade(secondary, 0.1);

export const white = "#fff";
export const black = "#000";

export const defaultBackground = "#eeeeee";
export const paddingUnit = 4;

export const darkGreen = "#64ba3d";

export const red = "#eb0f0f";

export const darkGrey = "#757575";
export const mediumGrey = "#D3D3D3";
export const lightGrey = "#f5f5f5";

export const defaultButtonBackground = "#e0e0e0";

export const customerActionWrapperBackground = "#f7f7f7";

export const borderStyle = "1px solid silver";

export const deleteButtonColor = "#79142c";

export const scrollbarColor = "#555";
export const infoSnackbarColor = "#1976d2";
export const defaultSnackbarColor = "#eee";
export const errorColor = "#f44336";
export const stepperHeaderColor = "#ddd";
export const leadGenBorderColor = "#DFE1E8";

export const theme: Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ["Open Sans"].join(","),
    caption: {
      fontSize: 14,
    },
  },
  palette: {
    primary: {
      main: primary,
      contrastText: white,
    },
    secondary: {
      main: secondary,
      contrastText: white,
    },
    background: {
      default: defaultBackground,
    },
  },
  spacing: {
    unit: paddingUnit,
  },
});

theme.overrides = {
  MuiCheckbox: {
    root: {
      color: theme.palette.secondary.main,
    },
  },
  MuiRadio: {
    root: {
      color: theme.palette.secondary.main,
    },
  },
  MuiCardContent: {
    root: {
      padding: theme.spacing.unit * 2,
      "&:last-child": {
        padding: theme.spacing.unit * 2,
      },
      "&:first-child": {
        padding: theme.spacing.unit * 2,
      },
    },
  },
  MuiDialogContent: {
    root: {
      padding: theme.spacing.unit * 2,
      paddingTop: 0,
      "&:last-child": {
        padding: theme.spacing.unit * 2,
        paddingTop: 0,
      },
      "&:first-child": {
        padding: theme.spacing.unit * 2,
        paddingTop: 0,
      },
    },
  },
  MuiButton: {
    root: {
      fontSize: "12px",
    },
  },
  MuiInput: {
    root: {
      fontSize: "14px",
    },
    underline: {
      "&:after": {
        borderWidth: "1px !important",
        borderBottomColor: `${fade(convertHexToRGB(black), 0.2)}`,
      },
      "&$error": {
        borderWidth: "1px !important",
        borderBottomColor: errorColor,
      },
    },
  },
  MuiInputLabel: {
    root: {
      fontSize: "14px",
      "&$focused": {
        color: fade(convertHexToRGB(black), 0.5),
      },
      "&$error": {
        color: errorColor,
      },
    },
  },
  MuiSelect: {
    root: {
      fontSize: "14px",
    },
  },
  MuiOutlinedInput: {
    root: {
      fontSize: "14px",
      "&$focused $notchedOutline": {
        borderWidth: "1px",
        borderColor: fade(convertHexToRGB(black), 0.2),
      },
    },
  },
  MuiTab: {
    label: {
      fontSize: "16px",
      fontWeight: "bold",
    },
  },
  MuiMenuItem: {
    root: {
      fontSize: 14,
    },
  },
  MuiListItemText: {
    primary: {
      fontSize: 14,
    },
  },
};
