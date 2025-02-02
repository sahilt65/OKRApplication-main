import {KeyResultType, ObjectiveType} from "../Types/OKRTypes.ts";

const API_URL = "http://localhost:3000/objectives/";
const KEY_RESULT_URL = "http://localhost:3000/key-result/";


async function getOKRData(): Promise<ObjectiveType[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch objectives");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching OKR data:", error);
    return [];
  }
}

async function deleteObjectiveFromDb(id: number) {
  try {
    const response = await fetch(API_URL + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error deleting OKR data:", error);
  }
}

async function insertOKRData(objectiveTitle: string): Promise<any> {
  try {
    const newObjective: { "title": string } = {"title": objectiveTitle};
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObjective),
    });
    if (!response.ok) {
      throw new Error("Failed to insert objective");
    }

    return response.json();
  } catch (error) {
    console.error("Error inserting OKR data:", error);
  }
}



async function insertKeyResult(keyResult: KeyResultType, objectiveID: number) {
  try {
    const newKeyResult = {
      title : keyResult.title,
      initialValue: Number(keyResult.initialValue),
      currentValue: Number(keyResult.currentValue),
      targetValue: Number(keyResult.targetValue),
      metrics : keyResult.metrics,
      objectiveID: objectiveID,
    };
    const response = await fetch(KEY_RESULT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newKeyResult),
    });
    if (!response.ok) {
      throw new Error("Failed to insert objective");
    }
    return response.json();
  } catch (error) {
    console.error("Error inserting OKR data:", error);
  }
}

async function deleteKeyResultWithId(id: number) {
  try {
    const response = await fetch(KEY_RESULT_URL + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to insert objective");
    }
  } catch (error) {
    console.error("Error inserting OKR data:", error);
  }
}

export {getOKRData, insertOKRData, deleteObjectiveFromDb, insertKeyResult, deleteKeyResultWithId}
