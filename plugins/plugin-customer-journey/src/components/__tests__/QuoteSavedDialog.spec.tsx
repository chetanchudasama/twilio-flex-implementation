import React from "react";
import { create } from "react-test-renderer";
import QuoteSavedDialog, {
  QuoteSavedDialogProps,
} from "../Wizard/QuotesStep/QuoteSavedDialog/QuoteSavedDialog";

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    ResponsiveDialog: jest.fn(({ children }) => children),
  };
});

const props: QuoteSavedDialogProps = {
  open: true,
  handleQuoteSavedDialogClose: jest.fn(() => {}),
};

describe("QuoteSavedDialog", () => {
  it("renders correctly", async () => {
    const wrapper = create(<QuoteSavedDialog {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
