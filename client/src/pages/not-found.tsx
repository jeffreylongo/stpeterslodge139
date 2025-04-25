import { Card, CardContent } from "@/components/ui/card";
import { Compass, Search, Home, Square, TriangleRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LodgeEmblem from "@/components/LodgeEmblem";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-neutral-light py-20">
        <Card className="w-full max-w-lg mx-4 border-primary-gold border-2 shadow-lg">
          <CardContent className="pt-10 pb-10 px-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Square strokeWidth={1} className="h-24 w-24 text-primary-blue" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center rotate-45">
                    <Square strokeWidth={1} className="h-24 w-24 text-primary-blue" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Compass className="h-20 w-20 text-primary-blue-dark" />
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <div className="bg-primary-gold rounded-full p-1">
                      <Search className="h-6 w-6 text-primary-blue-darker" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h1 className="font-cinzel text-5xl font-bold text-primary-blue-dark">
                  404
                </h1>
              </div>
              
              <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-primary-blue-dark mb-4">
                Lost in the Temple
              </h2>
              
              <p className="text-gray-600 mb-4 max-w-md mx-auto">
                We regret to inform you that the working tools needed to construct this page 
                have been misplaced. Perhaps you've traveled East when you should have gone West.
              </p>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                The Lodge Secretary has been notified, and the Tyler has been instructed to 
                be on the lookout for any missing materials.
              </p>
              
              <Link to="/">
                <Button className="bg-primary-gold hover:bg-primary-gold-light text-primary-blue-darker font-semibold">
                  <Home className="mr-2 h-4 w-4" />
                  Return to the Lodge
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-4 text-primary-blue opacity-20 my-4">
              <Square strokeWidth={1} className="h-5 w-5" />
              <div className="h-5 w-5 flex items-center justify-center">
                <div className="w-1 h-5 bg-primary-blue"></div>
              </div>
              <TriangleRight strokeWidth={1} className="h-5 w-5" />
            </div>
            
            <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-6 mt-2">
              <p>If you believe this page should exist, please contact the Webmaster at <span className="text-primary-blue">webmaster@stpetelodge139.org</span></p>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
