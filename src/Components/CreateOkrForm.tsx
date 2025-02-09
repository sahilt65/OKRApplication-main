import {useContext, useState} from "react";
import {KeyResultType} from "../Types/OKRTypes.ts";
import {insertOKRData} from "../OKR-store/OKR-Data.ts";
import {okrProviderContext} from "../providers/OKRProvider.tsx";
import {generateKeyResultAndAddObjectives} from "../OKR-store/OKR-Data.ts";


const CreateOkrForm = () => {
  const [newObjective, setNewObjective] = useState<string>("");
  const [keyResults, setKeyResults] = useState<KeyResultType[]>([]);
  const {objectives, setObjectives} = useContext(okrProviderContext);
  const [loading, setLoading] = useState(false);

  async function addObjective() {

    try {
      await insertOKRData(newObjective).then((value) => {
        setObjectives([
          ...objectives!,
          {
            id: value.id,
            title: newObjective,
            keyResults: keyResults,
          },
        ]);
      });

    } catch (err) {
      alert("Failed to insert objective : " + err);
    }


    setKeyResults([]);
  }

  async function  generateKeyResults(){
    setLoading(true);
    await generateKeyResultAndAddObjectives(newObjective).then((res) => {
      const newObjectives = [res, ...objectives!];
      setObjectives(newObjectives);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
    setNewObjective("");
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
        id: 1,
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
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 px-2 self-start py-1 rounded-md text-white   hover:bg-blue-600 mr-6 block"
          onClick={generateKeyResults}
        >
          {loading?"Loading...":"Generate Key Result and Add Objective"}
        </button>
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
          className="bg-blue-500 px-2 self-start py-1 rounded-md text-white   hover:bg-blue-600 mr-6 block"
          onClick={addKeyResult}
        >
          Add Key Result
        </button>
        <button
          className="bg-blue-500 px-2 self-end py-1 rounded-md text-white  hover:bg-blue-600"
          onClick={addObjective}
        >
          Add Objective
        </button>
      </div>
    </div>
  );
}

export {CreateOkrForm}