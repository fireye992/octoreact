// resources/js/Components/ui/textarea.jsx

import React from 'react';
import { cn } from '@/lib/utils'; // Assurez-vous que ce chemin est correct

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // Styles pour le mode clair (valeurs par défaut de Shadcn/UI)
        // Les classes ci-dessus sont les valeurs par défaut de Shadcn/UI, qui sont généralement claires.
        // Assurez-vous que border-input, bg-background, text-muted-foreground, etc.
        // sont configurés dans ton fichier tailwind.config.js pour gérer le dark mode via CSS variables
        // ou des utilitaires directs si tu n'utilises pas les CSS variables de Shadcn/UI pour ces alias.

        // Styles pour le mode sombre (AJUSTÉS POUR TA PALETTE STONE)
        "dark:bg-stone-200 dark:border-stone-700 dark:text-amber-700 dark:placeholder:text-stone-500",
        "dark:focus-visible:ring-stone-500 dark:focus-visible:ring-offset-stone-900", // Ajouté pour le focus ring offset
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };