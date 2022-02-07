import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1``;
const CoinList = styled.ul``;
const Coin = styled.div`
  margin: 5px;
  padding: 0.4rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.bgColor};
  a {
    text-decoration: none;
    color: white;
  }
`;

const Img = styled.img`
  width: 20px;
  margin-right: 10px;
`;

interface ICoinList {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Coins = () => {
  const [coinList, setCoinList] = useState<ICoinList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoinList(json.slice(0, 100));
      setIsLoading(false);
      console.log(json);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>COME COIN EXCHANGE</Title>
      </Header>
      {isLoading ? (
        "...loading"
      ) : (
        <CoinList>
          {coinList.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`/${coin.id}`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.name}
                />
                {coin.symbol} : {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};
export default Coins;
