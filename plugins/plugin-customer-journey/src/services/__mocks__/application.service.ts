export default class ApplicationService {
  getBaseDetails = jest.fn(() => Promise.resolve({}));

  getQualifyingDetails = jest.fn(() => Promise.resolve({}));

  updateQualifyingDetails = jest.fn(() => Promise.resolve({}));

  getHistoryDetails = jest.fn(() => Promise.resolve({}));

  updateHistoryDetails = jest.fn(() => Promise.resolve({}));

  addNoteDetail = jest.fn(() => Promise.resolve({}));

  saveCarDetail = jest.fn(() => Promise.resolve({}));

  sendCarDetail = jest.fn(() => Promise.resolve({}));

  getQuoteData = jest.fn(() => Promise.resolve({}));

  updateBaseApplicationDetail = jest.fn(() => Promise.resolve({}));

  createQuote = jest.fn(() => Promise.resolve({}));

  getQuoteList = jest.fn(() => Promise.resolve([]));

  submitCallbackDetail = jest.fn(() => Promise.resolve({}));

  getSavedVehicles = jest.fn(() => Promise.resolve([]));

  updateSavedVehicles = jest.fn(() => Promise.resolve(undefined));

  addNoteRequest = jest.fn(() => Promise.resolve({}));

  getNotes = jest.fn(() => Promise.resolve([]));
}

export function useApplicationService(): ApplicationService {
  return new ApplicationService();
}
