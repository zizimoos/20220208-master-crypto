import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import { Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import { IPriceInfo, ICoinDetail } from "../Interface";
import Chart from "./nest/Chart";
import Price from "./nest/Price";
import { coinDetail, coinPrice } from "../Api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AiOutlineLeft } from "react-icons/ai";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Header = styled.header`
  height: 5vh;
  margin: 20px;
  display: flex;
  align-items: flex-start;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.textColor};
  }
`;

const LinkWarpper = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  a {
    font-size: 1.2rem;
    text-decoration: none;
    color: ${(props) => props.theme.colors.textColor};
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.colors.textColor};
`;
const Overview = styled.div`
  width: 90vw;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.textColor};
  background-color: rgba(0, 0, 0, 0.5);
  @media only screen and (min-width: 800px) {
    width: 600px;
  }
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  width: 90vw;
  margin: 20px 0px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textColor};
  @media only screen and (min-width: 800px) {
    width: 600px;
  }
`;

const Tabs = styled.div`
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
  @media only screen and (min-width: 800px) {
    width: 600px;
  }
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;

  a {
    display: block;
    color: ${(props) =>
      props.isActive
        ? props.theme.colors.textColorskyBlue
        : props.theme.colors.textColorIvory};
  }
`;

const Coin = () => {
  const { id } = useParams();
  // const location = useLocation();
  const priceMatch = useMatch("/:id/price");
  const chartMatch = useMatch("/:id/chart");

  const { isLoading: detailLoading, data: detailInfo } = useQuery<ICoinDetail>(
    ["coinDetail", id],
    () => coinDetail(id!)
  );
  const { isLoading: priceLoading, data: priceInfo } = useQuery<IPriceInfo>(
    ["priceInfo", id],
    () => coinPrice(id!),
    { refetchInterval: 10000 }
  );
  const forHelmet = detailInfo?.name;
  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <title>{`${forHelmet}`} | coinExchange</title>
        </Helmet>
        <LinkWarpper>
          <div>
            <Link to="/">
              <AiOutlineLeft />
            </Link>
          </div>
        </LinkWarpper>
        <Header>
          <Title>{detailInfo?.name.toUpperCase()}</Title>
        </Header>
        {priceLoading || detailLoading ? (
          "...loading"
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank</span>
                <span>{detailInfo?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol</span>
                <span>{detailInfo?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>PRICE</span>
                <span>${priceInfo?.quotes?.USD?.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>{detailInfo?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply</span>
                <span>{priceInfo?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply</span>
                <span>{priceInfo?.max_supply}</span>
              </OverviewItem>
            </Overview>

            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${id}/chart`} state={{ id }}>
                  Chart
                </Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${id}/price`}>Information</Link>
              </Tab>
            </Tabs>

            <Routes>
              <Route path="price" element={<Price />}></Route>
              <Route path="chart" element={<Chart />}></Route>
            </Routes>
          </>
        )}
      </Container>
    </HelmetProvider>
  );
};

export default Coin;
