/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Manager } from "@twilio/flex-ui";
import { mount, ReactWrapper } from "enzyme";
import flushPromises from "flush-promises";
import React from "react";
import { act as Act } from "react-dom/test-utils";
import { create, act, ReactTestRenderer } from "react-test-renderer";
import QualifyingContent from "../Wizard/QualifyStep/QualifyingContent/QualifyingContent.Container";
import QualifyingWrapper, {
  ComponentProps,
} from "../Wizard/QualifyStep/QualifyingWrapper/QualifyingWrapper";
import { QualifyDetailModel } from "../../models/QualifyDetailModel";
import { ReasonForCarPurchaseItemModel } from "../../models/ReasonForCarPurchaseItemModel";
import { DropDownDataModel } from "../../models/DropDownDataModel";
import { TimeForPurchaseItemModel } from "../../models/TimeForPurchaseModel";
import { WhereDidYouHearItemModel } from "../../models/WhereDidYouHearItemModel";
import { flexManagerMock } from "../__mocks__/MockData";

jest.mock(
  "../Wizard/QualifyStep/QualifyingContent/QualifyingContent.Container"
);
jest.mock("../Wizard/QualifyStep/QualifyingContent/QualifyingContent");
jest.mock("../../services/application.service");
jest.mock("../../services/static.service");

const mockGetQualifyingDetails = jest.fn();
const mockUpdateQualifyingDetails = jest.fn();
const mockGetDropdownData = jest.fn();

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    getQualifyingDetails: mockGetQualifyingDetails,
    updateQualifyingDetails: mockUpdateQualifyingDetails,
  })),
}));

jest.mock("../../services/static.service", () => ({
  useStaticService: jest.fn(() => ({
    getDropdownData: mockGetDropdownData,
  })),
}));

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    WizardStepWrapper: jest.fn(({ children, onNext, onPrevious }) => {
      return (
        <div>
          <button type="button" className="onNext" onClick={onNext}>
            onNext
          </button>
          <button type="button" className="onPrevious" onClick={onPrevious}>
            onPrevious
          </button>
          {children}
        </div>
      );
    }),
  };
});

let qualifyingDetails = new QualifyDetailModel();
const reasonForPurchaseItems: ReasonForCarPurchaseItemModel[] = [
  {
    id: 1,
    name: "reasonForPurchaseItem1",
  },
  {
    id: 2,
    name: "reasonForPurchaseItem2",
  },
  {
    id: 3,
    name: "reasonForPurchaseItem3",
  },
];
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
const whereDidYouHearItems: WhereDidYouHearItemModel[] = [
  {
    id: 1,
    name: "whereDidYouHearItem1",
  },
  {
    id: 2,
    name: "whereDidYouHearItem2",
  },
  {
    id: 3,
    name: "whereDidYouHearItem3",
  },
];
const dropDownDataItems = new DropDownDataModel();

Manager.getInstance = flexManagerMock;

const defaultProps = {
  isStaticItemsFetched: true,
  applicationId: 1,
  setReasonForPurchaseItems: jest.fn(),
  setStaticFetched: jest.fn(),
  setTimeForPurchaseItems: jest.fn(),
  setWhereDidYouHearItems: jest.fn(),
};

let props: ComponentProps = defaultProps;

