import {useState} from "react";
import {KeyResultType, ObjectiveType} from "../Types/OKRTypes.ts";

type CreateOkrFormProps = {
  objectives: ObjectiveType[]
  setObjectives: React.Dispatch<React.SetStateAction<ObjectiveType[]>>,
}

const CreateOkrForm = ({
                         objectives,
                         setObjectives,
                       }: CreateOkrFormProps) => {
  const [newObjective, setNewObjective] = useState<string>("");
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

          {keyResults.map((_, index) => {
            return (
              <>
                <input
                  className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                  type="text"
                  id="keyresults"
                  placeholder="Key Result Title"
                  onChange={(e) => {
                    handleChange("title", e.target.value, index)
                  }}
                  key={index}
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
  );
}

export {CreateOkrForm}