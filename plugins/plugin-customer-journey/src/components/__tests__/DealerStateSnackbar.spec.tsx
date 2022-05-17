import React from "react";
import { mount } from "enzyme";
import { createMuiTheme, Dialog, MuiThemeProvider } from "@material-ui/core";
import { Shared } from "@common/components";

import { DealerStateSnackbarProps } from "../DealerStateSnackbar/DealerStateSnackbar.Props";
import { DealerStateType } from "../../common/enum";
import { DealerStateSnackbar } from "../DealerStateSnackbar/DealerStateSnackbar";

const props: DealerStateSnackbarProps = {
  dealerState: DealerStateType.Unknown,
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

describe("DealerStateSnackbar", () => {
  it("should render unknown message, if dealer state is unknown", () => {
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <DealerStateSnackbar {...props} />
      </MuiThemeProvider>
    );
    expect(wrapper.text()).toContain(
      "This dealer is unknown to us. Please confirm the checks below:Is the dealer VAT registered?Are they FCA Authorised with credit broking permissions?Do they have a forecourt and signing?Do they have a professional website?For more information, read our guide."
    );
  });

  it("should open dealer guide dialog, when clicks on read our guide link", () => {
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <DealerStateSnackbar {...props} />
      </MuiThemeProvider>
    );

    const button = wrapper.find("button").first();
    button.simulate("click");
    wrapper.update();

    expect(wrapper.find(Dialog).exists()).toBeTruthy();
  });

  it("should render approved for DCI message, if dealer state is approvedForDCI", () => {
    props.dealerState = DealerStateType.ApprovedForDCI;
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <DealerStateSnackbar {...props} />
      </MuiThemeProvider>
    );
    expect(wrapper.text()).toContain(
      "This dealer is approved for DCI only. For information on how to proceed, read this."
    );
  });

  it("should open dealer guide dialog, when user clicks on read this link", () => {
    props.dealerState = DealerStateType.ApprovedForDCI;
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <DealerStateSnackbar {...props} />
      </MuiThemeProvider>
    );

    const button = wrapper.find("button").first();
    button.simulate("click");
    wrapper.update();

    expect(wrapper.find(Dialog).exists()).toBeTruthy();
  });

  it("should render declined message, if dealer state is declined", () => {
    props.dealerState = DealerStateType.Declined;
    props.reasonForDeclined = "dealer declined reason";
    props.declinedDate = new Date(2021, 6, 6);
    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <DealerStateSnackbar {...props} />
      </MuiThemeProvider>
    );
    expect(wrapper.text()).toContain(
      `This dealer has been declined:${Shared.getFormattedDate(
        props.declinedDate,
        "DD/MM/YY"
      )} - ${
        props.reasonForDeclined
      }See below for similar vehicle recommendations from approved dealers.`
    );
  });
});
