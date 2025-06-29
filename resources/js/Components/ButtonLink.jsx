// resources/js/Components/ButtonLink.jsx

import React from 'react';
import { Button } from '@/Components/ui/button'; // On importe le bouton Shadcn

/**
 * Ce composant enveloppe le bouton Shadcn pour le transformer en lien.
 * Il utilise la prop `asChild` du composant Button.
 */
export default function ButtonLink({ href, variant, children, ...props }) {
    // La prop `asChild` de Shadcn permet de rendre un <a> à la place d'un <button>,
    // tout en gardant les styles du bouton.
    return (
        <Button asChild variant={variant} {...props}>
            <a href={href} className="inline-block" >
                {children}
            </a>
        </Button>
    );
}