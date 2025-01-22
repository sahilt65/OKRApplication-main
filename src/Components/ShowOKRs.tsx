import {ObjectiveType} from "../Types/OKRTypes.ts";
import * as React from "react";
import {AddKeyResultModal} from "./AddKeyResultModal.tsx";
import {useState} from "react";

type ShowOKRsProps = {
  objectives: ObjectiveType[],
  setObjectives: React.Dispatch<React.SetStateAction<ObjectiveType[]>>
}

export function ShowOKRs({
                           objectives,
                           setObjectives
                         }: ShowOKRsProps) {
  const [isOpen,setIsOpen] = useState<boolean>(false);
  const [currentObjective,setCurrentObjective] = useState<ObjectiveType>();
  function deleteKeyResult(objIndex: number, keyResultIndex: number) {
    const keyResultToDelete = objectives[objIndex].keyResults[keyResultIndex];
    const keyResultTemp = objectives[objIndex].keyResults.filter(key => key != keyResultToDelete);
    objectives[objIndex].keyResults = keyResultTemp;
    console.log(keyResultTemp);
    setObjectives([...objectives]);
  }

  function deleteObjective(objective:ObjectiveType){
    const objectivesTemp = objectives.filter(key => key != objective);
    setObjectives([...objectivesTemp]);
  }


  // function addNewKeyResult(){
  //
  // }

  return (
<div>
    <div className=" px-4 space-y-4 mx-24 ">
      {objectives.length > 0 ? (
        objectives.map((objective, index) => {
          return (
            <>
              <div
                className={`border-2  flex flex-col mx-6 my-3  ${
                  index % 2 === 0 ? "bg-slate-200" : "bg-slate-100"
                } `}
              >
                <div className="flex border-b-2 px-8 bg-teal-500 py-2 justify-between">
                  <p className="font-semibold text-xl">
                    {index + 1}. {objective.title}
                  </p>

                  <div className="space-x-4">
                    <button className="px-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white py-1 text-sm" onClick={() => {
                        setIsOpen(true);
                        setCurrentObjective(objective);

                    }}>
                      Add Key Result
                    </button>
                    <button className=" px-2 bg-red-500 hover:bg-red-600 rounded-md text-white py-1 text-sm " onClick={() => {
                      deleteObjective(objective);
                    }}>
                      Delete Objective
                    </button>
                  </div>
                </div>

                <div className=" px-16 py-4 space-y-2">
                  <div className="font-medium text-lg">Key Results</div>

                  {objective.keyResults.map((kr, i) => {
                    return (
                      <div className="pl-4 border bg-green-300 rounded-md py-2 px-2 ">
                          <span className="flex justify-between">
                            <h1>{kr.title}</h1>
                            <button className="border bg-red-500 hover:bg-red-600 rounded-md px-2 text-white"
                                    onClick={() => {
                                      deleteKeyResult(index, i)
                                    }}>
                              Delete
                            </button>
                          </span>


                        <span className="flex justify-between">
                            <p>Initial: {kr.initialValue}</p>
                            <p>Current: {kr.currentValue}</p>
                            <p>Target: {kr.targetValue}</p>
                            <p>Metrics: {kr.metrics}</p>
                          </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })
      ) : (
        <div className="border-2 px-8 py-4 space-y-6 flex flex-col mx-6">
          <p>No Objectives</p>
        </div>
      )}
    </div>
  <AddKeyResultModal isOpen={isOpen} setObjectives={setObjectives} objective={currentObjective} objectives={objectives} setIsOpen={setIsOpen}></AddKeyResultModal>
</div>


)
}