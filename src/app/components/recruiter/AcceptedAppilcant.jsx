import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Breadcrumb } from 'app/components';
import { Box,Grid , Typography,
  Button,
  IconButton,
  Paper,
  Modal,
  Checkbox,
  CardContent,
  Rating,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import makeStyles from '@emotion/styled'
import styled from '@emotion/styled';
import { GetAdvancedSearchEmployeeRequest, GetApplicantUserDataRequest, GetEndJobDataRequest, GetRatingJobRequest, PutRatingJobRequest } from 'slice/applicant/profileUpdateSlice';
import { toast } from 'react-toastify';


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
    statusBlock: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textTransform: "uppercase",
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
    avatar: {
      width: theme.spacing(17),
      height: theme.spacing(17),
    },
  }));

  

  
  const FilterPopup = (props) => {
    const classes = useStyles();
    const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
    return (
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
  
            padding: "50px",
            outline:"none",
            minwidth:"43%",
            height:"40%",
            margin: "103px 181px -4px 380px"
               
        
          }}
        >
          <Grid container direction="column" alignItems="center" spacing={3}>
           
            <Grid container item alignItems="center">
              <Grid item xs={3}>
                Sort
              </Grid>
              <Grid item container direction="row" xs={9}>
                <Grid
                  item
                  container
                  xs={6}
                  justify="space-around"
                  alignItems="center"
                  style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
                >
                  <Grid item>
                    <Checkbox
                      name="name"
                      checked={searchOptions.sort["jobApplicant.name"].status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            "jobApplicant.name": {
                              ...searchOptions.sort["jobApplicant.name"],
                              status: event.target.checked,
                            },
                          },
                        })
                      }
                      id="name"
                    />
                  </Grid>
                  <Grid item>
                    <label for="name">
                      <Typography>Name</Typography>
                    </label>
                  </Grid>
                  <Grid item>
                    <IconButton
                      disabled={!searchOptions.sort["jobApplicant.name"].status}
                      onClick={() => {
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            "jobApplicant.name": {
                              ...searchOptions.sort["jobApplicant.name"],
                              desc: !searchOptions.sort["jobApplicant.name"].desc,
                            },
                          },
                        });
                      }}
                    >
                      {searchOptions.sort["jobApplicant.name"].desc ? (
                        <ArrowDownwardIcon />
                      ) : (
                        <ArrowUpwardIcon />
                      )}
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  justify="space-around"
                  alignItems="center"
                  style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
                >
                  <Grid item>
                    <Checkbox
                      name="jobTitle"
                      checked={searchOptions.sort["job.title"].status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            "job.title": {
                              ...searchOptions.sort["job.title"],
                              status: event.target.checked,
                            },
                          },
                        })
                      }
                      id="jobTitle"
                    />
                  </Grid>
                  <Grid item>
                    <label for="jobTitle">
                      <Typography>Job Title</Typography>
                    </label>
                  </Grid>
                  <Grid item>
                    <IconButton
                      disabled={!searchOptions.sort["job.title"].status}
                      onClick={() => {
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            "job.title": {
                              ...searchOptions.sort["job.title"],
                              desc: !searchOptions.sort["job.title"].desc,
                            },
                          },
                        });
                      }}
                    >
                      {searchOptions.sort["job.title"].desc ? (
                        <ArrowDownwardIcon />
                      ) : (
                        <ArrowUpwardIcon />
                      )}
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  justify="space-around"
                  alignItems="center"
                  style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
                >
                  <Grid item>
                    <Checkbox
                      name="dateOfJoining"
                      checked={searchOptions.sort.dateOfJoining.status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            dateOfJoining: {
                              ...searchOptions.sort.dateOfJoining,
                              status: event.target.checked,
                            },
                          },
                        })
                      }
                      id="dateOfJoining"
                    />
                  </Grid>
                  <Grid item>
                    <label for="dateOfJoining">
                      <Typography>Date of Joining</Typography>
                    </label>
                  </Grid>
                  <Grid item>
                    <IconButton
                      disabled={!searchOptions.sort.dateOfJoining.status}
                      onClick={() => {
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            dateOfJoining: {
                              ...searchOptions.sort.dateOfJoining,
                              desc: !searchOptions.sort.dateOfJoining.desc,
                            },
                          },
                        });
                      }}
                    >
                      {searchOptions.sort.dateOfJoining.desc ? (
                        <ArrowDownwardIcon />
                      ) : (
                        <ArrowUpwardIcon />
                      )}
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  justify="space-around"
                  alignItems="center"
                  style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
                >
                  <Grid item>
                    <Checkbox
                      name="rating"
                      checked={searchOptions.sort["jobApplicant.rating"].status}
                      onChange={(event) =>
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            "jobApplicant.rating": {
                              ...searchOptions.sort[["jobApplicant.rating"]],
                              status: event.target.checked,
                            },
                          },
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
                      disabled={!searchOptions.sort["jobApplicant.rating"].status}
                      onClick={() => {
                        setSearchOptions({
                          ...searchOptions,
                          sort: {
                            ...searchOptions.sort,
                            "jobApplicant.rating": {
                              ...searchOptions.sort["jobApplicant.rating"],
                              desc: !searchOptions.sort["jobApplicant.rating"]
                                .desc,
                            },
                          },
                        });
                      }}
                    >
                      {searchOptions.sort["jobApplicant.rating"].desc ? (
                        <ArrowDownwardIcon />
                      ) : (
                        <ArrowUpwardIcon />
                      )}
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
  
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() =>{ getData(); handleClose()}}
              >
                Apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    );
  };
  
