import axios from 'axios';

export const getPokedex = async (url) => {
  const response = await axios.get(url);
  const promises = response.data.results.map(({ url }) =>
    axios.get(url).then(({ data }) => data),
  );
  const results = await Promise.all(promises);
  return {
    ...response.data,
    results,
  };
};
