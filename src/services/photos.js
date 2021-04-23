import apisauce from 'apisauce';

const api = apisauce.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

export const getPhoto = (photo_reference) => ({data: `${process.env.REACT_APP_API_BASE_URL}/api/photo?photo_reference=${photo_reference}`});
