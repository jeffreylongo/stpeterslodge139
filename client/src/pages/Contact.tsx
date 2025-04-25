import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronRight, Mail, MapPin, Phone, Send } from 'lucide-react';

// Define form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  
  // Handle form submission
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => 
      apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: 'Message Sent',
        description: 'Thank you for your message. We will respond as soon as possible.',
      });
      form.reset();
      setSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
      setSubmitting(false);
      console.error('Contact form error:', error);
    },
  });
  
  const onSubmit = (data: ContactFormValues) => {
    setSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-primary-blue-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm mb-4">
              <Link to="/">
                <div className="hover:text-primary-gold transition">Home</div>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-gold">Contact Us</span>
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold">Contact Us</h1>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <p className="lead text-xl">We welcome your inquiries and look forward to connecting with you. Whether you have questions about Freemasonry, are interested in becoming a Mason, or need information about our lodge, we're here to help.</p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <div className="w-full lg:w-3/5">
                <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="bg-primary-blue hover:bg-primary-blue-dark text-white px-6 py-3"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
              
              {/* Contact Information */}
              <div className="w-full lg:w-2/5">
                <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-6">Contact Information</h2>
                
                <div className="bg-neutral-light p-6 rounded-lg shadow-md mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Lodge Location</p>
                        <p>3325 1st St N</p>
                        <p>St. Petersburg, FL 33704</p>
                        <a 
                          href="https://maps.google.com/?q=3325+1st+St+N,+St.+Petersburg,+FL+33704" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-primary-blue hover:text-primary-gold transition"
                        >
                          View on Google Maps
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p><a href="tel:7274183356" className="hover:text-primary-gold transition">(727) 418-3356</a></p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p><a href="mailto:secretary@stpetelodge139.org" className="hover:text-primary-gold transition">secretary@stpetelodge139.org</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                  <h3 className="font-cinzel text-xl text-primary-blue font-bold p-6 border-b">Lodge Secretary</h3>
                  <div className="p-6">
                    <p className="font-medium text-lg">W∴ John Livingston</p>
                    <p className="text-gray-600 mb-4">The Secretary is the primary administrative contact for the lodge.</p>
                    <p className="mb-1">For questions about:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      <li>Membership status and dues</li>
                      <li>Lodge records and certificates</li>
                      <li>Meeting schedules</li>
                      <li>Visiting the lodge</li>
                    </ul>
                    <div className="flex flex-col space-y-2">
                      <a 
                        href="mailto:secretary@stpetelodge139.org" 
                        className="inline-flex items-center text-primary-blue hover:text-primary-gold transition"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        <span>secretary@stpetelodge139.org</span>
                      </a>
                      <a 
                        href="tel:7274183356" 
                        className="inline-flex items-center text-primary-blue hover:text-primary-gold transition"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        <span>(727) 418-3356</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visiting Information */}
            <div className="mt-12 bg-primary-blue text-white p-8 rounded-lg">
              <h2 className="font-cinzel text-2xl font-bold mb-4">Visiting Information</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p>If you're planning to visit our lodge, we meet on the <strong>third Tuesday of every month</strong>. Dinner is served at 6:30 PM, followed by our meeting at 7:30 PM.</p>
                <p>Visiting Masons are always welcome at our meetings. Please bring your dues card or other proof of membership. If you're not a Mason but are interested in learning more about Freemasonry, please contact us to arrange a visit or attend one of our public events.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;