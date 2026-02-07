export type GenericColumn = {
  key: string;
  title: string;
  size?: number;
};

export interface IActionItem {
  label: string;
  icon: React.ReactNode;
  onClick: (row: any) => void;
  condition?:string[]
}

export interface IAction {
  actions: IActionItem[];
  label?: string;
  row: any;
}
