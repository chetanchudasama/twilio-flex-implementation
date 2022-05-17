class DPAService {
  public dpaFailed = jest.fn();

  public setNewPin = jest.fn();
}

export const dpaService = new DPAService();
