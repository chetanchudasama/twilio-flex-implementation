import React from "react";
import { create } from "react-test-renderer";
import flushPromises from "flush-promises";
import { Manager } from "@twilio/flex-ui";
import { mount } from "enzyme";
import SavedQuoteList, {
  ComponentProps,
} from "../Wizard/QuotesStep/SavedQuoteList/SavedQuoteList";
import { QuoteSortingOptions } from "../../common/enum";
import { QuoteDetailModel } from "../../models/QuoteDetailModel";
import QuoteDetail from "../Wizard/QuotesStep/QuoteDetail/QuoteDetail";
import { flexManagerMock } from "../__mocks__/MockData";

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
  };
});

jest.mock("../CarDealerInformation/CarDealerInformation.Container");
jest.mock("../CarDealerInformation/CarDealerInformation");

Manager.getInstance = flexManagerMock;

const defaultProps: ComponentProps = {
  savedQuotes: [],
  totalSavedQuotes: 0,
  sort: QuoteSortingOptions.Mileage,
  setSort: jest.fn(),
  backToCarSearch: jest.fn(),
};

let props: ComponentProps = defaultProps;

Manager.getInstance = flexManagerMock;

describe("SavedQuoteList", () => {
  beforeEach(() => {
    props = { ...defaultProps };
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders correctly, if no quote found", async () => {
    const wrapper = create(<SavedQuoteList {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render quote list in UI", async () => {
    props.totalSavedQuotes = 1;
    props.savedQuotes = [new QuoteDetailModel()];
    props.savedQuotes[0].created = new Date("2021-07-01 14:14");
    props.savedQuotes[0].isAccepted = true;

    const wrapper = create(<SavedQuoteList {...props} />).toJSON();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it("should show quote not saved message and back to search button if no quotes found", async () => {
    props.totalSavedQuotes = 0;
    props.savedQuotes = [];

    const wrapper = mount(<SavedQuoteList {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.find(".no-result-text").html()).toContain(
      "You haven't saved any quotes"
    );
    expect(wrapper.find(".back-to-search").exists()).toBeTruthy();
  });

  it("when back to search button is clicked, backToCarSearch method should be called", async () => {
    props.totalSavedQuotes = 0;
    props.savedQuotes = [];

    const wrapper = mount(<SavedQuoteList {...props} />);
    await flushPromises();
    wrapper.update();

    const button = wrapper.find(".back-to-search").at(0);
    button.simulate("click");
    wrapper.update();

    expect(props.backToCarSearch).toHaveBeenCalled();
  });

  it("should show number of quotes found in the list", async () => {
    props.totalSavedQuotes = 1;
    props.savedQuotes = [new QuoteDetailModel()];

    const wrapper = mount(<SavedQuoteList {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.html()).toContain("1 saved quote");
  });

  it("should render quote detail component if quotes present", async () => {
    props.totalSavedQuotes = 1;
    props.savedQuotes = [new QuoteDetailModel()];

    const wrapper = mount(<SavedQuoteList {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.find(QuoteDetail).exists()).toBeTruthy();
  });

  it("should not render quote detail component if quotes are not present", async () => {
    props.totalSavedQuotes = 0;
    props.savedQuotes = [];

    const wrapper = mount(<SavedQuoteList {...props} />);
    await flushPromises();
    wrapper.update();

    expect(wrapper.find(QuoteDetail).exists()).toBeFalsy();
  });
});