export const AcceptedApplicant = () => {

    const {listData} =  useSelector((state) => state.profileApplicant)

    console.log(listData)

    const dis = useDispatch();

    const[user,setUser] = useState('')

    useEffect(() => {
        setUser(listData)
    },[])

    useEffect(() => {
        dis(GetApplicantUserDataRequest(user))
    },[user])

    //Advanced Seacrh popup---------->

const AdvancedSearchPopup = () => {

  dis(GetAdvancedSearchEmployeeRequest({
    ...searchOptions,
  
  }))
}

// End Job popup state--------------->
const[idToEndJob, setIdToEndJob] = useState("")
const [openEndJob, setOpenEndJob] = useState(false);
const handleOpenEndJob = (id) => { 

  setIdToEndJob(id)
  setOpenEndJob(true)
};

const handleCloseEndJob = () => {
  setOpenEndJob(false);
};

const updateStatus = () => {
dis(GetEndJobDataRequest({
  status : "finished",
  dateOfJoining : new Date().toLocaleDateString(),
  id : idToEndJob
}));
setUser(listData)
handleCloseEndJob()
}


// rating job------------->

const[idToUpdate,setIdToUpdate] = useState();
const [open, setOpen] = useState(false);
const[rating,setRating] = useState();

const handleClose = () => {setOpen(false)}

const handleClickOpenRating = (id,rating) =>  {
  
  setOpen(true);
  setRating(rating)
  setIdToUpdate(id)

};
const updateRating = useSelector((y) => y.profileApplicant.data)
console.log(updateRating)

const changeRating = (e) => {
    e.preventDefault()
    dis (PutRatingJobRequest({
      rating : rating, applicantId: idToUpdate}));
    toast.success("Rating updated successfully!")
    handleClose();
    setUser(listData)
}



//Filter Popup state--------> 

    const [filterOpen, setFilterOpen] = useState(false);
    const [searchOptions, setSearchOptions] = useState({
      sort: {
        "jobApplicant.name": {
          status: false,
          desc: false,
        },
        "job.title": {
          status: false,
          desc: false,
        },
        dateOfJoining: {
          status: true,
          desc: true,
        },
        "jobApplicant.rating": {
          status: false,
          desc: false,
        },
      },
    });

    
  return (
    <>
    <Container >
         <Box style={{marginTop:"15px"}} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Recruiter', path: '/recruiter/acceptedapplicant' }, { name: 'Employees' }]} />
      </Box>
      <Grid item >
        <Typography variant="h4" style={{display:'flex', justifyContent:'center'}}>Employees</Typography>
      </Grid>
      <Grid item style={{display:'flex', justifyContent:'center'}}> 
              <IconButton>
                <FilterListIcon onClick={() => setFilterOpen(true)} />
              </IconButton>
              <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
         getData={AdvancedSearchPopup}
        />
        </Grid>
      
         <Grid>
          
         {listData.length > 0 ? (
            listData?.map((v) => {
              return (
                <Card sx={{ minWidth: 270, margin: '20px' }} >
                
                  <div style={{ display: 'flex', justifyContent: 'space-between',backgroundColor : "#E8E8E8", marginTop : "30px", width : "100%", borderRadius : "10px", }}>
                                     
                    <CardContent>
                    <div style={{display : "flex", gap : "20px"}}>
                    <div>
                    <Typography>
                        <AccountCircleIcon style={{fontSize : "140px" ,color : " rgb(182 178 178)"}} />
                      </Typography>
                    </div>
                    <div>
                      <Typography gutterBottom variant="h6" component="div">
                        {v.jobApplicant.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                      <Rating value={v.jobApplicant.rating !== -1? v.jobApplicant.rating : null}readOnly/>
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Job Title : {v.job.title}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Role : {v.job.jobType}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Applied On : {(new Date(v.job.deadline)).toLocaleDateString()}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                      SOP : {v.sop !== "" ? v.sop : "Not Submitted"}
                      </Typography>
                      </div>
                </div>
                     
                      </CardContent>
                <CardContent style={{ display: 'grid', margin: "20px"}}>
      <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{padding : "7px 75px",marginTop : "-15px"}}
              // onClick={() => getResume()}
            >
              Download Resume
            </Button>
          </Grid>
          <Grid item container xs style={{width : "280px"}}>
            
            <Button
              variant="contained"
              color="primary"
              style={{
                background: "#09BC8A",
                padding : "35px 110px"
              }}
              onClick={()=>{ handleOpenEndJob(v._id) }}>
              End Job
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{padding : "7px 88px",marginBottom : "-15px"}}
              onClick={() => {
                handleClickOpenRating(v.userId, v.jobApplicant.rating)
              }}
          
            >
              Rate Applicant
            </Button>
          </Grid>
              
                </CardContent>
                  </div>
                      
                </Card>
            
            
            );
            })
            ) : (
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                No Applicant Found
              </Typography>
            )}
          
           
       </Grid>
         
  {/*Delete Pop Up-----------------> */}

  <Dialog style={{marginLeft :"240px"}}
         open={openEndJob} onClose={handleCloseEndJob}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle variant="h5" align="center">
            Are You Sure?
          </DialogTitle>
          <DialogActions style={{marginTop :"-24px",marginRight : "17px"}}>
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
              onClick={() => {
                updateStatus();
                
              }}
            >
              YES
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
              onClick={() => handleCloseEndJob()}
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog> 

        {/* /delete popup end-------------> */}
      
      {/* //Rating Pop Up --------------> */}
      
      <Modal open={open} onClose={handleClose} >
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
            margin: "203px 578px"
          }}
        >
          <Rating
            name="simple-controlled"
            style={{ marginBottom: "30px" }}
            value={rating === -1 ? null : rating}
            onChange={(event, newValue) => {
              setRating(newValue);
              
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px" }}
            onClick={changeRating}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Container>
    </>
  )
}
