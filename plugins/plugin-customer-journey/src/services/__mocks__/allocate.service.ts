export default class AllocateService {
  getRankedAgents = jest.fn(() => Promise.resolve([]));
}

export function useAllocateService(): AllocateService {
  return new AllocateService();
}
