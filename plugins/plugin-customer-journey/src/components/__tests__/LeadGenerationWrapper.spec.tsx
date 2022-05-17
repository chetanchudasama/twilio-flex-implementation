/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Manager, TaskContextProps } from "@twilio/flex-ui";
import { create, act, ReactTestRenderer } from "react-test-renderer";
import React from "react";
import { mount, ReactWrapper } from "enzyme";
import flushPromises from "flush-promises";
import { act as Act } from "react-dom/test-utils";
import {
  ItemModel,
  SnackbarMessage,
  VehicleMakeData,
} from "@common/components";

import { VehicleSearchDropdownData } from "models/VehicleSearchDropdownData";
import LeadGenerationContent from "../LeadGeneration/LeadGenerationContent/LeadGenerationContent.Container";
import { flexManagerMock } from "../__mocks__/MockData";
import { QualifyDetailModel } from "../../models/QualifyDetailModel";
import { TimeForPurchaseItemModel } from "../../models/TimeForPurchaseModel";
import { DropDownDataModel } from "../../models/DropDownDataModel";
import { LeadGenerationWrapper } from "../LeadGeneration/LeadGenerationWrapper/LeadGenerationWrapper";
import { LeadGenerationWrapperProps } from "../LeadGeneration/LeadGenerationWrapper/LeadGenerationWrapper.Props";
import { showErrorMessage } from "../../Notifications";
import { NoteModel } from "../../models/NoteModel";
import { TaskDecisionModel } from "../../models/TaskDecisionModel";

jest.mock("../../services/application.service");
jest.mock("../../services/static.service");
jest.mock("../../services/allocate.service");
jest.mock("../../services/task.service");

Manager.getInstance = flexManagerMock;

const mockGetQualifyingDetails = jest.fn();
const mockGetDropdownData = jest.fn();
const mockGetVehicleSearchDropdownData = jest.fn();
const mockUpdateQualifyingDetails = jest.fn();
const mockAddNoteRequest = jest.fn();
const mockUpdateBaseApplicationDetail = jest.fn();
const mockSubmitCallbackDetail = jest.fn();
const mockGetNotes = jest.fn();
const mockGetRankedAgents = jest.fn();
const mockGetTaskDecisions = jest.fn();
const mockSendTaskOutcome = jest.fn();

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    getQualifyingDetails: mockGetQualifyingDetails,
    updateQualifyingDetails: mockUpdateQualifyingDetails,
    addNoteRequest: mockAddNoteRequest,
    updateBaseApplicationDetail: mockUpdateBaseApplicationDetail,
    submitCallbackDetail: mockSubmitCallbackDetail,
    getNotes: mockGetNotes,
  })),
}));

jest.mock("../../services/static.service", () => ({
  useStaticService: jest.fn(() => ({
    getDropdownData: mockGetDropdownData,
    getVehicleSearchDropdownData: mockGetVehicleSearchDropdownData,
  })),
}));

jest.mock("../../services/allocate.service", () => ({
  useAllocateService: jest.fn(() => ({
    getRankedAgents: mockGetRankedAgents,
  })),
}));

jest.mock("../../services/task.service", () => ({
  useTaskService: jest.fn(() => ({
    getTaskDecisions: mockGetTaskDecisions,
    sendTaskOutcome: mockSendTaskOutcome,
  })),
}));

jest.mock(
  "../LeadGeneration/LeadGenerationContent/LeadGenerationContent.Container",
  () => {
    return {
      __esModule: true,
      default: () => {
        return <div>Lead Generation Content</div>;
      },
    };
  }
);

jest.mock("../../Notifications", () => {
  return {
    showErrorMessage: jest.fn(() => {}),
  };
});

const dropDownDataItems = new DropDownDataModel();
let qualifyingDetails = new QualifyDetailModel();
const timeForPurchaseItems: TimeForPurchaseItemModel[] = [
  {
    id: 1,
    name: "timeForPurchaseItem1",
  },
  {
    id: 2,
    name: "timeForPurchaseItem2",
  },
  {
    id: 3,
    name: "timeForPurchaseItem3",
  },
];

const items: ItemModel[] = [
  { id: 1, name: "test1" },
  { id: 2, name: "test2" },
  { id: 3, name: "test3" },
];

