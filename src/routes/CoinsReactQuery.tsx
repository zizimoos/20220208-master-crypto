import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../Api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilState } from "recoil";
import { toggleTheme } from "../atoms";
import { CgToggleOff, CgToggleOn } from "react-icons/cg";

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
  height: 5vh;
  margin: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.colors.textColor};
`;
const IconBox = styled.div`
  width: 100%;
  font-size: 2rem;
  padding: 0.5rem;
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
  const [theme, setTheme] = useRecoilState<boolean>(toggleTheme);

  const { isLoading, data: coinList } = useQuery<ICoinList[]>(
    "coinList",
    fetchCoins
  );

  const onClick = () => {
    setTheme(!theme);
  };
  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <title>{`COIN EXCHANGE`}</title>
        </Helmet>
        <IconBox onClick={onClick}>
          {theme ? <CgToggleOff /> : <CgToggleOn />}
        </IconBox>
        <Header>
          <Title>COIN EXCHANGE</Title>
        </Header>
        {isLoading ? (
          "...loading"
        ) : (
          <CoinList>
            {coinList?.slice(0, 100).map((coin) => (
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
    </HelmetProvider>
  );
};
export default Coins;
