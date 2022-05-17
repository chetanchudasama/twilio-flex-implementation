import { v4 as uuidv4 } from "uuid";
import { Action } from "./actionTypes";
import { HistoryPanelDetailModel } from "../models/HistoryPanelDetailModel";
import { HistoryPanelMemberType } from "../common/enum";

const SET_HISTORY_DETAIL_LIST = "SET_HISTORY_DETAIL_LIST";
const UNPIN_HISTORY_DETAIL = "UNPIN_HISTORY_DETAIL";
const SET_APPLICATION_ID = "SET_APPLICATION_ID";
const ADD_NOTE_DETAIL = "ADD_NOTE_DETAIL";

export interface HistoryDetailState {
  historyDetailList: HistoryPanelDetailModel[];
  selectedAppId: number;
}

const initialState = {
  historyDetailList: [],
  selectedAppId: 0,
};

export class HistoryDetailActions {
  public static setHistoryDetailList = (
    historyPanelList: HistoryPanelDetailModel[]
  ): Action => ({
    type: SET_HISTORY_DETAIL_LIST,
    payload: { historyPanelList },
  });

  public static unPinHistoryDetail = (index: number): Action => ({
    type: UNPIN_HISTORY_DETAIL,
    payload: { index },
  });

  public static setSelectedAppId = (id: number): Action => ({
    type: SET_APPLICATION_ID,
    payload: { id },
  });

  public static addNoteDetail = (
    content: string,
    isImportant: boolean
  ): Action => ({ type: ADD_NOTE_DETAIL, payload: { content, isImportant } });
}

export function reduce(
  state: HistoryDetailState = initialState,
  action: Action
) {
  switch (action.type) {
    case SET_HISTORY_DETAIL_LIST: {
      return {
        ...state,
        historyDetailList: action.payload.historyPanelList,
      };
    }
    case SET_APPLICATION_ID: {
      return {
        ...state,
        selectedAppId: action.payload.id,
      };
    }
    case UNPIN_HISTORY_DETAIL: {
      const historyPanelList = [...state.historyDetailList];
      historyPanelList[action.payload.index].isImportant = false;
      return {
        ...state,
        historyDetailList: historyPanelList,
      };
    }
    case ADD_NOTE_DETAIL: {
      const historyPanelListTemp = [...state.historyDetailList];

      const historyPanelModel = new HistoryPanelDetailModel();
      historyPanelModel.id = uuidv4();
      historyPanelModel.content = action.payload.content;
      historyPanelModel.isImportant = action.payload.isImportant;
      historyPanelModel.actionedBy = HistoryPanelMemberType.Agent;
      historyPanelModel.actionType = { id: 1, name: "note" };

      historyPanelListTemp.push(historyPanelModel);
      return {
        ...state,
        historyDetailList: historyPanelListTemp,
      };
    }
    default:
      return state;
  }
}
