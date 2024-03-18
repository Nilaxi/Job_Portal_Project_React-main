
import { da } from 'date-fns/locale';
import authFetch, { authFetchGet } from 'service/recruiter/authfetch';

// Create & list job start------->

const createJob = (data) => {

    return authFetch("/api/jobs",'Post', data)
}

export const getJobData = (pageId) => {

    return authFetchGet(`/api/jobs?myjobs=${pageId}`, 'GET');
}

//job get ------>

export const JobGetData = (data) => {

    return authFetchGet(`/api/jobs`, 'GET',data);
}

//Search Job ------------>

export const getJobDataSearch = (obj) => {

    
    return authFetchGet(`/api/jobs?myjobs=${obj.pageNumber}&q=${obj.searchTerm}`, 'GET');
}

// Advanced job search------------>

export const getJobDataSearchAdvanced = (obj) => {

    // http://localhost:4444/api/jobs?myjobs=1&jobType=Full%20Time&jobType=Part%20Time&jobType=Work%20From%20Home&asc=salary&asc=duration&asc=rating

     let url =`/api/jobs?myjobs=${obj.pageNumber}`

    if(obj.jobType.fullTime)
    {
        url = url + "&jobType=" + "Full Time"
    }  
    if(obj.jobType.partTime)
    {
        url = url + "&jobType=" + "Part Time"
    }   
    if(obj.jobType.wfh)
    {
        url = url + "&jobType=" + "Work From Home"
    }    
    if(obj.salary && obj.salary.length> 0)
    {
        if(obj.salary[1] >0)
        {
        url = url + "&salaryMin=" + obj.salary[0]
        url = url + "&salaryMax=" + obj.salary[1]
        }
    }
    if(obj.duration && obj.duration != "0")
    {
        url = url + "&duration=" + obj.duration
    }
    if(obj.sort.salary)
    {
        if(obj.sort.salary.desc)
        {
        url = url + "&desc=" + "salary"
        }
        else
        {
            url = url + "&asc=" + "salary" 
        }
    }

    if(obj.sort.duration)
    {
        if(obj.sort.duration.desc)
        {
        url = url + "&desc=" + "duration"
        }
        else
        {
            url = url + "&asc=" + "duration" 
        }
    }

    if(obj.sort.rating)
    {
        if(obj.sort.rating.desc)
        {
        url = url + "&desc=" + "rating"
        }
        else
        {
            url = url + "&asc=" + "rating" 
        }
    }
    
    return authFetchGet(url, 'GET');
    
}


// Profile update ---------------->

export const PutUserData = (dataUser) => {

    return authFetch("/api/user",'Put', dataUser)
}

export const GetUserData = (data) => {

    return authFetchGet("/api/user",'GET', data)
}

// Profile Applicant update------------>


export const GetProfileAppliData = (dataUser) => {

    return authFetchGet("/api/user",'GET', dataUser)
}

export const PutProfileAppliData = (data) => {

    return authFetch("/api/user",'PUT', data)
}


// Update List Data popup-------->

export const getJobUpdateData = (data) => {

    return authFetchGet("/api/jobs/"+data,'GET');
}
export const putJobUpdateData = (data) => {

    return authFetch(`/api/jobs/${data._id}`,'Put',data)
}


//Delete list Data popup ------------->

export const deleteJobData = (id) => {

    return authFetchGet(`/api/jobs/${id}`, 'DELETE');
}


// Veiw Application--------------->

export const ViewApplications =(id) =>
{

    return authFetchGet(`/api/applicants?jobId=${id}&desc=dateOfApplication`,'GET')
}

// Filter popup  Advanced Search for Applicant-------------------->

export const advanceviewjobpoup = (obj) => {

    
// http://localhost:4444/api/applicants?jobId=65e99882ecfa9241bc51b1aa&status=rejected&status=applied&status=shortlisted&asc=jobApplicant.name&asc=jobApplicant.rating&desc=dateOfApplicatio

    let url =`/api/applicants?jobId=${obj.id}`

    if(obj.status.rejected)
    {
        url = url + "&status=" + "rejected"
    }  
    if(obj.status.accepted)
    {
        url = url + "&status=" + "Accepted"
    }  
    if(obj.status.shortlisted)
    {
        url = url + "&status=" + "shortlisted"
    }  
    if(obj.sort["jobApplicant.name"])
    {
        if(obj.sort["jobApplicant.name"].desc)
        {
        url = url + "&desc=" + "jobApplicant.name"
        }
        else
        {
            url = url + "&asc=" + "jobApplicant.name" 
        }
    }
    if(obj.sort["jobApplicant.rating"])
    {
        if(obj.sort["jobApplicant.rating"].desc)
        {
        url = url + "&desc=" + "jobApplicant.rating"
        }
        else
        {
            url = url + "&asc=" + "jobApplicant.rating" 
        }
    }
    if(obj.sort.dateOfApplication)
    {
        if(obj.sort.dateOfApplication.desc)
        {
        url = url + "&desc=" + "dateOfApplication"
        }
        else
        {
            url = url + "&asc=" + "dateOfApplication" 
        }
    }
    

    
    return authFetchGet(url, 'GET');
}


// View Employee Accepted Applicant Data--------------->

export const ViewEmployeeData =(obj) =>
{

    return authFetchGet(`/api/applicants?status=accepted&desc=${obj.deadline}`,'GET', obj)
}

//Advanced Search in view Employee  Data---------->

export const AdvancedSearchEmployee =(obj) =>
{
    // http://localhost:4444/api/applicants?status=accepted&asc=jobApplicant.name&asc=job.title&asc=jobApplicant.rating&desc=dateOfJoining

    let url = `/api/applicants?status=accepted`

     
     if(obj.sort["jobApplicant.name"])
    {
        if(obj.sort["jobApplicant.name"].desc)
        {
        url = url + "&asc=" + "jobApplicant.name"
        }
        else
        {
            url = url + "&asc=" + "jobApplicant.name" 
        }
    }

    if(obj.sort["job.title"])
    {
        if(obj.sort["job.title"].desc)
        {
        url = url + "&desc=" + "job.title"
        }
        else
        {
            url = url + "&asc=" + "job.title" 
        }
    }

    if(obj.sort.dateOfJoining)
    {
        if(obj.sort.dateOfJoining.desc)
        {
        url = url + "&desc=" + "dateOfJoining"
        }
        else
        {
            url = url + "&asc=" + "dateOfJoining" 
        }
    }
        if(obj.sort["jobApplicant.rating"])
        {
            if(obj.sort["jobApplicant.rating"].desc)
            {
                url = url + "&desc=" + "jobApplicant.rating"
            }
            else
            {
                url = url + "&asc=" + "jobApplicant.rating" 
            }
        }
       
        return authFetchGet(url, 'GET');
}

// Employees rate job update-------------->

export const PutRatingJobData = (data1) => {       
                
    return authFetch(`/api/rating`,'Put',data1) }

// Employees End job update-------------->

export const EndJobUpdate = (data) => {

    return authFetch(`/api/applications/${data.id}`,'Put',data)
}

// Applications Get Job Data------------->

export const ApplicationJobData = (data) => {
    return authFetchGet(`/api/applications`,'GET',data)}


export default createJob;