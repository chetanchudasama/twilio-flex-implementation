import React from "react";
import { create } from "react-test-renderer";
import flushPromises from "flush-promises";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Manager } from "@twilio/flex-ui";
import {
  QuoteWrapper,
  QuoteWrapperProps,
} from "../Wizard/QuotesStep/QuoteWrapper/QuoteWrapper";
import { QuoteDetailModel } from "../../models/QuoteDetailModel";
import { flexManagerMock } from "../__mocks__/MockData";

jest.mock("../../services/application.service");
jest.mock("../Wizard/QuotesStep/SavedQuoteList/SavedQuoteList.Container");
jest.mock("../Wizard/QuotesStep/SavedQuoteList/SavedQuoteList");

const mockGetQuoteList = jest.fn();

jest.mock("../../services/application.service", () => ({
  useApplicationService: jest.fn(() => ({
    getQuoteList: mockGetQuoteList,
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

const defaultProps: QuoteWrapperProps = {
  applicationId: 0,
  setSavedQuotes: jest.fn(() => {}),
  moveForward: jest.fn(() => {}),
  moveBackward: jest.fn(() => {}),
};

const props: QuoteWrapperProps = defaultProps;

Manager.getInstance = flexManagerMock;

describe("QuoteWrapper", () => {
  beforeEach(() => {
    mockGetQuoteList.mockResolvedValueOnce(() =>
      Promise.resolve(new QuoteDetailModel())
    );
  });

  afterEach(() => {
    mockGetQuoteList.mockClear();

    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly, without any props", async () => {
    const wrapper = create(<QuoteWrapper {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly, with props", async () => {
    props.moveForward = jest.fn();
    props.moveBackward = jest.fn();
    const wrapper = create(<QuoteWrapper {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("when next button clicked and move forward event is provided, move forward event should be emitted", async () => {
    const moveForward = jest.fn();
    props.moveForward = moveForward;
    const wrapper = mount(<QuoteWrapper {...props} />);
    await flushPromises();
    wrapper.find(".onNext").last().simulate("click");

    expect(moveForward).toHaveBeenCalledTimes(1);
  });

  it("when previous button clicked and move backward event is provided, move backward event should be emitted", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;
    const wrapper = mount(<QuoteWrapper {...props} />);
    await flushPromises();
    wrapper.find(".onPrevious").last().simulate("click");

    expect(moveBackward).toHaveBeenCalledTimes(1);
  });

  it("should fetch quote list when application id is present", async () => {
    props.applicationId = 1;

    mockGetQuoteList.mockImplementationOnce(() =>
      Promise.resolve(new QuoteDetailModel())
    );

    await act(async () => {
      const wrapper = mount(<QuoteWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetQuoteList).toHaveBeenCalledTimes(1);
  });

  it("should not fetch quote data if application id is not present", async () => {
    props.applicationId = 0;

    mockGetQuoteList.mockImplementationOnce(() =>
      Promise.resolve(new QuoteDetailModel())
    );

    await act(async () => {
      const wrapper = mount(<QuoteWrapper {...props} />);
      wrapper.update();
      await flushPromises();
      wrapper.update();
    });

    expect(mockGetQuoteList).not.toHaveBeenCalled();
  });
});
