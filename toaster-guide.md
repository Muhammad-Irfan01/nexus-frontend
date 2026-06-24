Here is how to call them across various operations. Notice how we keep description strings light, precise, and highly technical:

"use client";
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle, Cpu } from "lucide-react";

// 1. System Action Success Toast (e.g., when keys are rotated)
toast("Cluster Key Rotated", {
  description: "nx_live_••• updated successfully across 12 region nodes.",
  icon: <CheckCircle2 className="w-4 h-4 text-system-success" />,
});

// 2. Action Warning/Error Toast
toast("Indexing Failed", {
  description: "Document context depth exceeds vector window limit.",
  icon: <AlertTriangle className="w-4 h-4 text-system-error" />,
});

// 3. System Processing Promise Toast (Excellent for AI generation)
const handleResearchCompute = () => {
  const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));

  toast.promise(promise, {
    loading: 'Executing neural map matrix...',
    success: 'Synthesis layout completed.',
    error: 'Execution channel rejected.',
    icon: <Cpu className="w-4 h-4 text-accent-highlight animate-pulse" />
  });
};