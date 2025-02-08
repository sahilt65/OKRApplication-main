import {useState, useEffect, useContext} from "react";
import {KeyResultType, ObjectiveType} from "../Types/OKRTypes.ts";
import * as React from "react";
import {okrProviderContext} from "../providers/OKRProvider.tsx";

type UpdateKeyResultModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  keyResult: KeyResultType;
  objective: ObjectiveType;
};

export function UpdateKeyResultModal({isOpen, setIsOpen, keyResult, objective}: UpdateKeyResultModalProps) {
  const {objectives, setObjectives} = useContext(okrProviderContext);
  const [updatedKeyResult, setUpdatedKeyResult] = useState<KeyResultType>(keyResult);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen) {
        if (event.key === "Enter") {
          event.preventDefault();
          setIsOpen(false);
        } else if (event.key === "Escape") {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, updatedKeyResult]);


  function updateKeyResult(){
    objectives!.map((obj) => {
      if(obj.id === objective.id){
        obj.keyResults.map((kr) => {
          if(kr.id === keyResult.id){
            kr.title = updatedKeyResult.title;
            kr.initialValue = updatedKeyResult.initialValue;
            kr.currentValue = updatedKeyResult.currentValue;
            kr.targetValue = updatedKeyResult.targetValue;
            kr.metrics = updatedKeyResult.metrics;
          }
        })
      }
    });
    setObjectives(objectives);
  }


  function handleChange(key: string, input: string | number) {
    setUpdatedKeyResult({
      ...updatedKeyResult,
      [key]: input,
    });
  }

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex items-center justify-center">
          <div className="bg-white p-6 max-w-3xl space-y-2">
            <div className="font-bold">Update Key Result</div>
            <input
              className="shadow-lg w-full px-4 py-2 focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
              type="text"
              id="keyresults"
              placeholder="Key Result Title"
              value={updatedKeyResult.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <div className="flex space-x-3">
              <input
                className="shadow-lg px-4 py-2 w-full focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Initial Value"
                value={updatedKeyResult.initialValue}
                onChange={(e) => handleChange("initialValue", e.target.value)}
              />
              <input
                className="shadow-lg w-full px-4 py-2 focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Current Value"
                value={updatedKeyResult.currentValue}
                onChange={(e) => handleChange("currentValue", e.target.value)}
              />
              <input
                className="shadow-lg w-full px-4 py-2 focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Target Value"
                value={updatedKeyResult.targetValue}
                onChange={(e) => handleChange("targetValue", e.target.value)}
              />
            </div>
            <input
              className="shadow-lg w-4/12 px-4 py-2 focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
              type="text"
              placeholder="Metrics"
              value={updatedKeyResult.metrics}
              onChange={(e) => handleChange("metrics", e.target.value)}
            />
            <div className="flex space-x-1 pt-2 justify-end">
              <button
                className="bg-blue-400 px-2 py-1 rounded-md text-white hover:bg-blue-600 mr-6 block items-end"
                onClick={() => {
                  updateKeyResult();
                  setIsOpen(false);
                }}
              >
                Update
              </button>
              <button
                className="bg-gray-400 px-2 py-1 rounded-md text-white hover:bg-gray-600 mr-6 block items-end"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
