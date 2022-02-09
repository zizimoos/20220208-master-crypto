import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { IPriceInfo, ICoinDetail } from "../Interface";
import Chart from "./nest/Chart";
import Price from "./nest/Price";

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
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
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
        ? props.theme.colors.textColorIvory
        : props.theme.colors.textColorskyBlue};
  }
`;

const Coin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coinDetail, setCoinDetail] = useState<ICoinDetail>();
  const [priceInfo, setPriceInfo] = useState<IPriceInfo>();

  const { id } = useParams();
  const location = useLocation();
  const priceMatch = useMatch("/:id/price");
  const chartMatch = useMatch("/:id/chart");

  useEffect(() => {
    (async () => {
      const detailResponse = await fetch(
        `https://api.coinpaprika.com/v1/coins/${id}`
      );
      const priceResponse = await fetch(
        `https://api.coinpaprika.com/v1/tickers/${id}`
      );
      const detailData = await detailResponse.json();
      const priceData = await priceResponse.json();
      setCoinDetail(detailData);
      setPriceInfo(priceData);
      setIsLoading(false);
    })();
  }, [id]);
  console.log(coinDetail);
  console.log(priceInfo);

  return (
    <Container>
      <Header>
        <Title>{coinDetail?.name.toUpperCase()}</Title>
      </Header>
      {isLoading ? (
        "...loading"
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{coinDetail?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{coinDetail?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{coinDetail?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{coinDetail?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
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

          {/* <Routes>
            <Route path="price" element={<Price />}></Route>
            <Route path="chart" element={<Chart />}></Route>
          </Routes> */}
        </>
      )}
    </Container>
  );
};

export default Coin;
