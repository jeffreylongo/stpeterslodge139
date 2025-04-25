import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

const History = () => {
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
              <span className="text-primary-gold">Lodge History</span>
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold">Our Lodge History</h1>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="lead text-xl">St. Petersburg Lodge No. 139 F. & A.M. has proudly served the community since our founding in 1893, making us one of the oldest fraternal organizations in the city.</p>
            
            <div className="my-8 bg-neutral-light p-8 rounded-lg shadow-md">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-4">In The Beginning</h2>
              <p>In 1888, when the Orange Belt Railroad arrived, the population of the area was only around fifty people, spread across small, quiet villages like Wardsville, Williamsville, and Pinellas Village. Mr. J. C. Williams, Sr., often referred to as the "Father of St. Petersburg," persuaded Mr. Peter Demens to construct the first railroad station, a railroad pier, and The Detroit Hotel.</p>
              <p>Pinellas County was initially part of Hillsborough County and gained separate status in May 1911. St. Petersburg officially became a city in 1903, boasting a population of approximately 600 people.</p>
              <p>In December 1893, St. Petersburg Lodge No. 139 F. & A.M. was established as a U.D. (Under Dispensation) Lodge. In January 1894, it was one of nine Lodges chartered under Brother Marcus Endel, Grand Master of the Grand Lodge of Florida.</p>
            </div>

            <div className="my-8">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-4">The Founding of St. Petersburg Lodge #139</h2>
              <p>St. Petersburg Lodge # 139 was organized and held its first meeting as an U.D. Lodge on December 1, 1893 with 9 charter members, namely:</p>
              <ul className="list-disc pl-6 space-y-1 my-4">
                <li>Walter W. Coleman – 1st W.M.</li>
                <li>Henry W. Hibbs</li>
                <li>John Constantine Williams Jr.</li>
                <li>George W. Kennedy</li>
                <li>Robert Johnson</li>
                <li>J.C. Blocker</li>
                <li>James Henry – 1st Sec.</li>
                <li>George F. King</li>
                <li>John F. Blackmon</li>
              </ul>
              <p>They convened in the International Order of Odd Fellows (IOOF) Hall, believed to be located on Central Avenue just west of 4th Street. The monthly rent for the hall was $3.10. The Lodge received its charter on January 17, 1894, under the leadership of Marcus Endel, G.M.</p>
            </div>
            
            <div className="my-8 rounded-lg overflow-hidden">
              <img 
                src="/assets/lodge-building.jpg" 
                alt="St. Petersburg Lodge Building" 
                className="w-full h-auto rounded-lg"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
            
            <div className="my-8">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-4">Our Home Today</h2>
              <p>Since 2011, our lodge has been located at the St. Petersburg Masonic Center at 3325 1st St NE in St. Petersburg, where we share space with other Masonic bodies. In 2013, following extensive renovations, the Lodge room was rededicated in an impressive ceremony with Grand Lodge officers in attendance.</p>
              <p>Today, this Masonic Center serves as home to St. Petersburg Lodge No. 139, Gold Coast Eagle Chapter No. 242 of the Order of the Eastern Star, the Valley of St. Petersburg Scottish Rite, and St. Petersburg York Rite Bodies. Our facility features a beautiful Lodge room for meetings and degree work, dining facilities, and social spaces that allow us to continue our traditions of fellowship and community service.</p>
            </div>

            <div className="my-8">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-4">Historical Timeline</h2>
              <ul className="space-y-6">
                <li className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary-gold rounded-full"></div>
                    <div className="h-full w-0.5 bg-primary-gold"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">1893-1909: The Founders</h3>
                    <p>St. Petersburg Lodge #139 was established as U.D. Lodge on December 1, 1893, receiving its charter on January 17, 1894. W∴ W.W. Coleman served as the 1st Worshipful Master.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary-gold rounded-full"></div>
                    <div className="h-full w-0.5 bg-primary-gold"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">1910-1919: A New Home & The Masonic Home</h3>
                    <p>The first Lodge 139 Temple was established downtown at 4th Street & 2nd Ave S in 1916. Groundbreaking for the new Masonic Temple took place on November 4, 1915.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary-gold rounded-full"></div>
                    <div className="h-full w-0.5 bg-primary-gold"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">1920-1929: Nitram Lodge Is Born</h3>
                    <p>In 1925, a new Masonic Lodge U.D. was established, initially named Sunshine Lodge U.D., which later adopted the name Nitram Lodge #188 in memory of one of its first deceased members, Martin.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary-gold rounded-full"></div>
                    <div className="h-full w-0.5 bg-primary-gold"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">1930-1939: Troubled Times</h3>
                    <p>The Lodge faced financial challenges during the Great Depression. In 1930, the bank closure resulted in the freezing of $1,550 of Lodge funds, leading to the Lodge's first and only default on a note payment.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary-gold rounded-full"></div>
                    <div className="h-full w-0.5 bg-primary-gold"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">1940-1949: World War 2</h3>
                    <p>St. Petersburg underwent significant transformations during World War II. The war years brought a surge in population, with over 120,000 recruits and instructors visiting St. Petersburg.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary-gold rounded-full"></div>
                    <div className="h-full w-0.5 bg-primary-gold"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">1950-1959: Growth & Prosperity</h3>
                    <p>St. Petersburg was reborn after WWII, transforming from a quiet southern town primarily driven by seasonal tourism into a more dynamic city.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary-gold rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">2011-Present: Our Current Home</h3>
                    <p>Since 2011, our lodge has been located at the St. Petersburg Masonic Center at 3325 1st St NE. In 2013, following extensive renovations, the Lodge room was rededicated in an impressive ceremony with Grand Lodge officers in attendance.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="my-8 bg-primary-blue text-white p-8 rounded-lg shadow-md">
              <h2 className="font-cinzel text-2xl font-bold mb-4">Notable Contributions</h2>
              <p>Throughout our history, members of St. Petersburg Lodge No. 139 have made significant contributions to the community, serving as mayors, city council members, business leaders, and community volunteers. Our brethren have played important roles in shaping St. Petersburg's development, cultural institutions, and civic organizations.</p>
              <p>The lodge has maintained a strong tradition of charitable activities, supporting various community causes, youth programs, and Masonic charities throughout our 125+ year history.</p>
            </div>
            
            <div className="my-8">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-4">Masonic Heritage</h2>
              <p>St. Petersburg Lodge takes pride in maintaining the ancient traditions of Freemasonry while adapting to meet the needs of modern members. Our lodge has preserved the richness of Masonic ritual, education, and fellowship that has characterized the fraternity for centuries.</p>
              <p>We continue to welcome good men seeking to improve themselves and contribute to their community through the principles and teachings of Freemasonry: Brotherly Love, Relief, and Truth.</p>
            </div>
            
            <blockquote className="bg-neutral-light p-6 border-l-4 border-primary-gold my-8">
              <p className="italic">"As we reflect on our lodge's rich history spanning more than 125 years, we remain committed to the same principles that guided our founding brothers—making good men better and improving our community through Masonic values and fellowship."</p>
            </blockquote>
            
            <div className="my-8">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-4">Looking to the Future</h2>
              <p>Today, St. Petersburg Lodge No. 139 continues to thrive with an active membership dedicated to preserving our rich heritage while embracing innovations that strengthen our fraternity for future generations. We remain committed to the core Masonic principles of brotherly love, relief, and truth that have guided our lodge since 1894.</p>
              <p>We invite all Master Masons to visit our lodge and experience the unique brotherhood and traditions that have made St. Petersburg Lodge No. 139 a cornerstone of Freemasonry in our community for over a century.</p>
            </div>

            <div className="mt-12 text-center">
              <Link to="/past-masters">
                <div className="inline-flex items-center bg-primary-blue hover:bg-primary-blue-dark text-white px-6 py-3 rounded transition">
                  <span>View Our Past Masters</span>
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

export default History;