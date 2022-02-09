import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinReactQuery from "./routes/CoinReactQuery";
import CoinsReactQuery from "./routes/CoinsReactQuery";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<CoinsReactQuery />} />
        <Route path="/:id/*" element={<CoinReactQuery />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
