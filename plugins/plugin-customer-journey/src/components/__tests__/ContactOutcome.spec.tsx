import React from "react";
import { mount } from "enzyme";
import { create } from "react-test-renderer";
import { act as Act } from "react-dom/test-utils";

import { Menu, MenuItem } from "@material-ui/core";
import { CallbackDialog } from "@common/components";
import { ContactOutcomeProps } from "../LeadGeneration/ContactOutcome/ContactOutcome.Props";
import { ContactOutcome } from "../LeadGeneration/ContactOutcome/ContactOutcome";
import { TaskDecisionModel } from "../../models/TaskDecisionModel";

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    CallbackDialog: jest.fn(({ children }) => {
      return <div>{children}</div>;
    }),
  };
});

jest.mock("@material-ui/core", () => {
  const materialUI = jest.requireActual("@material-ui/core");
  return {
    ...materialUI,
    Menu: jest.fn(({ children }) => children),
  };
});

const taskDecisionList: TaskDecisionModel[] = [
  {
    taskItemDecisionId: 1,
    parentTaskScheduleTemplateId: 29,
    childTaskScheduleTemplateId: null,
    taskItemTypeId: 1,
    decisionName: "No Contact (Left VM)",
    decisionDescription: "",
    shouldKill: false,
    shouldRaise: false,
    isSuccess: false,
    isContact: false,
    isCallback: false,
    isAllocation: false,
    state: null,
    createsAutomaticNote: false,
    automaticNote: "",
  },
  {
    taskItemDecisionId: 2,
    parentTaskScheduleTemplateId: 29,
    childTaskScheduleTemplateId: null,
    taskItemTypeId: 1,
    decisionName: "No Contact (No VM)",
    decisionDescription: "",
    shouldKill: false,
    shouldRaise: false,
    isSuccess: false,
    isContact: false,
    isCallback: false,
    isAllocation: false,
    state: null,
    createsAutomaticNote: false,
    automaticNote: "",
  },
  {
    taskItemDecisionId: 4,
    parentTaskScheduleTemplateId: 29,
    childTaskScheduleTemplateId: null,
    taskItemTypeId: 1,
    decisionName: "NTU - Customer Not Interested",
    decisionDescription: "",
    shouldKill: false,
    shouldRaise: false,
    isSuccess: false,
    isContact: false,
    isCallback: false,
    isAllocation: false,
    state: null,
    createsAutomaticNote: false,
    automaticNote: "",
  },
  {
    taskItemDecisionId: 5,
    parentTaskScheduleTemplateId: 29,
    childTaskScheduleTemplateId: null,
    taskItemTypeId: 1,
    decisionName: "Warm Transfer to Account Manager",
    decisionDescription: "",
    shouldKill: false,
    shouldRaise: false,
    isSuccess: false,
    isContact: false,
    isCallback: false,
    isAllocation: true,
    state: null,
    createsAutomaticNote: false,
    automaticNote: "",
  },
  {
    taskItemDecisionId: 6,
    parentTaskScheduleTemplateId: 29,
    childTaskScheduleTemplateId: null,
    taskItemTypeId: 1,
    decisionName: "Customer Hung Up During Call",
    decisionDescription: "",
    shouldKill: false,
    shouldRaise: false,
    isSuccess: false,
    isContact: false,
    isCallback: false,
    isAllocation: false,
    state: null,
    createsAutomaticNote: false,
    automaticNote: "",
  },
  {
    taskItemDecisionId: 7,
    parentTaskScheduleTemplateId: 29,
    childTaskScheduleTemplateId: null,
    taskItemTypeId: 1,
    decisionName: "Customer Hung Up During Transfer",
    decisionDescription: "",
    shouldKill: false,
    shouldRaise: false,
    isSuccess: false,
    isContact: false,
    isCallback: false,
    isAllocation: false,
    state: null,
    createsAutomaticNote: false,
    automaticNote: "",
  },
  {
    taskItemDecisionId: 8,
    parentTaskScheduleTemplateId: 29,
    childTaskScheduleTemplateId: null,
    taskItemTypeId: 1,
    decisionName: "Call Did Not Connect",
    decisionDescription: "",
    shouldKill: false,
    shouldRaise: false,
    isSuccess: false,
    isContact: false,
    isCallback: false,
    isAllocation: false,
    state: null,
    createsAutomaticNote: false,
    automaticNote: "",
  },
  {
    taskItemDecisionId: 9,
    parentTaskScheduleTemplateId: 29,
    childTaskScheduleTemplateId: null,
    taskItemTypeId: 1,
    decisionName: "Arrange a Callback",
    decisionDescription: "",
    shouldKill: false,
    shouldRaise: false,
    isSuccess: false,
    isContact: false,
    isCallback: true,
    isAllocation: false,
    state: null,
    createsAutomaticNote: false,
    automaticNote: "",
  },
];

