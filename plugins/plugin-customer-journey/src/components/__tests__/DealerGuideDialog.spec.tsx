import React from "react";
import { mount } from "enzyme";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { DealerGuideDialogProps } from "../DealerGuideDialog/DealerGuideDialog.Props";
import { DealerGuideDialog } from "../DealerGuideDialog/DealerGuideDialog";
import { DealerStateType } from "../../common/enum";

const props: DealerGuideDialogProps = {
  open: true,
  dealerState: DealerStateType.Approved,
  handleDialogClose: jest.fn(),
};

const mockHandleDealerGuideDialog = jest.fn();

describe("DealerGuideDialog", () => {
  it("should render ResponsiveDialog, when component is rendered", () => {
    const wrapper = mount(<DealerGuideDialog {...props} />);

    expect(wrapper.find(Dialog).exists()).toBeTruthy();
  });

  it("should call handleDialogClose method, when close button is click", () => {
    props.open = true;
    props.handleDialogClose = mockHandleDealerGuideDialog;
    const wrapper = mount(<DealerGuideDialog {...props} />);

    wrapper.find(".close-btn").first().simulate("click");

    expect(props.handleDialogClose).toHaveBeenCalled();
  });

  it("if dealerState is Unknown, should display guide content accordingly", () => {
    props.open = true;
    props.dealerState = DealerStateType.Unknown;
    props.handleDialogClose = mockHandleDealerGuideDialog;
    const wrapper = mount(<DealerGuideDialog {...props} />);

    expect(wrapper.find(DialogTitle).html()).toContain(
      "Unknown to CarFinance 247"
    );
    expect(wrapper.find(DialogContent).find(".unknown-guide-list").length).toBe(
      1
    );
  });

  it("if dealerState is ApprovedForDCI, should display guide content accordingly", () => {
    props.open = true;
    props.dealerState = DealerStateType.ApprovedForDCI;
    props.handleDialogClose = mockHandleDealerGuideDialog;
    const wrapper = mount(<DealerGuideDialog {...props} />);

    expect(wrapper.find(DialogTitle).html()).toContain("Approved DCI Process");
    expect(
      wrapper.find(DialogContent).find(".approved-for-dci-list").length
    ).toBe(2);
  });

  it("if dealerState is Unknown, should render email with mailto link", () => {
    props.open = true;
    props.dealerState = DealerStateType.Unknown;
    props.handleDialogClose = mockHandleDealerGuideDialog;
    const wrapper = mount(<DealerGuideDialog {...props} />);

    expect(wrapper.find(Dialog).find(".link").props().href).toContain(
      "mailto:DSU@carfinance247.co.uk"
    );
  });

  it("if dealerState is ApprovedForDCI, should render call guide link", () => {
    props.open = true;
    props.dealerState = DealerStateType.ApprovedForDCI;
    props.handleDialogClose = mockHandleDealerGuideDialog;
    const wrapper = mount(<DealerGuideDialog {...props} />);

    expect(wrapper.find(Dialog).find(".link").props().href).toContain(
      "https://cf247.sharepoint.com/:f:/s/resources/EnK9sqnMalVBjqKZ2NuzERABBbpx-A6SLt_uDZxk158sOA?e=HqnKrE"
    );
  });
});
