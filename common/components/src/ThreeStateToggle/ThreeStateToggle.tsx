import React, { useMemo } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { withStyles, WithStyles } from "@material-ui/core";
import { styles } from "./ThreeStateToggle.Styles";
import { CustomToggleState } from "../shared/enum";

export interface ThreeStateToggleProps {
  checked: boolean | null;
  onChange: (value: boolean | null) => void;
}

type Props = WithStyles<typeof styles> & ThreeStateToggleProps;

const ThreeStateToggleContent: React.FC<Props> = (props) => {
  const { classes, checked, onChange } = props;
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    value: CustomToggleState
  ) => {
    event.preventDefault();
    switch (value) {
      case CustomToggleState.INTERMEDIATE:
        onChange(null);
        break;
      case CustomToggleState.YES:
        onChange(true);
        break;
      case CustomToggleState.NO:
        onChange(false);
        break;
      default:
        onChange(null);
        break;
    }
  };

  const value = useMemo(() => {
    switch (checked) {
      case null:
        return CustomToggleState.INTERMEDIATE;
      case true:
        return CustomToggleState.YES;
      case false:
        return CustomToggleState.NO;
      default:
        return CustomToggleState.INTERMEDIATE;
    }
  }, [checked]);

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleAlignment}
      selected
      classes={{ root: classes.root }}
    >
      <ToggleButton
        classes={{
          root: classes.button,
          selected: classes.selected,
          label: classes.label,
        }}
        value={CustomToggleState.INTERMEDIATE}
        selected={value === CustomToggleState.INTERMEDIATE}
        className="btn-intermediate"
      >
        Not Asked
      </ToggleButton>
      <ToggleButton
        classes={{
          root: classes.button,
          selected: classes.selected,
          label: classes.label,
        }}
        value={CustomToggleState.NO}
        selected={value === CustomToggleState.NO}
        className="btn-no"
      >
        No
      </ToggleButton>
      <ToggleButton
        classes={{
          root: classes.button,
          selected: classes.selected,
          label: classes.label,
        }}
        value={CustomToggleState.YES}
        selected={value === CustomToggleState.YES}
        className="btn-yes"
      >
        Yes
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
export const ThreeStateToggle = withStyles(styles)(ThreeStateToggleContent);
