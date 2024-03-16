import { httpAxios } from "./httpHelper/httpHelper";

export async function signUp(user) {
  const result = await httpAxios
    .post("/users/", user)
    .then((response) => response.data);

  return result;
}


export async function login(loginData) {
  const result = await httpAxios
    .post("/users/login", loginData)
    .then((response) => response.data);
  return result;


}

export async function logout() {
  const result = await httpAxios
    .post("/users/logout")
    .then((response) => response.data);
  return result;
}
