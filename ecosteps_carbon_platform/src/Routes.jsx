import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistrationLogin from "pages/user-registration-login";
import IndividualUserDashboard from "pages/individual-user-dashboard";
import CreditPurchaseCheckout from "pages/credit-purchase-checkout";
import GardenSubmissionForm from "pages/garden-submission-form";
import CarbonCreditsMarketplace from "pages/carbon-credits-marketplace";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<CarbonCreditsMarketplace />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="/individual-user-dashboard" element={<IndividualUserDashboard />} />
        <Route path="/credit-purchase-checkout" element={<CreditPurchaseCheckout />} />
        <Route path="/garden-submission-form" element={<GardenSubmissionForm />} />
        <Route path="/carbon-credits-marketplace" element={<CarbonCreditsMarketplace />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;