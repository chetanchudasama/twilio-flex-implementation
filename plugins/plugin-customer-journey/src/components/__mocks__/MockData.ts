import { WorkerAttributes } from "@twilio/flex-ui";
import { namespace } from "../../states";

const workerAttributes: WorkerAttributes = {
  contact_uri: "client:test",
  email: "test@test.com",
  full_name: "test user",
  image_url: "img_url",
  roles: ["admin"],
  agentId: 1,
};

const conferenceSource = {
  source: {
    participants: [
      {
        callSid: "callSid",
        participantType: "customer",
        workerSid: "",
      },
      {
        callSid: "callSid",
        participantType: "worker",
        workerSid: "workerSid",
      },
    ],
  },
};

const conferenceState = new Map();
conferenceState.set("taskSid", conferenceSource);

export const flexManagerMock = jest.fn().mockReturnValue({
  workerClient: {
    source: {},
    sid: "workerSid",
    name: "test user",
    fullName: "test user",
    activityName: "Offline",
    attributes: workerAttributes,
    dateUpdated: new Date(),
    isAvailable: false,
    activityDuration: "",
    dateStatusChanged: new Date(1).toISOString(),
    activity: {
      available: false,
      name: "Offline",
      sid: "OfflineSid",
    },
  },
  store: {
    getState: jest.fn().mockReturnValue({
      flex: {
        worker: {
          attributes: workerAttributes,
        },
        session: {
          ssoTokenPayload: {
            token: "ssoToken",
          },
        },
        conferences: {
          states: conferenceState,
        },
      },
      [namespace]: {
        phoneNumberList: {
          phoneNumberList: [
            {
              friendlyName: "Sales",
              phoneNumber: "+1234567891",
              queueSid: "QUEUE_SID",
            },
          ],
        },
      },
    }),
  },
  strings: {
    DIALPADExternalTransferSearchInputLabel: "Search By Name or PhoneNumber",
    DIALPADExternalTransferHoverOver: "Add",
    DIALPADExternalTransferPopupHeader: "External Transfer",
  },
  serviceConfiguration: {
    outbound_call_flows: {
      default: {
        caller_id: "CALLER_ID",
      },
    },
  },
});
