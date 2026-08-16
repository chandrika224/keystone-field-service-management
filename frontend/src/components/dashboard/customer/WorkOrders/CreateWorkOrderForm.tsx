import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { workOrderService } from "@/services/workOrderService";

import type {
  CustomerWorkOrderRequest,
  ServiceType,
  WorkOrderPriority,
} from "@/types/workOrder";

interface CreateWorkOrderFormProps {
  serviceType: ServiceType; // Match the exact ServiceType enum union
  onSuccess: () => void;
}

export default function CreateWorkOrderForm({
  serviceType,
  onSuccess,
}: CreateWorkOrderFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM" as WorkOrderPriority,
    address: "",
    preferredDate: "",
    preferredTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const request: CustomerWorkOrderRequest = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        scheduledDate: formData.preferredDate,
        serviceType: serviceType, // Fixed: Uses the prop `serviceType` (lowercase s)
        address: formData.address,
      };

      console.log("Creating customer work order:", request);

      const response = await workOrderService.createMyWorkOrder(request);

      console.log("Work order created successfully:", response);

      onSuccess();
    } catch (error) {
      console.error("Failed to create work order:", error);
      setError("Failed to create work order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Service Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Service Type</label>
        <Input value={serviceType} disabled />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Work Order Title</label>
        <Input
          name="title"
          placeholder="Example: Kitchen sink leakage"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Problem Description</label>
        <Textarea
          name="description"
          placeholder="Describe the issue in detail..."
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Priority</label>
        <Select
          value={formData.priority}
          onValueChange={(value) => {
            if (
              value === "LOW" ||
              value === "MEDIUM" ||
              value === "HIGH"
            ) {
              setFormData((prev) => ({
                ...prev,
                priority: value,
              }));
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Service Address</label>
        <Textarea
          name="address"
          placeholder="Enter the address where service is required"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      {/* Date + Time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred Date</label>
          <Input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred Time</label>
          <Input
            type="time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-3">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Work Order"}
        </Button>
      </div>
    </form>
  );
}