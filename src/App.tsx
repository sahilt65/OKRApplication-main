import {useEffect, useState} from "react";
import {ObjectiveType} from "./Types/OKRTypes.ts";
import {CreateOkrForm} from "./Components/CreateOkrForm.tsx";
import {ShowOKRs} from "./Components/ShowOKRs.tsx";
import {getOKRData} from "./OKR-store/OKR-Data.ts";


function App() {
  const [objectives, setObjectives] = useState<ObjectiveType[] | null>(null);

  const isLoading = objectives===null;

  useEffect(() => {
    (async () => {
      const initialOKRData: ObjectiveType[] = await getOKRData();
      setObjectives(initialOKRData);
    })();
  }, [])

  return (
    <div>
      <CreateOkrForm
        objectives={objectives??[]}
        setObjectives={setObjectives}
      />
      {isLoading ? (<p>Loading...</p>) : (<ShowOKRs
        objectives={objectives}
        setObjectives={setObjectives}
      />)}

    </div>
  );
}

export default App;
