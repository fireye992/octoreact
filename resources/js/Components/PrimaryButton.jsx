export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 ` +
                `bg-gray-800 dark:bg-stone-400 ` + // Background color
                `border border-transparent rounded-md font-semibold text-xs ` +
                `text-white dark:text-stone-950 uppercase tracking-widest ` + // Text color
                `hover:bg-gray-700 dark:hover:bg-stone-50 ` + // Hover background
                `focus:bg-gray-700 dark:focus:bg-stone-50 ` + // Focus background
                `active:bg-gray-900 dark:active:bg-stone-300 ` + // Active background
                `focus:outline-none focus:ring-2 focus:ring-indigo-500 ` +
                `focus:ring-offset-2 dark:focus:ring-offset-stone-800 ` + // Focus ring offset
                `transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}