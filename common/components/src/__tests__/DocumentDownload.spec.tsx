/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import {
  DocumentDownload,
  DocumentDownloadProps,
} from "../DocumentDownload/DocumentDownload";

const props: DocumentDownloadProps = {
  fileUrl: "FileUrl",
};

describe("DocumentDownload", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<DocumentDownload {...props} />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".download-icon").exists()).toBeTruthy();
  });
});
