import { AppState } from "./index";

export const getWorkerName = (state: AppState): string =>
  state.flex.worker.attributes?.full_name || "";

export const getWorkerAgentId = (state: AppState): string =>
  state.flex.worker.attributes?.agentId || null;

export const getWorkerIsAvailable = (state: AppState): boolean =>
  !!state.flex.worker.activity?.available;

export const getWorkerIsAvailableForOutboundCall = (
  state: AppState
): boolean => {
  // if worker is Available and there are no active voice tasks, they can initiate an outbound call
  return (
    getWorkerIsAvailable(state) &&
    Array.from(state.flex.worker.tasks.values()).filter(
      (e) => e.channelType === "voice"
    ).length === 0
  );
};
