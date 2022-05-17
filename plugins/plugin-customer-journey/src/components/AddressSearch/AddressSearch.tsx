import {
  CustomInput,
  Shared,
  StyledLinkButton,
  BaseAddressModel,
} from "@common/components";
import { Button, Grid, Icon } from "@material-ui/core";
import * as Flex from "@twilio/flex-ui";
import React, { ChangeEvent, useMemo, useState } from "react";
import { Async as AsyncSelect } from "react-select";
import {
  ActionMeta,
  InputActionMeta,
  OptionsType,
  ValueType,
} from "react-select/lib/types";
import { AddressSearchResponseModel } from "../../models/AddressSearchResponseModel";

import { useApplicationService } from "../../services/application.service";
import { AppState } from "../../states";
import { AddressSearchStyles } from "./AddressSearch.Styles";

type CIE = ChangeEvent<HTMLInputElement>;
type SearchType = { label: string; value: string };
type OptFunc = (options: OptionsType<SearchType>) => void;

export type AddressSearchProps = {
  updateAddress: (address: BaseAddressModel) => void;
  address?: BaseAddressModel;
};

export const AddressSearch: React.FC<AddressSearchProps> = ({
  address,
  updateAddress,
}) => {
  const state: AppState = Flex.Manager.getInstance().store.getState();
  const token: string = useMemo(
    () => state.flex.session.ssoTokenPayload.token ?? "",
    [state.flex.session.ssoTokenPayload]
  );
  const applicationService = useApplicationService(token);

  const [addressLookup, setAddressLookup] = useState("");

  const isAddressDefined = Object.keys(address ?? {}).length > 0;
  const [isEditing, setIsEditing] = useState(!isAddressDefined);
  const [isManualEnter, setIsManualEnter] = useState(false);
  const [options, setOptions] = useState<AddressSearchResponseModel[]>([]);

  const [buildingNumber, setBuildingNumber] = useState(
    address?.buildingNumber ?? ""
  );
  const [subBuilding, setSubBuilding] = useState(address?.subBuilding ?? "");
  const [buildingName, setBuildingName] = useState(address?.buildingName ?? "");
  const [streetName, setStreetName] = useState(address?.streetName ?? "");
  const [town, setTown] = useState(address?.town ?? "");
  const [postcode, setPostcode] = useState(address?.postcode ?? "");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const updateAddressAndCleanup = (
    baseAddressModel?: BaseAddressModel
  ): void => {
    if (!isManualEnter) {
      setAddressLookup("");
      setIsEditing(false);
    }
    updateAddress(
      baseAddressModel ||
        ({
          subBuilding,
          buildingName,
          buildingNumber,
          streetName,
          town,
          postcode,
        } as BaseAddressModel)
    );
  };

  const resetAddress = (): void => {
    setSubBuilding("");
    setBuildingName("");
    setBuildingNumber("");
    setStreetName("");
    setTown("");
    setPostcode("");
  };

  const updateMode = (inEditMode: boolean): void => {
    setIsEditing(inEditMode);
    resetAddress();
  };

  const handleAddressModeSelection = () => {
    resetAddress();
    setAddressLookup("");
    setIsManualEnter((prevState) => !prevState);
  };

  const onSelectChange = async (
    searchTerm: SearchType,
    actionMeta: ActionMeta
  ) => {
    if (actionMeta.action === "select-option" && options.length > 0) {
      try {
        setIsDisabled(true);
        const response = await applicationService.getAddressDetail(
          searchTerm.value
        );

        if (response) {
          setSubBuilding(response.SubBuilding ?? "");
          setBuildingName(response.BuildingName ?? "");
          setBuildingNumber(response.BuildingNumber ?? "");
          setStreetName(response.Street ?? "");
          setTown(response.Town ?? "");
          setPostcode(response.MaskedPostcode ?? "");
          updateAddressAndCleanup({
            subBuilding: response.SubBuilding ?? "",
            buildingName: response.BuildingName ?? "",
            buildingNumber: response.BuildingNumber ?? "",
            streetName: response.Street ?? "",
            town: response.Town ?? "",
            postcode: response.MaskedPostcode ?? "",
          } as BaseAddressModel);
        }
      } catch {
        // error calling the get address service
      } finally {
        setIsDisabled(false);
      }
    }
  };

  const onInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === "input-change") {
      setAddressLookup(newValue);
    }
  };

  const loadOptions = async (
    searchTerm: string,
    callback: OptFunc
  ): Promise<void> => {
    let values: SearchType[] = [];

    const searchString = searchTerm.replace(/\s/g, "");

    if (searchString.length >= 5) {
      try {
        const res: AddressSearchResponseModel[] =
          await applicationService.searchAddress(searchString);

        if (res && res.length > 0) {
          setOptions(res);
          values = res.map((x) => ({
            label: x.Address,
            value: x.Key,
          }));
        }
      } catch {
        // error calling the search service
      }
    }
    callback(values);
  };

  const BaseAddressModelComponent = (
    <Grid container item xs={12}>
      <AsyncSelect
        fullWidth
        id="address-lookup-select"
        classNamePrefix="react-select"
        className="react-select-container"
        inputValue={addressLookup}
        loadOptions={loadOptions}
        onChange={(
          value: ValueType<SearchType>,
          action: ActionMeta
          // the type can be case here as the select is not going to be multi,
          // so the value will always be a single item rather than an array
        ) => onSelectChange(value as SearchType, action)}
        onInputChange={onInputChange}
        placeholder="Start searching for your address"
        isDisabled={isDisabled}
      />
    </Grid>
  );

  const selectModeButton = (
    <Grid item xs={12}>
      <StyledLinkButton
        variant="text"
        onClick={handleAddressModeSelection}
        type="button"
        disableRipple
        className="link-button"
      >
        {isManualEnter ? "Look up address" : "Enter Manually"}
      </StyledLinkButton>
    </Grid>
  );

  const handleAddressDetailChange = (property: string, value: string) => {
    const baseAddressModel: BaseAddressModel = {
      subBuilding,
      buildingName,
      buildingNumber,
      streetName,
      town,
      postcode,
    };
    if (property === "subBuilding") {
      setSubBuilding(value);
      baseAddressModel.subBuilding = value;
    } else if (property === "buildingNumber") {
      setBuildingNumber(value ?? "");
      baseAddressModel.buildingNumber = value ?? "";
    } else if (property === "buildingName") {
      setBuildingName(value);
      baseAddressModel.buildingName = value;
    } else if (property === "streetName") {
      setStreetName(value);
      baseAddressModel.streetName = value;
    } else if (property === "town") {
      setTown(value);
      baseAddressModel.town = value;
    } else if (property === "postcode") {
      baseAddressModel.postcode = value.toUpperCase();
      setPostcode(value.toUpperCase());
    }
    // update address in parent
    updateAddressAndCleanup(baseAddressModel);
  };

  const manualInputComponent = (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <CustomInput
          label="Sub Building"
          value={subBuilding}
          onChange={(e: CIE) =>
            handleAddressDetailChange("subBuilding", e.target.value)
          }
          classes={{
            formControl: "custom-width-select custom-input",
          }}
        />
      </Grid>
      <Grid item xs={3} className="building-number">
        <CustomInput
          label="Building No."
          value={buildingNumber || ""}
          onChange={(e: CIE) =>
            handleAddressDetailChange("buildingNumber", e.target.value)
          }
          classes={{
            formControl: "custom-width-select custom-input",
          }}
        />
      </Grid>
      <Grid item xs={9} className="building-name">
        <CustomInput
          label="Building Name"
          value={buildingName}
          onChange={(e: CIE) =>
            handleAddressDetailChange("buildingName", e.target.value)
          }
          classes={{
            formControl: "custom-width-select custom-input",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomInput
          label="Street Name"
          value={streetName}
          onChange={(e: CIE) =>
            handleAddressDetailChange("streetName", e.target.value)
          }
          classes={{
            formControl: "custom-width-select custom-input",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomInput
          label="Town"
          value={town}
          onChange={(e: CIE) =>
            handleAddressDetailChange("town", e.target.value)
          }
          classes={{
            formControl: "custom-width-select custom-input",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomInput
          label="Post Code"
          value={postcode}
          onChange={(e: CIE) => {
            handleAddressDetailChange("postcode", e.target.value ?? "");
          }}
          classes={{
            formControl: "custom-width-select custom-input",
          }}
        />
      </Grid>
    </Grid>
  );

  const readonlyAddressComponent = (
    <Grid container item xs={12} className="address-current">
      <Grid container item xs={10}>
        <Grid container item xs={12}>
          {subBuilding ? `${subBuilding}, ` : ""}
          {buildingName ? `${buildingName}, ` : ""}
          {buildingNumber}
        </Grid>
        <Grid container item xs={12} id="address-readonly-street-name">
          {streetName}
        </Grid>
        <Grid container item xs={12} id="address-readonly-town-name">
          {town}
        </Grid>
        <Grid container item xs={12}>
          {postcode}
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={2}
        justify="flex-end"
        alignItems="flex-end"
        alignContent="flex-start"
      >
        <Button
          id="address-readonly-edit"
          variant="text"
          className="address-edit-button"
          disableRipple
          disableFocusRipple
          color="secondary"
          onClick={() => updateMode(true)}
        >
          <Icon className="edit-icon edit-icon-button">edit</Icon>Edit
        </Button>
      </Grid>
    </Grid>
  );

  const editingComponent = (
    <Grid container item xs={12}>
      {!isManualEnter && BaseAddressModelComponent}
      {selectModeButton}
      {isManualEnter && manualInputComponent}
    </Grid>
  );

  return (
    <AddressSearchStyles>
      <Grid container item xs={12} className="address-configuration">
        {isEditing && editingComponent}
        {!isEditing && readonlyAddressComponent}
      </Grid>
    </AddressSearchStyles>
  );
};
