import * as React from 'react';
import {Box, CardActions, Chip,Grid,IconButton,InputAdornment,Button,TextField,Paper,FormControlLabel,Checkbox,Slider,MenuItem,Modal,Rating,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Breadcrumb } from 'app/components';
import Card from '@mui/material/Card';
import styled from '@emotion/styled';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import { GetUpdateRequest, PutUpdateRequest, deleteJobRequest,} from 'slice/recruiter/updatejobSlice';
import { ViewGetJobRequest, getJobRequest, searchgetJobRequest, searchgetJobRequestAdvanced } from 'slice/recruiter/createjobSlice';
import makeStyles from '@emotion/styled';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { toast } from 'react-toastify';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';



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
          minWidth : '58%',
          height :'80%',
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


function ListJob() {

  const { listData} = useSelector((y) => y.jobs);

  console.log(listData);

  

  const dis = useDispatch();

  useEffect(() => {
    dis(getJobRequest(1));
    
  }, []);

  // search job ----------------------->

  const handleSearch = (e)=>{

    dis(searchgetJobRequest({

      pageNumber: 1,
      searchTerm :e.target.value
    }));

  }

  // Advanced Search Job -------------------->


  const advancedhandleSearch = (e)=>{

    console.log(searchOptions);

    dis(searchgetJobRequestAdvanced({
      ...searchOptions,
      pageNumber: 1  


    }));

    }

  //Delete Job ------------------------>

  const [idToDelete, setIdToDelete] = useState('');
  const [openDelete, setOpenDelete] = useState(false);  
  const handleClickOpenDelete = (id) => { 

    setOpenDelete(true)
    setIdToDelete(id)};

  const handleCloseDelete = () => setOpenDelete(false);

  const handleDelete = () => {
      dis(deleteJobRequest(idToDelete));  
    handleCloseDelete();
  };
  
// update jobs ---------------------->

const [idToUpdate,setIdToUpdate] = useState('');
const [openUpdate, setOpenUpdate] = useState(false);
const handleClickOpenUpdate = (id) =>  {
  
  setOpenUpdate(true);
  setIdToUpdate(id)


};
const handleCloseUpdate = () => setOpenUpdate(false);


const updateJob = useSelector((state)=>state.update.data);
console.log(updateJob);

const[update, setUpdate]=useState({
  jobType : updateJob.jobType,
  maxApplicants : updateJob.maxApplicants,
  maxPositions : updateJob.maxPositions
});

useEffect(() => {
  dis (GetUpdateRequest(idToUpdate))
},[idToUpdate])

useEffect(() => {
  setUpdate(updateJob)
},[updateJob])

const handleInput = (key, value) => {
  setUpdate({
    ...update,
    [key]: value,
  });};
  
const handleUpdate =(e)=>{
  e.preventDefault()
  dis (PutUpdateRequest({...update,_id:idToUpdate}));
  toast.success("Updated Successfully!")
  handleCloseUpdate()
    
}

const clearAll = () => {
  dis(getJobRequest(1));
}

// View Applications---------->

const navi = useNavigate();
const viewApplicationHandleSubmit = (id) =>  {
    
  console.log(id)
  navi('/recruiter/applications/'+ id); 

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
  salary: [0, 0],
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
    <>
      <Container>
        
          <Box className="breadcrumb">
            <Breadcrumb
              routeSegments={[{ name: 'Recruiter', path: '/recruiter/listJobs' }, { name: 'My Jobs' }]}
            />
          </Box>

          <Grid item container direction="column" justify="center" alignItems="center" >
            <Grid item xs sx={{ mb: 2 }}>
              <Typography variant="h3">My Jobs</Typography>
            </Grid>
            <Grid item xs>
              <TextField
                label="Search Jobs"
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
                onBlur={handleSearch}
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
        getData = {advancedhandleSearch}
      />

          {listData.length > 0 ? (
            listData?.map((v) => {
              return (
                <Card sx={{ minWidth: 270, margin: '25px', background: '#E8E8E8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {v.title}
                      </Typography>

                      <Typography gutterBottom variant="h6" component="div">
                        <Rating value={v.rating !== -1 ? v.rating : null} readOnly />
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Date: {(new Date(v.dateOfPosting)).toLocaleDateString()}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Duration :{v.duration !== 0 ? `${v.duration} month` : `Flexible`}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        {v.role}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Job Type : {v.jobType}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Salary : &#8377; {v.salary}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Number of Applicants: {v.maxApplicants}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Remaining Number of Positions: {v.maxPositions - v.acceptedCandidates}
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
                          padding: '71px 68px',
                          borderRadius: '5px',
                          border: 'none',
                        
                        }}
                        size="small"
                        onClick={() => {viewApplicationHandleSubmit(v._id)}}
                      >
                        View Application
                      </Button>
                    
                      <Button
                        style={{
                          backgroundColor: 'rgb(252, 143, 30)',
                          color: 'white',
                          margin: '0px 0px',
                          padding: '8px 0px',
                          borderRadius: '5px',    
                          border: 'none'
                        }}
                        size="small"
                        onClick={() =>{handleClickOpenUpdate(v._id)}}
                      >
                        Update Details
                      </Button>
                      <Button
                        style={{
                          backgroundColor: '#f50057',
                          color: 'white',
                          margin: '0px 0px',                         
                          padding: '8px 0px',
                          borderRadius: '5px',
                          border: 'none'
                        }}
                        size="small"
                        onClick={()=>{ handleClickOpenDelete(v._id) }}
                      >
                        Delete 
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
        
        {/*Delete Pop Up-----------------> */}

        <Dialog
          open={openDelete}
          keepMounted
          onClose={handleCloseDelete}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle variant="h4" align="center">
            Are You Sure?
          </DialogTitle>
          <DialogActions>
            <Button
              style={{
                backgroundColor: '#f50057',
                color: 'white',
                margin: '20px',
                padding: '11px 60px',
                borderRadius: '7px',
                border: 'none'
              }}
              size="small"
              onClick={handleDelete}
            >
              DELETE
            </Button>
            <Button
              style={{
                backgroundColor: 'rgb(34 42 68)',
                color: 'white',
                margin: '0px 0px',
                padding: '11px 60px',
                borderRadius: '7px',
                border: 'none'
              }}
              size="small"
              onClick={handleCloseDelete}
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog> 

        {/* /delete popup end-------------> */}

        {/* /Update Popup Start----------> */}
        <Dialog
         
          open={openUpdate}
          keepMounted
          onClose={handleCloseUpdate}
          aria-describedby="alert-dialog-slide-description"
          style={{ padding: '0px 24px' }}
        >
          <DialogTitle variant="h4" align="center" style={{ padding: '35px 157px' }}>
            Update Details
          </DialogTitle>
          <TextField
            label="Job Type"
            type="text"
            value={update?.jobType}
            onChange={(event) =>
              handleInput("jobType", event.target.value)
            }
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            style={{ marginBottom: '10px', margin:"10px 15px" }}
          />
          <TextField
            label="Maximum Number Of Applicants"
            type="number"
            value={update?.maxApplicants}
            onChange={(event) =>
              handleInput("maxApplicants", event.target.value)
            }
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            InputProps={{ inputProps: { min: 1 } }}
            style={{ marginBottom: '10px',margin:"10px 15px"}}
          />
          <TextField
            label="Positions Available"
            type="number"
            value={update?.maxPositions}
            onChange={(event) =>
              handleInput("maxPositions", event.target.value)
            }
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            InputProps={{ inputProps: { min: 1 } }}
            style={{ marginBottom: '10px',margin:"10px 15px" }}
          />

          <DialogActions style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              style={{
                backgroundColor: '#f50057',
                color: 'white',
                margin: '19px',
                padding: '11px 60px',
                borderRadius: '7px',
                border: 'none'
              }}
              size="small"
              onClick={handleUpdate}
            >
              UPDATE
            </Button>
            <Button
              style={{
                backgroundColor: 'rgb(34 42 68)',
                color: 'white',
                margin: '0px 0px',
                padding: '11px 60px',
                borderRadius: '7px',
                border: 'none'
              }}
              size="small"
              onClick={handleCloseUpdate}
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      
      </Container>
    </>
  );
}



export default ListJob;
