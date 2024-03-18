import { Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import { Breadcrumb } from 'app/components'
import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux'
import { GetUserRequest, PutUserRequest} from 'slice/recruiter/userSlice'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Profile = () => {
  
  const data = useSelector((state)=>state.user.data);
  console.log(data);

  const dis = useDispatch();

  const navi = useNavigate();

  const[userdata, setUserData]=useState({
    name: "",
    contactNumber: "",
    bio: ""
  });
  
  useEffect(() => {
    dis (GetUserRequest())
  },[])

  useEffect(() => {
    setUserData(data)
  },[data])

  const handleInput = (key, value) => {
    setUserData({
      ...userdata,
      [key]: value,
    });
    
  };
  const handleSubmit =(e)=>{
    e.preventDefault()
    dis (PutUserRequest(userdata))
   localStorage.setItem('name' , userdata.name)
    toast.success("Profile Updated Successfully.");
}
  return (
   
    <Container>
    <div>
    <Box style={{marginTop:"15px"}} className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: 'Recruiter', path: '/recruiter/profile' }, { name: 'Profile' }]} />
    </Box>

    <Stack spacing={3}>
      <Grid item>
        <Typography variant="h3" style={{display:'flex', justifyContent:'center'}}>Profile</Typography>
      </Grid>
      <Grid item xs style={{ width: "100%" }}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center" 
          }}
        >
          <Grid container direction="column" alignItems="stretch" spacing={3}>
            <Grid item>
              <TextField
                label="Name"
                value={userdata?.name}
                onChange={(event) =>
                  handleInput("name", event.target.value)
                }
                variant="outlined"
                fullWidth
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Bio (upto 250 words)"
                multiline
                rows={8}
                style={{ width: "100%" }}
                variant="outlined"
                value={userdata?.bio}
                onChange={(event) => {
                  if (
                    event.target.value.split(" ").filter(function (n) {
                      return n != "";
                    }).length <= 250
                  ) {
                    handleInput("bio", event.target.value);
                  }
                }}
              />

            </Grid>
            <Grid item style={{display:"flex", justifyContent:"center"}}>

            <TextField type='Number' id="outlined-basic" value={userdata?.contactNumber} label="Number : +91"
              onChange={(event) =>
                handleInput("contactNumber", event.target.value)
              } variant="outlined" />
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px", marginTop: "30px" }}
            onClick={handleSubmit}
          >
            Update Details
          </Button>
        </Paper>
      </Grid>
    
    </Stack>
    </div>
  </Container>
  )
}

export default Profile;