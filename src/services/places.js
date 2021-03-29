import apisauce from 'apisauce';

const api = apisauce.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

export const findPlace = (place_id) => api.get('api/place', { place_id });
