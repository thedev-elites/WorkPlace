import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Check, ArrowRight, X } from 'lucide-react';
import PageTransition from '@/components/ui-components/PageTransition';
import GlassCard from '@/components/ui-components/GlassCard';
import Button from '@/components/ui-components/Button';
import Input from '@/components/ui-components/Input';
import Navbar from '@/components/layout/Navbar';
import { api, Job } from '@/services/api';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { isAuthenticated, user, login } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await api.jobs.getAll();
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to load jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Filter jobs based on search query and selected filter
    let result = [...jobs];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        job => 
          job.title.toLowerCase().includes(query) || 
          job.company.toLowerCase().includes(query) || 
          job.location.toLowerCase().includes(query)
      );
    }
    
    // Apply job type filter
    if (selectedFilter !== 'all') {
      result = result.filter(job => job.type.toLowerCase() === selectedFilter.toLowerCase());
    }
    
    setFilteredJobs(result);
  }, [searchQuery, selectedFilter, jobs]);

  const handleApply = async (jobId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to apply for jobs');
      return;
    }
    
    try {
      toast.loading('Submitting your application...', { id: 'apply' });
      const result = await api.autoApply.apply(jobId);
      toast.dismiss('apply');
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.dismiss('apply');
      toast.error('Something went wrong. Please try again later.');
    }
  };

  // Function to handle job card click
  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  // Function to close the job details modal
  const closeJobModal = () => {
    setSelectedJob(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-blue-light/20 to-background pb-20">
        <Navbar />
        
        <div className="container mx-auto px-4 md:px-6 pt-28">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Job Dashboard</h1>
            {isAuthenticated && user ? (
              <p className="text-muted-foreground">
                Welcome, {user.name}! Find and apply to your next opportunity with a single click.
              </p>
            ) : (
              <p className="text-muted-foreground">
                Find and apply to your next opportunity with a single click.
              </p>
            )}
          </div>
          
          {!isAuthenticated && (
            <GlassCard className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Get the full experience</h3>
                <p className="text-muted-foreground">Sign in to apply to jobs and track your applications.</p>
              </div>
              <Button onClick={() => login()}>
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </GlassCard>
          )}
          
          {/* Search and filter section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title, company, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant={selectedFilter === 'all' ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                >
                  All Jobs
                </Button>
                <Button 
                  variant={selectedFilter === 'full-time' ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => setSelectedFilter('full-time')}
                >
                  Full-time
                </Button>
                <Button 
                  variant={selectedFilter === 'part-time' ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => setSelectedFilter('part-time')}
                >
                  Part-time
                </Button>
                <Button 
                  variant={selectedFilter === 'internship' ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => setSelectedFilter('internship')}
                >
                  Internship
                </Button>
                <Button 
                  variant={selectedFilter === 'contract' ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => setSelectedFilter('contract')}
                >
                  Contract
                </Button>
              </div>
            </div>
          </div>
          
          {/* Job listings */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-64 bg-card/50 animate-pulse rounded-xl"></div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <GlassCard 
                    key={job.id} 
                    className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    onClick={() => handleJobClick(job)}
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <p className="text-blue font-medium">{job.company}</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-light text-blue text-xs font-medium rounded-full">
                          {job.applicationStatus || job.type}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-muted-foreground text-sm mb-1">{job.location}</p>
                        <p className="text-foreground font-medium">{job.salary}</p>
                        {job.experienceRequired && (
                          <p className="text-muted-foreground text-sm mt-1">
                            Experience: {job.experienceRequired}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {job.description}
                      </p>
                      <div className="space-y-1 mb-4">
                        {job.requirements.slice(0, 2).map((req, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-blue mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground line-clamp-1">{req}</span>
                          </div>
                        ))}
                        {job.requirements.length > 2 && (
                          <p className="text-xs text-muted-foreground ml-6">
                            +{job.requirements.length - 2} more requirements
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {job.postedDate && job.postedDate.includes('ago') 
                          ? `Posted ${job.postedDate}`
                          : `Posted ${job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'recently'}`}
                      </span>
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering card click
                          job.jobUrl ? window.open(job.jobUrl, '_blank') : handleApply(job.id);
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We couldn't find any jobs matching your search criteria. Try adjusting your filters or search query.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                  <p className="text-blue font-medium">{selectedJob.company}</p>
                </div>
                <button 
                  onClick={closeJobModal}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Location</span>
                  <span className="font-medium">{selectedJob.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Job Type</span>
                  <span className="font-medium">{selectedJob.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Salary</span>
                  <span className="font-medium">{selectedJob.salary}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <div className="text-muted-foreground whitespace-pre-line">
                  {selectedJob.description}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="list-none space-y-2">
                  {selectedJob.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedJob.responsibilities && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                  <div className="text-muted-foreground whitespace-pre-line">
                    {selectedJob.responsibilities}
                  </div>
                </div>
              )}

              <div className="flex justify-end border-t border-gray-200 pt-4 mt-6">
                <Button
                  size="lg"
                  onClick={() => {
                    selectedJob.jobUrl ? window.open(selectedJob.jobUrl, '_blank') : handleApply(selectedJob.id);
                    closeJobModal();
                  }}
                >
                  Apply for this position
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default Dashboard;
