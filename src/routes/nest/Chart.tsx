import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { coinHistory } from "../../Api";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { toggleTheme } from "../../atoms";

const Container = styled.div`
  width: 100vw;
  margin-right: 3px;
  padding: 10px;
  border-radius: 10px;
  @media only screen and (min-width: 800px) {
    width: 580px;
    margin-top: 10px;
    padding: 0px;
  }
`;

interface ICoinHistory {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

const Chart = () => {
  const { id } = useParams();
  const { isLoading, data: coinPrice } = useQuery<ICoinHistory[]>(
    ["chart", id],
    () => coinHistory(id!)
  );

  const themeMode = useRecoilValue<boolean>(toggleTheme);
  return (
    <Container>
      {isLoading ? (
        <div> Loading ...</div>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: coinPrice?.map((item) => ({
                x: new Date(item.time_close),
                y: [item.open, item.high, item.low, item.close],
              })),
            },
          ]}
          options={{
            theme: { mode: themeMode ? "light" : "dark" },
            chart: {
              width: "100%",
              height: "100%",
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
              style: {
                fontSize: "14px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "light",
                color: "#dbdbdb",
              },
            },
            xaxis: {
              type: "datetime",
              categories: coinPrice?.map((item) => item.time_close),
              labels: {
                show: true,
                datetimeUTC: true,
                datetimeFormatter: {
                  year: "yyyy",
                  month: "MMM 'yy",
                  day: "dd MMM",
                  hour: "HH:mm",
                },
                style: {
                  colors: "#dbdbdb",
                  fontSize: "10px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  cssClass: "apexcharts-xaxis-label",
                },
              },
            },
            yaxis: {
              show: true,
              tooltip: {
                enabled: true,
              },
              labels: {
                show: true,
                style: {
                  colors: "#dbdbdb",
                },
                formatter: (value) => {
                  return value.toFixed(2);
                },
              },
            },
          }}
        ></ApexChart>
      )}
    </Container>
  );
};
export default Chart;
