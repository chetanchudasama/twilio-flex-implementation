import React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import { Radio } from "@material-ui/core";
import { ItemModel, Shared, CustomSnackbar } from "@common/components";
import CarSearchCriteria, {
  CarSearchCriteriaProps,
} from "../Wizard/CarSearchStep/CarSearchCriteria/CarSearchCriteria";
import CarSearchReadonlyView from "../Wizard/CarSearchStep/CarSearchReadonlyView/CarSearchReadonlyView";

const items: ItemModel[] = [
  { id: 1, name: "test1" },
  { id: 2, name: "test2" },
  { id: 3, name: "test3" },
];

const core: CarSearchCriteriaProps = {
  vehicleSearchDropdownData: {
    makesModels: [
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
    ],
    body: items,
    colour: items,
    fuel: items,
    trans: items,
    distance: [0, 10, 20],
  },
  setFilters: jest.fn(() => {}),
  termId: Shared.termList[0].id,
  maxLendAmount: 100,
  setVRMFilters: jest.fn(() => {}),
};

let props = { ...core };

jest.mock("../DealerSearch/DealerSearch");

describe("CarSearchCriteria", () => {
  beforeEach(() => {
    props = { ...core };
  });

  it("renders correctly", async () => {
    const wrapper = create(<CarSearchCriteria {...props} />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it("when user select monthly budget, UI should be changed accordingly", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);
    wrapper.update();

    expect(wrapper.find({ label: "Total Price*" }).exists()).toBeTruthy();

    const radio = wrapper.find(Radio).last().find("input");
    radio.simulate("change", { target: { value: "2" } });
    wrapper.update();

    expect(wrapper.find({ label: "Total Price*" }).exists()).toBeFalsy();
    expect(wrapper.find({ label: "Monthly Budget*" }).exists()).toBeTruthy();
  });

  it("when advanced search button is clicked, UI should be changed accordingly", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);
    expect(wrapper.find({ label: "Body type" }).exists()).toBeFalsy();

    const link = wrapper.find(".link").at(0);
    link.simulate("click");
    wrapper.update();

    expect(wrapper.find({ label: "Body type" }).exists()).toBeTruthy();
  });

  it("when simple search button is clicked, UI should be changed accordingly", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);
    const link = wrapper.find(".link").at(0);
    link.simulate("click");
    wrapper.update();
    expect(wrapper.find({ label: "Body type" }).exists()).toBeTruthy();

    link.simulate("click");
    wrapper.update();

    expect(wrapper.find({ label: "Body type" }).exists()).toBeFalsy();
  });

  it("when search button is clicked, if term is not set setFilters method should not call", async () => {
    props.termId = null;

    const wrapper = mount(<CarSearchCriteria {...props} />);
    wrapper.update();

    const input = wrapper.find(".price-container").last().find("input").last();
    input.simulate("change", { target: { value: "1000" } });
    wrapper.update();

    const button = wrapper.find(".search-btn").at(0);
    button.simulate("click");
    wrapper.update();

    expect(props.setFilters).not.toBeCalled();
  });

  it("when search button is clicked, if total price/monthly budget is not set setFilters method should not call", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);
    wrapper.update();

    const button = wrapper.find(".search-btn").at(0);
    button.simulate("click");
    wrapper.update();

    expect(props.setFilters).not.toBeCalled();
  });

  it("when search button is clicked, setFilters method should be called", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);
    wrapper.update();

    const input = wrapper.find(".price-container").last().find("input").last();
    input.simulate("change", { target: { value: "1000" } });
    wrapper.update();

    const button = wrapper.find(".search-btn").at(0);
    button.simulate("click");
    wrapper.update();

    expect(props.setFilters).toBeCalled();
  });

  it("when search button is clicked, CarSearchReadonlyView component should be rendered in UI", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);
    wrapper.update();

    const input = wrapper.find(".price-container").last().find("input").last();
    input.simulate("change", { target: { value: "1000" } });
    wrapper.update();

    const button = wrapper.find(".search-btn").at(0);
    button.simulate("click");
    wrapper.update();

    expect(wrapper.find(CarSearchReadonlyView).exists()).toBeTruthy();
  });

  it("when edit search button is clicked from CarSearchReadonlyView component, UI should be changed accordingly", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);
    wrapper.update();

    const input = wrapper.find(".price-container").last().find("input").last();
    input.simulate("change", { target: { value: "1000" } });
    wrapper.update();

    const button = wrapper.find(".search-btn").at(0);
    button.simulate("click");
    wrapper.update();

    expect(wrapper.find(CarSearchReadonlyView).exists()).toBeTruthy();
    const editButton = wrapper
      .find(".edit-search-container")
      .find("button")
      .at(0);
    editButton.simulate("click");
    wrapper.update();

    expect(wrapper.find({ label: "Car make" }).exists()).toBeTruthy();
  });

  it("should display warning, if total price exceeds maxLendAmount from the preferred lender", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);
    const input = wrapper
      .find(".price-container")
      .first()
      .find("input")
      .first();
    input.simulate("change", { target: { value: "1000" } });
    wrapper.update();

    expect(wrapper.find(CustomSnackbar).exists()).toBeTruthy();
    expect(
      (wrapper.find(CustomSnackbar) as CustomSnackbar).props().message
    ).toEqual("This exceeds the customer's maximum borrow amount by £900.");
  });

  it("should display warning, if total payable amount exceeds maxLendAmount from the preferred lender", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);

    const radio = wrapper.find(Radio).last().find("input");
    radio.simulate("change", { target: { value: "2" } });
    wrapper.update();

    const input = wrapper.find(".price-container").last().find("input").first();
    input.simulate("change", { target: { value: "1000" } });
    wrapper.update();

    expect(wrapper.find(CustomSnackbar).exists()).toBeTruthy();
    expect(
      (wrapper.find(CustomSnackbar) as CustomSnackbar).props().message
    ).toEqual("This exceeds the customer's maximum borrow amount by £35,900.");
  });

  it("when search by vrm button is clicked, UI should be rendered accordingly", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);
    expect(wrapper.find({ label: "VRM" }).exists()).toBeFalsy();

    const link = wrapper.find(".link").last();
    link.simulate("click");
    wrapper.update();

    expect(wrapper.find({ label: "VRM" }).exists()).toBeTruthy();
  });

  it("when search by specification button is clicked, UI should be rendered accordingly", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);

    const link = wrapper.find(".link").last();
    link.simulate("click");
    wrapper.update();

    expect(wrapper.find({ label: "VRM" }).exists()).toBeTruthy();

    link.simulate("click");
    wrapper.update();

    expect(wrapper.find({ label: "VRM" }).exists()).toBeFalsy();
  });

  it("when search by vrm button is clicked, setVRMFilters method should be called", async () => {
    const wrapper = mount(<CarSearchCriteria {...props} />);
    const link = wrapper.find(".link").last();
    link.simulate("click");
    wrapper.update();

    const input = wrapper
      .find({ className: "padding-right vrm-container" })
      .last()
      .find("input")
      .last();
    input.simulate("change", { target: { value: "1000" } });
    wrapper.update();

    const button = wrapper.find(".search-btn").at(0);
    button.simulate("click");
    wrapper.update();

    expect(props.setVRMFilters).toBeCalled();
  });
});
