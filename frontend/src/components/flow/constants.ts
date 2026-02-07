import { GenericColumn } from "../shared/interfaces/interfaces";

export const SAVE: string = "Save";
export const START_REVIEW: string = "Start Review";
export const APPROVE: string = "Approve";
export const REQUEST_CHANGE: string = "Request Change";
export const CANCEL: string = "Cancle";
export const SAVE_CHANGES: string = "Save Changes";
export const SUBMIT: string = "Submit";
export const PROMPT: string = "Prompt";
export const DESCRIPTION:string = "Description";
export const LABEL: string = "Label";
export const TITLE: string = "Title";
export const EDIT_DIALOG_DESCRIPTION: string =
  "Make changes to your node here. Click save when you&apos;re done.";
export const ADD: string = "Add";

export const MODE = {
  EDIT: "edit",
  VIEW: "view",
} as const;

export const NODE_TYPE = {
  ADD: "addButton",
  CONDITIONAL: "conditional",
} as const;

// Review Dialog
export const REVIEW_DIALOG: string = "Review Dialog";

// EDIT DIALOG
export const EDIT_NODE: string = "Edit Node";

// ACTION DIALOG
export const ACTION: string = "action";
export const SETUP_ACTION: string = "Set up action";
export const ADD_ACTIONS: string = "Add actions";

export const ACTION_TYPE = {
  RANGE: "range",
  OPTION: "option",
  BOOLEAN: "boolean",
} as const;

export const ACTION_TYPE_DROPDOWN_OPTIONS = [
  { label: "Boolean", value: "boolean" },
  { label: "Option", value: "option" },
  { label: "Range", value: "range" },
];

export const ROP_DROPDOWN_OPTIONS = [
  { label: "<", value: "<" },
  { label: "<=", value: "<=" },
  { label: ">", value: ">" },
  { label: ">=", value: ">=" },
  { label: "==", value: "==" }
];

export const LOP_DROPDOWN_OPTIONS = [
  { label: "AND", value: "&&" },
  { label: "OR", value: "||" }
];

export const FLOW_LIST_COLUMNS :GenericColumn[] = [
    { key: "name", title: "Name" },
    { key: "version", title: "Version" },
    { key: "description", title: "Description" },
    { key: "createdBy", title: "Created By" },
    { key: "status", title: "Status" },
    { key: "actions", title: "Actions", size: 5 },
  ];

// -------------------- SUCCESS MESSAGES ------------------//

export const UPDATE_SUCCESS = "Flow Updated Successfully";

// --------------------------------------------------------//
