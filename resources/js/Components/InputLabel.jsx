export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label
            {...props}
            // Ajoute la classe 'dark:text-gray-300' pour le mode sombre
            className={`block font-medium text-sm text-gray-700 dark:text-gray-300 ` + className}
        >
            {value ? value : children}
        </label>
    );
}