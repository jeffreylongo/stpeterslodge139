import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { ChevronRight, Mail } from 'lucide-react';
import { Officer } from '@/lib/types';

const Officers = () => {
  const { data: officers, isLoading, error } = useQuery({
    queryKey: ['/api/officers'],
  });

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
              <span className="text-primary-gold">Current Officers</span>
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold">Current Officers</h1>
            <p className="mt-4 text-xl">{new Date().getFullYear()} - {new Date().getFullYear() + 1}</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none mb-8">
              <p className="lead text-xl">The officers of St. Petersburg Lodge No. 139 are elected or appointed to serve the lodge and its members. Each officer has specific duties and responsibilities in conducting the business and ritual work of the lodge.</p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>There was an error loading the officers data. Please try again later.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {officers && Array.isArray(officers) && officers
                  .sort((a: Officer, b: Officer) => a.order - b.order)
                  .map((officer: Officer) => (
                    <div key={officer.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
                      <div className="bg-primary-blue-dark text-white p-4">
                        <h3 className="font-cinzel text-xl font-bold">{officer.title}</h3>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          {officer.imageUrl ? (
                            <img 
                              src={officer.imageUrl} 
                              alt={officer.name} 
                              className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-neutral-light rounded-full flex items-center justify-center mr-4">
                              <span className="text-xl font-bold text-primary-blue">
                                {officer.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-lg">{officer.name}</h4>
                            <p className="text-gray-600">{officer.year}</p>
                          </div>
                        </div>
                        
                        {officer.email && (
                          <a 
                            href={`mailto:${officer.email}`} 
                            className="mt-4 inline-flex items-center text-primary-blue hover:text-primary-gold transition"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            <span>{officer.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            
            <div className="mt-12 bg-neutral-light p-8 rounded-lg">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-4">Officer Duties</h2>
              <div className="prose prose-lg max-w-none">
                <p>Each officer in the lodge has specific responsibilities that contribute to the successful operation of the lodge and the preservation of Masonic traditions.</p>
                
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-xl">Worshipful Master</h3>
                    <p>Presides over the lodge, governs its activities, and ensures the laws of Freemasonry are observed. The Master is responsible for the peace and harmony of the lodge.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl">Senior Warden</h3>
                    <p>Assists the Worshipful Master and presides in his absence. Responsible for the oversight of the Craft when at labor.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl">Junior Warden</h3>
                    <p>Responsible for the lodge during refreshment and assists the Worshipful Master and Senior Warden in their duties.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl">Treasurer</h3>
                    <p>Manages the lodge finances, receives all monies due to the lodge, and makes disbursements as authorized.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl">Secretary</h3>
                    <p>Keeps records of all lodge proceedings, handles correspondence, collects dues, and maintains membership records.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/past-masters">
                <div className="inline-flex items-center bg-primary-blue hover:bg-primary-blue-dark text-white px-6 py-3 rounded transition">
                  <span>View Past Masters</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Officers;