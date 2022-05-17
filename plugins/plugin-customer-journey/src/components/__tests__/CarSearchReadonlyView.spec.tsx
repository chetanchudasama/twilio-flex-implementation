import React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import { ItemModel } from "@common/components";
import CarSearchReadonlyView, {
  CarSearchReadonlyViewProps,
} from "../Wizard/CarSearchStep/CarSearchReadonlyView/CarSearchReadonlyView";
import { VehicleSearchRequestModel } from "../../models/VehicleSearchRequestModel";

const items: ItemModel[] = [
  { id: 1, name: "test1" },
  { id: 2, name: "test2" },
  { id: 3, name: "test3" },
];

const filters = Object.assign(new VehicleSearchRequestModel(), {
  makeIds: [1, 2],
  modelIds: [1, 2],
  bodyIds: [1, 2],
  colourIds: [1, 2],
  fuelIds: [1, 2],
});

const props: CarSearchReadonlyViewProps = {
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
  filters,
  term: 48,
  partExchangeValue: 220,
  partExchangeSettlement: 400,
  deposit: 300,
  vrm: "",
  dealerInfo: "",
  handleEditSearch: jest.fn(() => {}),
};

describe("CarSearchReadonlyView", () => {
  it("renders correctly", async () => {
    const wrapper = create(<CarSearchReadonlyView {...props} />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it("renders correctly as per filters prop value", async () => {
    const wrapper = create(<CarSearchReadonlyView {...props} />).root;

    expect(wrapper.findAllByProps({ className: "item-value" })).toHaveLength(9);
  });

  it("when new search item is added, should rendered in UI", async () => {
    props.filters.keywords = "test-value";
    const wrapper = create(<CarSearchReadonlyView {...props} />).root;

    expect(wrapper.findAllByProps({ className: "item-value" })).toHaveLength(
      10
    );
  });

  it("when filter contains vrm value, should rendered in UI", async () => {
    props.vrm = "test";
    const wrapper = create(<CarSearchReadonlyView {...props} />).root;

    expect(wrapper.findAllByProps({ className: "item-value" })).toHaveLength(1);
  });

  it("when edit search button is clicked, handleEditSearch method should be called", () => {
    const wrapper = mount(<CarSearchReadonlyView {...props} />);

    const editButton = wrapper
      .find(".edit-search-container")
      .find("button")
      .at(0);
    editButton.simulate("click");
    wrapper.update();

    expect(props.handleEditSearch).toBeCalledTimes(1);
  });
});
