import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Divider, MenuItem } from "@material-ui/core";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { ThirdPartyAuthorizationDetail } from "../models/ThirdPartyAuthorizationDetailModel";
import { ThirdPartyAuthorizationDialog } from "../ThirdPartyAuthorizationDialog/ThirdPartyAuthorizationDialog";
import {
  CustomerBannerMenuStyles,
  MenuStyles,
} from "./CustomerBannerMenu.Styles";
import { VulnerableCustomerInformation } from "../models/VulnerableCustomerInformation";
import { VulnerableCustomerDialog } from "../VulnerableCustomerDialog/VulnerableCustomerDialog";
import { CustomerDetailType } from "../shared/enum";

export interface CustomerBannerMenuProp {
  hasThirdPartyAuthorization?: boolean;
  thirdPartyAuthorization?: ThirdPartyAuthorizationDetail | null;
  saveThirdPartyDetailHandler?: (
    thirdPartyAuthorizationDetail: ThirdPartyAuthorizationDetail | null
  ) => void;
  hasVulnerableCustomerReported?: boolean;
  vulnerableCustomerInfo?: VulnerableCustomerInformation | null;
  handleReportVulnerability?: (
    customerInfo: VulnerableCustomerInformation | null
  ) => void;
  updateCustomerDetail: (customerDetailType: CustomerDetailType) => void;
  isFromLeadGenerationScreen?: boolean;
}

export const CustomerBannerMenu: React.FC<CustomerBannerMenuProp> = (props) => {
  const {
    hasThirdPartyAuthorization,
    thirdPartyAuthorization,
    saveThirdPartyDetailHandler,
    hasVulnerableCustomerReported,
    vulnerableCustomerInfo,
    handleReportVulnerability,
    updateCustomerDetail,
    isFromLeadGenerationScreen,
  } = props;

  const options = [
    {
      id: 1,
      value: "Customer Details",
    },
    {
      id: 2,
      value: "Address History",
    },
    {
      id: 3,
      value: "Employment History",
    },
    {
      id: 4,
      value: "Bank Details",
    },
    {
      id: -1,
      value: "",
    },
    {
      id: 5,
      value:
        hasVulnerableCustomerReported && vulnerableCustomerInfo
          ? "Edit/Remove Vulnerability"
          : "Report Vulnerability",
    },
    {
      id: 6,
      value:
        hasThirdPartyAuthorization && thirdPartyAuthorization
          ? "Renew/Remove Third-party permission"
          : "Add Third-party Permission",
    },
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    openThirdPartyAuthorizationPopup,
    setOpenThirdPartyAuthorizationPopup,
  ] = useState(false);
  const [openVulnerabilityPopup, setOpenVulnerabilityPopup] = useState(false);

  useEffect(() => {
    setOpenThirdPartyAuthorizationPopup(false);
  }, [thirdPartyAuthorization]);

  useEffect(() => {
    setOpenVulnerabilityPopup(false);
  }, [vulnerableCustomerInfo]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    switch (id) {
      case 1:
        updateCustomerDetail(CustomerDetailType.CustomerDetail);
        break;
      case 2:
        updateCustomerDetail(CustomerDetailType.AddressHistory);
        break;
      case 3:
        updateCustomerDetail(CustomerDetailType.EmploymentHistory);
        break;
      case 4:
        updateCustomerDetail(CustomerDetailType.BankDetails);
        break;
      case 5:
        setOpenVulnerabilityPopup(true);
        break;
      case 6:
        setOpenThirdPartyAuthorizationPopup(true);
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  return (
    <CustomerBannerMenuStyles>
      <IconButton onClick={handleClick} className="icon-btn">
        <MoreHoriz />
      </IconButton>
      <MenuStyles
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className="banner-menu"
      >
        {(isFromLeadGenerationScreen
          ? [...options.slice(0, 2), options[3]]
          : options
        ).map((option) => (
          <MenuItem
            key={option.id}
            onClick={(event) => handleMenuItemClick(event, option.id)}
            className={option.id === -1 ? "menu-item-divider" : ""}
          >
            {option.id > -1 ? option.value : <Divider className="divider" />}
          </MenuItem>
        ))}
      </MenuStyles>
      {saveThirdPartyDetailHandler && openThirdPartyAuthorizationPopup && (
        <ThirdPartyAuthorizationDialog
          open={openThirdPartyAuthorizationPopup}
          thirdPartyAuthorizationInformation={
            thirdPartyAuthorization || new ThirdPartyAuthorizationDetail()
          }
          handleDialogClose={() => setOpenThirdPartyAuthorizationPopup(false)}
          handleSaveThirdPartyDetail={saveThirdPartyDetailHandler}
        />
      )}
      {handleReportVulnerability && openVulnerabilityPopup && (
        <VulnerableCustomerDialog
          open={openVulnerabilityPopup}
          vulnerableCustomerInfo={vulnerableCustomerInfo || null}
          handleDialogClose={() => setOpenVulnerabilityPopup(false)}
          handleReportVulnerability={handleReportVulnerability}
          hasVulnerableCustomerReported={hasVulnerableCustomerReported || false}
        />
      )}
    </CustomerBannerMenuStyles>
  );
};
