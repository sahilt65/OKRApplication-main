import {useContext, useEffect} from "react";
import {ObjectiveType} from "./Types/OKRTypes.ts";
import {CreateOkrForm} from "./Components/CreateOkrForm.tsx";
import {ShowOKRs} from "./Components/ShowOKRs.tsx";
import {getOKRData} from "./OKR-store/OKR-Data.ts";
import {okrProviderContext} from "./providers/OKRProvider.tsx";


function App() {
  const {objectives, setObjectives} = useContext(okrProviderContext);


  const isLoading = objectives === null;

  useEffect(() => {
    (async () => {
      const initialOKRData: ObjectiveType[] = await getOKRData();
      setObjectives(initialOKRData);
    })();
  }, [])

  return (
    <div>
      {/*<div className="flex space-x-10">*/}
      {/*  <Link to={"/okr-form"}><p>OKR Form</p></Link>*/}
      {/*  <Link to={"/display-okr"}><p>Display OKR</p></Link>*/}
      {/*</div>*/}
      {/*<Routes>*/}
      {/*  <Route path={"/okr-form"} element={*/}
      {/*    <CreateOkrForm*/}
      {/*      objectives={objectives ?? []}*/}
      {/*      setObjectives={setObjectives}*/}
      {/*    />*/}
      {/*  }/>*/}

      {/*  <Route path={"/display-okr"} element={*/}
      {/*    isLoading ? (<p>Loading...</p>) : (*/}
      {/*    <ShowOKRs*/}
      {/*      objectives={objectives}*/}
      {/*      setObjectives={setObjectives}*/}
      {/*    />)}*/}
      {/*  />*/}
      {/*</Routes>*/}

      <CreateOkrForm
      />
      {isLoading ? (<p>Loading...</p>) : (
        <ShowOKRs
        />)}

    </div>
  );
}

export default App;
