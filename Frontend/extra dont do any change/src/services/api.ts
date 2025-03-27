
// Mock data and API service

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
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

// Mock job data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a skilled Frontend Developer to join our team. The ideal candidate has experience with React, TypeScript, and modern CSS.',
    requirements: ['3+ years experience with React', 'TypeScript proficiency', 'Knowledge of modern CSS and responsive design'],
    postedDate: '2023-09-15',
    type: 'Full-time'
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    salary: '$90,000 - $120,000',
    description: 'Join our creative team as a UI/UX Designer to create beautiful, intuitive interfaces for our clients.',
    requirements: ['Proficiency with Figma', 'Understanding of user-centered design principles', 'Portfolio showcasing previous work'],
    postedDate: '2023-09-10',
    type: 'Full-time'
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'Remote',
    salary: '$130,000 - $160,000',
    description: 'We need a Backend Engineer with strong API design and database skills to help build our new platform.',
    requirements: ['Node.js expertise', 'Experience with SQL and NoSQL databases', 'API design and implementation'],
    postedDate: '2023-09-12',
    type: 'Full-time'
  },
  {
    id: '4',
    title: 'Data Scientist Intern',
    company: 'AILabs',
    location: 'Boston, MA',
    salary: '$25/hour',
    description: 'Exciting internship opportunity for a Data Science student to work on real machine learning projects.',
    requirements: ['Currently pursuing degree in Computer Science, Statistics, or related field', 'Knowledge of Python and data analysis libraries', 'Strong mathematical background'],
    postedDate: '2023-09-08',
    type: 'Internship'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Seattle, WA',
    salary: '$140,000 - $170,000',
    description: 'Looking for a DevOps Engineer to optimize our CI/CD pipelines and cloud infrastructure.',
    requirements: ['AWS certification', 'Experience with Docker and Kubernetes', 'Infrastructure as Code (Terraform/CloudFormation)'],
    postedDate: '2023-09-05',
    type: 'Full-time'
  },
  {
    id: '6',
    title: 'Product Manager',
    company: 'ProductWise',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    description: 'Join our product team to help define and build the future of our SaaS platform.',
    requirements: ['3+ years in product management', 'Experience with agile methodologies', 'Strong communication skills'],
    postedDate: '2023-09-11',
    type: 'Full-time'
  }
];

// Mock resume data
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

// API functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  jobs: {
    getAll: async (): Promise<Job[]> => {
      // Simulate API delay
      await delay(800);
      return [...mockJobs];
    },
    getById: async (id: string): Promise<Job | undefined> => {
      await delay(500);
      return mockJobs.find(job => job.id === id);
    }
  },
  resume: {
    get: async (): Promise<Resume> => {
      await delay(600);
      return { ...mockResume };
    },
    save: async (resume: Resume): Promise<Resume> => {
      await delay(800);
      return resume;
    }
  },
  autoApply: {
    apply: async (jobId: string): Promise<{ success: boolean; message: string }> => {
      await delay(1500);
      return {
        success: true,
        message: 'Your application has been submitted successfully!'
      };
    }
  }
};
