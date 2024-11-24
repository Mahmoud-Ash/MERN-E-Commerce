import axios from "axios";
const baseURL = import.meta.env.VITE_REACT_API_URL;
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTE2ZTcyZWFjYzFiYzgzYTNkNjU0NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyOTM0ODY0MywiZXhwIjoxNzI5NjA3ODQzfQ.r7C9dsKehR8N_u447oacuvjQFBzDPMT3cYaC9JtsK6U";

export default axios.create({
  baseURL,
});

export const publicRequest = axios.create({
  baseURL,
});

export const userRequest = axios.create({
  baseURL,
  headers: { token: `Bearer ${TOKEN}` },
});
