import { lazy, Suspense, useEffect, startTransition } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { Toaster } from "react-hot-toast";
// import API from "./utils/api.js";
// import { setUser } from "./redux/authSlice.js";

/* ── Future: Context Providers (uncomment when ready) ──
import JobDetailsProvider from "./context/JobDetailsContext";
import { NotificationProvider } from './context/NotificationContext';
import { MessageProvider } from './context/MessageContext';
*/

/* ── Future: Protected Routes (uncomment when ready) ──
import ProtectedUserRoute from "./components/user/ProtectedUserRoute";
import ProtectedRecruiterRoute from "./components/recruiter/ProtectedRecruiterRoute";
*/

/* ── Future: Floating Widgets (uncomment when ready) ──
import WhatsAppFloat from "./components/shared/WhatsAppFloat";
import JobseekerChatbot from "./components/chat/JobseekerChatbot";
import RecruiterChatbot from "./components/chat/RecruiterChatbot";
*/

// ── Core Layout Components (eager — always needed) ──
import Navbar    from './navbar';
import Footer    from './footer';
import Statusbar from './statusbar';

// ── Main Site Sections (eager — loaded on first visit) ──
import Hero     from './home';
import About    from './about';
import Services from './services';
import News     from './news';
import Cta      from './cta';

// ── Portal Pages (lazy — loaded only when navigated to) ──
const BloodDonationPortal = lazy(() => import('./BloodDonationPortal'));
const DonatePoor          = lazy(() => import('./DonatePoor'));
const LabourService       = lazy(() => import('./LabourService'));
const BuySell             = lazy(() => import('./BuySell'));
const JobPortal           = lazy(() => import('./jobportal'));
const ComplaintPortal     = lazy(() => import('./Complaintportal'));
const PoliceMitr          = lazy(() => import('./Policemitr'));
const TrustPortal         = lazy(() => import('./Trustportal'));
const MarriageProfiles    = lazy(() => import('./MarriageProfiles'));
const Education           = lazy(() => import('./Education'));
const ContactNumbers      = lazy(() => import('./Contactnumber'));
const DeliveryHome        = lazy(() => import('./Deliveryhome'));
const WomenEntrepreneur   = lazy(() => import('./WomenEntrepreneur'));
const TrustIntro          = lazy(() => import('./Trustintro'));

// ── Page Loader Spinner ──
const PageLoader = () => (
  <div style={{
    minHeight: "100vh", display: "flex", alignItems: "center",
    justifyContent: "center", background: "#f0f4f8",
  }}>
    <div style={{
      width: 40, height: 40,
      border: "4px solid #e87722",
      borderTopColor: "transparent",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ── Main Site Layout (Home page) ──
function MainSite() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Statusbar />
      <About />
      <News />
      <Cta />
      <Footer />
    </>
  );
}

// ── Router (defined outside component — never recreated on re-render) ──
const appRouter = createBrowserRouter([
  { path: "/",                   element: <MainSite /> },
  { path: "/blood-donation",     element: <Suspense fallback={<PageLoader />}><BloodDonationPortal /></Suspense> },
  { path: "/donate-poor",        element: <Suspense fallback={<PageLoader />}><DonatePoor /></Suspense> },
  { path: "/labour-service",     element: <Suspense fallback={<PageLoader />}><LabourService /></Suspense> },
  { path: "/buy-sell",           element: <Suspense fallback={<PageLoader />}><BuySell /></Suspense> },
  { path: "/job-portal",         element: <Suspense fallback={<PageLoader />}><JobPortal /></Suspense> },
  { path: "/complaint-portal",   element: <Suspense fallback={<PageLoader />}><ComplaintPortal /></Suspense> },
  { path: "/police-mitr",        element: <Suspense fallback={<PageLoader />}><PoliceMitr /></Suspense> },
  { path: "/trust-portal",       element: <Suspense fallback={<PageLoader />}><TrustPortal /></Suspense> },
  { path: "/marriage-profiles",  element: <Suspense fallback={<PageLoader />}><MarriageProfiles /></Suspense> },
  { path: "/education-portal",   element: <Suspense fallback={<PageLoader />}><Education /></Suspense> },
  { path: "/contact-numbers",    element: <Suspense fallback={<PageLoader />}><ContactNumbers /></Suspense> },
  { path: "/delivery-home",      element: <Suspense fallback={<PageLoader />}><DeliveryHome /></Suspense> },
  { path: "/women-entrepreneur", element: <Suspense fallback={<PageLoader />}><WomenEntrepreneur /></Suspense> },
  { path: "/trust-intro",        element: <Suspense fallback={<PageLoader />}><TrustIntro /></Suspense> },

  /* ── Future Routes (uncomment when pages are ready) ──
  { path: "/profile",            element: <ProtectedUserRoute><UserProfile /></ProtectedUserRoute> },
  { path: "/login",              element: <AuthPage /> },
  { path: "/signup",             element: <AuthPage /> },
  { path: "/forgot-password",    element: <ForgotPassword /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  { path: "/notifications",      element: <NotificationPage /> },
  { path: "/messages",           element: <MessagingPage /> },
  { path: "*",                   element: <PageNotFound /> },
  */
]);

// ── App Root ──
export default function App() {
  /* ── Future: Auth check on app load (uncomment when API is ready) ──
  const dispatch = useDispatch();

  useEffect(() => {
    const t = setTimeout(() => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        startTransition(() => dispatch(setUser(null)));
        return;
      }
      API
        .get("/v1/user/me")
        .then((res) => {
          if (res.data.success) {
            startTransition(() => dispatch(setUser(res.data.user)));
          }
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            startTransition(() => dispatch(setUser(null)));
          }
        });
    }, 800);
    return () => clearTimeout(t);
  }, [dispatch]);
  */

  /* ── Future: Unregister old service workers (uncomment when PWA is ready) ──
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((r) => r.unregister());
      });
    }
  }, []);
  */

  return (
    <RouterProvider router={appRouter} />
  );
}