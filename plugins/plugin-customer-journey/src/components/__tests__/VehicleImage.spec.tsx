import React from "react";
import { mount } from "enzyme";
import { create, act } from "react-test-renderer";
import { VehicleImage, VehicleImageProps } from "../VehicleImage/VehicleImage";

const props: VehicleImageProps = {
  image: "ImageUrl",
  imageList: ["ImageUrl"],
  imagesCount: 1,
  showImageCount: true,
};

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    components,
    ImageCarousel: () => {
      return <div className="image-carousel">Image Carousel</div>;
    },
    CarNotFoundIcon: () => {
      return <div className="car-not-found">Car not found</div>;
    },
  };
});

describe("VehicleImage", () => {
  it("renders correctly on load", async () => {
    const wrapper = create(<VehicleImage {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("when value of image prop is null, should render Car not found image icon", async () => {
    props.image = "";
    const wrapper = create(<VehicleImage {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should renders prop values correctly", async () => {
    props.image = "ImageUrl";
    const wrapper = mount(<VehicleImage {...props} />);

    expect(wrapper.find(".vehicle-img").exists()).toBeTruthy();
    expect(wrapper.find(".image-count").exists()).toBeTruthy();
    expect(wrapper.find(".image-missing").exists()).toBeFalsy();
  });

  it("when value of prop showImageCount is false, UI should render accordingly", async () => {
    props.showImageCount = false;
    const wrapper = mount(<VehicleImage {...props} />);

    expect(wrapper.find(".image-count").exists()).toBeFalsy();
  });

  it("should render ImageCarousel component, when vehicle image is clicked", async () => {
    const wrapper = create(<VehicleImage {...props} />).root;

    act(() => {
      wrapper.findAllByType("div")[0].props.onClick();
    });

    expect(
      wrapper.findAllByProps({ className: "image-carousel" })
    ).toHaveLength(1);
  });

  it("should not render ImageCarousel component, when value of imageList is null", async () => {
    props.imageList = [];
    const wrapper = create(<VehicleImage {...props} />).root;

    act(() => {
      wrapper.findAllByType("div")[0].props.onClick();
    });

    expect(
      wrapper.findAllByProps({ className: "image-carousel" })
    ).toHaveLength(0);
  });
});