const props: ContactOutcomeProps = {
  taskDecisions: taskDecisionList,
  callbackBooked: new Date(2021, 8, 8),
  setCallbackDetail: jest.fn(),
  handleContactOutcomeClick: jest.fn(),
};

describe("ContactOutcome", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly on load", () => {
    const wrapper = create(<ContactOutcome {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Menu with MenuItem, when icon button is clicked", () => {
    const wrapper = mount(<ContactOutcome {...props} />);

    wrapper.find(".dropdown-icon-btn").at(0).simulate("click");
    wrapper.update();

    expect(wrapper.find(Menu).exists()).toBeTruthy();
    expect(wrapper.find(MenuItem).exists()).toBeTruthy();
    expect(wrapper.find(MenuItem).length).toBe(
      taskDecisionList.slice(2, -1).length + 2
    );
  });

  it("should emit handleContactOutcomeClick method, when No Contact (Left VM) button is clicked", () => {
    const wrapper = mount(<ContactOutcome {...props} />);

    const button = wrapper.find(".no-contact-btn");

    button.at(0).simulate("click");
    wrapper.update();

    expect(wrapper.props().handleContactOutcomeClick).toHaveBeenCalledTimes(1);
  });

  it("should emit handleContactOutcomeClick method, when Call Did Not Connect menu item is clicked", () => {
    const wrapper = mount(<ContactOutcome {...props} />);

    wrapper.find(".dropdown-icon-btn").at(0).simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).at(0).simulate("click");
    wrapper.update();

    expect(wrapper.props().handleContactOutcomeClick).toHaveBeenCalledTimes(1);
  });

  it("should not render CallbackDialog, when value of isCallback is false and Arrange a Callback menu item is clicked", () => {
    props.taskDecisions[props.taskDecisions.length - 1].isCallback = false;
    const wrapper = mount(<ContactOutcome {...props} />);

    wrapper.find(".dropdown-icon-btn").at(0).simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).last().simulate("click");
    wrapper.update();

    expect(wrapper.find(CallbackDialog).exists()).toBeFalsy();
  });

  it("should render CallbackDialog, when value of isCallback is true and Arrange a Callback menu item is clicked", () => {
    props.taskDecisions[props.taskDecisions.length - 1].isCallback = true;
    const wrapper = mount(<ContactOutcome {...props} />);

    wrapper.find(".dropdown-icon-btn").at(0).simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).last().simulate("click");
    wrapper.update();

    expect(wrapper.find(CallbackDialog).exists()).toBeTruthy();
    expect(wrapper.props().handleContactOutcomeClick).toHaveBeenCalledTimes(0);
  });

  it("when update callback button is clicked from CallbackDialog, setCallbackDetail method should be emitted", () => {
    const wrapper = mount(<ContactOutcome {...props} />);

    wrapper.find(".dropdown-icon-btn").at(0).simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).last().simulate("click");
    wrapper.update();

    expect(wrapper.find(CallbackDialog).exists()).toBeTruthy();

    Act(() => {
      wrapper
        .find(CallbackDialog)
        .props()
        .setCallbackDetail(new Date(2021, 8, 8), "");
    });
    wrapper.update();

    expect(wrapper.props().setCallbackDetail).toHaveBeenCalled();
  });

  it("when handleCloseDialog method is called from CallbackDialog, should close callback detail dialog", () => {
    const wrapper = mount(<ContactOutcome {...props} />);

    wrapper.find(".dropdown-icon-btn").at(0).simulate("click");
    wrapper.update();

    wrapper.find(MenuItem).last().simulate("click");
    wrapper.update();

    expect(wrapper.find(CallbackDialog).exists()).toBeTruthy();

    Act(() => {
      wrapper.find(CallbackDialog).props().handleCloseDialog();
    });
    wrapper.update();

    expect(wrapper.find(CallbackDialog).exists()).toBeFalsy();
  });
});
