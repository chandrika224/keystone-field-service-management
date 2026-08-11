import ServicesHero
  from "@/components/public/Services/ServicesHero";

import ServiceCapabilities
  from "@/components/public/Services/ServiceCapabilities";

import ServiceWorkflow
  from "@/components/public/Services/ServiceWorkflow";

import ServicesCTA
  from "@/components/public/Services/ServicesCTA";


export default function Services() {
  return (
    <div>

      <ServicesHero />

      <ServiceCapabilities />

      <ServiceWorkflow />

      <ServicesCTA />

    </div>
  );
}