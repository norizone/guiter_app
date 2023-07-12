import { RecoilRoot } from "recoil";
import { Router } from "./routers/router";

function App() {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
}

export default App;
