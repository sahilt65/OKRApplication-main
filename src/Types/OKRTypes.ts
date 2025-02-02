export type KeyResultType = {
  id : number
  title: string;
  initialValue: number;
  currentValue: number;
  targetValue: number;
  metrics: string;
};
export type ObjectiveType = {
  id : number,
  title: string;
  keyResults: KeyResultType[];
};