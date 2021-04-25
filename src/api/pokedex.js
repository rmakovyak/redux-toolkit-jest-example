import axios from 'axios';

export const getPokedex = async (url, limit, offset) => {
  const response = await axios.get(url, { params: { limit, offset } });
  const promises = response.data.results.map(({ url }) =>
    axios.get(url).then(({ data }) => data),
  );
  const results = await Promise.all(promises);
  return {
    ...response.data,
    results,
  };
};
