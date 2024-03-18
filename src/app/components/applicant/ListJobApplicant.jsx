import * as React from 'react';
import {Box, CardActions, Chip,Grid,IconButton,InputAdornment,Button,TextField,Paper,FormControlLabel,Checkbox,Slider,MenuItem,Modal,Rating,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Breadcrumb } from 'app/components';
import Card from '@mui/material/Card';
import styled from '@emotion/styled';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import makeStyles from '@emotion/styled';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';
import { getJobRequest, searchgetJobRequest, searchgetJobRequestAdvanced } from 'slice/recruiter/createjobSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogContent from '@mui/material/DialogContent';



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
      button: {
        width: "100%",
        height: "100%",
      },
      jobTileOuter: {
        padding: "30px",
        margin: "20px 0",
        boxSizing: "border-box",
        width: "100%",
      },
      popupDialog: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      statusBlock: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "uppercase",
      },
    }));
  
  
   // FilterPop up Show------------------------->
  
   const FilterPopup = (props) => {
    const classes = useStyles();
    const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
    return (
      <Modal open={open} onClose={handleClose} className={classes.popupDialog} style={{display : 'flex',
      justifyContent : 'center'}}>
        <Paper
          style={{
            padding: '50px',
            outline: 'none',
            minWidth : '60%',
            height :'70%',
            marginLeft:"160px",
            marginTop :"58px"           
          
          }}
        >
          <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid container item alignItems="center">
              <Grid item xs={3}>
                Job Type
              </Grid>
              <Grid
                container
                item
                xs={9}
                justify="space-around"
                
              >
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="fullTime"
                        checked={searchOptions.jobType.fullTime}
                        onChange={(event) => {
                          setSearchOptions({
                            ...searchOptions,
                            jobType: {
                              ...searchOptions.jobType,
                              [event.target.name]: event.target.checked
                            }
                          });
                        }}
                      />
                    }
                    label="Full Time"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="partTime"
                        checked={searchOptions.jobType.partTime}
                        onChange={(event) => {
                          setSearchOptions({
                            ...searchOptions,
                            jobType: {
                              ...searchOptions.jobType,
                              [event.target.name]: event.target.checked
                            }
                          });
                        }}
                      />
                    }
                    label="Part Time"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="wfh"
                        checked={searchOptions.jobType.wfh}
                        onChange={(event) => {
                          setSearchOptions({
                            ...searchOptions,
                            jobType: {
                              ...searchOptions.jobType,
                              [event.target.name]: event.target.checked
                            }
                          });
                        }}
                      />
                    }
                    label="Work From Home"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item alignItems="center">
              <Grid item xs={3}>
                Salary
              </Grid>
              <Grid item xs={9}>
                <Slider
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => {
                    return value * (100000 / 100);
                  }}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 100, label: '100000' }
                  ]}
                  value={searchOptions.salary}
                  onChange={(event, value) =>
                    setSearchOptions({
                      ...searchOptions,
                      salary: value
                    })
                  }
                />
              </Grid>
            </Grid>
            <Grid container item alignItems="center">
              <Grid item xs={3}>
                Duration
              </Grid>
              <Grid item xs={9}>
                <TextField
                  select
                  label="Duration"
                  variant="outlined"
                  fullWidth
                  value={searchOptions.duration}
                  onChange={(event) =>
                    setSearchOptions({
                      ...searchOptions,
                      duration: event.target.value
                    })
                  }
                >
                  <MenuItem value="0">All</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid container item alignItems="center">
              <Grid item xs={3}>
                Sort
              </Grid>
              <Grid item container direction="row" xs={9}>
                <Grid
                  item
                  container
                  xs={4}
                  justify="space-around"
                  alignItems="center"
                  style={{ border: '1px solid #D1D1D1', borderRadius: '5px' }}
                >
                  <Grid item>
                    <Checkbox
                      name="salary"
                      checked={searchOptions.sort.salary.status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            salary: {
                              ...searchOptions.sort.salary,
                              status: event.target.checked
                            }
                          }
                        })
                      }
                      id="salary"
                    />
                  </Grid>
                  <Grid item>
                    <label for="salary">
                      <Typography>Salary</Typography>
                    </label>
                  </Grid>
                  <Grid item>
                    <IconButton
                      disabled={!searchOptions.sort.salary.status}
                      onClick={() => {
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            salary: {
                              ...searchOptions.sort.salary,
                              desc: !searchOptions.sort.salary.desc
                            }
                          }
                        });
                      }}
                    >
                      {searchOptions.sort.salary.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={4}
                  justify="space-around"
                  alignItems="center"
                  style={{ border: '1px solid #D1D1D1', borderRadius: '5px' }}
                >
                  <Grid item>
                    <Checkbox
                      name="duration"
                      checked={searchOptions.sort.duration.status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            duration: {
                              ...searchOptions.sort.duration,
                              status: event.target.checked
                            }
                          }
                        })
                      }
                      id="duration"
                    />
                  </Grid>
                  <Grid item>
                    <label for="duration">
                      <Typography>Duration</Typography>
                    </label>
                  </Grid>
                  <Grid item>
                    <IconButton
                      disabled={!searchOptions.sort.duration.status}
                      onClick={() => {
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            duration: {
                              ...searchOptions.sort.duration,
                              desc: !searchOptions.sort.duration.desc
                            }
                          }
                        });
                      }}
                    >
                      {searchOptions.sort.duration.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={4}
                  justify="space-around"
                  alignItems="center"
                  style={{ border: '1px solid #D1D1D1', borderRadius: '5px' }}
                >
                  <Grid item>
                    <Checkbox
                      name="rating"
                      checked={searchOptions.sort.rating.status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            rating: {
                              ...searchOptions.sort.rating,
                              status: event.target.checked
                            }
                          }
                        })
                      }
                      id="rating"
                    />
                  </Grid>
                  <Grid item>
                    <label for="rating">
                      <Typography>Rating</Typography>
                    </label>
                  </Grid>
                  <Grid item>
                    <IconButton
                      disabled={!searchOptions.sort.rating.status}
                      onClick={() => {
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            rating: {
                              ...searchOptions.sort.rating,
                              desc: !searchOptions.sort.rating.desc
                            }
                          }
                        });
                      }}
                    >
                      {searchOptions.sort.rating.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
  
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: '10px 50px' }}
                onClick={() => {handleClose();  getData(); }}
              >
                Apply
              </Button>
            </Grid>
          </Grid>


        </Paper>
      </Modal>
    );
  };

