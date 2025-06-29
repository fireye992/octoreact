// resources/js/Components/ui/textarea.jsx

import React from 'react';
import { cn } from '@/lib/utils'; // Assurez-vous que ce chemin est correct

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "dark:bg-stone-700 dark:border-stone-600 dark:text-gray-100 dark:placeholder:text-gray-400", // Dark mode styles
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
