const API_URL = 'https://dummyjson.com/products/';

export const getAllProducts = async () => {
  const res = await fetch(API_URL);
  return res.json();
}

export const getSingleProduct = async (id) => {
  const res = await fetch(API_URL + id);
  return res.json();
}