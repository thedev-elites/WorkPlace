
import React, { useState, useEffect } from 'react';
import { Plus, Trash, Save } from 'lucide-react';
import PageTransition from '@/components/ui-components/PageTransition';
import GlassCard from '@/components/ui-components/GlassCard';
import Button from '@/components/ui-components/Button';
import Input from '@/components/ui-components/Input';
import Navbar from '@/components/layout/Navbar';
import { api, Resume } from '@/services/api';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const ResumeBuilder = () => {
  const [resume, setResume] = useState<Resume>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    skills: [],
    experience: [],
    education: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const resumeData = await api.resume.get();
        setResume(resumeData);
      } catch (error) {
        console.error('Error fetching resume:', error);
        toast.error('Failed to load resume data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, []);

  const handleSaveResume = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save your resume');
      return;
    }
    
    setIsSaving(true);
    
    try {
      await api.resume.save(resume);
      toast.success('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume. Please try again later.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResume(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() === '') return;
    setResume(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill('');
  };

  const removeSkill = (index: number) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }
      ]
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: '', institution: '', location: '', graduationDate: '', gpa: '' }
      ]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-subtle">Loading resume data...</div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-blue-light/20 to-background pb-20">
        <Navbar />
        
        <div className="container mx-auto px-4 md:px-6 pt-28">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Resume Builder</h1>
              <p className="text-muted-foreground max-w-2xl">
                Create a professional resume that highlights your skills and experience. Your resume will be used to automatically apply to jobs.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              {isAuthenticated ? (
                <Button 
                  onClick={handleSaveResume} 
                  isLoading={isSaving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Resume
                </Button>
              ) : (
                <Button onClick={login}>
                  Sign In to Save
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="md:col-span-2 space-y-6">
              {/* Personal Information */}
              <GlassCard>
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={resume.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={resume.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    value={resume.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                  <Input
                    label="Location"
                    name="address"
                    value={resume.address}
                    onChange={handleChange}
                    placeholder="San Francisco, CA"
                  />
                </div>
              </GlassCard>
              
              {/* Professional Summary */}
              <GlassCard>
                <h2 className="text-xl font-semibold mb-6">Professional Summary</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Summary
                    </label>
                    <textarea
                      name="summary"
                      rows={4}
                      className="input-field w-full"
                      value={resume.summary}
                      onChange={handleChange}
                      placeholder="Summarize your professional background and key strengths..."
                    />
                  </div>
                </div>
              </GlassCard>
              
              {/* Skills */}
              <GlassCard>
                <h2 className="text-xl font-semibold mb-6">Skills</h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      containerClassName="flex-1"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill (e.g., JavaScript)"
                      onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill}>
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {resume.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-2 px-3 py-1 bg-blue-light rounded-full"
                      >
                        <span className="text-blue-dark text-sm">{skill}</span>
                        <button 
                          onClick={() => removeSkill(index)} 
                          className="text-blue-dark hover:text-blue transition-colors"
                        >
                          <Trash className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {resume.skills.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No skills added yet. Add skills to increase your chances of getting matched with relevant jobs.
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>
              
              {/* Work Experience */}
              <GlassCard>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Work Experience</h2>
                  <Button variant="outline" size="sm" onClick={addExperience}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Position
                  </Button>
                </div>
                
                {resume.experience.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-muted rounded-lg">
                    <p className="text-muted-foreground">No work experience added yet.</p>
                    <Button variant="ghost" size="sm" onClick={addExperience} className="mt-2">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Work Experience
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {resume.experience.map((exp, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between mb-4">
                          <h3 className="font-medium">Position #{index + 1}</h3>
                          <button 
                            onClick={() => removeExperience(index)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Job Title"
                            value={exp.title}
                            onChange={(e) => updateExperience(index, 'title', e.target.value)}
                            placeholder="Senior Frontend Developer"
                          />
                          <Input
                            label="Company"
                            value={exp.company}
                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            placeholder="Acme Inc."
                          />
                          <Input
                            label="Location"
                            value={exp.location}
                            onChange={(e) => updateExperience(index, 'location', e.target.value)}
                            placeholder="San Francisco, CA"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              label="Start Date"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                              placeholder="MM/YYYY"
                            />
                            <Input
                              label="End Date"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                              placeholder="MM/YYYY or Present"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            className="input-field w-full"
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
              
              {/* Education */}
              <GlassCard>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Education</h2>
                  <Button variant="outline" size="sm" onClick={addEducation}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Education
                  </Button>
                </div>
                
                {resume.education.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-muted rounded-lg">
                    <p className="text-muted-foreground">No education added yet.</p>
                    <Button variant="ghost" size="sm" onClick={addEducation} className="mt-2">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Education
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {resume.education.map((edu, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between mb-4">
                          <h3 className="font-medium">Education #{index + 1}</h3>
                          <button 
                            onClick={() => removeEducation(index)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Degree"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            placeholder="B.S. Computer Science"
                          />
                          <Input
                            label="Institution"
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            placeholder="University of California, Berkeley"
                          />
                          <Input
                            label="Location"
                            value={edu.location}
                            onChange={(e) => updateEducation(index, 'location', e.target.value)}
                            placeholder="Berkeley, CA"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              label="Graduation Date"
                              value={edu.graduationDate}
                              onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                              placeholder="MM/YYYY"
                            />
                            <Input
                              label="GPA (Optional)"
                              value={edu.gpa || ''}
                              onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                              placeholder="e.g., 3.8"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
            
            {/* Preview Section */}
            <div className="md:col-span-1">
              <div className="sticky top-28">
                <GlassCard>
                  <h2 className="text-xl font-semibold mb-6">Resume Preview</h2>
                  <div className="space-y-6 max-h-[70vh] overflow-auto p-4 bg-white rounded-lg shadow-inner">
                    {/* Personal Info */}
                    <div className="text-center border-b border-border pb-4">
                      <h2 className="text-2xl font-bold text-blue">{resume.fullName || 'Your Name'}</h2>
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        {resume.email && <p>{resume.email}</p>}
                        {resume.phone && <p>{resume.phone}</p>}
                        {resume.address && <p>{resume.address}</p>}
                      </div>
                    </div>
                    
                    {/* Summary */}
                    {resume.summary && (
                      <div>
                        <h3 className="text-md font-semibold border-b border-border pb-1 mb-2">SUMMARY</h3>
                        <p className="text-sm">{resume.summary}</p>
                      </div>
                    )}
                    
                    {/* Skills */}
                    {resume.skills.length > 0 && (
                      <div>
                        <h3 className="text-md font-semibold border-b border-border pb-1 mb-2">SKILLS</h3>
                        <div className="flex flex-wrap gap-1 text-sm">
                          {resume.skills.join(' • ')}
                        </div>
                      </div>
                    )}
                    
                    {/* Experience */}
                    {resume.experience.length > 0 && (
                      <div>
                        <h3 className="text-md font-semibold border-b border-border pb-1 mb-2">EXPERIENCE</h3>
                        <div className="space-y-4">
                          {resume.experience.map((exp, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex justify-between">
                                <strong>{exp.title}</strong>
                                <span className="text-muted-foreground">
                                  {exp.startDate} - {exp.endDate}
                                </span>
                              </div>
                              <div className="text-blue">{exp.company}{exp.location && `, ${exp.location}`}</div>
                              <p className="mt-1 text-muted-foreground">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Education */}
                    {resume.education.length > 0 && (
                      <div>
                        <h3 className="text-md font-semibold border-b border-border pb-1 mb-2">EDUCATION</h3>
                        <div className="space-y-4">
                          {resume.education.map((edu, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex justify-between">
                                <strong>{edu.degree}</strong>
                                <span className="text-muted-foreground">{edu.graduationDate}</span>
                              </div>
                              <div className="text-blue">{edu.institution}{edu.location && `, ${edu.location}`}</div>
                              {edu.gpa && <p className="mt-1 text-muted-foreground">GPA: {edu.gpa}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {!resume.fullName && !resume.summary && resume.skills.length === 0 && resume.experience.length === 0 && resume.education.length === 0 && (
                      <div className="text-center py-10">
                        <p className="text-muted-foreground">
                          Your resume preview will appear here as you fill in the form.
                        </p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResumeBuilder;
