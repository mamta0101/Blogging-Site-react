import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBlog from "./pages/AddBlog";
import UpdateBlog from "./pages/UpdateBlog";
import BlogDetails from "./pages/BlogDetails";
import AllBlogs from "./pages/AllBlogs";


function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/update-blog/:Id" element={<UpdateBlog />} />
          <Route path="/blog-details/:Id" element={<BlogDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
