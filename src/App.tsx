import {useState} from "react";
import {ObjectiveType} from "./Types/OKRTypes.ts";
import {CreateOkrForm} from "./Components/CreateOkrForm.tsx";
import {ShowOKRs} from "./Components/ShowOKRs.tsx";

function App() {
  const [objectives, setObjectives] = useState<ObjectiveType[]>([]);


  return (
    <div>
      <CreateOkrForm
        objectives={objectives}
        setObjectives={setObjectives}
      />
      <ShowOKRs
        objectives={objectives}
        setObjectives={setObjectives}
      />
    </div>
  );
}

export default App;
