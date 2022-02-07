import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coin />} />
        <Route path="/:id" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
