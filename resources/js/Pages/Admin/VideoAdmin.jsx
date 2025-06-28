// resources/js/Pages/Admin/VideoAdmin.jsx

import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

// La fonction `route` est globalement disponible si Ziggy est correctement configuré.
// Pas besoin de l'importer ici si c'est le cas.

// CORRECTION MAJEURE: Le composant reçoit `videos` et `auth` directement comme props d'Inertia.
const VideoAdmin = ({ auth, videos: initialVideos }) => { // Renomme `videos` en `initialVideos` pour éviter un conflit avec le state local
    // Initialise l'état local `videos` avec les `initialVideos` reçues d'Inertia.
    const [videos, setVideos] = useState(initialVideos);
    const [editingVideo, setEditingVideo] = useState(null);

    const { data, setData, post, put, delete: destroy, errors, reset } = useForm({
        title: '',
        description: '',
        video_id: '',
    });

    // Effet pour mettre à jour l'état `videos` si la prop `initialVideos` change (utile si tu navigues vers la page).
    useEffect(() => {
        setVideos(initialVideos);
    }, [initialVideos]);

    // Cette fonction sert maintenant à re-fetch les vidéos après une action CRUD,
    // car les données ne sont pas automatiquement rafraîchies par Inertia après un `post`/`put`/`delete`.
    const fetchVideos = async () => {
        try {
            // Utilise la route nommée pour l'index
            const response = await fetch(route('videos.index'));
            const data = await response.json();
            setVideos(data); // Met à jour l'état local avec les nouvelles données
        } catch (error) {
            console.error("Erreur lors de la récupération des vidéos :", error);
            // Optionnel: Afficher une alerte ou un message à l'utilisateur
            Swal.fire('Erreur !', 'Impossible de charger les vidéos.', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingVideo) {
            // Mode édition
            put(route('videos.update', editingVideo.id), {
                onSuccess: () => {
                    Swal.fire('Succès !', 'Vidéo mise à jour avec succès.', 'success');
                    setEditingVideo(null);
                    reset();
                    fetchVideos(); // Rafraîchit la liste après succès
                },
                onError: (err) => {
                    Swal.fire('Erreur !', 'Veuillez corriger les erreurs de validation.', 'error');
                    console.error("Erreurs de validation:", err);
                }
            });
        } else {
            // Mode création
            post(route('videos.store'), {
                onSuccess: () => {
                    Swal.fire('Succès !', 'Vidéo ajoutée avec succès.', 'success');
                    reset();
                    fetchVideos(); // Rafraîchit la liste après succès
                },
                onError: (err) => {
                    Swal.fire('Erreur !', 'Veuillez corriger les erreurs de validation.', 'error');
                    console.error("Erreurs de validation:", err);
                }
            });
        }
    };

    const handleEdit = (video) => {
        setEditingVideo(video);
        setData({
            title: video.title,
            description: video.description,
            video_id: video.video_id,
        });
    };

    const handleDelete = async (videoId) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('videos.destroy', videoId), {
                    onSuccess: () => {
                        Swal.fire('Supprimé !', 'La vidéo a été supprimée.', 'success');
                        fetchVideos(); // Rafraîchit la liste après succès
                    },
                    onError: (err) => {
                        Swal.fire('Erreur !', 'Impossible de supprimer la vidéo.', 'error');
                        console.error("Erreur lors de la suppression:", err);
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-stone-400 leading-tight">Administration des vidéos</h2>}
        >
            <Head title="Admin Vidéos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">{editingVideo ? 'Modifier une vidéo' : 'Ajouter une nouvelle vidéo'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    required
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                ></textarea>
                                {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                            </div>
                            <div>
                                <label htmlFor="video_id" className="block text-sm font-medium text-gray-700">ID Vidéo YouTube</label>
                                <input
                                    type="text"
                                    id="video_id"
                                    name="video_id"
                                    value={data.video_id}
                                    onChange={(e) => setData('video_id', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    required
                                />
                                {errors.video_id && <div className="text-red-500 text-sm mt-1">{errors.video_id}</div>}
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {editingVideo ? 'Mettre à jour' : 'Ajouter'} la vidéo
                                </button>
                                {editingVideo && (
                                    <button
                                        type="button"
                                        onClick={() => { setEditingVideo(null); reset(); }}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                    >
                                        Annuler l'édition
                                    </button>
                                )}
                            </div>
                        </form>

                        <hr className="my-8" />

                        <h3 className="text-lg font-medium text-gray-900 mb-4">Vidéos existantes</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID YouTube</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* CORRECTION: Vérifie que `videos` est un tableau avant de mapper. */}
                                    {Array.isArray(videos) && videos.length > 0 ? (
                                        videos.map((video) => (
                                            <tr key={video.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{video.title}</div>
                                                    <div className="text-sm text-gray-500">{video.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {video.video_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(video)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Éditer
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(video.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                                Aucune vidéo disponible.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default VideoAdmin;