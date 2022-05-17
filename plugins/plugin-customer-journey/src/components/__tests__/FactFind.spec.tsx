import React from "react";
import { mount } from "enzyme";
import { create } from "react-test-renderer";

import { ItemModel } from "@common/components";
import { FactFindDetailModel } from "../../models/FactFindDetailModel";
import { TimeForPurchaseItemModel } from "../../models/TimeForPurchaseModel";
import { FactFindProps } from "../LeadGeneration/FactFind/FactFind.Props";
import { FactFind } from "../LeadGeneration/FactFind/FactFind";

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

const vehicleSearchDropdownData = {
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
};

const factFindDetailModel: FactFindDetailModel = new FactFindDetailModel();
factFindDetailModel.borrowAmount = 100;
factFindDetailModel.timeForPurchase = {
  id: 1,
  name: "timeForPurchaseItem1",
};
factFindDetailModel.hasCustomerAlreadyFoundCar = true;
factFindDetailModel.makeId = 1;
factFindDetailModel.modelId = 1;
factFindDetailModel.vrm = "";
factFindDetailModel.vehicleType = { id: 1, name: "Car" };
factFindDetailModel.note = "";

const props: FactFindProps = {
  vehicleSearchDropdownData,
  timeForPurchaseItems,
  factFindDetail: factFindDetailModel,
  updateFactFindDetail: jest.fn(),
};

describe("FactFind", () => {
  it("renders correctly on load", () => {
    const wrapper = create(<FactFind {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should call updateFactFindDetail method, when value of borrowAmount text-field is changed", () => {
    const wrapper = mount(<FactFind {...props} />);

    const input = wrapper.find(".borrowAmount").last().find("input").last();
    input.simulate("change", { target: { value: "1000" } });
    wrapper.update();

    expect(props.updateFactFindDetail).toHaveBeenCalled();
  });

  it("should render make, model and vrm fields, when value of hasCustomerAlreadyFoundCar is true", async () => {
    const wrapper = mount(<FactFind {...props} />);
    wrapper.update();

    expect(wrapper.html()).toContain("What is the car make?");
    expect(wrapper.html()).toContain("What is the car model?");
    expect(wrapper.html()).toContain("Does the customer know the VRM?");
  });

  it("should call updateFactFindDetail method, when value of vrm text-field is changed", () => {
    const wrapper = mount(<FactFind {...props} />);

    expect(wrapper.html()).toContain("Does the customer know the VRM?");

    const input = wrapper.find(".vrm").last().find("input").last();
    input.simulate("change", { target: { value: "VRM" } });
    wrapper.update();

    expect(props.updateFactFindDetail).toHaveBeenCalled();
  });

  it("should call updateFactFindDetail method, when value of notes text-field is changed", () => {
    const wrapper = mount(<FactFind {...props} />);

    const input = wrapper.find(".add-note-text-field");
    input.at(0).simulate("change", { target: { value: "Note" } });
    wrapper.update();

    expect(props.updateFactFindDetail).toHaveBeenCalled();
  });
});
