import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Loading fallback component
import { Loader2 } from "lucide-react";

// Loading component to show while pages are loading
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-primary-blue-darker bg-opacity-20">
    <div className="flex flex-col items-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary-blue" />
      <p className="mt-4 text-lg font-medium text-primary-blue">Loading...</p>
    </div>
  </div>
);

// Eagerly load the Home page for better initial load experience
import Home from "@/pages/Home";

// Lazy load all other pages
const NotFound = lazy(() => import("@/pages/not-found"));
const History = lazy(() => import("@/pages/History"));
const About = lazy(() => import("@/pages/About"));
const Officers = lazy(() => import("@/pages/Officers"));
const PastMasters = lazy(() => import("@/pages/PastMasters"));
const BecomingMason = lazy(() => import("@/pages/BecomingMason"));
const Contact = lazy(() => import("@/pages/Contact"));
const CalendarPage = lazy(() => import("@/pages/CalendarPage"));
const Forms = lazy(() => import("@/pages/Forms"));
const Shop = lazy(() => import("@/pages/Shop"));

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/history" component={History} />
        <Route path="/about-139" component={About} />
        <Route path="/officers" component={Officers} />
        <Route path="/past-masters" component={PastMasters} />
        <Route path="/becoming-mason" component={BecomingMason} />
        <Route path="/contact" component={Contact} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/forms" component={Forms} />
        <Route path="/shop" component={Shop} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
