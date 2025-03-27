
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import GlassCard from '@/components/ui-components/GlassCard';
import PageTransition from '@/components/ui-components/PageTransition';
import Navbar from '@/components/layout/Navbar';

const LandingPage = () => {
  const animatedElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animation observer setup
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all animated elements
    animatedElementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  // Add to animation ref array helper
  const addToAnimationRefs = (el: HTMLDivElement | null) => {
    if (el && !animatedElementsRef.current.includes(el)) {
      animatedElementsRef.current.push(el);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-blue-light/30 to-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <div ref={addToAnimationRefs} className="animate-on-scroll">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Streamline Your <span className="text-blue">Job Search</span> with AI
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8">
                    CareerSync AI automates your job hunt by finding relevant positions, 
                    generating personalized cover letters, and applying on your behalf.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/signup">
                      <Button size="lg" className="w-full sm:w-auto">
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/dashboard">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        View Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2" ref={addToAnimationRefs}>
                <div className="animate-on-scroll">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue/10 rounded-full blur-3xl z-0"></div>
                    <div className="absolute -bottom-8 -right-8 w-80 h-80 bg-blue/5 rounded-full blur-3xl z-0"></div>
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src="https://res.cloudinary.com/chasiscoding/image/upload/v1693949924/dashboard-demo_xhfcge.png" 
                        alt="CareerSync AI Dashboard Preview" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16" ref={addToAnimationRefs}>
              <div className="animate-on-scroll">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Save time and maximize your chances of landing your dream job with our intelligent automation.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="md:col-span-1" ref={addToAnimationRefs}>
                <div className="animate-on-scroll">
                  <div className="rounded-full bg-blue-light/50 p-4 w-16 h-16 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue">
                      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"/>
                      <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"/>
                      <path d="M12 12v6"/>
                      <path d="M8 18a2 2 0 0 0 4 0"/>
                      <circle cx="12" cy="6" r="3"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Smart Job Discovery</h3>
                  <p className="text-muted-foreground">
                    Our system searches across major job boards and company websites to find positions matching your skills and preferences.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="md:col-span-1" ref={addToAnimationRefs}>
                <div className="animate-on-scroll">
                  <div className="rounded-full bg-blue-light/50 p-4 w-16 h-16 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AI-Powered Cover Letters</h3>
                  <p className="text-muted-foreground">
                    Generate customized cover letters that highlight your relevant experience and skills for each specific job application.
                  </p>
                </div>
              </GlassCard>
              
              <GlassCard className="md:col-span-1" ref={addToAnimationRefs}>
                <div className="animate-on-scroll">
                  <div className="rounded-full bg-blue-light/50 p-4 w-16 h-16 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue">
                      <path d="M12 22V8"/>
                      <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
                      <path d="M8 5.2A5 5 0 0 1 12 3a5 5 0 0 1 4 2.2"/>
                      <path d="M17 11V9.8c0-3-1-5.8-5-5.8S7 6.8 7 9.8V11"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">One-Click Applications</h3>
                  <p className="text-muted-foreground">
                    Automatically fill out job applications and submit your resume and cover letter with a single click, saving hours of repetitive work.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass-card p-10 md:p-16 text-center max-w-4xl mx-auto" ref={addToAnimationRefs}>
              <div className="animate-on-scroll">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Job Search?</h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of professionals who have streamlined their job hunt with CareerSync AI. Start applying to more positions in less time.
                </p>
                <Link to="/signup">
                  <Button size="lg">
                    Get Started Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <div className="mb-4">
                  <span className="text-xl font-bold text-blue">CareerSync<span className="text-foreground">AI</span></span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Transforming the job application process with intelligent automation.
                </p>
                <div className="flex space-x-4">
                  {/* Social icons */}
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium mb-4">Resources</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base font-medium mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-12 pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} CareerSync AI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default LandingPage;
