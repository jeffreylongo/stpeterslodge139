import { Link } from 'wouter';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { ChevronRight, FileText, Download, ExternalLink } from 'lucide-react';

const FormsPage = () => {
  // Sample form data - in a real application this would come from an API
  const forms = [
    {
      id: 1,
      title: 'Petition for Degrees',
      description: 'Application for those seeking to join Freemasonry',
      type: 'PDF',
      fileSize: '482 KB',
      url: '#'
    },
    {
      id: 2,
      title: 'Petition for Affiliation',
      description: 'For Master Masons seeking to join our lodge from another lodge',
      type: 'PDF',
      fileSize: '347 KB',
      url: '#'
    },
    {
      id: 3,
      title: 'Background Check Authorization',
      description: 'Required with all petitions',
      type: 'PDF',
      fileSize: '215 KB',
      url: '#'
    },
    {
      id: 4,
      title: 'Dues Payment Form',
      description: 'For members to pay annual dues',
      type: 'PDF',
      fileSize: '198 KB',
      url: '#'
    },
    {
      id: 5,
      title: 'Masonic Education Request',
      description: 'For members requesting specific educational materials',
      type: 'PDF',
      fileSize: '256 KB',
      url: '#'
    }
  ];

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
              <Link to="/about-139">
                <div className="hover:text-primary-gold transition">Our Lodge</div>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-gold">Forms & Petitions</span>
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold">Forms & Petitions</h1>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <p className="lead text-xl">Below you'll find all the necessary forms and petitions for St. Petersburg Lodge No. 139. These documents are available for download in PDF format.</p>
              
              <p>If you need assistance with any of these forms, please contact our Secretary at <a href="mailto:secretary@stpetelodge139.org" className="text-primary-blue hover:text-primary-gold">secretary@stpetelodge139.org</a> or (727) 321-1739.</p>
            </div>
            
            {/* Forms List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
              <div className="bg-primary-blue text-white p-4">
                <h2 className="font-cinzel text-xl font-bold">Available Forms</h2>
              </div>
              
              <div className="divide-y">
                {forms.map(form => (
                  <div key={form.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-start">
                        <FileText className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-lg">{form.title}</h3>
                          <p className="text-gray-600">{form.description}</p>
                          <div className="mt-2 text-sm text-gray-500">
                            <span className="font-medium">{form.type}</span>
                            <span className="mx-2">•</span>
                            <span>{form.fileSize}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <a 
                      href={form.url} 
                      className="inline-flex items-center bg-primary-blue text-white hover:bg-primary-blue-dark px-4 py-2 rounded transition"
                      download
                    >
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Filing Instructions */}
            <div className="bg-neutral-light p-8 rounded-lg shadow-md mb-12">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-4">Filing Instructions</h2>
              
              <div className="prose prose-lg max-w-none">
                <h3 className="font-bold text-xl">For Petitions</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Download and print the appropriate petition form.</li>
                  <li>Complete all sections of the petition clearly and legibly.</li>
                  <li>Ensure that you have the signatures of two Master Masons who are members of St. Petersburg Lodge No. 139 or a Florida lodge as your references.</li>
                  <li>Include the background check authorization form with your petition.</li>
                  <li>Submit your completed petition along with the appropriate fee to the Lodge Secretary.</li>
                </ol>
                
                <h3 className="font-bold text-xl mt-6">For Other Forms</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Download and print the appropriate form.</li>
                  <li>Complete all required information.</li>
                  <li>Submit the form to the Lodge Secretary either in person, by mail, or electronically as specified on the form.</li>
                </ol>
                
                <p className="mt-6">All forms should be submitted to:</p>
                <div className="bg-white p-4 rounded mt-2">
                  <p className="font-medium">St. Petersburg Lodge No. 139 F. & A.M.</p>
                  <p>Attn: Lodge Secretary</p>
                  <p>3100 18th Avenue South</p>
                  <p>St. Petersburg, FL 33712</p>
                </div>
              </div>
            </div>
            
            {/* Grand Lodge Resources */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="font-cinzel text-xl text-primary-blue font-bold mb-4">Additional Resources</h2>
                <p className="text-gray-600 mb-4">For additional forms and Masonic resources, please visit the Grand Lodge of Florida website.</p>
                
                <a 
                  href="https://grandlodgefl.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-blue hover:text-primary-gold transition"
                >
                  <span>Visit Grand Lodge of Florida</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FormsPage;