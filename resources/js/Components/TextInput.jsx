import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                `border-gray-300 dark:border-stone-700 ` + // Bordure normale et bordure en mode sombre
                `bg-gray-50 dark:bg-stone-300 ` +           // Fond normal et fond en mode sombre
                `text-gray-900 dark:text-stone-950 ` +     // Texte normal et texte en mode sombre
                `placeholder-gray-400 dark:placeholder-stone-500 ` + // Placeholder normal et placeholder en mode sombre
                `focus:border-indigo-500 dark:focus:border-indigo-600 ` + // Bordure au focus normal et en mode sombre
                `focus:ring-indigo-500 dark:focus:ring-indigo-600 ` +   // Anneau de focus normal et en mode sombre
                `rounded-md shadow-sm ` +
                className
            }
            ref={input}
        />
    );
});