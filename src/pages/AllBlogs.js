import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteBlog,
  deletePatient,
  getAllBlogs,
  getAllPatients,
} from "../Services/blogApi";
import DrawIcon from "@mui/icons-material/Draw";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { Edit } from "@mui/icons-material";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data = await getAllBlogs();
      console.log(data);
      setBlogs(data?.blogs);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("refreshToken")) {
      navigate("/");
    }
  }, []);

  const handleDelete = async (blogId) => {
    // {
    //   return window.confirm("Are you sure you want to delete?");
    // }

    try {
      const result = await deleteBlog(blogId);
      console.log("blog deleted successfully:", result);
      toast.success("blog deleted successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      getData();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error(error?.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const ConvertMongoDate = (inputDate) => {
    const date = new Date(inputDate);
    const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    const outputDate = `${day} ${month} ${year}`;
    return outputDate;
  };

  return (
    <>
      <Navbar />
      <Container>
        <h2>All Blogs</h2>
{loading ? 
<Box align="center" mt={5}>
  <CircularProgress size={30}/>
</Box>
:(
        blogs.map((data, index) => (
          <Paper
          key={index}
            elevation={2}
            sx={{ borderRadius: "8px", height: "100%", minHeight: "200px" , m:2}}
          >
            <Box p={1}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 3,
                }}
              >
                <Typography variant="h3" sx={{cursor:'pointer'}} onClick={() => navigate(`/blog-details/${data?._id}`)}>{data.blogTitle}</Typography>
                    
                <Box>
                  <Stack direction="row" spacing={2}>
                    <Edit
                      onClick={() => navigate(`/update-blog/${data?._id}`)}
                      sx={{ width: "30px", height: "30px", cursor: "pointer" }}
                    />
                    <DeleteIcon
                      onClick={() => handleDelete(data?._id)}
                      sx={{ width: "30px", height: "30px", cursor: "pointer" }}
                    />
                  </Stack>
                </Box>
              </Box>
              <Box py={1}>
                {data.category} {ConvertMongoDate(data.createdAt)}
              </Box>
              <Box>
                <Typography className="text1Light">
                  {data.shortDescription}
                </Typography>
              </Box>
            </Box>
          </Paper>
        )))}
      </Container>
    </>
  );
};

export default AllBlogs;
