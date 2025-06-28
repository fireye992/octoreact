// resources/js/Pages/Dashboard.jsx

import React, { useEffect, useState } from 'react'; // <-- 1. Importez les hooks 'useEffect' et 'useState'
import axios from 'axios'; // <-- 2. Importez la librairie Axios
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    // 3. Déclarez les états pour stocker les données, gérer le chargement et les erreurs
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 4. Utilisez 'useEffect' pour lancer la requête API au chargement du composant
    useEffect(() => {
        // Créez une fonction asynchrone pour la requête
        const fetchUsers = async () => {
            try {
                // Utilisez l'URL proxifiée '/api/users' que nous avons configurée dans vite.config.js
                // Axios enverra la requête et Vite la redirigera vers votre backend Laravel
                const response = await axios.get('/api/users');
                
                // Mettez à jour l'état avec les données récupérées
                setUsers(response.data);
            } catch (err) {
                // Si la requête échoue, mettez à jour l'état de l'erreur
                setError('Impossible de charger la liste des utilisateurs depuis l\'API.');
                console.error('Erreur lors de la récupération des utilisateurs:', err);
            } finally {
                // Arrêtez l'état de chargement, que la requête ait réussi ou non
                setLoading(false);
            }
        };

        // Appelez la fonction de récupération des données
        fetchUsers();
    }, []); // Le tableau vide [] s'assure que cette requête ne se lance qu'une seule fois au montage du composant

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-stone-400 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* 5. Affichez le contenu de la page */}
                        <div className="p-6 text-gray-900">
                            {/* Message initial */}
                            <h3 className="font-bold text-lg mb-4">You're logged in!</h3>

                            {/* 6. Affichez la logique de chargement, d'erreur ou de données */}
                            {loading && <p>Chargement des données de l'API...</p>}
                            {error && <p className="text-red-500">{error}</p>}
                            
                            {!loading && !error && (
                                <>
                                    {users.length > 0 ? (
                                        <div>
                                            <h4 className="font-semibold mb-2">Liste des utilisateurs (via l'API) :</h4>
                                            <ul className="list-disc list-inside space-y-1">
                                                {users.map(user => (
                                                    <li key={user.id}>{user.name} ({user.email})</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p>Aucun utilisateur trouvé via l'API.</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}