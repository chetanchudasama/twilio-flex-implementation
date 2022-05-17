/* eslint-disable import/no-extraneous-dependencies */
/* enzyme is a testing tool - this is a genuine mistake from ESLint */
import { configure } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

configure({ adapter: new React16Adapter() });
