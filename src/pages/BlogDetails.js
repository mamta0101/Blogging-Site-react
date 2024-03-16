import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Divider,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogById } from '../Services/blogApi';
import Navbar from '../components/Navbar';

const BlogDetails = () => {
    const [blog, setBlog] = useState([]);
    const { Id } = useParams()

    const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("refreshToken")){
      navigate("/")
    }
  }, [])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const blogData = await getBlogById(Id);
            setBlog(blogData.data);
          } catch (error) {
            console.error('Error fetching blog data:', error);
          }
        };
    
        fetchData();
      }, [Id]);


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
     <Navbar/>
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h3">
          Blog Details
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Typography variant="h4">
       Title :    {blog?.blogTitle}
        </Typography>
        <Typography variant="h6">
       Category: {blog?.category},  {ConvertMongoDate(blog?.createdAt)}
        </Typography>
        <Typography variant="h6">
        Read Time: {blog?.readTime}
        </Typography>
        <Typography variant="h5" my={2}>
        {blog?.shortDescription} 
        </Typography>
        <Typography variant="h5">
        {blog?.longDescription} 
        </Typography>
      </Paper>
    </Container>
    </>
  );
};

export default BlogDetails;