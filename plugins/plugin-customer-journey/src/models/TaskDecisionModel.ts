export class TaskDecisionModel {
  taskItemDecisionId: number;

  parentTaskScheduleTemplateId: number;

  childTaskScheduleTemplateId: number | null;

  taskItemTypeId: number;

  decisionName: string;

  decisionDescription: string;

  shouldKill: boolean;

  shouldRaise: boolean;

  isSuccess: boolean;

  isContact: boolean;

  isCallback: boolean;

  isAllocation: boolean;

  state: number | null;

  createsAutomaticNote: boolean;

  automaticNote: string;

  constructor() {
    this.taskItemDecisionId = -1;
    this.parentTaskScheduleTemplateId = -1;
    this.childTaskScheduleTemplateId = null;
    this.taskItemTypeId = -1;
    this.decisionName = "";
    this.decisionDescription = "";
    this.shouldKill = false;
    this.shouldRaise = false;
    this.isSuccess = false;
    this.isContact = false;
    this.isCallback = false;
    this.isAllocation = false;
    this.state = null;
    this.createsAutomaticNote = false;
    this.automaticNote = "";
  }
}
