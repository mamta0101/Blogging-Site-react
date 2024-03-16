import React, { useEffect, useState } from 'react';
import { Button, Container, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { addPatient, getBlogById, getPatientById, updateBlog, updatePatient } from '../Services/blogApi';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';




const UpdateBlog = () => {
 
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const [blog, setBlog] = useState([]);
  const { Id } = useParams()

const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("refreshToken")){
      navigate("/")
    }
  }, [])

  useEffect(() => {
      const fetchBlog = async () => {
        try {
          const blogData = await getBlogById(Id);
          setBlog(blogData.data);
        } catch (error) {
          console.error('Error fetching blog data:', error);
        }
      };
  
      fetchBlog();
    }, [Id]);

    useEffect(() => {
      setTitle(blog.blogTitle);
      setCategory(blog.category);
      setShortDescription(blog.shortDescription);
      setLongDescription(blog.longDescription);
      }, [blog])
 
    
      const handleSubmit = async (e) => {
        e.preventDefault();
  if(!title || !category || !shortDescription ){
    toast.warning("please fill all Details", {
        position: "top-center",
        autoClose: 2000,
      });
  }else{
    let payload ={         
      blogTitle:title,
      category,
      shortDescription,
      longDescription       
    }
    
        try {
          const result = await updateBlog(payload, Id);
          console.log('Blog Updated:', result);
          toast.success("Blog Update success", {
            position: "top-center",
            autoClose: 2000,
          });

        } catch (error) {
          console.error('Error adding Blog:', error);
          toast.error("you are not authorize to update blogs",{
            position: "top-center",
            autoClose: 2000,
          });
        }
    }

      };





  return (
    <>
    <Navbar/>
        <Container>
        <h2>Update Blog</h2>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={3} mt={5}>        
            <Grid item md={6} xs={12}>
            <TextField
          label="Blog Title"
          name="title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
          fullWidth
        />
        </Grid>
        <Grid item md={6} xs={12}>
            
        <TextField
          label="Category"
          name="category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          required
          fullWidth
        />
         </Grid>
        <Grid item md={6} xs={12}>
            
        <TextField
          label="Short Description"
          name="shortDescription"
          value={shortDescription}
          onChange={(e)=>setShortDescription(e.target.value)}
          required
          fullWidth
        />
         </Grid>
        <Grid item md={6} xs={12}>
            
        <TextField
          label="Long Description"
          name="longDescription"
          value={longDescription}
          onChange={(e)=>setLongDescription(e.target.value)}
          required
          fullWidth
        />
         </Grid>
       
      
       
         

     

        
            <Grid item md={12} xs={12} flexGrow={1}>
            <Button type="submit" variant="contained" sx={{bgcolor:'#000'}}>
          Add Blog
        </Button>
            
            
            </Grid>
          </Grid>
          </form>
        </Container>
      
    </>
  );
};

export default UpdateBlog;











