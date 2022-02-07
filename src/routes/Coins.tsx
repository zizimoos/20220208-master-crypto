import { useParams } from "react-router-dom";

const Coins = () => {
  const params = useParams();
  console.log(params);
  return <div>Coins :{params.id}</div>;
};
export default Coins;
