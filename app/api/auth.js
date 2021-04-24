import client from "./client";

const loginEndpoint = "auth/login/";
const registerEndpoint = "auth/register/";

const login = (username, password) =>
  client.post(loginEndpoint, {
    username,
    password,
  });

const register = (username, firstName, lastName, password) =>
  client.post(registerEndpoint, {
    username,
    first_name: firstName,
    last_name: lastName,
    password,
  });

export default { login, register };
