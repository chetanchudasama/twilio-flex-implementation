export default class VehicleService {
  getVehicleDetail = jest.fn(() => Promise.resolve({}));

  vehicleSearch = jest.fn(() => Promise.resolve({}));

  getVehicleExtraItemList = jest.fn(() => Promise.resolve({}));

  vehicleSearchByVRM = jest.fn(() => Promise.resolve({}));
}

export function useVehicleService(): VehicleService {
  return new VehicleService();
}
