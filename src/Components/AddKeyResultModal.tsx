import {useState} from "react";
import {KeyResultType} from "../Types/OKRTypes.ts";

export function AddKeyResultModal({isOpen, objective, setObjectives, objectives, setIsOpen}) {
  const [newKeyResult, setNewKeyResult] = useState<KeyResultType>(
    {
      title: "string",
      initialValue: 1,
      currentValue: 1,
      targetValue: 1,
      metrics: "string",
    }
  );

  const addKeyResult = () => {
    objectives.map((key) => {
      if (key === objective) {
        console.log(key);
        key.keyResults.push(newKeyResult);
        console.log(key);
      }
    })
    setObjectives([
      ...objectives,
    ]);
    console.log(objectives);
  };

  function handleChange(key: string, input: string | number) {
    newKeyResult[key] = input;
    setNewKeyResult(newKeyResult);
  }

  return (

    <div>
      {isOpen ? (

        <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex items-center justify-center ">
          <div className="bg-white p-6 max-w-3xl space-y-2">
            <div className="font-bold">Add Key Result</div>
            < >
              <input
                className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                type="text"
                id="keyresults"
                placeholder="Key Result Title"
                onChange={(e) => {
                  handleChange("title", e.target.value)
                }}
              />
              <div className="flex space-x-3">
                <input
                  className="shadow-lg  px-4 py-2 w-full  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                  type="text"
                  placeholder="Initial Value"
                  onChange={(e) => {
                    handleChange("initialValue", e.target.value)
                  }}
                />
                <input
                  className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                  type="text"
                  placeholder="Current Value"
                  onChange={(e) => {
                    handleChange("currentValue", e.target.value)
                  }}
                />
                <input
                  className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                  type="text"
                  placeholder="Target Value"
                  onChange={(e) => {
                    handleChange("targetValue", e.target.value)
                  }}
                />
              </div>
              <input
                className="shadow-lg w-4/12 px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Metrics"
                onChange={(e) => {
                  handleChange("metrics", e.target.value)
                }}

              />
              <div className="flex space-x-1 pt-2 justify-end">
                <button
                  className="bg-blue-400 px-2 py-1 rounded-md text-white    hover:bg-blue-600 mr-6 block items-end"
                  onClick={() => {
                    addKeyResult()
                  }}
                >
                  Add Key Result
                </button>
                <button
                  className="bg-gray-400 px-2 py-1 rounded-md text-white hover:bg-gray-600 mr-6 block items-end"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          </div>
        </div>
      ) : (<div></div>)
      }
    </div>
  )
}