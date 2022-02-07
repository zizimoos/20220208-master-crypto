import { useParams } from "react-router-dom";

const Coin = () => {
  const { id } = useParams();
  return <div>Coin : {id}</div>;
};
export default Coin;
