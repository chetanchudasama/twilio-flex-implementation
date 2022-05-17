import { Shared, ResponsiveDialog } from "@common/components";
import React, { useEffect, useState, useMemo } from "react";
import { Manager } from "@twilio/flex-ui";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import { Grid, Button } from "@material-ui/core";
import { v4 } from "uuid";
import { CarDetailViewDialogStyles } from "./CarDetailViewDialog.Styles";
import { VehicleDetailModel } from "../../models/VehicleDetailModel";
import CarDealerInformation from "../CarDealerInformation/CarDealerInformation.Container";
import { useVehicleService } from "../../services/vehicle.service";
import { AppState, namespace } from "../../states";
import { showErrorMessage } from "../../Notifications";
import { StateToProps, DispatchToProps } from "./CarDetailViewDialog.Props";
import Loading from "../LoadingComponent/Loading";
import { VehicleImage } from "../VehicleImage/VehicleImage";

export interface CarDetailViewDialogProps {
  open: boolean;
  vehicleId: number;
  postCode: string;
  handleCloseDialog: () => void;
}

type Props = StateToProps & DispatchToProps & CarDetailViewDialogProps;

const CarDetailViewDialog: React.FC<Props> = ({
  open,
  vehicleId,
  postCode,
  handleCloseDialog,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const token: string = useMemo(() => {
    return state.flex.session.ssoTokenPayload.token ?? "";
  }, [state.flex.session.ssoTokenPayload]);

  const phoenixToken: string = useMemo(() => {
    return state.crm?.crmState?.phoenixToken ?? "";
  }, [state.crm?.crmState?.phoenixToken]);

  const vehicleService = useVehicleService(token, phoenixToken);

  const [vehicleDetail, setVehicleDetail] = useState(new VehicleDetailModel());
  const [showAllSpecification, setShowAllSpecification] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getVehicleDetail = async () => {
      setIsLoading(true);
      vehicleService
        .getVehicleDetail(vehicleId, postCode)
        .then((response) => {
          setVehicleDetail(response);
          setIsLoading(false);
        })
        .catch((error) => {
          showErrorMessage(
            "Error loading vehicle detail, please try again!",
            "",
            true
          );
          handleCloseDialog();
        });
    };
    getVehicleDetail();
    // TODO come back to this and see if we can fix
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vehicleSpecificationList = [
    {
      propertyName: "Transmission",
      propertyValue: vehicleDetail.trans ?? "-",
    },
    {
      propertyName: "Body Type",
      propertyValue: vehicleDetail.body ?? "-",
    },
    {
      propertyName: "Engine Size",
      propertyValue: `${vehicleDetail.engine ?? "0"}L`,
    },
    {
      propertyName: "Doors",
      propertyValue: `${vehicleDetail.doorsCount ?? "0"}dr`,
    },
    {
      propertyName: "Fuel Type",
      propertyValue: vehicleDetail.fuel ?? "-",
    },
    {
      propertyName: "Colour",
      propertyValue: vehicleDetail.colour ?? "-",
    },
    {
      propertyName: "Trim",
      propertyValue: vehicleDetail.trim ?? "-",
    },
    {
      propertyName: "Year",
      propertyValue: vehicleDetail.year ?? "-",
    },
    {
      propertyName: "Mileage",
      propertyValue: `${vehicleDetail.mileage ?? "0"} mi`,
    },
    {
      propertyName: "Distance",
      propertyValue: vehicleDetail.distance ?? "0",
    },
    {
      propertyName: "Reg. Number",
      propertyValue: vehicleDetail.regNumber ?? "-",
    },
  ];

  const toggleCarSpecification = () => {
    setShowAllSpecification(!showAllSpecification);
  };

  const toggleCarDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <>
      <ResponsiveDialog
        open={open}
        onCancel={handleCloseDialog}
        onConfirm={() => {}}
        maxWidth="lg"
        showActionButtons={false}
        titleCloseIcon
      >
        <CarDetailViewDialogStyles>
          {isLoading && <Loading />}
          {!isLoading && (
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12} className="car-dialog-image">
                    <VehicleImage
                      image={vehicleDetail.images[0]}
                      imageList={vehicleDetail.images}
                      imagesCount={vehicleDetail.images.length}
                      showImageCount
                    />
                  </Grid>
                  <Grid item xs={12} className="dealer-info-content">
                    <CarDealerInformation
                      dealerInfo={vehicleDetail.dealer}
                      distance={vehicleDetail.distance!}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container className="car-spec-detail">
                  <Grid item xs={12}>
                    <div className="car-price">
                      {Shared.getFormattedCurrencyValue(vehicleDetail.price)}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <ul className="car-specification">
                      <li>{vehicleDetail.make}</li>
                      <li>{vehicleDetail.model}</li>
                      <li>{vehicleDetail.body}</li>
                      <li>{vehicleDetail.doorsCount}dr</li>
                    </ul>
                  </Grid>
                  {vehicleSpecificationList.map((vehicleInfo, index) => (
                    <React.Fragment key={v4()}>
                      <Grid
                        item
                        xs={6}
                        className={!(index % 2) ? "space-right" : "space-left"}
                      >
                        <Grid container className="car-prop" spacing={8}>
                          <Grid item xs={5} className="car-prop-type">
                            {vehicleInfo.propertyName}
                          </Grid>
                          <Grid item xs={7} className="car-prop-value">
                            {vehicleInfo.propertyValue}
                          </Grid>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  ))}
                  <Grid item xs={6} />
                  {showAllSpecification &&
                    vehicleDetail.specs &&
                    vehicleDetail.specs.map((specDetail, index) => (
                      <React.Fragment key={v4()}>
                        <Grid
                          item
                          xs={6}
                          className={
                            !(index % 2) ? "space-right" : "space-left"
                          }
                        >
                          <Grid container className="car-prop" spacing={8}>
                            <Grid item xs={5} className="car-prop-type">
                              {specDetail.name}
                            </Grid>
                            <Grid item xs={7} className="car-prop-value">
                              {specDetail.desc}
                            </Grid>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    ))}
                  {vehicleDetail.specs && vehicleDetail.specs.length > 0 && (
                    <Grid item xs={12} className="expand-more">
                      <Button
                        onClick={() => toggleCarSpecification()}
                        className="expand-more-link"
                        disableRipple
                      >
                        <div>
                          {showAllSpecification
                            ? "View less specs"
                            : "View full specs"}
                        </div>
                        {showAllSpecification ? (
                          <ExpandLessRoundedIcon />
                        ) : (
                          <ExpandMoreRoundedIcon />
                        )}
                      </Button>
                    </Grid>
                  )}
                  {vehicleDetail.options && (
                    <>
                      <Grid item xs={12} className="car-description-heading">
                        Description
                      </Grid>
                      <Grid item xs={12}>
                        <div
                          id="car-desc-text"
                          className={`car-description ${
                            showFullDescription
                              ? "car-description-expanded"
                              : ""
                          }`}
                        >
                          {vehicleDetail.options}
                        </div>
                      </Grid>
                      <Grid item xs={12} className="expand-more">
                        <Button
                          onClick={() => toggleCarDescription()}
                          className="expand-more-link"
                          disableRipple
                        >
                          <div>
                            {showFullDescription
                              ? "Read less description"
                              : "Read full description"}
                          </div>
                          {showFullDescription ? (
                            <ExpandLessRoundedIcon />
                          ) : (
                            <ExpandMoreRoundedIcon />
                          )}
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </CarDetailViewDialogStyles>
      </ResponsiveDialog>
    </>
  );
};

export default CarDetailViewDialog;
