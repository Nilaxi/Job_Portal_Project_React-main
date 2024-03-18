

const applicantLogin = [
  { name: 'Dashboard', path: 'dashboard/default', icon: 'dashboard' },
  { name: 'Applicant', path: '/session/signupForApplicant',icon: 'dashboard' },  
  { name: 'Applicant Jobs', path: '/applicant/listjobapplicant',icon: 'assignment' },
  { name: 'Applicant Profile', path: '/applicant/profileapplicant',icon: 'person' },    
  { name: 'Applications', path: '/applicant/appliactions',icon: 'launch' },  
  
]
const userType = JSON.parse(localStorage.getItem('token')).type;
export const navigations = userType == 'recruiter'? [
  { name: 'Dashboard', path: 'dashboard/default', icon: 'dashboard' },
  { name: 'Recruiter Profile', path: '/recruiter/profile',icon: 'person' }, 
  { name: 'Jobs', path: '/recruiter/jobs', icon: 'workhistory'  },    
  { name: 'CreateJob', path: '/recruiter/createjob',icon: 'create' },
  { name: 'ListJobs', path: '/recruiter/listjobs', icon: 'assignment'  },
  { name: 'Employees', path: '/recruiter/acceptedapplicant', icon: 'badge'  },

] : applicantLogin;
