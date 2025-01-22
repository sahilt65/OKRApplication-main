import {ObjectiveType} from "../Types/OKRTypes.ts";

const initialObjectives: ObjectiveType[] = [
  {
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

export default function getOKRData():Promise<ObjectiveType[]>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(initialObjectives);
    },3000)
  })
}
