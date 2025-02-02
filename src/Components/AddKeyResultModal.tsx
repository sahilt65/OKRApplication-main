import {useState, useEffect, useContext} from "react";
import { KeyResultType, ObjectiveType } from "../Types/OKRTypes.ts";
import * as React from "react";
import { insertKeyResult } from "../OKR-store/OKR-Data.ts";
import {okrProviderContext} from "../providers/OKRProvider.tsx";

type AddKeyResultModalProps = {
  isOpen: boolean;
  objective: ObjectiveType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddKeyResultModal({ isOpen, objective,setIsOpen }: AddKeyResultModalProps) {
  const [newKeyResult, setNewKeyResult] = useState<KeyResultType>({
    id: 1,
    title: "string",
    initialValue: 1,
    currentValue: 1,
    targetValue: 1,
    metrics: "string",
  });
  const {objectives, setObjectives} = useContext(okrProviderContext);
  // Function to handle Enter (Add Key Result) and Escape (Close Modal)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen) {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevents form submission if inside a form
          addKeyResult();
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
  }, [isOpen, newKeyResult]); // Re-run effect when modal is open

  const addKeyResult = async () => {
    try {
      await insertKeyResult(newKeyResult, objective.id).then((kr) => {
        objectives!.map((key: ObjectiveType) => {
          if (key === objective) {
            key.keyResults.push({...newKeyResult, id:kr.id});
          }
        });
      });
    } catch (e) {
      alert("Error while inserting key results " + e);
    }


    setObjectives([...objectives!]);


  };

  function handleChange(key: string, input: string | number) {
    setNewKeyResult({
      ...newKeyResult,
      [key]: input,
    });
  }

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex items-center justify-center">
          <div className="bg-white p-6 max-w-3xl space-y-2">
            <div className="font-bold">Add Key Result</div>
            <input
              className="shadow-lg w-full px-4 py-2 focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
              type="text"
              id="keyresults"
              placeholder="Key Result Title"
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <div className="flex space-x-3">
              <input
                className="shadow-lg px-4 py-2 w-full focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Initial Value"
                onChange={(e) => handleChange("initialValue", e.target.value)}
              />
              <input
                className="shadow-lg w-full px-4 py-2 focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Current Value"
                onChange={(e) => handleChange("currentValue", e.target.value)}
              />
              <input
                className="shadow-lg w-full px-4 py-2 focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Target Value"
                onChange={(e) => handleChange("targetValue", e.target.value)}
              />
            </div>
            <input
              className="shadow-lg w-4/12 px-4 py-2 focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
              type="text"
              placeholder="Metrics"
              onChange={(e) => handleChange("metrics", e.target.value)}
            />
            <div className="flex space-x-1 pt-2 justify-end">
              <button
                className="bg-blue-400 px-2 py-1 rounded-md text-white hover:bg-blue-600 mr-6 block items-end"
                onClick={() => {
                  addKeyResult();
                  setIsOpen(false);
                }}
              >
                Add Key Result
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
