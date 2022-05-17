import React from "react";
import { create } from "react-test-renderer";
import flushPromises from "flush-promises";
import { mount } from "enzyme";
import {
  DealSheetWrapper,
  DealSheetWrapperProps,
} from "../Wizard/DealSheetStep/DealSheetWrapper/DealSheetWrapper";

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

let props: DealSheetWrapperProps = {};

describe("DealSheetWrapper", () => {
  beforeEach(() => {
    props = {};
  });
  it("renders correctly, without any props", async () => {
    const wrapper = create(<DealSheetWrapper {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly, with props", async () => {
    props.moveForward = jest.fn();
    props.moveBackward = jest.fn();
    const wrapper = create(<DealSheetWrapper {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("when next button clicked and move forward event is provided, move forward event should be emitted", async () => {
    const moveForward = jest.fn();
    props.moveForward = moveForward;
    const wrapper = mount(<DealSheetWrapper {...props} />);
    await flushPromises();
    wrapper.find(".onNext").last().simulate("click");

    expect(moveForward).toHaveBeenCalledTimes(1);
  });

  it("when previous button clicked and move backward event is provided, move backward event should be emitted", async () => {
    const moveBackward = jest.fn();
    props.moveBackward = moveBackward;
    const wrapper = mount(<DealSheetWrapper {...props} />);
    await flushPromises();
    wrapper.find(".onPrevious").last().simulate("click");

    expect(moveBackward).toHaveBeenCalledTimes(1);
  });
});
