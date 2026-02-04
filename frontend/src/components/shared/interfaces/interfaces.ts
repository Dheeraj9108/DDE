export type GenericColumn = {
  key: string;
  title: string;
  size?: number;
};

export interface IActionItem {
  label: string;
  icon: React.ReactNode;
  onClick: (row: any) => void;
}

export interface IAction {
  actions: IActionItem[];
  label?: string;
  row: any;
}