const makeModels: VehicleMakeData[] = [
  {
    id: 1,
    name: "test1",
    models: [
      { id: 1, name: "test1", count: 1 },
      { id: 2, name: "test2", count: 2 },
    ],
  },
  {
    id: 2,
    name: "test2",
    models: [
      { id: 1, name: "test1", count: 1 },
      { id: 2, name: "test2", count: 2 },
    ],
  },
  {
    id: 3,
    name: "test3",
    models: [
      { id: 1, name: "test1", count: 1 },
      { id: 2, name: "test2", count: 2 },
    ],
  },
];

const vehicleDropdownData: VehicleSearchDropdownData = {
  makesModels: makeModels,
  body: items,
  colour: items,
  fuel: items,
  trans: items,
  distance: [2, 5, 7],
};

const notes: NoteModel[] = [
  {
    comment: "This is a test note",
    commentId: 1,
    createdOn: new Date(2021, 9, 8),
    department: "Development",
    userName: "User",
    isImportant: false,
  },
];

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

const taskDetail: any = {
  attributes: {
    data: {
      taskEngineTask: {
        taskHeader: {
          headers: [
            { key: "decisionId", value: "1" },
            { key: "processedBy", value: "2" },
            { key: "callbackDue", value: "2021-10-21T03:49:00.000Z" },
          ],
        },
        taskAttributes: {
          response_header: [],
        },
      },
    },
  },
  setAttributes: jest.fn(() => Promise.resolve({ data: {} })),
  status: "accepted",
};

const props: LeadGenerationWrapperProps & TaskContextProps = {
  task: taskDetail,
  applicationId: 1,
  isStaticItemsFetched: false,
  isVehicleStaticDataFetched: false,
  setReasonForPurchaseItems: jest.fn(),
  setTimeForPurchaseItems: jest.fn(),
  setWhereDidYouHearItems: jest.fn(),
  setStaticFetched: jest.fn(),
  setVehicleStaticDataFetched: jest.fn(),
  setVehicleSearchDropdownData: jest.fn(),
  vehicleSearchDropdownData: vehicleDropdownData,
  setCustomerDetails: jest.fn(),
  taskDecisions: [],
  setTaskDecisions: jest.fn(),
};

