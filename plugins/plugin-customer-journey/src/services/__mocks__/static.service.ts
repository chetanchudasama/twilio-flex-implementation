export default class StaticService {
  getDropdownData = jest.fn(() => Promise.resolve({}));

  getVehicleSearchDropdownData = jest.fn(() => Promise.resolve({}));
}

export function useStaticService(): StaticService {
  return new StaticService();
}
