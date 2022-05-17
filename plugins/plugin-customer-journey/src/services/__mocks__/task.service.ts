export default class TaskService {
  getTaskDecisions = jest.fn(() => Promise.resolve([]));

  sendTaskOutcome = jest.fn(() => Promise.resolve(undefined));
}

export function useTaskService(): TaskService {
  return new TaskService();
}
