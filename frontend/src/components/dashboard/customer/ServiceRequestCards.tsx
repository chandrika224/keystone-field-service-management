import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import CreateWorkOrderForm from "./WorkOrders/CreateWorkOrderForm";

import acHvacImage from "@/assets/images/ac_hvac.gif";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ServiceRequestCardsProps {
  onWorkOrderCreated: () => void;
}

const services: Service[] = [
  {
    id: "electrical",
    title: "Electrical",
    description: "Electrical repairs, wiring and installations",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "plumbing",
    title: "Plumbing",
    description: "Leaks, pipe repairs, faucets and drainage",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hvac",
    title: "AC & HVAC",
    description: "AC installation, servicing and repairs",
    image: acHvacImage,
  },
  {
    id: "appliance",
    title: "Appliance Repair",
    description: "Repair and maintenance of home appliances",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "maintenance",
    title: "General Maintenance",
    description: "Home repairs and maintenance services",
    image:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ServiceRequestCards({
  onWorkOrderCreated,
}: ServiceRequestCardsProps) {
  const [open, setOpen] = useState(false);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const handleRequest = (service: Service) => {
    setSelectedService(service);
    setOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.map((service) => (
          <Card
            key={service.id}
            className="group overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            onClick={() => handleRequest(service)}
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

              <div className="absolute bottom-3 left-3">
                <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-900">
                  {service.title}
                </span>
              </div>
            </div>

            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRequest(service);
                }}
              >
                Request Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Work Order</DialogTitle>

            <DialogDescription>
              Tell us what service you need and we'll assign the right
              technician.
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <CreateWorkOrderForm
              serviceType={selectedService.title}
              onSuccess={() => {
                setOpen(false);
                onWorkOrderCreated();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}