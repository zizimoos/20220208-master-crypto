export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((res) =>
    res.json()
  );
}

export const coinDetail = (id: string) => {
  return fetch(`https://api.coinpaprika.com/v1/coins/${id}`).then((res) =>
    res.json()
  );
};

export const coinPrice = (id: string) => {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${id}`).then((res) =>
    res.json()
  );
};

export const coinHistory = (id: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 90;
  return fetch(
    `https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical?start=${startDate}&end=${endDate}&interval=1d`
  ).then((res) => res.json());
};
