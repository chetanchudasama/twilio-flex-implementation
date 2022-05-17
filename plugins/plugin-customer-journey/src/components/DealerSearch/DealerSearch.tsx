import { Grid } from "@material-ui/core";
import * as Flex from "@twilio/flex-ui";
import React, { useMemo, useState } from "react";
import { Async as AsyncSelect } from "react-select";
import { ActionMeta, OptionsType, ValueType } from "react-select/lib/types";
import { showErrorMessage } from "../../Notifications";
import { DealerSearchRequestModel } from "../../models/DealerSearchRequestModel";
import { DealerResponseModel } from "../../models/DealerResponseModel";
import { DealerSearchStyles } from "./DealerSearch.Styles";
import { useVehicleService } from "../../services/vehicle.service";
import { AppState } from "../../states";

type SearchType<T> = { label: string; value: T };
type OptFunc = (options: OptionsType<SearchType<DealerResponseModel>>) => void;

export type DealerSearchProps = {
  dealer: DealerResponseModel | null;
  handleDealerUpdate: (dealer: DealerResponseModel | null) => void;
};

const generateNameLabel = (dealer: DealerResponseModel) => {
  const { dealerName, postcode } = dealer;

  return dealerName ? `${dealerName}, ${postcode}` : "";
};

export const DealerSearch: React.FC<DealerSearchProps> = ({
  handleDealerUpdate,
  dealer,
}) => {
  const state: AppState = Flex.Manager.getInstance().store.getState();

  const token: string = useMemo(
    () => state.flex.session.ssoTokenPayload.token ?? "",
    [state.flex.session.ssoTokenPayload]
  );

  const phoenixToken: string = useMemo(() => {
    return state.crm?.crmState?.phoenixToken ?? "";
  }, [state.crm?.crmState?.phoenixToken]);

  const vehicleServices = useVehicleService(token, phoenixToken);

  const [options, setOptions] = useState<DealerResponseModel[]>([]);

  const onSelectChange = (
    searchTerm: SearchType<DealerResponseModel>,
    actionMeta: ActionMeta
  ) => {
    if (actionMeta.action === "select-option" && options.length > 0) {
      const dealerItem = options.find((x) => x === searchTerm.value);
      if (dealerItem) {
        handleDealerUpdate(dealerItem);
      }
    }
    if (actionMeta.action === "clear") {
      handleDealerUpdate(null);
    }
  };

  const loadOptions = async (
    searchTerm: string,
    callback: OptFunc
  ): Promise<void> => {
    let values: SearchType<DealerResponseModel>[] = [];

    const dealerSearchRequestModel = new DealerSearchRequestModel();
    dealerSearchRequestModel.postCode = searchTerm;
    if (searchTerm.length >= 3) {
      try {
        const res: DealerResponseModel[] = await vehicleServices.dealerSearch(
          dealerSearchRequestModel
        );

        if (res && res.length > 0) {
          setOptions(res);
          values = res.map((x) => ({
            label: generateNameLabel(x),
            value: x,
          }));
        }
      } catch {
        showErrorMessage("Something went wrong, please try again!", "", true);
      }
    }
    callback(values);
  };

  const DealerSearchComponent = (
    <Grid container item xs={12}>
      <AsyncSelect
        fullWidth
        classNamePrefix="react-select"
        className="react-select-container"
        loadOptions={loadOptions}
        onChange={(
          value: ValueType<SearchType<DealerResponseModel>>,
          action: ActionMeta
          // the type can be case here as the select is not going to be multi,
          // so the value will always be a single item rather than an array
        ) => onSelectChange(value as SearchType<DealerResponseModel>, action)}
        placeholder="Search for dealer"
        defaultValue={
          dealer && {
            label: generateNameLabel(dealer),
            value: dealer,
          }
        }
        isClearable
      />
    </Grid>
  );

  return <DealerSearchStyles>{DealerSearchComponent}</DealerSearchStyles>;
};
