import { Shared } from "@common/components";
import React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import { DealerStateType } from "../../common/enum";
import { DealerResponseModel } from "../../models/DealerResponseModel";
import { VehicleSummaryDetailModel } from "../../models/VehicleSummaryDetailModel";
import CarSearchResultDetail, {
  CarSearchResultDetailProp,
} from "../Wizard/CarSearchStep/CarSearchResultDetail/CarSearchResultDetail";
import { VehicleImage } from "../VehicleImage/VehicleImage";

jest.mock("../CarDetailViewDialog/CarDetailViewDialog.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="car-detail-dialog">Car Detail View Dialog</div>;
    },
  };
});

jest.mock("../CarDealerInformation/CarDealerInformation.Container");
jest.mock("../CarDealerInformation/CarDealerInformation");

const props: CarSearchResultDetailProp = {
  vehicleDetail: Object.assign(new VehicleSummaryDetailModel(), {
    vehicleId: "48b14c4f-7928-49b1-aa15-bc8c1cad20ae",
    dealerAdminFee: 200,
    imagesCount: 1,
    image: "imageUrl",
    images: ["imageUrl"],
    make: "Bentley Motors",
    model: "Bentley Continental GT",
    price: 500000,
    mileage: 13,
    regNumber: "BM12853",
    regYear: 2016,
    trans: "Automatic",
    fuel: "Petrol",
    is247Cars: true,
    dealer: Object.assign(new DealerResponseModel(), {
      state: DealerStateType.Approved,
    }),
  }),
  sendCarDetail: jest.fn(() => {}),
  saveCarDetail: jest.fn(() => {}),
  isCarSaved: false,
};

describe("CarSearchResultDetail", () => {
  it("renders correctly", async () => {
    const wrapper = create(<CarSearchResultDetail {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render props in UI", async () => {
    const wrapper = create(<CarSearchResultDetail {...props} />).root;

    expect(
      wrapper.findByProps({
        className: "dealer-fee",
      }).props.children
    ).toContain(
      (props.vehicleDetail as VehicleSummaryDetailModel).dealerAdminFee
    );
    expect(
      wrapper.findByProps({
        className: "car-specification",
      }).props.children.length
    ).toEqual(5);
    expect(
      wrapper.findByProps({
        className: "car-model",
      }).props.children
    ).toContain(
      Shared.getFormattedText(
        [props.vehicleDetail.make, props.vehicleDetail.model],
        " | "
      )
    );
  });

  it("should render VehicleImage component", async () => {
    const wrapper = mount(<CarSearchResultDetail {...props} />);

    expect(wrapper.find(VehicleImage).exists()).toBeTruthy();
  });

  it("when value of isCarSaved prop is false, FavoriteBorderRoundedIcon icon should be displayed", async () => {
    const wrapper = mount(<CarSearchResultDetail {...props} />);

    expect(wrapper.find(FavoriteBorderRoundedIcon).exists()).toBeTruthy();
  });

  it("when value of isCarSaved prop is true, FavoriteIcon icon should be displayed", async () => {
    props.isCarSaved = true;
    const wrapper = mount(<CarSearchResultDetail {...props} />);

    expect(wrapper.find(FavoriteIcon).exists()).toBeTruthy();
  });

  it("when view more detail link is clicked, CarDetailViewDialog component should be rendered", async () => {
    const wrapper = mount(<CarSearchResultDetail {...props} />);

    wrapper.find(".view-more-detail-link").at(1).simulate("click");

    expect(wrapper.find(".car-detail-dialog").exists()).toBeTruthy();
  });

  it("when dealer state is not Approved, SMS and Whatsapp buttons should be disabled", async () => {
    props.vehicleDetail.dealer.state = DealerStateType.Unknown;
    const wrapper = mount(<CarSearchResultDetail {...props} />);

    const whatsappButton = wrapper.find({
      className: "secondary-button whatsapp-icon-button",
    });

    const smsButton = wrapper.find({
      className: "secondary-button sms-icon-button",
    });

    expect(whatsappButton.last().getElement().props.disabled).toBeTruthy();
    expect(smsButton.last().getElement().props.disabled).toBeTruthy();
  });

  it("when car is not marked as is247Cars, SMS and Whatsapp buttons should be disabled", async () => {
    props.vehicleDetail.is247Cars = false;
    const wrapper = mount(<CarSearchResultDetail {...props} />);

    const whatsappButton = wrapper.find({
      className: "secondary-button whatsapp-icon-button",
    });

    const smsButton = wrapper.find({
      className: "secondary-button sms-icon-button",
    });

    expect(whatsappButton.last().getElement().props.disabled).toBeTruthy();
    expect(smsButton.last().getElement().props.disabled).toBeTruthy();
  });
});
