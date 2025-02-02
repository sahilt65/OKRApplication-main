import { createContext, ReactElement, useState } from "react";
import {ObjectiveType} from "../Types/OKRTypes.ts";
import * as React from "react";
type OKRProviderType = {
  objectives: ObjectiveType[] | null;
  setObjectives: React.Dispatch<React.SetStateAction<ObjectiveType[] | null>>;
};
const okrProviderContext = createContext<OKRProviderType>({
  objectives: [],
  setObjectives: () => {},
});

const OkrProvider = ({ children }: { children: ReactElement }) => {
  const [objectives, setObjectives] = useState<ObjectiveType[] | null>(null);
  const objectiveToExpose = { objectives, setObjectives };
  return (
    <okrProviderContext.Provider value={objectiveToExpose}>
      {children}
    </okrProviderContext.Provider>
  );
};

export { OkrProvider, okrProviderContext };