import {useState, useEffect, useContext} from "react";
import {ObjectiveType} from "../Types/OKRTypes.ts";
import * as React from "react";
import {okrProviderContext} from "../providers/OKRProvider.tsx";
import {updateObjectiveTitleFromDb} from "../OKR-store/OKR-Data.ts";

type EditObjectiveTitleModalProps = {
  isOpen: boolean;
  objective: ObjectiveType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


export function EditObjectiveTitleModal({isOpen, objective, setIsOpen}: EditObjectiveTitleModalProps) {
  const {objectives, setObjectives} = useContext(okrProviderContext);
  const [newTitle, setNewTitle] = useState<string>("");

  async function updateObjectiveTitle() {
    if (objectives != null) {
      objectives.map((obj) => {
        if (obj.id === objective.id) {
          obj.title = newTitle;
        }
      })
      setObjectives(objectives);
    }
    await updateObjectiveTitleFromDb(objective.id, newTitle);
  }

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (isOpen) {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen, isOpen]);


  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex items-center justify-center">
          <div className="bg-white p-6 max-w-3xl space-y-2">
            <div className="font-bold">Edit Objective Title</div>
            <input
              className="shadow-lg w-full px-4 py-2 focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
              type="text"
              id="keyresults"
              placeholder="Objective Title"
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <div className="flex space-x-1 pt-2 justify-end">
              <button
                className="bg-blue-400 px-2 py-1 rounded-md text-white hover:bg-blue-600 mr-6 block items-end"
                onClick={async () => {
                  await updateObjectiveTitle();
                  setIsOpen(false);
                }}
              >
                Update Title
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
