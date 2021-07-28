import jwtAxios from "src/axios-config/jwtAxios";

export const fetchSSGProducts = async () => {
  try {
    console.log("res.data loading");
    const res = await jwtAxios.get(`products/`);
    return res.data;
  } catch (err) {
    console.log("error!!!!", err);
  }
};

export const fetchSSGBrands = async () => {
  try {
    console.log("res.data loading");
    const res = await jwtAxios.get(`companies/`);
    return res.data;
  } catch (err) {
    console.log("error!!!!", err);
  }
};

export const fetchSSGCategories = async () => {
  try {
    console.log("res.data loading");
    const res = await jwtAxios.get(`categories/`);
    return res.data;
  } catch (err) {
    console.log("error!!!!", err);
  }
};
