declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_DEVELOPMENT_MODE: boolean;
    REACT_APP_API_BASE_URL: string;
    REACT_APP_CAR_SEARCH_PAGE_SIZE: number;
    REACT_APP_AGENT_GUIDE_FOR_LICENSE: string;
    REACT_APP_AGENT_GUIDE_FOR_ADDRESS: string;
    REACT_APP_AGENT_GUIDE_FOR_INCOME: string;
    REACT_APP_AGENT_GUIDE_FOR_EMPLOYMENT: string;
    REACT_APP_AGENT_GUIDE_FOR_ALREADY_FOUND_CAR: string;
  }
}
