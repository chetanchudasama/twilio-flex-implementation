/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import { ImagePreview, ImagePreviewProps } from "../ImagePreview/ImagePreview";

const props: ImagePreviewProps = {
  imageSrc: "ImageUrl",
};

describe("ImagePreview", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ImagePreview {...props} />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".image-content").exists()).toBeTruthy();
  });
});
