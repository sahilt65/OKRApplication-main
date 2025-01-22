import {ObjectiveType} from "../Types/OKRTypes.ts";

type ShowOKRsProps = {
  objectives: ObjectiveType[],
  setObjectives: React.Dispatch<React.SetStateAction<ObjectiveType[]>>
}

export function ShowOKRs({
                           objectives,
                           setObjectives
                         }: ShowOKRsProps) {
  function deleteKeyResult(objIndex: number, keyResultIndex: number) {
    const keyResultToDelete = objectives[objIndex].keyResults[keyResultIndex];
    const keyResultTemp = objectives[objIndex].keyResults.filter(key => key != keyResultToDelete);
    objectives[objIndex].keyResults = keyResultTemp;
    console.log(keyResultTemp);
    setObjectives([...objectives]);
  }

  return (<div className=" px-4 space-y-4 mx-24 ">
      {objectives.length > 0 ? (
        objectives.map((objective, index) => {
          return (
            <>
              <div
                className={`border-2  flex flex-col mx-6 my-3  ${
                  index % 2 === 0 ? "bg-slate-200" : "bg-slate-100"
                } `}
              >
                <p className="font-semibold text-xl border-b-2 px-8 bg-green-300 py-2">
                  {index + 1}. {objective.title}
                </p>

                <div className=" px-16 py-4">
                  <div className="font-medium text-lg">Key Results</div>

                  {objective.keyResults.map((kr, i) => {
                    return (
                      <div className="pl-4">
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
  )
}