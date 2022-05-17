import React, { useEffect, useMemo, useState } from "react";
import * as Flex from "@twilio/flex-ui";
import { ITask, Manager, TaskContextProps } from "@twilio/flex-ui";
import {
  ItemModel,
  VehicleModelData,
  VehicleMakeData,
  SnackbarMessage,
} from "@common/components";
import moment from "moment";
import { v4 } from "uuid";
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from "lodash";

import { LeadGenerationWrapperProps } from "./LeadGenerationWrapper.Props";
import LeadGenerationContent from "../LeadGenerationContent/LeadGenerationContent.Container";
import { showErrorMessage } from "../../../Notifications";
import { AppState } from "../../../states";
import { useStaticService } from "../../../services/static.service";
import { QualifyDetailModel } from "../../../models/QualifyDetailModel";
import { useApplicationService } from "../../../services/application.service";
import Loading from "../../LoadingComponent/Loading";
import {
  getFormattedFactFindDetail,
  preparePatchData,
} from "../../../helpers/commonFunctions";
import { AddNoteRequestModel } from "../../../models/AddNoteRequestModel";
import { FactFindDetailModel } from "../../../models/FactFindDetailModel";
import { TimeForPurchaseItemModel } from "../../../models/TimeForPurchaseModel";
import { CustomerCallbackRequestModel } from "../../../models/CustomerCallbackRequestModel";
import { NoteModel } from "../../../models/NoteModel";
import { RankedAgentModel } from "../../../models/RankedAgentModel";
import { useAllocateService } from "../../../services/allocate.service";
import { useTaskService } from "../../../services/task.service";
import { TaskDecisionModel } from "../../../models/TaskDecisionModel";
import { IWorker } from "../../../common/interfaces";

const TOP_AVAILABLE_AGENTS = 5;
const PARENT_TASK_SCHEDULE_TEMPLATE_ID = 29;

export const LeadGenerationWrapper: React.FC<
  LeadGenerationWrapperProps & TaskContextProps
