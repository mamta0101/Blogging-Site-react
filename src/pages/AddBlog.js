import React, { useEffect, useState } from 'react';
import { Button, Container, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { addBlog } from '../Services/blogApi';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';



const AddBlog = () => {
 
const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
const [shortDescription, setShortDescription] = useState("");
const [longDescription, setLongDescription] = useState("");


const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("refreshToken")){
      navigate("/")
    }
  }, [])
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        let payload ={         
          blogTitle:title,
          category: category,
          shortDescription: shortDescription,
          longDescription: longDescription   ,
          readTime:10    
        }
    
        try {
          const result = await addBlog(payload);
          console.log('blog added:', result);
          toast.success("blog added", {
            position: "top-center",
            autoClose: 2000,
          });

        } catch (error) {
          console.error('Error adding blog:', error);
          toast.error("you are not authorize to add blogs", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      };





  return (
    <>
    <Navbar/>
        <Container>
        <h2>Add New Blog</h2>
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

export default AddBlog;











