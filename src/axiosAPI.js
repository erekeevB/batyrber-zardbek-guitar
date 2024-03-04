import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://testing-creation-b0e15aef84d7.herokuapp.com/api/",
  timeout: 1000,
});

export async function fetchGuitarList({ sort, after, pageSize }) {
  return customAxios.get("/guitars/getall", {
    params: { sort, after, pageSize },
  });
}

export async function fetchIndividualGuitar({ id }) {
  return customAxios.get("/guitars/getdetailedinfo", {
    params: { id },
  });
}
export async function fetchCartItems({ ids }) {
  return customAxios.get("/guitars/getdetailedinfolist", {
    params: { ids: ids.join(",") },
  });
}
