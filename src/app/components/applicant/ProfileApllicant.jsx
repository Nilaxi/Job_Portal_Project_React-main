import React from 'react'
import { Card,Grid, Paper, TextField, Typography } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Formik } from 'formik';
import makeStyles from '@emotion/styled';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect } from 'react';
import { Breadcrumb } from '..';
import { Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetProfileAppliRequest, PutProfileAppliRequest } from 'slice/applicant/profileUpdateSlice';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
 
  const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '15px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
  }));
  


const useStyles = makeStyles((theme) => ({
    body: {
      height: "inherit",
    },
    popupDialog: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // padding: "30px",
    },
  }));

const MultifieldInput = (props) => {
    const classes = useStyles();
    const { education, setEducation } = props;
  
    return (
      <>
        {education.map((obj, key) => (
          <Grid item container className={classes.inputBox} key={key}>
            <Grid item xs={6}   sx={{ mb: 3 }}>
              <TextField
                label={`Institution Name #${key + 1}`}
                value={education[key].institutionName}
                onChange={(event) => {
                  const newEdu = [...education];
                  newEdu[key].institutionName = event.target.value;
                  setEducation(newEdu);
                }}
                variant="outlined"
                fullWidth
              
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Start Year"
                value={obj.startYear}
                variant="outlined"
                type="number"
                onChange={(event) => {
                  const newEdu = [...education];
                  newEdu[key].startYear = event.target.value;
                  setEducation(newEdu);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="End Year"
                value={obj.endYear}
                variant="outlined"
                type="number"
                onChange={(event) => {
                  const newEdu = [...education];
                  newEdu[key].endYear = event.target.value;
                  setEducation(newEdu);
                }}
              />
            </Grid>
          </Grid>
        ))}
        <Grid item style={{ alignSelf: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mb: 3 }}
            onClick={() =>
              setEducation([
                ...education,
                {
                  institutionName: "",
                  startYear: "",
                  endYear: "",
                },
              ])
            }
            className={classes.inputBox}
          >
            Add another institution details
          </Button>
        </Grid>
      </>
    );
  };


export const ProfileApllicant = () => {
   

    const data1 = useSelector((state) => state.profileApplicant.data);
    console.log(data1)

    const dis = useDispatch();

    const [loading, setLoading] = useState(false);      
    const [profileDetails, setProfileDetails] = useState({
      name: "",
      education: [],
      skills: [],
      resume: "",
      profile: "",
    });
  
    const [education, setEducation] = useState([
      {
        institutionName: "",
        startYear: "",
        endYear: "",
      },
    ]);
  
    useEffect(() => {
      dis(GetProfileAppliRequest())
    },[])

    useEffect(() => {
      setProfileDetails(data1)
    },[data1])
    
    const handleInput = (key, value) => {
      setProfileDetails({
        ...profileDetails,
        [key]: value,
      });
    };
  

  
    const handleFormSubmit = (values) => {
      alert('r');
      dis(PutProfileAppliRequest())
      setLoading(true);
    }  

   return (
    <>
      <Container>
     <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Applicant', path: '/applicant/profileapplicant' }, { name: 'Profile' }]}
        />
      </Box>
      <Stack spacing={2}>
      <Grid item sx={{ mb: 2 }} >
        <Typography variant="h3" align='center'>Profile</Typography>
      </Grid>

    <Grid
      container
      item
      direction="column" alignItems="stretch" spacing={3}      
      style={{  minHeight: "93vh"}}
    >      
      
      <Grid item xs>     
    
    <Card className="card" >
      <Grid container style={{width : "150%", marginLeft : "120px"}} >     

        <Grid item sm={6} xs={12}>
          <Box p={4} height="100%">
            <Formik 
              onSubmit={handleFormSubmit}
             
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="name"
                    label="Name"
                    variant="outlined"
                    onBlur={handleBlur}                    
                    onChange={(e) => {
                      handleInput("name", e.target.value)
                    }}
                    helperText={touched.name && errors.name}
                    error={Boolean(errors.name && touched.name)}
                    sx={{ mb: 3 }}
                  />

                <MultifieldInput
                education={education}
                setEducation={setEducation}
                name="education"
                label="education"
                variant="outlined"
                sx={{ mb: 3 }}
              />
            
                <TextField
                   fullWidth
                   size="small"
                   type="text"
                   name="skills"
                   label="Skills"
                   variant="outlined"
                   onBlur={handleBlur}
                   onChange={(e) => {
                    handleInput("name", e.target.value)
                  }}
                   helperText={touched.skills && errors.skills}
                   error={Boolean(errors.skills && touched.skills)}
                   sx={{ mb: 3 }}
                 /> 
                 
                <ButtonGroup  fullWidth variant="outlined" aria-label="Basic button group" sx={{ mb: 3 }}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        style={{width : "30%"}}
                        startIcon={<DescriptionIcon />}
                        >
                        <VisuallyHiddenInput type="file" />
                        </Button>

                        <Button style={{width : "211%",color : "#c4c4c4", borderColor:"#c4c4c4"}}>
                        Resume (.pdf)              
                    
                    </Button>
                        <Button
                            component="label"
                            role={undefined}
                            disabled
                            style={{width : "30%"}}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon  />}
                            >                
                            
                        </Button>
                </ButtonGroup>
                 
                <ButtonGroup  fullWidth variant="outlined" aria-label="Basic button group"   sx={{ mb: 3 }}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        style={{width : "30%"}}
                        startIcon={<AccountBoxIcon />}
                        >
                        <VisuallyHiddenInput type="file" />
                        </Button>

                        <Button style={{width : "211%", color : "#c4c4c4", borderColor:"#c4c4c4"}}>
                        Profile Photo (.jpg/.png)        
                    
                    </Button>
                        <Button
                            component="label"
                            role={undefined}
                            disabled
                            style={{width : "30%"}}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon  />}
                            >                
                            
                        </Button>
                </ButtonGroup>                         
                <Button
              variant="contained"
              color="primary"
              fullWidth
              align = 'center'
              style={{ padding: "7px 65px" }}
          
            >
              Update Details
            </Button>   
                </form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Card>
  
    
        </Grid>
      </Grid>
     </Stack>
    </Container>
    </>
  );
};