> = ({
  task,
  applicationId,
  isStaticItemsFetched,
  setReasonForPurchaseItems,
  setTimeForPurchaseItems,
  setWhereDidYouHearItems,
  setStaticFetched,
  isVehicleStaticDataFetched,
  setVehicleSearchDropdownData,
  setVehicleStaticDataFetched,
  vehicleSearchDropdownData,
  setCustomerDetails,
  taskDecisions,
  setTaskDecisions,
}) => {
  const state: AppState = Manager.getInstance().store.getState();
  const token: string = useMemo(() => {
    return state.flex.session.ssoTokenPayload.token ?? "";
  }, [state.flex.session.ssoTokenPayload]);
  const phoenixToken: string = useMemo(() => {
    return state.crm?.crmState?.phoenixToken ?? "";
  }, [state.crm?.crmState?.phoenixToken]);

  const staticService = useStaticService(token, phoenixToken);
  const applicationService = useApplicationService(token);
  const allocateService = useAllocateService(token);
  const taskService = useTaskService(token, phoenixToken);

  const [qualifyingDetail, setQualifyingDetail] = useState<QualifyDetailModel>(
    new QualifyDetailModel()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [factFindDetail, setFactFindDetail] = useState<FactFindDetailModel>(
    new FactFindDetailModel()
  );
  const [recentNotes, setRecentNotes] = useState<NoteModel[]>([]);
  const [rankedAgentList, setRankedAgentList] = useState<IWorker[]>([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>(""); // TODO: Update selectedWorkerId, once call transfer logic is implemented

  useEffect(() => {
    if (isStaticItemsFetched) {
      return;
    }

    staticService
      .getDropdownData()
      .then((response) => {
        setReasonForPurchaseItems(response.reasonForPurchaseItems);
        setTimeForPurchaseItems(response.timeForPurchaseItems);
        setWhereDidYouHearItems(response.whereDidYouHearItems);
        setStaticFetched(true);
      })
      .catch((_error) => {
        showErrorMessage(
          "Error loading static drop-down data, please try again!",
          "",
          true
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // get vehicle search dropdown data
    if (isVehicleStaticDataFetched) {
      return;
    }
    staticService
      .getVehicleSearchDropdownData()
      .then((response) => {
        setVehicleSearchDropdownData(response);
        setVehicleStaticDataFetched(true);
      })
      .catch((_error) => {
        showErrorMessage(
          "Error loading vehicle drop-down data, please try again!",
          "",
          true
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQualifyingDetails = () => {
    setIsLoading(true);
    applicationService
      .getQualifyingDetails(applicationId)
      .then((response) => {
        setQualifyingDetail(response);
        setFactFindDetail({
          ...factFindDetail,
          hasCustomerAlreadyFoundCar: response.hasCustomerAlreadyFoundCar,
          timeForPurchase: response.timeForPurchase,
        });
      })
      .catch((error) => {
        showErrorMessage(
          "Error loading qualifying detail, please try again!",
          "",
          true
        );
        setQualifyingDetail(new QualifyDetailModel());
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getRecentNotes = () => {
    applicationService
      .getNotes(applicationId)
      .then((response) => {
        setRecentNotes(response);
      })
      .catch((_error) => {
        showErrorMessage(
          "Error loading recent notes, please try again!",
          "",
          true
        );
      });
  };

  const getTaskDecisions = () => {
    if (taskDecisions.length > 0) {
      return;
    }
    taskService
      .getTaskDecisions()
      .then((response) => {
        const tempTaskDecisions = response.filter(
          (x) =>
            x.parentTaskScheduleTemplateId === PARENT_TASK_SCHEDULE_TEMPLATE_ID
        );
        setTaskDecisions(tempTaskDecisions);
      })
      .catch((_error) => {
        showErrorMessage(
          "Error loading task decision list, please try again!",
          "",
          true
        );
      });
  };

  useEffect(() => {
    if (applicationId > 0) {
      getRecentNotes();
      fetchQualifyingDetails();
      getTaskDecisions();
    } else {
      setQualifyingDetail(new QualifyDetailModel());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  const updateQualifyingDetails = (
    key: keyof QualifyDetailModel,
    value: boolean | TimeForPurchaseItemModel | null,
    updateFactFindDetail = false
  ) => {
    if (!applicationId || !(qualifyingDetail[key] !== value)) {
      return;
    }

    setIsLoading(true);
    applicationService
      .updateQualifyingDetails(applicationId, [preparePatchData(key, value)])
      .then(() => {
        setQualifyingDetail({
          ...qualifyingDetail,
          [key]: value,
        });
        if (updateFactFindDetail) {
          setFactFindDetail({
            ...factFindDetail,
            [key]: value,
            makeId:
              key === "hasCustomerAlreadyFoundCar" ? -1 : factFindDetail.makeId,
            modelId:
              key === "hasCustomerAlreadyFoundCar"
                ? -1
                : factFindDetail.modelId,
            vrm: key === "hasCustomerAlreadyFoundCar" ? "" : factFindDetail.vrm,
          });
        }
      })
      .catch((error) => {
        showErrorMessage(
          "Error updating qualifying detail, please try again!",
          "",
          true
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getFactFindDetail = () => {
    let carMake: VehicleMakeData | undefined;
    let carModel: VehicleModelData | undefined;
    if (
      vehicleSearchDropdownData.makesModels.length > 0 &&
      factFindDetail.hasCustomerAlreadyFoundCar
    ) {
      carMake =
        vehicleSearchDropdownData.makesModels.length > 0
          ? vehicleSearchDropdownData.makesModels.find(
              (m) => m.id === factFindDetail.makeId
            )
          : undefined;
      carModel = carMake
        ? carMake.models.find((model) => model.id === factFindDetail.modelId)
        : undefined;
    }
    return getFormattedFactFindDetail(
      factFindDetail,
      carMake ? carMake.name : "",
      carModel ? carModel.name : ""
    );
  };

  const updateApplication = () => {
    const comment = getFactFindDetail();
    const notes = Object.assign(new AddNoteRequestModel(), {
      applicationId,
      comment,
    });

    setIsLoading(true);
    applicationService
      .addNoteRequest(applicationId, notes)
      .then(() => {
        setSnackbarMessage("Application detail updated successfully!");
        setShowSnackbar(true);
        // add note in recent note list
        const noteModel: NoteModel = Object.assign(new NoteModel(), {
          commentId: v4(),
          comment,
          createdOn: new Date().toISOString(),
          userName: state.flex.worker.attributes?.full_name || "",
        });
        const tempNoteList = [...recentNotes];
        tempNoteList.push(noteModel);
        setRecentNotes(tempNoteList);
      })
      .catch((error) => {
        showErrorMessage(
          "Error updating application detail, please try again!",
          "",
          true
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateFactFindDetail = (
    key: string,
    value:
      | string
      | number
      | boolean
      | TimeForPurchaseItemModel
      | ItemModel
      | null
  ) => {
    if (key === "hasCustomerAlreadyFoundCar" || key === "timeForPurchase") {
      updateQualifyingDetails(
        key,
        value as boolean | TimeForPurchaseItemModel,
        true
      );
    } else {
      setFactFindDetail({
        ...factFindDetail,
        [key]: value,
      });
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    setSnackbarMessage("");
  };

  const updateCustomerPreferredName = () => {
    // TODO: API call to update preferred name
  };

  const setCallbackDetail = async (callbackDate: Date | null) => {
    if (callbackDate) {
      const callbackDetailModel: CustomerCallbackRequestModel =
        new CustomerCallbackRequestModel();
      callbackDetailModel.callbackDate = moment(callbackDate).utc();

      applicationService
        .submitCallbackDetail(applicationId, callbackDetailModel)
        .then(() => {
          setCustomerDetails("callbackBooked", callbackDate);
        })
        .catch((error) => {
          showErrorMessage(
            "Error updating callback detail, please try again!",
            "",
            true
          );
        });
    } else {
      // delete callback detail
      const updateRequestList = [
        {
          op: "replace",
          path: "/callbackBooked",
          value: null,
        },
      ];

      applicationService
        .updateBaseApplicationDetail(applicationId, updateRequestList)
        .then(() => {
          setCustomerDetails("callbackBooked", null);
        })
        .catch((error) => {
          showErrorMessage(
            "Error updating callback detail, please try again!",
            "",
            true
          );
        });
    }
  };

  const getAvailableAgents = (rankedAgents: RankedAgentModel[]) => {
    setRankedAgentList([]); // reset cached list
    const activeWorkerSid =
      Manager.getInstance().store.getState().flex.worker.worker.sid || "";
    const tempAgentList: IWorker[] = []; // temp variable to store available agents

    // Need to group into sub arrays of less than 30 as Twilio limits number of items in array for sync query
    const groupedAgents: number[][] = _.chunk(
      rankedAgents.map((x) => x.agentId),
      29
    );

    groupedAgents.forEach((agentIds, index) => {
      // Need to convert to quoted strings as syncQuery only accepts strings as data values in arrays
      // eslint-disable-next-line quotes
      const rankedAgentsAsAStringList = `"${agentIds.join('","')}"`;
      const searchQuery = `data.attributes.agentId IN [${rankedAgentsAsAStringList}] AND data.activity_name == "Available"`;

      Manager.getInstance()
        .insightsClient.instantQuery("tr-worker")
        .then((query) => {
          query.on("searchResult", (items: { [key: string]: IWorker }) => {
            Object.entries(items).forEach(([key, value]: [string, IWorker]) => {
              // make sure the current worker is excluded from agent list
              if (key !== activeWorkerSid) {
                tempAgentList.push(value);
              }
            });

            // if we have the full list of available agents, sort the list in the order returned in the API
            if (index === groupedAgents.length - 1) {
              const rankedAgentIdList = rankedAgents.map((x) => x.agentId);

              tempAgentList.sort((agent1: IWorker, agent2: IWorker) => {
                return (
                  rankedAgentIdList.indexOf(agent1.attributes.agentId) -
                  rankedAgentIdList.indexOf(agent2.attributes.agentId)
                );
              });
              // store the final list locally to be used by transfer logic
              setRankedAgentList(tempAgentList.slice(0, TOP_AVAILABLE_AGENTS));
            }
          });

          query.search(searchQuery);
        });
    });
  };

  useEffect(() => {
    if (rankedAgentList.length > 0) {
      // TODO: add logic to transfer the task
    }
  }, [rankedAgentList]);

  const getRankedAgents = () => {
    setIsLoading(true);
    allocateService
      .getRankedAgents(applicationId)
      .then((response) => {
        getAvailableAgents(response);
      })
      .catch((error) => {
        showErrorMessage(
          "Error retrieving ranked agents, please try again!",
          "",
          true
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sendTaskOutcome = async (taskOutcome: ITask) => {
    setIsLoading(true);
    try {
      await taskService.sendTaskOutcome({
        task: taskOutcome.attributes.data.taskEngineTask,
      });
    } catch (error) {
      showErrorMessage(
        "Error updating task attributes, please try again!",
        "",
        true
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactOutcomeClick = (
    taskDecision: TaskDecisionModel,
    callbackBooked?: Date
  ) => {
    const { agentId } =
      Manager.getInstance().store.getState().flex.worker.attributes;

    if (task?.attributes?.data?.taskEngineTask) {
      try {
        const taskEngineTask = task.attributes?.data?.taskEngineTask;
        let taskHeaderValues = taskEngineTask?.taskHeader?.headers;

        try {
          let taskHeaderValuesFiltered = [...taskHeaderValues];
          taskHeaderValuesFiltered = taskHeaderValues
            .filter(
              (x: { key: string; value: string }) => x.key !== "decisionId"
            )
            .filter(
              (x: { key: string; value: string }) => x.key !== "processedBy"
            );

          taskHeaderValues = [...taskHeaderValuesFiltered];
        } catch (err) {
          showErrorMessage(
            `Error removing duplicate decision and processed by values for task sid: ${task?.sid}`,
            "",
            true
          );
        }

        taskHeaderValues.push(
          {
            key: "decisionId",
            value: taskDecision.taskItemDecisionId.toString(),
          },
          {
            key: "processedBy",
            value: agentId.toString(),
          }
        );

        if (taskDecision.isCallback && callbackBooked) {
          const index = taskHeaderValues.findIndex(
            (x: { key: string; value: string }) => x.key === "callbackDue"
          );
          if (index > -1) {
            taskHeaderValues[index].value = callbackBooked;
          } else {
            taskHeaderValues.push({
              key: "callbackDue",
              value: callbackBooked.toISOString(),
            });
          }
        }

        if (taskDecision.isAllocation && selectedWorkerId) {
          taskHeaderValues.push({
            key: "allocatedAgentId",
            value: selectedWorkerId.toString(),
          });
        }

        taskEngineTask.taskAttributes.response_header = taskHeaderValues;

        // Need to explicitly update the attributes in the cloud
        // in order to get them back via task router callbacks
        task.setAttributes(task.attributes).then(() => sendTaskOutcome(task));
      } catch (err) {
        showErrorMessage(
          `Error concluding and disposition task with sid: ${task?.sid}`,
          "",
          true
        );
      }
    } else {
      task?.setAttributes(task.attributes).then(() =>
        Flex.Actions.invokeAction("CompleteTask", {
          task,
          taskSid: task.sid,
        })
      );
    }
  };

  return (
    <>
      {applicationId ? (
        <>
          {isLoading && <Loading />}
          <LeadGenerationContent
            qualifyingDetail={qualifyingDetail}
            updateQualifyingDetails={updateQualifyingDetails}
            updateApplication={updateApplication}
            factFindDetail={factFindDetail}
            updateFactFindDetail={updateFactFindDetail}
            recentNotes={recentNotes}
            updateCustomerPreferredName={updateCustomerPreferredName}
            setCallbackDetail={setCallbackDetail}
            getRankedAgents={getRankedAgents}
            handleContactOutcomeClick={handleContactOutcomeClick}
          />
          {showSnackbar && (
            <SnackbarMessage
              open={showSnackbar}
              message={snackbarMessage}
              handleCloseSnackbar={handleCloseSnackbar}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
