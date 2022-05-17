import React from "react";
import { create } from "react-test-renderer";
import { Manager } from "@twilio/flex-ui";
import { DealerSearch, DealerSearchProps } from "../DealerSearch/DealerSearch";
import { flexManagerMock } from "../__mocks__/MockData";
import { DealerResponseModel } from "../../models/DealerResponseModel";

Manager.getInstance = flexManagerMock;

const props: DealerSearchProps = {
  handleDealerUpdate: jest.fn(() => {}),
  dealer: null,
};

describe("DealerSearch", () => {
  it("renders correctly", async () => {
    const wrapper = create(<DealerSearch {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render dealer prop correctly", async () => {
    props.dealer = Object.assign(new DealerResponseModel(), {
      dealerName: "test",
      postcode: "NP6 8RF",
    });
    const wrapper = create(<DealerSearch {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
