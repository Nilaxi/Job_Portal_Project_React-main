import React, { useState } from 'react'
import { Box,Grid , Typography,
  Button,
  IconButton,
  Paper,
  Modal,
  FormControlLabel,
  Checkbox,
  CardContent,
  Rating,
  CardActions,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Breadcrumb } from 'app/components'
import { useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import makeStyles from '@emotion/styled'
import { useEffect } from 'react'
import { ViewGetJobRequest, advancesearchviewgetJobrequest } from 'slice/recruiter/viewapplicantSlice';
import styled from '@emotion/styled';
import { Card } from 'react-bootstrap';




const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '15px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
  return (
    <Modal style={{display:'flex', justifyContent:'center'}} open={open} onClose={handleClose} className={classes.popupDialog}>
      <Paper
       style={{
           padding: '50px',
            outline: 'none',
            minWidth: '73%',
            height:'50%',
            margin:'150px 0px 0px 250px',
            
      }}
      >
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Application Status
            </Grid>
            <Grid
              container
              item
              xs={9}
              justify="space-around"
              // alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rejected"
                      checked={searchOptions.status.rejected}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          status: {
                            ...searchOptions.status,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Rejected"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="applied"
                      checked={searchOptions.status.applied}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          status: {
                            ...searchOptions.status,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Applied"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="shortlisted"
                      checked={searchOptions.status.shortlisted}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          status: {
                            ...searchOptions.status,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Shortlisted"
                />
              </Grid>
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
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="dateOfApplication"
                    checked={searchOptions.sort.dateOfApplication.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          dateOfApplication: {
                            ...searchOptions.sort.dateOfApplication,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="dateOfApplication"
                  />
                </Grid>
                <Grid item>
                  <label for="dateOfApplication">
                    <Typography>Date of Application</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.dateOfApplication.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          dateOfApplication: {
                            ...searchOptions.sort.dateOfApplication,
                            desc: !searchOptions.sort.dateOfApplication.desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort.dateOfApplication.desc ? (
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
                xs={4}
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
              onClick={() => {getData(); handleClose()}}>
              Apply
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

const colorSet = {
  applied: "#3454D1",
  shortlisted: "#DC851F",
  accepted: "#09BC8A",
  rejected: "#D1345B",
  deleted: "#B49A67",
  cancelled: "#FF8484",
  finished: "#4EA5D9",
};

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


// Button set--------------->

const buttonSet = {
  applied: (
    <>
    
      <Grid item xs >
      <div style={{display :"flex"}}>
        <Button
          
          style={{
            background: colorSet["shortlisted"],
            color: "#ffffff",
            width : "150px",
            height : "100px",
            padding : "40px 75px",
      
           
          }}
          // onClick={() => updateStatus("shortlisted")}
        >
          SHORTLIST
        </Button>
  
        <Button
          
          style={{
            background: colorSet["rejected"],
            color: "#ffffff",
            width : "150px",
            height : "100px",
            padding : "40px 75px",
        
          
          }}
          // onClick={() => updateStatus("rejected")}
        >
          REJECT
        </Button>
        </div>
      </Grid>
    
    </>
  ),
  shortlisted: (
    <>
      <Grid item xs>
        <div style={{display :"flex"}}>
        <Button
          
          style={{
            background: colorSet["accepted"],
            color: "#ffffff",
            width : "150px",
            height : "100px",
           padding : "40px 75px",
      
          }}
          // onClick={() => updateStatus("accepted")}
        >
          ACCEPT
        </Button>
      
        <Button
        
          style={{
            background: colorSet["rejected"],
            color: "#ffffff",
            width : "150px",
            height : "100px",
           padding : "40px 75px",
 
          }}
          // onClick={() => updateStatus("rejected")}
        >
          REJECT
        </Button>
        </div>
      </Grid>
    </>
  ),
  rejected: (
    <>
      <Grid item xs>
        <Paper
          
          style={{
            background: colorSet["rejected"],
            color: "#ffffff",
            width : "300px",
            height : "100px",
           padding : "40px 121px",

          }}
        >
          REJECTED
        </Paper>
      </Grid>
    </>
  ),
  accepted: (
    <>
      <Grid item xs>
        <Paper
          
          style={{
            background: colorSet["accepted"],
            color: "#ffffff",
            width : "300px",
            height : "100px",
           padding : "40px 121px",
          
          }}
        >
          ACCEPTED
        </Paper>
      </Grid>
    </>
  ),
  cancelled: (
    <>
      <Grid item xs>
        <Paper
      
          style={{
            background: colorSet["cancelled"],
            color: "#ffffff",
            width : "300px",
            height : "100px",
           padding : "40px 121px",
          
          }}
        >
          CANCELLED
        </Paper>
      </Grid>
    </>
  ),
  finished: (
    <>
      <Grid item xs>
        <Paper
          
          style={{
            background: colorSet["finished"],
            color: "#ffffff",
            width : "300px",
            height : "100px",
           padding : "40px 121px",
     
          }}
        >
          FINISHED
        </Paper>
      </Grid>
    </>
  ),
};

export const Applications = () => {

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    status: {
      all: false,
      applied: false,
      shortlisted: false,
    },
    sort: {
      "jobApplicant.name": {
        status: false,
        desc: false,
      },
      dateOfApplication: {
        status: true,
        desc: true,
      },
      "jobApplicant.rating": {
        status: false,
        desc: false,
      },
    },
  });

 
  const{id}=useParams()
  console.log(id)

  const [idtoShow,setIdToShow] = useState("");

  const {listData} = useSelector((y) => y.viewApplication);
  
  console.log(listData)

 const dis = useDispatch();

 useEffect(() => {
  
     dis(ViewGetJobRequest(id))
     
    
  },[idtoShow])

  // Advanced Search popup ------------->

  const advancedhandleSearch2 = ()=>{

    dis(advancesearchviewgetJobrequest({
      ...searchOptions,
       id : id,
    }));

    }



  return (
    <>
    <Container >
         <Box style={{marginTop:"15px"}} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Recruiter', path: '/recruiter/applications' }, { name: 'Application' }]} />
      </Box>
      <Grid item >
        <Typography variant="h4" style={{display:'flex', justifyContent:'center'}}>Application</Typography>
      </Grid>
      <Grid item style={{display:'flex', justifyContent:'center'}}> 
              <IconButton>
                <FilterListIcon onClick={() => setFilterOpen(true)} />
              </IconButton>
              </Grid>
      <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={advancedhandleSearch2}
      />
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
                        Applied On : {(new Date(v.dateOfApplication)).toLocaleDateString()}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                      Education :  {v.jobApplicant.education
                .map((edu) => {
                  return `${edu.institutionName} (${edu.startYear}-${
                    edu.endYear ? edu.endYear : "Ongoing"
                  })`;
                })
                .join(", ")}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                      SOP : {v.sop !== "" ? v.sop : "Not Submitted"}
                      </Typography>
                      </div>
                </div>
                     
                      </CardContent>
                <CardContent style={{ display: 'grid', margin: "20px"}}>
                  {/* <div style={{marginTop : "-5px"}}>
                    <div >
                      <Button style={{backgroundColor : "#3f51b5", color :"white",padding: "6px 75px", borderradius: "5px"}}>DOWNLOAD RESUME</Button>
                    </div>
                    <div style={{display : "flex"}}>
                      <div> 
                        <Button style={{background: "rgb(220, 133, 31)", color:"rgb(255, 255, 255)", padding :"30px 35px"}}>SHORTLIST</Button></div>
                      <div> 
                        <Button  style={{background: "rgb(209, 52, 91)", color:"rgb(255, 255, 255)", padding :"30px 46px"}}>REJECT</Button></div>
                    </div>
                  </div> */}
                   <Grid item container direction="column" xs={3}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              // onClick={() => getResume()}
              style={{backgroundColor : "#3f51b5", color :"white",padding: "6px 75px", borderradius: "5px", width : "300px",    margintop: "-18px"}}
            >
            DOWNLOAD RESUME
            </Button>
          </Grid>
          <Grid item container xs>
            {buttonSet[v.status]}
          </Grid>
        </Grid>
                </CardContent>
                  </div>
                      
                </Card>
            
            
            );
            })
          ) : (
            <Typography variant="h6" style={{ textAlign: 'center' }}>
              No jobs found
            </Typography>
          )}
         

      
    </Container>
    </>
  )
}