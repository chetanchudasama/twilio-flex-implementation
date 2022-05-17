import { create } from "react-test-renderer";
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import { CustomerBannerMenu, CustomerDetailType } from "@common/components";
import { QualifyDetailModel } from "../../models/QualifyDetailModel";
import { LeadGenerationContent } from "../LeadGeneration/LeadGenerationContent/LeadGenerationContent";
import { LeadGenerationContentProps } from "../LeadGeneration/LeadGenerationContent/LeadGenerationContent.Props";
import { FactFindDetailModel } from "../../models/FactFindDetailModel";
import CustomerDetailActionContainer from "../CustomerDetailAction/CustomerDetailActionContent.Container";

const props: LeadGenerationContentProps = {
  applicationId: 1,
  customerName: "Jon Smith",
  qualifyingDetail: new QualifyDetailModel(),
  updateQualifyingDetails: jest.fn(),
  updateApplication: jest.fn(),
  factFindDetail: new FactFindDetailModel(),
  updateFactFindDetail: jest.fn(),
  recentNotes: [],
  updateCustomerPreferredName: jest.fn(),
  setCallbackDetail: jest.fn(),
  getRankedAgents: jest.fn(),
  handleContactOutcomeClick: jest.fn(),
};

jest.mock("@common/components", () => {
  const components = jest.requireActual("@common/components");
  return {
    ...components,
    CustomerBannerMenu: jest.fn(({ children }) => {
      return <div>{children}</div>;
    }),
  };
});

jest.mock("../LeadGeneration/ContactOutcome/ContactOutcome.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Contact Outcome</div>;
    },
  };
});

jest.mock("../LeadGeneration/CampaignDetails/CampaignDetails", () => {
  return {
    CampaignDetails: () => {
      return <div>Campaign Details</div>;
    },
  };
});

jest.mock("../LeadGeneration/Allocation/Allocation", () => {
  return {
    Allocation: () => {
      return <div>Allocation</div>;
    },
  };
});

jest.mock("../LeadGeneration/CustomerName/CustomerName.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Customer Name</div>;
    },
  };
});

jest.mock("../LeadGeneration/DPAFCA/DPAFCA.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>DPA FCA</div>;
    },
  };
});

jest.mock("../LeadGeneration/FactFind/FactFind.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Fact Find</div>;
    },
  };
});

jest.mock("../LeadGeneration/LenderDetail/LenderDetail.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Lender Detail</div>;
    },
  };
});

jest.mock("../LeadGeneration/QualifyDetail/QualifyDetail.Container", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Qualify Detail</div>;
    },
  };
});

jest.mock("../LeadGeneration/RecentNotes/RecentNotes", () => {
  return {
    RecentNotes: () => {
      return <div>Recent Notes</div>;
    },
  };
});

jest.mock("../LeadGeneration/UpdateApplication/UpdateApplication", () => {
  return {
    UpdateApplication: () => {
      return <div>Update Application</div>;
    },
  };
});

jest.mock(
  "../CustomerDetailAction/CustomerDetailActionContent.Container",
  () => {
    return {
      __esModule: true,
      default: jest.fn(({ children }) => {
        return <div>{children}</div>;
      }),
    };
  }
);

describe("LeadGenerationContent", () => {
  it("renders correctly", () => {
    const wrapper = create(<LeadGenerationContent {...props} />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render CustomerDetailActionContainer component, when updateCustomerDetail method is called from CustomerBannerMenu", () => {
    const wrapper = mount(<LeadGenerationContent {...props} />);

    act(() => {
      wrapper
        .find(CustomerBannerMenu)
        .props()
        .updateCustomerDetail(CustomerDetailType.CustomerDetail);
    });
    wrapper.update();

    expect(wrapper.find(CustomerDetailActionContainer).exists()).toBe(true);
    expect(wrapper.find(".hide-scrollbar").exists()).toBe(true);
  });

  it("should hide CustomerDetailActionContainer component, when backToWizardStepper method is called", () => {
    const wrapper = mount(<LeadGenerationContent {...props} />);

    act(() => {
      wrapper
        .find(CustomerBannerMenu)
        .props()
        .updateCustomerDetail(CustomerDetailType.CustomerDetail);
    });
    wrapper.update();

    act(() => {
      wrapper.find(CustomerDetailActionContainer).props().backToWizardStepper();
    });
    wrapper.update();

    expect(wrapper.find(CustomerDetailActionContainer).exists()).toBe(false);
    expect(wrapper.find(".show-scrollbar").exists()).toBe(true);
  });
});
