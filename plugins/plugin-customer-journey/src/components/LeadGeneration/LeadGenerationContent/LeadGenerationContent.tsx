import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { CustomerBannerMenu, CustomerDetailType } from "@common/components";
import { LeadGenerationContentStyles } from "./LeadGenerationContent.Styles";
import { Allocation } from "../Allocation/Allocation";
import { UpdateApplication } from "../UpdateApplication/UpdateApplication";
import FactFind from "../FactFind/FactFind.Container";
import QualifyDetail from "../QualifyDetail/QualifyDetail.Container";
import CustomerName from "../CustomerName/CustomerName.Container";
import DPAFCA from "../DPAFCA/DPAFCA.Container";
import LenderDetail from "../LenderDetail/LenderDetail.Container";
import { CampaignDetails } from "../CampaignDetails/CampaignDetails";
import { RecentNotes } from "../RecentNotes/RecentNotes";
import ContactOutcome from "../ContactOutcome/ContactOutcome.Container";
import { LeadGenerationContentProps } from "./LeadGenerationContent.Props";
import CustomerDetailActionContainer from "../../CustomerDetailAction/CustomerDetailActionContent.Container";

export const LeadGenerationContent: React.FC<LeadGenerationContentProps> = ({
  applicationId,
  customerName,
  qualifyingDetail,
  updateQualifyingDetails,
  updateApplication,
  factFindDetail,
  updateFactFindDetail,
  recentNotes,
  updateCustomerPreferredName,
  setCallbackDetail,
  getRankedAgents,
  handleContactOutcomeClick,
}) => {
  const [customerDetailType, setCustomerDetailType] =
    useState<CustomerDetailType | null>(null);

  const updateCustomerDetail = (type: CustomerDetailType) => {
    setCustomerDetailType(type);
  };

  return (
    <LeadGenerationContentStyles>
      <Grid
        container
        spacing={16}
        className={`lead-gen-container ${
          customerDetailType ? "hide-scrollbar" : "show-scrollbar"
        }`}
      >
        <Grid item xs={12}>
          <Grid container spacing={16} className="customer-name-lg">
            <Grid item xs={5} className="customer-name">
              {`${customerName} (#${applicationId})`}
            </Grid>
            {!customerDetailType && (
              <Grid item xs={7} className="menu-container">
                <ContactOutcome
                  setCallbackDetail={setCallbackDetail}
                  handleContactOutcomeClick={handleContactOutcomeClick}
                />
                <span className="divider-left" />
                <CustomerBannerMenu
                  updateCustomerDetail={updateCustomerDetail}
                  isFromLeadGenerationScreen
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {customerDetailType ? (
          <CustomerDetailActionContainer
            backToWizardStepper={() => {
              setCustomerDetailType(null);
            }}
            customerDetailType={customerDetailType}
            isFromLeadGenerationScreen
          />
        ) : (
          <>
            <Grid item xs={12}>
              <Grid container spacing={16}>
                <Grid item xs={4}>
                  <CampaignDetails />
                </Grid>
                <Grid item xs={8}>
                  <RecentNotes recentNotes={recentNotes} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className="white-background">
              <LenderDetail />
            </Grid>
            <Grid item xs={12} className="white-background step-container">
              <span className="step-name">01</span>
              <DPAFCA />
            </Grid>
            <Grid item xs={12} className="white-background">
              <CustomerName
                updateCustomerPreferredName={updateCustomerPreferredName}
              />
            </Grid>
            <Grid item xs={12} className="white-background step-container">
              <span className="step-name">02</span>
              <QualifyDetail
                qualifyingDetail={qualifyingDetail}
                updateQualifyingDetails={updateQualifyingDetails}
              />
            </Grid>
            <Grid item xs={12} className="white-background step-container">
              <span className="step-name">03</span>
              <FactFind
                factFindDetail={factFindDetail}
                updateFactFindDetail={updateFactFindDetail}
              />
            </Grid>
            <Grid item xs={12} className="white-background step-container">
              <span className="step-name">04</span>
              <UpdateApplication updateApplication={updateApplication} />
            </Grid>
            <Grid item xs={12} className="white-background step-container">
              <span className="step-name">05</span>
              <Allocation getRankedAgents={getRankedAgents} />
            </Grid>
          </>
        )}
      </Grid>
    </LeadGenerationContentStyles>
  );
};
