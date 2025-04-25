import React from 'react';
import { Link } from 'wouter';
import { Users, Mail } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Officer {
  id: number;
  title: string;
  name: string;
  year: string;
  email: string;
  imageUrl?: string;
}

const Officers: React.FC = () => {
  const { data: officers, isLoading } = useQuery<Officer[]>({
    queryKey: ['/api/officers'],
  });
  
  const defaultOfficers: Officer[] = [
    {
      id: 1,
      title: "Worshipful Master",
      name: "John Smith",
      year: "2023 - 2024",
      email: "master@stpetelodge139.org"
    },
    {
      id: 2,
      title: "Senior Warden",
      name: "Robert Johnson",
      year: "2023 - 2024",
      email: "seniorwarden@stpetelodge139.org"
    },
    {
      id: 3,
      title: "Junior Warden",
      name: "Michael Williams",
      year: "2023 - 2024",
      email: "juniorwarden@stpetelodge139.org"
    }
  ];
  
  const displayOfficers = officers?.length ? officers.slice(0, 3) : defaultOfficers;
  
  return (
    <section className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4">
        <h2 className="font-cinzel text-3xl text-primary-blue font-bold text-center mb-4">Lodge Officers</h2>
        <p className="text-center max-w-3xl mx-auto mb-12">
          Meet the Brethren who lead our lodge and uphold our Masonic traditions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="bg-gray-300 h-12 w-full"></div>
                <div className="p-6 text-center">
                  <div className="h-32 w-32 mx-auto mb-4 rounded-full bg-gray-300"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
                </div>
              </div>
            ))
          ) : (
            displayOfficers.map((officer) => (
              <div key={officer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary-blue p-4 text-center">
                  <h3 className="font-cinzel text-white font-bold">{officer.title}</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    {/* Silhouette placeholder instead of actual photo */}
                    <div className="bg-gray-300 h-full w-full flex items-center justify-center">
                      <Users className="h-16 w-16 text-gray-500" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-xl mb-1">{officer.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{officer.year}</p>
                  <div className="flex justify-center space-x-2">
                    <a href={`mailto:${officer.email}`} className="text-primary-blue hover:text-primary-gold">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/officers">
            <div className="text-primary-blue hover:text-primary-gold inline-flex items-center font-medium transition cursor-pointer">
              <span>View All Officers</span>
              <Users className="ml-2 h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Officers;
