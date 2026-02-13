import { lazy} from "react";
import "./App.css";


const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";
import AmbientSound from "./components/ambientsound";

const App = () => {
  return (
    <>
      <LoadingProvider>
       <AmbientSound />
          <MainContainer>
           
              <CharacterModel />
           
          </MainContainer>
       
      </LoadingProvider>
    </>
  );
};

export default App;