describe("QualifyingWrapper", () => {
  beforeEach(() => {
    props = defaultProps;
    dropDownDataItems.reasonForPurchaseItems = reasonForPurchaseItems;
    dropDownDataItems.timeForPurchaseItems = timeForPurchaseItems;
    dropDownDataItems.whereDidYouHearItems = whereDidYouHearItems;

    qualifyingDetails = Object.assign(new QualifyDetailModel(), {
      drivingLicenseConfirmed: true,
      addressConfirmed: true,
      incomeConfirmed: true,
      placeOfWorkConfirmed: true,
      reasonForPurchase: reasonForPurchaseItems[0],
      timeForPurchase: timeForPurchaseItems[0],
      whereDidYouHear: whereDidYouHearItems[0],
      hasCustomerAlreadyFoundCar: true,
    });
    mockGetQualifyingDetails.mockImplementationOnce(() =>
      Promise.resolve(qualifyingDetails)
    );
    mockGetDropdownData.mockImplementationOnce(() =>
      Promise.resolve(dropDownDataItems)
    );
  });

  afterEach(() => {
    mockGetQualifyingDetails.mockClear();
    mockUpdateQualifyingDetails.mockClear();
    mockGetDropdownData.mockClear();

    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly, without any props", async () => {
    let wrapper: ReactTestRenderer;
    await act(async () => {
      wrapper = create(<QualifyingWrapper {...props} />);
      await flushPromises();
    });
    expect(wrapper!.toJSON()).toMatchSnapshot();
  });

  it("renders correctly, with props", async () => {
    props.moveForward = jest.fn();
    props.moveBackward = jest.fn();
    let wrapper: ReactTestRenderer;
    await act(async () => {
      wrapper = create(<QualifyingWrapper {...props} />);
      await flushPromises();
    });
    expect(mockGetQualifyingDetails).toHaveBeenCalled();
    expect(wrapper!.toJSON()).toMatchSnapshot();
  });
  it("if qualifying details is valid, injected moveForward should be called", async () => {
    const moveForward = jest.fn();
    props.moveForward = moveForward;

    let wrapper: ReactWrapper<any, Readonly<any>, React.Component>;
    await Act(async () => {
      wrapper = mount(<QualifyingWrapper {...props} />);
      await flushPromises();
    });
    wrapper!.update();
    expect(mockGetQualifyingDetails).toHaveBeenCalled();

    wrapper!.find(".onNext").last().simulate("click");

    expect(moveForward).toHaveBeenCalled();
  });

  it("when previous button clicked and move backward event is provided, move backward event should be emitted", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;
    await Act(async () => {
      const wrapper = mount(<QualifyingWrapper {...props} />);
      await flushPromises();
      wrapper.find(".onPrevious").last().simulate("click");

      expect(moveBackward).toHaveBeenCalledTimes(1);
    });
  });

  it("qualifying details should not be fetched, if applicationId less than zero", async () => {
    const updatedProps = { ...props };
    updatedProps.applicationId = -1;

    await Act(async () => {
      const wrapper = mount(<QualifyingWrapper {...updatedProps} />);
      await flushPromises();
      wrapper.update();

      expect(mockGetQualifyingDetails).not.toHaveBeenCalled();
    });
  });

  it("qualifying details should be fetched, when application id is changed", async () => {
    await Act(async () => {
      const wrapper = mount(<QualifyingWrapper {...props} />);
      await flushPromises();
      wrapper.update();
    });
    expect(mockGetQualifyingDetails).toHaveBeenCalled();
    expect(mockGetQualifyingDetails).toHaveBeenCalledWith(1);
  });

  it("should fetch dropdownData if not fetched", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;
    props.isStaticItemsFetched = false;

    mockUpdateQualifyingDetails.mockImplementationOnce(() =>
      Promise.resolve(null)
    );

    await Act(async () => {
      const wrapper = mount(<QualifyingWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetDropdownData).toHaveBeenCalledTimes(1);
  });

  it("should not fetch dropdownData if data already stored in store", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;
    props.isStaticItemsFetched = true;

    mockUpdateQualifyingDetails.mockImplementationOnce(() =>
      Promise.resolve(null)
    );

    await Act(async () => {
      const wrapper = mount(<QualifyingWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetDropdownData).not.toHaveBeenCalled();
  });

  it("while updating qualifying details; if previous data is same as current data, then it should not update the data", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;

    let wrapper: ReactWrapper<any, Readonly<any>, React.Component>;

    mockUpdateQualifyingDetails.mockImplementationOnce(() => Promise.resolve());

    await Act(async () => {
      wrapper = mount(<QualifyingWrapper {...props} />);
      await flushPromises();
    });
    wrapper!.update();

    const QualifyingContentComponent = wrapper!.find(QualifyingContent).last();

    expect(QualifyingContentComponent.exists()).toBeTruthy();

    QualifyingContentComponent.invoke("updateQualifyingDetails")(
      "drivingLicenseConfirmed",
      qualifyingDetails.drivingLicenseConfirmed
    );
    wrapper!.update();
    await flushPromises();
    wrapper!.update();

    expect(mockUpdateQualifyingDetails).not.toHaveBeenCalled();
  });

  it("while updating qualifying details; if previous data is not same as current data, then it should update the data", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;

    mockUpdateQualifyingDetails.mockImplementationOnce(() => Promise.resolve());

    let wrapper: ReactWrapper<any, Readonly<any>, React.Component>;

    await Act(async () => {
      wrapper = mount(<QualifyingWrapper {...props} />);
      await flushPromises();
    });
    wrapper!.update();

    const QualifyingContentComponent = wrapper!.find(QualifyingContent).last();

    expect(QualifyingContentComponent.exists()).toBeTruthy();

    await Act(async () => {
      QualifyingContentComponent.invoke("updateQualifyingDetails")(
        "drivingLicenseConfirmed",
        false
      );
      wrapper!.update();
      await flushPromises();
    });
    wrapper!.update();

    expect(mockUpdateQualifyingDetails).toHaveBeenCalledTimes(1);
  });
});
