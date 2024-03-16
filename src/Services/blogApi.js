import { httpAxios } from "./httpHelper/httpHelper";

const refreshToken = localStorage.getItem("refreshToken");

console.log(refreshToken)



export async function addBlog(item) {
  const result = await httpAxios
    .post("/blogs", item, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    .then((response) => response.data);
  return result;
}


export async function updateBlog(payload, Id) {
  const result = await httpAxios
    .patch(`/blogs/${Id}`, payload, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    .then((response) => response.data);
  return result;
}

export async function getAllBlogs() {
  const result = await httpAxios
    .get("/blogs")
    .then((response) => response.data);
  return result;
}




export async function getBlogById(BlogId) {
  const result = await httpAxios
    .get(`blogs/${BlogId}`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    .then((response) => response.data);
  return result;
}



export async function deleteBlog(BlogId) {
  const result = await httpAxios
    .delete(`blogs/${BlogId}`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    .then((response) => response.data);
  return result;
}
