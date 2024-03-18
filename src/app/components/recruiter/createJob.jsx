import React from 'react';
import {  useState } from 'react';
import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb} from 'app/components';
import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createJobRequest } from 'slice/recruiter/createjobSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '15px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

export const CreateJob = () => {
  const data = useSelector((state) => state.jobs);
  console.log(data);
 

  const dis = useDispatch();
  const navi = useNavigate();
  
  const handleSubmit = () => {
    dis(createJobRequest(jobDetails));
    toast.success("Job Created Successfully.");
    
  };

  const [jobDetails, setJobDetails] = useState({
    title: '',
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().substr(0, 16),
    skillsets: [],
    jobType: 'Full Time',
    duration: 0,
    salary: 0
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value
    });
  };
  return (
    <Container>
      <div>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[{ name: 'Recruiter', path: '/recruiter/createJob' }, { name: 'CreateJob' }]}
          />
        </Box>

        <Stack spacing={2}>
          <Grid item>
            <Typography variant="h3" align="center">
              Add Job
            </Typography>
          </Grid>
          <Grid item container xs direction="column" justify="center">
            <Grid item>
              <Paper
                style={{
                  padding: '20px',
                  outline: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Grid container direction="column" alignItems="stretch" spacing={3}>
                  <Grid item>
                    <TextField
                      label="Title"
                      value={jobDetails.title}
                      onChange={(event) => handleInput('title', event.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Skills"
                      variant="outlined"
                      onChange={(event) => {
                        handleInput('skillsets', event.target.value);
                      }}
                      value={jobDetails.skillsets}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      select
                      label="Job Type"
                      variant="outlined"
                      value={jobDetails.jobType}
                      onChange={(event) => {
                        handleInput('jobType', event.target.value);
                      }}
                      fullWidth
                    >
                      <MenuItem value="Full Time">Full Time</MenuItem>
                      <MenuItem value="Part Time">Part Time</MenuItem>
                      <MenuItem value="Work From Home">Work From Home</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      select
                      label="Duration"
                      variant="outlined"
                      value={jobDetails.duration}
                      onChange={(event) => {
                        handleInput('duration', event.target.value);
                      }}
                      fullWidth
                    >
                      <MenuItem value={0}>Flexible</MenuItem>
                      <MenuItem value={1}>1 Month</MenuItem>
                      <MenuItem value={2}>2 Months</MenuItem>
                      <MenuItem value={3}>3 Months</MenuItem>
                      <MenuItem value={4}>4 Months</MenuItem>
                      <MenuItem value={5}>5 Months</MenuItem>
                      <MenuItem value={6}>6 Months</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Salary"
                      type="number"
                      variant="outlined"
                      value={jobDetails.salary}
                      onChange={(event) => {
                        handleInput('salary', event.target.value);
                      }}
                      InputProps={{ inputProps: { min: 0 } }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Application Deadline"
                      type="datetime-local"
                      value={jobDetails.deadline}
                      onChange={(event) => {
                        handleInput('deadline', event.target.value);
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Maximum Number Of Applicants"
                      type="number"
                      variant="outlined"
                      value={jobDetails.maxApplicants}
                      onChange={(event) => {
                        handleInput('maxApplicants', event.target.value);
                      }}
                      InputProps={{ inputProps: { min: 1 } }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Positions Available"
                      type="number"
                      variant="outlined"
                      value={jobDetails.maxPositions}
                      onChange={(event) => {
                        handleInput('maxPositions', event.target.value);
                      }}
                      InputProps={{ inputProps: { min: 1 } }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ padding: '10px 50px', marginTop: '30px' }}
                  onClick={handleSubmit}
                >
                  Create Job
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </div>
    </Container>
  );
};
