import {ObjectiveType} from "../Types/OKRTypes.ts";
import {useContext, useState} from "react";
import {AddKeyResultModal} from "./AddKeyResultModal.tsx";
import {deleteKeyResultWithId, deleteObjectiveFromDb} from "../OKR-store/OKR-Data.ts";
import {okrProviderContext} from "../providers/OKRProvider.tsx";
import {EditObjectiveTitleModal} from "./EditObjectiveTitleModal.tsx";


export function ShowOKRs() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditObjectiveTitleOpen, setIsEditObjectiveTitleOpen] = useState<boolean>(false);
  const [currentObjective, setCurrentObjective] = useState<ObjectiveType>();
  const {objectives, setObjectives} = useContext(okrProviderContext);
  async function deleteKeyResult(objIndex: number, keyResultIndex: number, id: number) {
    const keyResultToDelete = objectives![objIndex].keyResults[keyResultIndex];
    objectives![objIndex].keyResults = objectives![objIndex].keyResults.filter(
      (key) => key != keyResultToDelete
    );
    setObjectives([...objectives!]);
    try {
      await deleteKeyResultWithId(id)
    } catch (e) {
      alert("Error while deleting : " + e);
    }
  }

  async function deleteObjective(objective: ObjectiveType) {
    const objectivesTemp = objectives!.filter((key) => key != objective);
    setObjectives([...objectivesTemp]);
    try {
      await deleteObjectiveFromDb(objective.id);
    } catch (e) {
      alert("Some error: " + e);
    }
  }

  return (
    <div>
      <div className="px-4 space-y-4 mx-24">
        {objectives!.length > 0 ? (
          objectives!.map((objective, index) => {
            return (
              <div
                key={objective.id}
                className={`border-2 flex flex-col mx-6 my-3 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                }`}
              >
                <div className="flex border-b-2 px-8  py-2 justify-between">
                  <p className="font-semibold text-xl ">
                    {index + 1}. {objective.title}
                  </p>

                  <div className="space-x-4">
                    <button
                      className="px-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white py-1 text-sm"
                      onClick={() => {
                        setIsEditObjectiveTitleOpen(true);
                        setCurrentObjective(objective);
                      }}
                    >
                      Edit Title
                    </button>

                    <button
                      className="px-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white py-1 text-sm"
                      onClick={() => {
                        setIsOpen(true);
                        setCurrentObjective(objective);
                      }}
                    >
                      Add Key Result
                    </button>
                    <button
                      className="px-2 bg-red-500 hover:bg-red-600 rounded-md text-white py-1 text-sm"
                      onClick={() => {
                        deleteObjective(objective);
                      }}
                    >
                      Delete Objective
                    </button>
                  </div>
                </div>

                <div className="px-16 py-4 space-y-2">
                  <div className="font-medium text-lg text-gray-700">Key Results</div>

                  {/* Check if there are Key Results before rendering the table */}
                  {objective.keyResults.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm text-left text-gray-700">
                        <thead>
                        <tr>
                          <th className="py-2 px-4 border-b">Title</th>
                          <th className="py-2 px-4 border-b">Initial Value</th>
                          <th className="py-2 px-4 border-b">Current Value</th>
                          <th className="py-2 px-4 border-b">Target Value</th>
                          <th className="py-2 px-4 border-b">Metrics</th>
                          <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {objective.keyResults.map((keyResult, i) => {
                          return (
                            <tr key={keyResult.title} className="border-b">
                              <td className="py-2 px-4">{keyResult.title}</td>
                              <td className="py-2 px-4">{keyResult.initialValue}</td>
                              <td className="py-2 px-4">{keyResult.currentValue}</td>
                              <td className="py-2 px-4">{keyResult.targetValue}</td>
                              <td className="py-2 px-4">{keyResult.metrics}</td>
                              <td className="py-2 px-4">
                                <button
                                  className=" bg-red-500 hover:bg-red-600 rounded-md px-2 text-white"
                                  onClick={() => {
                                    deleteKeyResult(index, i, keyResult.id);
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No Key Results</p>
                  )}
                </div>

              </div>
            );
          })
        ) : (
          <div className="border-2 px-8 py-4 space-y-6 flex flex-col mx-6 bg-gray-100">
            <p className="text-gray-700">No Objectives</p>
          </div>
        )}
      </div>
      {currentObjective && (
        <AddKeyResultModal
          isOpen={isOpen}
          objective={currentObjective}
          setIsOpen={setIsOpen}
        />
      )}
      {currentObjective && (
        <EditObjectiveTitleModal
          isOpen={isEditObjectiveTitleOpen}
          objective={currentObjective}
          setIsOpen={setIsEditObjectiveTitleOpen}
        />
      )}
    </div>
  );
}
