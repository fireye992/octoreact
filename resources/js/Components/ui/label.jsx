// resources/js/Components/ui/label.jsx

import React from 'react';
import * as LabelPrimitive from "@radix-ui/react-label"; // Si vous utilisez Radix UI
import { cn } from '@/lib/utils'; // Assurez-vous que ce chemin est correct

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
