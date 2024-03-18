import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
  Rating,

} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, styled } from '@mui/material';
import makeStyles from '@emotion/styled';
import { Breadcrumb } from "..";
import { useDispatch, useSelector } from "react-redux";
import { GetApplicationsDataRequest } from "slice/applicant/profileUpdateSlice";


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
}));

const colorSet = {
  applied: "#3454D1",
  shortlisted: "#DC851F",
  accepted: "#09BC8A",
  rejected: "#D1345B",
  deleted: "#B49A67",
  cancelled: "#FF8484",
  finished: "#4EA5D9",
};

export const Applications = () => {
  const classes = useStyles();  
  const {listData} =  useSelector((state) => state.profileApplicant)

    console.log(listData)

    const dis = useDispatch();

    const[application,setApplication] = useState('')

    useEffect(() => {
      setApplication(listData)
    },[])

    useEffect(() => {
        dis(GetApplicationsDataRequest(application))
    },[application])
  
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState();
  
  return (
    <Container>
      <div>
     <Box style={{marginTop:"15px"}} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Applicant', path: '/applicant/appliactions' }, { name: 'Applications' }]} />
      </Box>
    
    <Grid
    container
    item
    direction="column"
    alignItems="center"
    style={{ padding: "12px", minHeight: "93vh" }}
  >
    <Grid item>
      <Typography variant="h3">Applications</Typography>
    </Grid>
    <Grid
      container
      item
      xs
      direction="column"
      style={{ width: "100%" }}
      alignItems="stretch"
      justify="center"
    >
       {listData?.length > 0 ? (
     listData?.map((v) => {
              return (
                <Card sx={{ minWidth: 270, margin: '20px' }} >
                
                  <div style={{ display: 'flex', justifyContent: 'space-between',backgroundColor : "#E8E8E8", width : "100%", borderRadius : "10px", }}>
                                     
                    <CardContent>                 
                  
                      <Typography gutterBottom variant="h6" component="div">
                        {v.job.title}
                      </Typography>                     
                      <Typography gutterBottom variant="body" component="div">
                        Posted By : {v.recruiter.name}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Role : {v.job.jobType}
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Salary : &#8377; {v.job.salary} per month
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                       Duration :{" "} {v.job.duration !== 0 ? `${v.job.duration} month`: `Flexible`}
                      </Typography>
                      <Typography>
                      Applied On : {(new Date(v.dateOfApplication)).toLocaleDateString()}
                      {v.status === "accepted" || v.status === "finished" ? (
                      <Typography item>Joined On : {(new Date(v.dateOfJoining)).toLocaleDateString()}</Typography>
                      ) : null}
                     </Typography>
                     <Typography>
                     {v.job.skillsets.map((skill) => (<Chip label={skill} style={{ marginRight: "2px" }} />))}
                     </Typography>
                      </CardContent>
                <CardContent style={{ display: 'grid', margin: "20px"}}>
                <Grid item container direction="column" xs={3}>
            <Grid item xs style={{marginTop :"-10px"}}>
              <Paper
               style={{
                  background: colorSet[v.status],
                  color: "#ffffff",
                  width: "255px",
                  padding: "70px 87px",
                  textAlign :"center"
                                   
                }}
              >
                {v.status}
              </Paper>
            </Grid>
           <Grid item style={{marginBottom : "-50px"}}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.statusBlock}
                  onClick={() => {
                    setOpen(true);
                  }}
                  style={{padding: "10px 98px"}}
                >
                  Rate Job
                </Button>
              </Grid>
       
        </Grid>              
                </CardContent>
                  </div>
                      
                </Card>
            
            
            );
            })
          
           ):(
        <Typography variant="h5" style={{ textAlign: "center", marginTop:"20px" }}>
          No Applications Found
        </Typography>
      )}
    </Grid>
  </Grid>
  </div>
 </Container>
);
};
