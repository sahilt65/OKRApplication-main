import {ObjectiveType} from "../Types/OKRTypes.ts";

type InitialObjectivesType = ObjectiveType & {
  id : number
}
const db = new Map<number, InitialObjectivesType>()
let dbIndex = 0;
const initialObjectives: InitialObjectivesType[] = [
  {
    id:dbIndex++,
    title: "Build Team",
    keyResults: [
      {
        title: "Hire Frontend Developers",
        initialValue: 0,
        targetValue: 5,
        currentValue: 1,
        metrics: "Developers"
      },
      {
        title: "Hire Backend Developers",
        initialValue: 0,
        targetValue: 5,
        currentValue: 1,
        metrics: "Developers"
      }
    ]
  },
  {
    id:dbIndex++,
    title: "Sale the Product",
    keyResults: [
      {
        title: "Hire Salesman",
        initialValue: 0,
        targetValue: 5,
        currentValue: 1,
        metrics: "Developers"
      }
    ]
  }
]

initialObjectives.forEach((objective: InitialObjectivesType)=>{
    console.log(db.values())
  db.set(objective.id, objective);
})


function getOKRData():Promise<ObjectiveType[]>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(Array.from(db.values()));
    },3000)
  })
}

function insertOKRData(objective:ObjectiveType):Promise<void>{
  return new Promise((resolve)=>{

    const objectiveToBeAdded:InitialObjectivesType = {
      id:dbIndex++,
      title:objective.title,
      keyResults:objective.keyResults
    }
    setTimeout(()=>{
      db.set(dbIndex++, objectiveToBeAdded);
      resolve();
    },3000)
    console.log(objectiveToBeAdded);
  })
}

export{getOKRData,insertOKRData}
