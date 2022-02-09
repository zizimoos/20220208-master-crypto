import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Header = styled.header`
  height: 10vh;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.colors.textColor};
`;
const CoinList = styled.ul``;
const Coin = styled.div`
  width: 90vw;
  margin: 5px;
  padding: 0.6rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.bgColorBlack};
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.textColor};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (min-width: 800px) {
    width: 600px;
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
    })();
  }, []);

  console.log(coinList);
  return (
    <Container>
      <Header>
        <Title>COIN EXCHANGE</Title>
      </Header>
      {isLoading ? (
        "...loading"
      ) : (
        <CoinList>
          {coinList.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
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
