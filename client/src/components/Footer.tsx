import React from 'react';
import { Link } from 'wouter';
import LodgeEmblem from './LodgeEmblem';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Footer: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => 
      apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: 'Thank You!',
        description: 'Your message has been sent successfully.',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to send message: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };
  
  return (
    <footer className="bg-primary-blue-darker text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Lodge Info */}
          <div>
            <div className="h-24 mb-4">
              <LodgeEmblem />
            </div>
            <h4 className="font-cinzel text-xl font-bold mb-2">St. Petersburg Lodge No. 139</h4>
            <p className="mb-2">Free & Accepted Masons</p>
            <address className="not-italic mb-4">
              240 Mirror Lake Dr N<br />
              St. Petersburg, FL 33701
            </address>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-gold">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-gold">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-lg font-bold mb-4 text-primary-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/"><div className="text-white hover:text-primary-gold transition cursor-pointer">Home</div></Link></li>
              <li><Link to="/about-139"><div className="text-white hover:text-primary-gold transition cursor-pointer">About Our Lodge</div></Link></li>
              <li><Link to="/calendar"><div className="text-white hover:text-primary-gold transition cursor-pointer">Calendar</div></Link></li>
              <li><Link to="/officers"><div className="text-white hover:text-primary-gold transition cursor-pointer">Officers</div></Link></li>
              <li><Link to="/past-masters"><div className="text-white hover:text-primary-gold transition cursor-pointer">Past Masters</div></Link></li>
              <li><Link to="/contact"><div className="text-white hover:text-primary-gold transition cursor-pointer">Contact Us</div></Link></li>
            </ul>
          </div>
          
          {/* Masonic Links */}
          <div>
            <h4 className="font-cinzel text-lg font-bold mb-4 text-primary-gold">Masonic Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://grandlodgefl.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-gold transition">Grand Lodge of Florida</a></li>
              <li><a href="https://scottishrite.org" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-gold transition">Scottish Rite</a></li>
              <li><a href="https://yorkrite.org" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-gold transition">York Rite</a></li>
              <li><a href="https://shrinersinternational.org" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-gold transition">Shrine</a></li>
              <li><a href="/education" className="text-white hover:text-primary-gold transition">Masonic Education</a></li>
            </ul>
          </div>
          
          {/* Contact Form */}
          <div>
            <h4 className="font-cinzel text-lg font-bold mb-4 text-primary-gold">Contact Us</h4>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Name" 
                          className="w-full p-2 rounded bg-white bg-opacity-10 border border-gray-600 text-white placeholder-gray-400" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Email" 
                          type="email"
                          className="w-full p-2 rounded bg-white bg-opacity-10 border border-gray-600 text-white placeholder-gray-400" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Message" 
                          rows={3}
                          className="w-full p-2 rounded bg-white bg-opacity-10 border border-gray-600 text-white placeholder-gray-400" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="bg-primary-gold hover:bg-primary-gold-light text-primary-blue-darker font-medium px-4 py-2 rounded transition duration-300 w-full"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="bg-black bg-opacity-30 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} St. Petersburg Lodge No. 139, F&AM. All Rights Reserved.</p>
          <p className="mt-1">Website designed with pride by a Brother Mason.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