describe("LeadGenerationWrapper", () => {
  beforeEach(() => {
    dropDownDataItems.timeForPurchaseItems = timeForPurchaseItems;

    qualifyingDetails = Object.assign(new QualifyDetailModel(), {
      drivingLicenseConfirmed: true,
      addressConfirmed: true,
      incomeConfirmed: true,
      placeOfWorkConfirmed: true,
      reasonForPurchase: null,
      timeForPurchase: timeForPurchaseItems[0],
      whereDidYouHear: null,
      hasCustomerAlreadyFoundCar: true,
    });
    mockGetQualifyingDetails.mockImplementationOnce(() =>
      Promise.resolve(qualifyingDetails)
    );
    mockGetDropdownData.mockImplementationOnce(() =>
      Promise.resolve(dropDownDataItems)
    );
    mockGetVehicleSearchDropdownData.mockImplementationOnce(() =>
      Promise.resolve(vehicleDropdownData)
    );
    mockGetNotes.mockImplementationOnce(() => Promise.resolve(notes));
    mockGetTaskDecisions.mockImplementationOnce(() =>
      Promise.resolve(taskDecisionList)
    );
  });

  afterEach(() => {
    mockGetQualifyingDetails.mockClear();
    mockGetDropdownData.mockClear();
    mockGetVehicleSearchDropdownData.mockClear();
    mockGetNotes.mockClear();
    mockGetRankedAgents.mockClear();
    mockGetTaskDecisions.mockClear();

    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly with props", async () => {
    let wrapper: ReactTestRenderer;
    await act(async () => {
      wrapper = create(<LeadGenerationWrapper {...props} />);
      await flushPromises();
    });
    expect(mockGetQualifyingDetails).toHaveBeenCalled();
    expect(wrapper!.toJSON()).toMatchSnapshot();
  });

  it("should fetch dropdownData if not fetched", async () => {
    props.isStaticItemsFetched = false;
    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetDropdownData).toHaveBeenCalledTimes(1);
  });

  it("should not fetch dropdownData if data already stored in store", async () => {
    props.isStaticItemsFetched = true;
    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetDropdownData).not.toHaveBeenCalled();
  });

  it("should fetch vehicle dropdownData if not fetched", async () => {
    props.isVehicleStaticDataFetched = false;
    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetVehicleSearchDropdownData).toHaveBeenCalledTimes(1);
  });

  it("should not fetch vehicle dropdownData if data already stored in store", async () => {
    props.isVehicleStaticDataFetched = true;
    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetVehicleSearchDropdownData).not.toHaveBeenCalled();
  });

  it("while updating qualify details; if previous data is same as current data, then it should not update the data", async () => {
    let wrapper: ReactWrapper<any, Readonly<any>, React.Component>;

    mockUpdateQualifyingDetails.mockImplementationOnce(() => Promise.resolve());

    await Act(async () => {
      wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
    });
    wrapper!.update();

    const leadGenerationContent = wrapper!.find(LeadGenerationContent).last();

    expect(leadGenerationContent.exists()).toBeTruthy();

    leadGenerationContent.invoke("updateQualifyingDetails")(
      "drivingLicenseConfirmed",
      qualifyingDetails.drivingLicenseConfirmed
    );
    wrapper!.update();
    await flushPromises();
    wrapper!.update();

    expect(mockUpdateQualifyingDetails).not.toHaveBeenCalled();
  });

  it("while updating qualify details; if previous data is not same as current data, then it should update the data", async () => {
    mockUpdateQualifyingDetails.mockImplementationOnce(() => Promise.resolve());

    let wrapper: ReactWrapper<any, Readonly<any>, React.Component>;

    await Act(async () => {
      wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
    });
    wrapper!.update();

    const leadGenerationContent = wrapper!.find(LeadGenerationContent).last();

    expect(leadGenerationContent.exists()).toBeTruthy();

    await Act(async () => {
      leadGenerationContent.invoke("updateQualifyingDetails")(
        "drivingLicenseConfirmed",
        false
      );
      wrapper!.update();
      await flushPromises();
    });
    wrapper!.update();

    expect(mockUpdateQualifyingDetails).toHaveBeenCalledTimes(1);
  });

  it("should render success message, when AddNoteRequest API returns an success response", async () => {
    mockAddNoteRequest.mockImplementationOnce(() => Promise.resolve(undefined));

    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      const leadGenerationContent = wrapper.find(LeadGenerationContent).last();
      expect(leadGenerationContent.exists()).toBeTruthy();

      leadGenerationContent.invoke("updateApplication")();
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(mockAddNoteRequest).toHaveBeenCalled();

      expect(SnackbarMessage).toBeTruthy();
    });
  });

  it("should render error message, when AddNoteRequest API returns an error", async () => {
    mockAddNoteRequest.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );

    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      const leadGenerationContent = wrapper.find(LeadGenerationContent).last();
      expect(leadGenerationContent.exists()).toBeTruthy();

      leadGenerationContent.invoke("updateApplication")();
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(showErrorMessage).toHaveBeenCalledWith(
        "Error updating application detail, please try again!",
        "",
        true
      );
    });
  });

  it("should call UpdateQualifyingDetails API, when updateFactFindDetail method is invoked with key hasCustomerAlreadyFoundCar", async () => {
    mockUpdateQualifyingDetails.mockImplementationOnce(() => Promise.resolve());

    let wrapper: ReactWrapper<any, Readonly<any>, React.Component>;

    await Act(async () => {
      wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
    });
    wrapper!.update();

    const leadGenerationContent = wrapper!.find(LeadGenerationContent).last();

    expect(leadGenerationContent.exists()).toBeTruthy();

    await Act(async () => {
      leadGenerationContent.invoke("updateFactFindDetail")(
        "hasCustomerAlreadyFoundCar",
        false
      );
      wrapper!.update();
      await flushPromises();
    });
    wrapper!.update();

    expect(mockUpdateQualifyingDetails).toHaveBeenCalledTimes(1);
  });

  it("should not call UpdateQualifyingDetails API, when updateFactFindDetail method is invoked with key borrowAmount", async () => {
    mockUpdateQualifyingDetails.mockImplementationOnce(() => Promise.resolve());

    let wrapper: ReactWrapper<any, Readonly<any>, React.Component>;

    await Act(async () => {
      wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
    });
    wrapper!.update();

    const leadGenerationContent = wrapper!.find(LeadGenerationContent).last();

    expect(leadGenerationContent.exists()).toBeTruthy();

    await Act(async () => {
      leadGenerationContent.invoke("updateFactFindDetail")("borrowAmount", 50);
      wrapper!.update();
      await flushPromises();
    });
    wrapper!.update();

    expect(mockUpdateQualifyingDetails).not.toHaveBeenCalled();
  });

  it("when delete button is clicked from CallbackDialog, UpdateBaseApplicationDetail API should be called", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      const leadGenerationContent = wrapper.find(LeadGenerationContent).last();
      expect(leadGenerationContent.exists()).toBeTruthy();

      leadGenerationContent.invoke("setCallbackDetail")(null);
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(mockUpdateBaseApplicationDetail).toHaveBeenCalledTimes(1);
    });
  });

  it("when UpdateBaseApplicationDetail API returns an error, error message should be displayed", async () => {
    mockUpdateBaseApplicationDetail.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );

    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      const leadGenerationContent = wrapper.find(LeadGenerationContent).last();
      expect(leadGenerationContent.exists()).toBeTruthy();

      leadGenerationContent.invoke("setCallbackDetail")(null);
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(showErrorMessage).toHaveBeenCalledWith(
        "Error updating callback detail, please try again!",
        "",
        true
      );
    });
  });

  it("when set callback button is clicked from CallbackDialog, SubmitCallbackDetail API should be called", async () => {
    mockSubmitCallbackDetail.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      const leadGenerationContent = wrapper.find(LeadGenerationContent).last();
      expect(leadGenerationContent.exists()).toBeTruthy();

      leadGenerationContent.invoke("setCallbackDetail")(new Date(2021, 8, 8));
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(mockSubmitCallbackDetail).toHaveBeenCalledTimes(1);
    });
  });

  it("when SubmitCallbackDetail API returns an error, error message should be displayed", async () => {
    mockSubmitCallbackDetail.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );

    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      const leadGenerationContent = wrapper.find(LeadGenerationContent).last();
      expect(leadGenerationContent.exists()).toBeTruthy();

      leadGenerationContent.invoke("setCallbackDetail")(new Date(2021, 8, 8));
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(showErrorMessage).toHaveBeenCalledWith(
        "Error updating callback detail, please try again!",
        "",
        true
      );
    });
  });

  it("should fetch recent notes, when applicationId is changed", async () => {
    await Act(async () => {
      mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
    });

    expect(mockGetNotes).toHaveBeenCalledTimes(1);
  });

  it("when find agent button is clicked from Allocation component, GetRankedAgents API should be called", async () => {
    mockGetRankedAgents.mockImplementationOnce(() => Promise.resolve([]));

    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      const leadGenerationContent = wrapper.find(LeadGenerationContent).last();
      expect(leadGenerationContent.exists()).toBeTruthy();

      leadGenerationContent.invoke("getRankedAgents")();
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(mockGetRankedAgents).toHaveBeenCalledTimes(1);
    });
  });

  it("when GetRankedAgents API returns an error, error message should be displayed", async () => {
    mockGetRankedAgents.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );

    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      const leadGenerationContent = wrapper.find(LeadGenerationContent).last();
      expect(leadGenerationContent.exists()).toBeTruthy();

      leadGenerationContent.invoke("getRankedAgents")();
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(showErrorMessage).toHaveBeenCalledWith(
        "Error retrieving ranked agents, please try again!",
        "",
        true
      );
    });
  });

  it("should fetch taskDecision list if not fetched", async () => {
    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetTaskDecisions).toHaveBeenCalledTimes(1);
  });

  it("should not fetch taskDecision list if data already stored in store", async () => {
    props.taskDecisions = taskDecisionList;
    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetTaskDecisions).not.toHaveBeenCalled();
  });

  it("when handleContactOutcomeClick method is emitted from ContactOutcome component, SendTaskOutcome API should be called", async () => {
    mockSendTaskOutcome.mockImplementationOnce(() =>
      Promise.resolve(undefined)
    );

    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      const leadGenerationContent = wrapper.find(LeadGenerationContent).last();
      expect(leadGenerationContent.exists()).toBeTruthy();

      leadGenerationContent.invoke("handleContactOutcomeClick")(
        taskDecisionList[0]
      );
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(mockSendTaskOutcome).toHaveBeenCalledTimes(1);
    });
  });

  it("when SendTaskOutcome API returns an error, error message should be displayed", async () => {
    mockSendTaskOutcome.mockImplementationOnce(() =>
      Promise.reject({ statusCode: 500 })
    );

    await Act(async () => {
      const wrapper = mount(<LeadGenerationWrapper {...props} />);
      await flushPromises();
      wrapper.update();

      const leadGenerationContent = wrapper.find(LeadGenerationContent).last();
      expect(leadGenerationContent.exists()).toBeTruthy();

      leadGenerationContent.invoke("handleContactOutcomeClick")(
        taskDecisionList[0]
      );
      wrapper.update();
      await flushPromises();
      wrapper.update();

      expect(showErrorMessage).toHaveBeenCalledWith(
        "Error updating task attributes, please try again!",
        "",
        true
      );
    });
  });
});
