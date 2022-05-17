import { Grid, Icon, IconButton } from "@material-ui/core";
import React, { useMemo } from "react";
import CakeIcon from "@material-ui/icons/Cake";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import { VulnerableCustomerStatus, CustomerDetailType } from "../shared/enum";
import { CustomerBannerStyles } from "./CustomerBanner.Styles";
import { ThirdPartyAuthorizationDetail } from "../models/ThirdPartyAuthorizationDetailModel";
import { CustomerBannerMenu } from "../CustomerBannerMenu/CustomerBannerMenu";
import { CustomSnackbar } from "../CustomSnackbar/CustomSnackbar";
import { Shared } from "../shared/Shared";
import { VulnerableCustomerInformation } from "../models/VulnerableCustomerInformation";
import { CallbackDetail } from "../CallbackDetail/CallbackDetail";
import { PreferredLenderIcon } from "../Icons/Icons";
import { secondary } from "../shared/AppTheme";

export interface CustomerBannerProps {
  name: string;
  dob: string;
  address: string;
  mobileNumber: string;
  emailAddress: string;
  callbackBooked?: Date;
  applicationStatusName: string;
  hasThirdPartyAuthorization: boolean;
  thirdPartyAuthorization: ThirdPartyAuthorizationDetail | null;
  hasVulnerableCustomerReported: boolean;
  vulnerableCustomerInformation: VulnerableCustomerInformation | null;
  saveThirdPartyDetailHandler: (
    thirdPartyAuthorization: ThirdPartyAuthorizationDetail | null
  ) => void;
  saveVulnerableCustomerInformation: (
    vulnerableCustomerInformation: VulnerableCustomerInformation | null
  ) => void;
  setCallbackDetail: (callbackDate: Date | null, reason?: string) => void;
  canMakeCall: boolean;
  makeCall: () => void;
  lenderName: string;
  tierName: string;
  apr?: number;
  updateCustomerDetail: (customerDetailType: CustomerDetailType) => void;
}

export const CustomerBanner: React.FC<CustomerBannerProps> = (props) => {
  const {
    dob,
    name,
    hasThirdPartyAuthorization,
    thirdPartyAuthorization,
    address,
    mobileNumber,
    emailAddress,
    applicationStatusName,
    saveThirdPartyDetailHandler,
    hasVulnerableCustomerReported,
    vulnerableCustomerInformation,
    saveVulnerableCustomerInformation,
    callbackBooked,
    setCallbackDetail,
    canMakeCall,
    makeCall,
    lenderName,
    tierName,
    apr,
    updateCustomerDetail,
  } = props;

  const vulnerableCustomerStatus = useMemo(() => {
    if (vulnerableCustomerInformation) {
      return VulnerableCustomerStatus[vulnerableCustomerInformation.status]
        ? VulnerableCustomerStatus[vulnerableCustomerInformation.status]
        : vulnerableCustomerInformation.status;
    }
    return "";
  }, [vulnerableCustomerInformation]);

  return (
    <CustomerBannerStyles>
      <Grid container>
        <Grid xs={12} item className="banner-container-1">
          <Grid container>
            <Grid item xs={9}>
              <span className="app-text">Applications</span>
              <Icon className="app-icon">chevron_right</Icon>
              <span className="name">{name}</span>
              {applicationStatusName && (
                <span className="app-status">{applicationStatusName}</span>
              )}
            </Grid>
            <Grid item xs={2} className="text-align-right">
              <CallbackDetail
                callbackBooked={callbackBooked}
                setCallbackDetail={setCallbackDetail}
              />
            </Grid>
            <Grid item xs={1} className="banner-menu">
              <CustomerBannerMenu
                hasThirdPartyAuthorization={hasThirdPartyAuthorization}
                thirdPartyAuthorization={thirdPartyAuthorization}
                saveThirdPartyDetailHandler={saveThirdPartyDetailHandler}
                hasVulnerableCustomerReported={hasVulnerableCustomerReported}
                handleReportVulnerability={saveVulnerableCustomerInformation}
                vulnerableCustomerInfo={vulnerableCustomerInformation}
                updateCustomerDetail={updateCustomerDetail}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} item className="banner-container-2">
          <Grid container>
            <Grid item xs={2}>
              <Grid container>
                <Grid item xs={1} className="icon">
                  <CakeIcon />
                </Grid>
                <Grid item xs={11} className="dob">
                  {dob}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs={1} className="icon">
                  <Icon>place</Icon>
                </Grid>
                <Grid item xs={11} className="address">
                  {address || "-"}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={4} className="lender-info">
              <Grid container>
                <Grid item xs={1}>
                  <PreferredLenderIcon color={secondary} opacity="0.4" />
                </Grid>
                <Grid item xs={11} className="preferred-lender">
                  <span className="lender-label">Preferred Lender:</span>
                  <span className="lender-name">{lenderName}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} item className="banner-container-3">
          <Grid container>
            <Grid item xs={2}>
              <Grid container>
                <Grid item xs={1} className="icon">
                  <IconButton
                    aria-label="phone"
                    className="mobile-icon"
                    disabled={!canMakeCall}
                    onClick={() => makeCall()}
                  >
                    <PhoneAndroidIcon fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item xs={11} className="mobile-number">
                  {mobileNumber}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs={1} className="icon">
                  <Icon>email</Icon>
                </Grid>
                <Grid item xs={11} className="email">
                  {emailAddress}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={4} className="lender-info">
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={2} className="percentIcon">
                      %
                    </Grid>
                    <Grid item xs={10} className="apr">
                      APR: {`${apr || 0} %`}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={2} className="icon">
                      <Icon>layers</Icon>
                    </Grid>
                    <Grid item xs={10} className="tier">
                      {tierName}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {hasVulnerableCustomerReported && vulnerableCustomerInformation && (
              <CustomSnackbar
                message={`This customer has been reported as vulnerable in this application (${vulnerableCustomerStatus}). See notes for more details`}
                type="error"
              />
            )}
            {hasThirdPartyAuthorization && thirdPartyAuthorization && (
              <CustomSnackbar
                message={`This customer has left third-party permission for ${
                  thirdPartyAuthorization.thirdPartyName
                } until ${Shared.getFormattedDate(
                  thirdPartyAuthorization.thirdPartyExpiryDate
                    ? thirdPartyAuthorization.thirdPartyExpiryDate
                    : new Date(),
                  "DD/MM/YYYY"
                )}`}
                type="secondary"
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </CustomerBannerStyles>
  );
};
