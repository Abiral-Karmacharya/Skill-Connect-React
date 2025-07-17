import React from "react";
import "../styles/pricing.css";
import { PricingSpan } from "./components/Span";
const Pricing = () => {
  return (
    <div id="pricing">
      <PricingSpan
        heading="Free"
        content={[
          "Rs 0 per month",
          "Create a basic user profile",
          "Browse limited job listings",
          "Apply to 3 projects per month",
          "Access community discussion boards",
          "View basic analytics on profile views",
        ]}
      ></PricingSpan>
      <PricingSpan
        heading="Silver tier"
        content={[
          "Rs 500 per month",
          "All Free features",
          "Unlimited project applications",
          "Message recruiters directly",
          "Get featured in search results",
          "Access skill-building resources and templates",
        ]}
      ></PricingSpan>
      <PricingSpan
        heading="Golden tier"
        content={[
          "Rs 1000 per month",
          "All Silver features",
          "Personalized career coaching session monthly",
          "Premium badge on profile",
          "Advanced profile analytics",
          "Early access to top projects and events",
        ]}
      ></PricingSpan>
    </div>
  );
};

export default Pricing;
