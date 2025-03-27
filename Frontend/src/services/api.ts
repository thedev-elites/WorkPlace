// API service for interacting with the backend

import axios from 'axios';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  type: string;
  jobUrl?: string;
  applicationStatus?: string;
  companyLogo?: string;
  experienceRequired?: string;
  responsibilities?: string;
}

export interface Resume {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }[];
}

// Create axios instance
const apiClient = axios.create({
  baseURL: '/api',  // Using relative URL to avoid CORS issues
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor for global error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const api = {
  jobs: {
    getAll: async (): Promise<Job[]> => {
      try {
        const response = await apiClient.get('/jobs');
        console.log('Raw API response:', response.data);
        
        // Check the response structure
        const jobsData = response.data.data?.jobs || response.data.jobs || [];
        
        if (jobsData.length === 0) {
          console.log('No jobs found in response');
          return [];
        }
        
        // Transform the response data to match our Job interface
        return jobsData.map((job: any) => {
          // Extract requirements from detailed info if available
          const requirements = job.detailed_info?.detailed_sections?.['Skill(s) required']
            ? job.detailed_info.detailed_sections['Skill(s) required'].split('\n')
            : job.detailed_info?.detailed_sections?.['About the job']
              ? job.detailed_info.detailed_sections['About the job'].split('\n').filter((line: string) => line.trim() !== '')
              : [];
          
          // Extract description from detailed info if available
          const description = job.detailed_info?.detailed_sections?.['About the job'] || 
                             (job.detailed_info?.detailed_sections ? 'See details for more information' : 'No description available');

          return {
            id: job._id || job.id,
            title: job['Job Title'] || 'No Title',
            company: job['Company Name'] || 'No Company',
            location: job['Location'] || 'No Location',
            salary: job['Salary'] || 'Salary not specified',
            description: description,
            requirements: Array.isArray(requirements) ? requirements : 
                         (requirements ? [requirements] : []),
            postedDate: job.last_updated || job['Posted Time'] || new Date().toISOString(),
            type: job['Job Type'] || 'Full-time',
            jobUrl: job['Job URL'] || '',
            applicationStatus: job['Application Status'] || '',
            companyLogo: job['Company Logo'] || '',
            experienceRequired: job['Experience Required'] || '',
            responsibilities: job['Responsibilities'] || ''
          };
        });
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Return empty array instead of throwing to allow graceful UI handling
        return [];
      }
    },
    getById: async (id: string): Promise<Job | undefined> => {
      try {
        const response = await apiClient.get(`/jobs/${id}`);
        console.log('Job detail response:', response.data);
        
        // Check response structure
        const jobData = response.data.data?.job || response.data.job;
        
        if (!jobData) {
          console.log('No job found in response');
          return undefined;
        }
        
        // Extract requirements from detailed info if available
        const requirements = jobData.detailed_info?.detailed_sections?.['Skill(s) required']
          ? jobData.detailed_info.detailed_sections['Skill(s) required'].split('\n')
          : jobData.detailed_info?.detailed_sections?.['About the job']
            ? jobData.detailed_info.detailed_sections['About the job'].split('\n').filter((line: string) => line.trim() !== '')
            : [];
        
        // Extract description from detailed info if available
        const description = jobData.detailed_info?.detailed_sections?.['About the job'] || 
                           (jobData.detailed_info?.detailed_sections ? 'See details for more information' : 'No description available');
        
        return {
          id: jobData._id || jobData.id,
          title: jobData['Job Title'] || 'No Title',
          company: jobData['Company Name'] || 'No Company',
          location: jobData['Location'] || 'No Location',
          salary: jobData['Salary'] || 'Salary not specified',
          description: description,
          requirements: Array.isArray(requirements) ? requirements : 
                       (requirements ? [requirements] : []),
          postedDate: jobData.last_updated || jobData['Posted Time'] || new Date().toISOString(),
          type: jobData['Job Type'] || 'Full-time',
          jobUrl: jobData['Job URL'] || '',
          applicationStatus: jobData['Application Status'] || '',
          companyLogo: jobData['Company Logo'] || '',
          experienceRequired: jobData['Experience Required'] || '',
          responsibilities: jobData['Responsibilities'] || ''
        };
      } catch (error) {
        console.error(`Error fetching job with id ${id}:`, error);
        return undefined;
      }
    }
  },
  resume: {
    get: async (): Promise<Resume> => {
      // This would be replaced with a real API call
      const mockResume: Resume = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        address: 'San Francisco, CA',
        summary: 'Experienced software engineer with a passion for building user-friendly applications and solving complex problems.',
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'CSS', 'HTML', 'Git', 'REST APIs'],
        experience: [
          {
            title: 'Senior Frontend Developer',
            company: 'TechCorp',
            location: 'San Francisco, CA',
            startDate: '2020-06',
            endDate: 'Present',
            description: 'Lead frontend development for the company\'s flagship product. Implemented new features, improved performance, and mentored junior developers.'
          },
          {
            title: 'Frontend Developer',
            company: 'WebSolutions',
            location: 'San Francisco, CA',
            startDate: '2018-03',
            endDate: '2020-05',
            description: 'Developed responsive web applications using React and TypeScript. Collaborated with designers to implement pixel-perfect UIs.'
          }
        ],
        education: [
          {
            degree: 'B.S. Computer Science',
            institution: 'University of California, Berkeley',
            location: 'Berkeley, CA',
            graduationDate: '2018',
            gpa: '3.8'
          }
        ]
      };
      return mockResume;
    },
    save: async (resume: Resume): Promise<Resume> => {
      // This would be replaced with a real API call
      return resume;
    }
  },
  autoApply: {
    apply: async (jobId: string): Promise<{ success: boolean; message: string }> => {
      try {
        // In a real implementation, this would call the backend API
        // const response = await apiClient.post('/applications', { jobId });
        // return response.data;
        
        // For now, just simulate a successful response
        return {
          success: true,
          message: 'Your application has been submitted successfully!'
        };
      } catch (error) {
        console.error('Error applying to job:', error);
        return {
          success: false,
          message: 'Failed to submit application. Please try again later.'
        };
      }
    }
  }
};
