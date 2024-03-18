import React from 'react'
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField} from '@mui/material';
import { Box, styled } from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import makeStyles from '@emotion/styled';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
  
const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRegisterForApplicant = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));

// inital login credentials
const initialValues = {
    type: "applicant",
    email: "",
    password: "",
    name: "",
    education: [],
    skills: [],
     
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!')
});

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

export const JwtRegisterForApplicant = () => {

    const theme = useTheme();
    const { register } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [education, setEducation] = useState([
      {
        institutionName: "",
        startYear: "",
        endYear: "",
      },
    ]);

    const handleFormSubmit = (values) => {
      alert('r');
      setLoading(true);
    

    try {
      fetch('http://localhost:4444/auth/signup', {
        method: 'post',
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((y) => y.json())
        .then((y) => {
          setLoading(false);

          if (!y.errors && !y.driver) {
            navigate('/session/signinForApplicant');
            localStorage.setItem("token" , JSON.stringify((y)))
          }
        })
        .catch((error) => {
          console.log(error);
          alert('This Email is Already exiting');
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
    }


  return (
    <JWTRegisterForApplicant>
    <Card className="card">
      <Grid container>
        <Grid item sm={6} xs={12}>
          <ContentBox>
            <img
              width="100%"
              alt="Register"
              src="https://img.freepik.com/premium-vector/virtual-job-fair-illustration-concept_108061-1031.jpg?w=740"
            />
          </ContentBox>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Box p={4} height="100%">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
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
                    value={values.name}
                    onChange={handleChange}
                    helperText={touched.name && errors.name}
                    error={Boolean(errors.name && touched.name)}
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    type="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={Boolean(errors.email && touched.email)}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    helperText={touched.password && errors.password}
                    error={Boolean(errors.password && touched.password)}
                    sx={{ mb: 2 }}
                  />

                <TextField
                   fullWidth
                   size="small"
                   type="text"
                   name="skills"
                   label="Skills"
                   variant="outlined"
                   onBlur={handleBlur}
                   value={values.skills}
                   onChange={handleChange}
                   helperText={touched.skills && errors.skills}
                   error={Boolean(errors.skills && touched.skills)}
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
            
              <ButtonGroup  fullWidth variant="outlined" aria-label="Basic button group" sx={{ mb: 3 }}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        style={{width : "40%"}}
                        startIcon={<DescriptionIcon />}
                        >
                        <VisuallyHiddenInput type="file" />
                        </Button>

                        <Button style={{width : "221%",color : "#c4c4c4", borderColor:"#c4c4c4"}}>
                        Resume (.pdf)              
                    
                    </Button>
                        <Button
                            component="label"
                            role={undefined}
                            disabled
                            style={{width : "40%"}}
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
                        style={{width : "40%"}}
                        startIcon={<AccountBoxIcon />}
                        >
                        <VisuallyHiddenInput type="file" />
                        </Button>

                        <Button style={{width : "221%", color : "#c4c4c4", borderColor:"#c4c4c4"}}>
                        Profile Photo (.jpg/.png)        
                    
                    </Button>
                        <Button
                            component="label"
                            role={undefined}
                            disabled
                            style={{width : "40%"}}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon  />}
                            >                
                            
                        </Button>
                </ButtonGroup>
                 

                  <FlexBox gap={1} alignItems="center">
                    <Checkbox
                      size="small"
                      name="remember"
                      onChange={handleChange}
                      checked={values.remember}
                      sx={{ padding: 0 }}
                    />

                    <Paragraph fontSize={13}>
                      I have read and agree to the terms of service.
                    </Paragraph>
                  </FlexBox>

                  <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ mb: 2, mt: 3 }}
                  >
                    Regiser
                  </LoadingButton>

                  <Paragraph>
                    Already have an account?
                    <NavLink
                      to="/session/signinForApplicant"
                      style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                    >Login</NavLink>
                    <br></br>
                    Login For Recruiter
                       <NavLink
                      to="/session/signin"
                      style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                    >Login</NavLink>
                    <br></br>
                    Registraton for Recruiter
                      <NavLink
                      to="/session/signup"
                      style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                    >Registration</NavLink>
                     <br></br>
                  </Paragraph>
                </form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Card>
  </JWTRegisterForApplicant>
);
};