export const ListJobApplicant = () => {

    const { listData} = useSelector((y) => y.jobs);

    console.log(listData);
  
    
  
    const dis = useDispatch();
  
    useEffect(() => {
      dis(getJobRequest(1));
      
    }, []);


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

   // search job ----------------------->

   const handleSearch = (e)=>{

    dis(searchgetJobRequest({

      pageNumber: 1,
      searchTerm :e.target.value
    }));

  }

  // Advanced Search Job -------------------->


  const advancedhandleSearch = ()=>{

    console.log(searchOptions);

    dis(searchgetJobRequestAdvanced({
      ...searchOptions,
      pageNumber: 1  


    }));

    }

    const clearAll = () => {
      dis(getJobRequest(1));
    }

//Popup up filter state--------------------------------> 


const [filterOpen, setFilterOpen] = useState(false);
const [searchOptions, setSearchOptions] = useState({
  query: "",
  jobType: {
    fullTime: false,
    partTime: false,
    wfh: false,
  },
  salary: [0, 100],
  duration: "0",
  sort: {
    salary: {
      status: false,
      desc: false,
    },
    duration: {
      status: false,
      desc: false,
    },
    rating: {
      status: false,
      desc: false,
    },
  },
});


  return (
    <Container>
    <div>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Applicant', path: '/applicant/listjobapplicant' }, { name: 'Jobs' }]}
        />
      </Box>
      <Grid item container direction="column" justify="center" alignItems="center">
            <Grid item xs>
              <Typography variant="h3"> Jobs</Typography>
            </Grid>
            <Grid item xs>
              <TextField
                label="Search Jobs"
                onBlur={handleSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon   />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                style={{ width: '500px' }}
                variant="outlined"  
                
              />
              
              <Button variant="outlined" style={{margin : "0px 10px", padding : "14px"}} onClick={clearAll}>Clear</Button>
            
            </Grid>
            <Grid item>
              <IconButton>
                <FilterListIcon onClick={() => setFilterOpen(true)} />
              </IconButton>
            </Grid>
          </Grid>
          <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={advancedhandleSearch}
      />

          {listData.length > 0 ? (
            listData?.map((v) => {
              return (
                <Card sx={{ maxWidth: 1200, margin: '25px', background: '#DCDCDC' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {v.title}
                      </Typography>

                      <Typography gutterBottom variant="h6" component="div">
                        <Rating value={v.rating !== -1 ? v.rating : null} readOnly />
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Role : {v.jobType}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Salary : &#8377;{v.salary} per month
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                      Duration  :  {v.duration !== 0 ? `${v.duration} month` : `Flexible`}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                      Posted By : {v.recruiter.name}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                      Application Deadline: {(new Date(v.deadline)).toLocaleDateString()}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        {v.skillsets.map((skill) => (
                          <Chip label={skill} style={{ marginRight: '2px' }} />
                        ))}
                      </Typography>
                    </CardContent>

                    {/* Button  code start--------------------------> */}

                    <CardActions style={{ display: 'grid', margin: "20px"}}>
                      <Button
                        style={{
                          backgroundColor: 'rgb(34 42 68)',
                          color: 'white',
                          padding: '90px',
                          borderRadius: '5px',
                          border: 'none',
                          fontSize : 'medium'
                        
                        }}
                        size="small"
                        onClick={handleClickOpen}
                      >
                        APPLY
                      </Button>
                    </CardActions>
                    {/* Button  code end----------------------------> */}
                  </div>
                </Card>
                
              );
            })
          ) : (
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              No jobs found
            </Typography>
          )}
          </div>

{/* Apply Pop up ---------------->        */}

<React.Fragment   style={{width:"33%",height:"44%",marginLeft:"60px"}}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent   style={{width:"550px", height:"250px",padding:"30px"}}>
        <Box
      sx={{
        maxWidth: '100%',
        height: 200,
        maxHeight:"60%",
      
      }}
    >
      <TextField
          id="outlined-multiline-static"
          label="Write SOP (upto 250 words)"
          fullWidth
          multiline
          rows={9}
        />
    </Box>
        </DialogContent>
        <DialogActions style={{justifyContent:"center", padding:"17px 0px 17px 0px"}}>
          <Button style={{backgroundColor:"#1976d2",color:"white",padding:"8px 18px"}} >SUBMIT</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
   </Container>
  )
}
