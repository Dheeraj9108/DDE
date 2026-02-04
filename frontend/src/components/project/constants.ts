import { GenericColumn } from "../shared/interfaces/interfaces";

export const HOME = "Home";
export const PROJECTS = "Projects";

export const PROJECT_LIST_COLUMNS: GenericColumn[] = [
  { key: "name", title: "Name" },
  { key: "description", title: "Description" },
  { key: "createdBy", title: "Created By" },
  { key: "createdAt", title: "Created At" },
  { key: "actions", title: "Actions", size: 5 },
];

// -------------------- SUCCESS MESSAGES ------------------//

export const CREATE_SUCCESS = "Project Created Successfully";
export const DELETE_SUCCESS = "Project Deleted Successfully";
export const UPDATE_SUCCESS = "Project Updated Successfully";

// --------------------------------------------------------//
