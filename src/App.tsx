import {useState} from "react";

type KeyResultType = {
  title: string;
  initialValue: number;
  currentValue: number;
  targetValue: number;
  metrics: string;
};

type ObjectiveType = {
  title: string;
  keyResults: KeyResultType[ ];
};

function App() {
  const [objectives, setObjectives] = useState<ObjectiveType[]>([]);
  const [newObjective, setNewObjective] = useState("");
  const [keyResults, setKeyResults] = useState<KeyResultType[]>([]);

  function addObjective() {
    setObjectives([
      ...objectives,
      {
        title: newObjective,
        keyResults: keyResults,
      },
    ]);
  }

  function handleChange(key: string, input: string | number, index: number) {
    const keyResultToUpdate = keyResults[index];
    keyResults[index] = {...keyResultToUpdate, [key]: input};
    setKeyResults([...keyResults]);
  }

  function deleteKeyResult(objIndex:number, keyResultIndex: number){
    const keyResultToDelete = objectives[objIndex].keyResults[keyResultIndex];
    const keyResultTemp = objectives[objIndex].keyResults.filter(key => key != keyResultToDelete);
    objectives[objIndex].keyResults = keyResultTemp;
    console.log(keyResultTemp);
    setObjectives([...objectives]);
  }

  const addKeyResult = () => {
    setKeyResults([
      ...keyResults,
      {
        title: "string",
        initialValue: 1,
        currentValue: 1,
        targetValue: 1,
        metrics: "string",
      },
    ]);
  };

  return (
    <div>
      <div className=" px-4 mx-24 mt-12">
        <div className="border-2 px-8 py-4 space-y-6 flex flex-col mx-6 my-3">
          <p className="text-xl font-medium opacity-70 my-4">
            Create Objective Form
          </p>

          <div className="space-y-2">
            <label className="block" htmlFor="objective">
              Objective
            </label>
            <input
              className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
              type="text"
              id="objective"
              placeholder="Add Objective Title"
              onChange={(e) => setNewObjective(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="block">Key Results</p>

            {keyResults.map((keyResult, index) => {
              return (
                <>
                  <input
                    className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                    type="text"
                    id="keyresults"
                    placeholder="Key Result Title"
                    onChange={(e) => {
                      // keyResult.title = e.target.value;
                      // setKeyResults([...keyResults]);

                      handleChange("title", e.target.value, index)
                    }}
                  />
                  <div className="flex space-x-3">
                    <input
                      className="shadow-lg  px-4 py-2 w-full  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                      type="text"
                      placeholder="Initial Value"
                      onChange={(e) => {
                        handleChange("initialValue", e.target.value, index)

                      }}
                    />
                    <input
                      className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                      type="text"
                      placeholder="Current Value"
                      onChange={(e) => {
                        handleChange("currentValue", e.target.value, index)

                      }}
                    />
                    <input
                      className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                      type="text"
                      placeholder="Target Value"
                      onChange={(e) => {
                        handleChange("targetValue", e.target.value, index)

                      }}
                    />
                  </div>
                  <input
                    className="shadow-lg w-4/12 px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                    type="text"
                    placeholder="Metrics"
                    onChange={(e) => {
                      handleChange("metrics", e.target.value, index)

                    }}
                  />
                </>
              );
            })}
          </div>

          <button
            className="bg-blue-400 px-2 self-start py-1 rounded-md text-white ring-2  hover:bg-blue-500 mr-6 block"
            onClick={addKeyResult}
          >
            Add Key Result
          </button>
          <button
            className="bg-blue-400 px-2 self-end py-1 rounded-md text-white ring-2  hover:bg-blue-500"
            onClick={addObjective}
          >
            Add Objective
          </button>
        </div>
      </div>
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
                            onClick={() => {deleteKeyResult(index,i)}}>
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
    </div>
  );
}

export default App;
