import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { PastMaster } from '@/lib/types';

const PastMasters = () => {
  const { data: pastMasters, isLoading, error } = useQuery<PastMaster[]>({
    queryKey: ['/api/past-masters'],
  });

  // Group past masters by decade
  const groupByDecade = (pastMastersData: PastMaster[] = []) => {
    const decades: Record<string, PastMaster[]> = {};
    
    pastMastersData.forEach(master => {
      const decade = Math.floor(master.year / 10) * 10;
      const decadeKey = `${decade}-${decade + 9}`;
      
      if (!decades[decadeKey]) {
        decades[decadeKey] = [];
      }
      
      decades[decadeKey].push(master);
    });
    
    return Object.entries(decades).sort((a, b) => {
      const decadeA = parseInt(a[0].split('-')[0]);
      const decadeB = parseInt(b[0].split('-')[0]);
      return decadeB - decadeA; // Sort newest to oldest
    });
  };
  
  const groupedMasters = pastMasters && Array.isArray(pastMasters) ? groupByDecade(pastMasters) : [];

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
              <Link to="/about">
                <div className="hover:text-primary-gold transition">Our Lodge</div>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-gold">Past Masters</span>
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold">Past Masters</h1>
            <p className="mt-4 text-xl">Honoring those who have served as Worshipful Master</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <p className="lead text-xl">The past masters of St. Petersburg Lodge No. 139 have led our lodge with distinction since our founding in December 1893 as a U.D. Lodge, receiving its charter in January 1894. Their leadership, dedication, and wisdom have shaped our lodge's rich history and traditions spanning more than 125 years.</p>
              <p>Each Worshipful Master has contributed to the legacy of our lodge in his own unique way, while upholding the principles and landmarks of Freemasonry. From our first Worshipful Master W∴ W. W. Coleman to our present leadership, these dedicated men have guided our lodge through periods of growth, challenge, and achievement.</p>
              <p>On this page, we honor their service and commitment to our fraternity, recognizing that the strength of our lodge today is built upon the foundations they established.</p>
            </div>
            
            <div className="bg-neutral-light p-6 rounded-lg mb-12">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-4">Our First Worshipful Masters</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-bold text-lg mb-2">W∴ W. W. Coleman (1894-1895)</h3>
                  <p className="text-sm">Worshipful Coleman was a Hydraulic Engineer who installed St. Petersburg's first water system. He and his wife Mary Ellen built, owned, and ran the Paxton House Hotel, one of the largest hotels in the area with 32 rooms.</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-bold text-lg mb-2">W∴ G. L. King (1896)</h3>
                  <p className="text-sm">Worshipful King was our second Worshipful Master and one of the first lumber mill owners in the Pinellas Point/Maximo Point area. He is credited with spearheading population growth in Lower Pinellas Point/St. Pete Village in the 1890s.</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-bold text-lg mb-2">W∴ Robert Johnson (1898)</h3>
                  <p className="text-sm">Worshipful Johnson was a Charter Member of St. Petersburg Lodge No. 139 and served as District Deputy Grand Master in 1901, when the lodge was located in District 16.</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-bold text-lg mb-2">W∴ H. W. Hibbs (1899)</h3>
                  <p className="text-sm">Worshipful Hibbs established one of St. Petersburg's most important industries - shipping fresh fish to northern markets. He was president of the Hibbs Fish Company, president of the Citizens Ice & Cold Storage Company, and a director of the First National Bank. He was elected mayor of St. Petersburg in 1894 and again in 1895.</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-bold text-lg mb-2">W∴ W. A. Sloan (1900)</h3>
                  <p className="text-sm">Worshipful Sloan led our Lodge into the 20th Century and was among the Worshipful Masters instrumental in the founding of St. Petersburg. He was the first Town Marshal and passed away on June 25, 1906.</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-bold text-lg mb-2">W∴ David Murray (1901-1903)</h3>
                  <p className="text-sm">Worshipful Murray came to St. Petersburg in 1890 to establish the Crystal Ice Company, the first ice company in St. Petersburg. In April 1893, he was elected Mayor of St. Petersburg to complete the term of Mayor Judge Wm. H. Benton, who died suddenly while traveling to Tampa.</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-bold text-lg mb-2">W∴ Henry Miner (1904)</h3>
                  <p className="text-sm">Worshipful Miner began his career at sea at 16 years old as an Able Seaman. As a Sea Captain in 1888, he sailed from Pensacola to the snapper banks and survived one of the worst hurricanes on the Gulf that sank over 200 ships. He and his crew spent 18 days in open boats before being rescued.</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-bold text-lg mb-2">W∴ William B. Pope (1905-1908)</h3>
                  <p className="text-sm">Worshipful Pope served our Lodge as Worshipful Master for four consecutive years. He later served another four years as District Deputy Grand Master of District 27 from 1912 through 1915. He passed away on December 13, 1930, at the age of 72.</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-bold text-lg mb-2">W∴ Willison H. English (1912)</h3>
                  <p className="text-sm">Worshipful English was one of the best-known businessmen in St. Petersburg and a partner in the firm of Dent & English. He passed away suddenly on January 3, 1918, from heart failure while attending the funeral of a friend and fellow Knight Templar, J.R. Craven.</p>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>There was an error loading the past masters data. Please try again later.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {groupedMasters.map(([decade, masters]) => (
                  <div key={decade} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-primary-blue text-white p-4">
                      <h2 className="font-cinzel text-xl font-bold">{decade}</h2>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {masters.sort((a, b) => b.year - a.year).map(master => (
                          <div key={master.id} className="flex items-center p-3 border-b border-gray-100">
                            <div className="text-primary-gold font-bold mr-4 text-center min-w-16">
                              {master.year}
                            </div>
                            <div className="font-medium">{master.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* If no data available, show this placeholder */}
            {!isLoading && !error && (!pastMasters || !Array.isArray(pastMasters) || pastMasters.length === 0) && (
              <div className="bg-neutral-light p-12 rounded-lg text-center">
                <p className="text-lg text-gray-600">Past masters data is currently being compiled. Please check back soon.</p>
              </div>
            )}
            
            <div className="mt-12 bg-neutral-light p-8 rounded-lg">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-4">The Significance of the Past Master</h2>
              <div className="prose prose-lg max-w-none">
                <p>In Masonic tradition, the title of Past Master is one of honor and respect. Having served as Master of the Lodge, these brethren have demonstrated leadership and commitment to the Craft. Their experience and wisdom continue to guide the Lodge even after their term of office has ended.</p>
                <p>At St. Petersburg Lodge No. 139, our Past Masters form an invaluable collective of knowledge and experience. They represent the living history of our lodge and play an essential role in preserving our unique traditions and practices. Many of our Past Masters continue to serve the lodge in various capacities, including as officers in the Grand Lodge of Florida, mentors to new members, and leaders in Masonic education.</p>
                <p>The jewel worn by a Past Master—a pair of compasses opened upon a quadrant with a sun in the center—symbolizes that having presided over the lodge, these brothers have completed their journey around their portion of the Masonic circle. Their continued guidance ensures that the wisdom of the past informs our journey into the future.</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/officers">
                <div className="inline-flex items-center bg-primary-blue hover:bg-primary-blue-dark text-white px-6 py-3 rounded transition">
                  <span>View Current Officers</span>
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

export default PastMasters;