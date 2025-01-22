export type KeyResultType = {
  title: string;
  initialValue: number;
  currentValue: number;
  targetValue: number;
  metrics: string;
};
export type ObjectiveType = {
  title: string;
  keyResults: KeyResultType[ ];
};