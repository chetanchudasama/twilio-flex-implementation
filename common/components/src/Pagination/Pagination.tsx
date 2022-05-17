import { Theme, withStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import Paginate from "material-ui-flat-pagination";
import { paddingUnit, borderStyle } from "../shared/AppTheme";

const buttonSize = 40;
const buttonFontSize = 16;
const buttonFontWeight = "bold";
const buttonStyles: CSSProperties = {
  height: buttonSize,
  width: buttonSize,
  fontSize: buttonFontSize,
  fontWeight: buttonFontWeight,
  borderRadius: 5,
  margin: paddingUnit,
  border: borderStyle,
};

export const Pagination = withStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
  },
  rootStandard: buttonStyles,
  rootCurrent: buttonStyles,
  rootEnd: buttonStyles,
  rootEllipsis: buttonStyles,
  textPrimary: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  textSecondary: {
    border: `1px solid ${theme.palette.secondary.main}`,
  },
}))(Paginate);
