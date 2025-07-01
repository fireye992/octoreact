import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { Button } from '@/Components/ui/button';

const VideoAdmin = ({ auth, videos: initialVideos, canLogin, canRegister }) => {
    const [videos, setVideos] = useState(initialVideos);
    const [editingVideo, setEditingVideo] = useState(null);

    const { data, setData, post, put, delete: destroy, errors, reset } = useForm({
        title: '',
        description: '',
        video_id: '',
    });

    useEffect(() => {
        setVideos(initialVideos);
    }, [initialVideos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingVideo) {
            put(route('admin.videos.update', editingVideo.id), { // <-- CORRECTION ICI : 'admin.videos.update'
                onSuccess: () => {
                    Swal.fire('Succès !', 'Vidéo mise à jour avec succès.', 'success');
                    setEditingVideo(null);
                    reset();
                },
                onError: (validationErrors) => { // Capture les erreurs de validation
                    console.error("Erreurs de validation:", validationErrors);
                    Swal.fire('Erreur !', 'Veuillez corriger les erreurs de validation.', 'error');
                }
            });
        } else {
            post(route('admin.videos.store'), { // <-- CORRECTION ICI : 'admin.videos.store'
                onSuccess: () => {
                    Swal.fire('Succès !', 'Vidéo ajoutée avec succès.', 'success');
                    reset();
                },
                onError: (validationErrors) => { // Capture les erreurs de validation
                    console.error("Erreurs de validation:", validationErrors);
                    Swal.fire('Erreur !', 'Veuillez corriger les erreurs de validation.', 'error');
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

    const handleDelete = (videoId) => {
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
                destroy(route('admin.videos.destroy', videoId), { // <-- CORRECTION ICI : 'admin.videos.destroy'
                    onSuccess: () => Swal.fire('Supprimé !', 'La vidéo a été supprimée.', 'success'),
                    onError: () => Swal.fire('Erreur !', 'Impossible de supprimer la vidéo.', 'error')
                });
            }
        });
    };

    // Définissez les éléments de navigation ici
    const navigationItems = [
        { label: 'Accueil', href: route('home'), route_name: 'home' },
        { label: 'Dashboard', href: route('dashboard'), route_name: 'dashboard' },
        // { label: 'Admin Videos', href: route('admin.videos'), route_name: 'admin.videos' }, // <-- Correction pour le lien de navigation aussi
    ];

    return (
        <MainLayout
            user={auth.user}
            navigationItems={navigationItems}
            canLogin={canLogin}
            canRegister={canRegister}
            title="Admin Vidéos"
        >
            <Head title="Admin Vidéos" />

            {/* Header de la page d'administration */}
            <header className="shadow bg-white dark:bg-stone-800">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Administration des vidéos
                    </h2>
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    {/* Formulaire d'ajout/édition */}
                    <div className="bg-white dark:bg-stone-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                            {editingVideo ? 'Modifier une vidéo' : 'Ajouter une nouvelle vidéo'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Titre</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 dark:bg-stone-700 dark:border-stone-600 dark:text-gray-100 rounded-md shadow-sm p-2"
                                    required
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                    className="mt-1 block w-full border border-gray-300 dark:bg-stone-700 dark:border-stone-600 dark:text-gray-100 rounded-md shadow-sm p-2"
                                ></textarea>
                                {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                            </div>
                            <div>
                                <label htmlFor="video_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID Vidéo YouTube</label>
                                <input
                                    type="text"
                                    id="video_id"
                                    name="video_id"
                                    value={data.video_id}
                                    onChange={(e) => setData('video_id', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 dark:bg-stone-700 dark:border-stone-600 dark:text-gray-100 rounded-md shadow-sm p-2"
                                    required
                                />
                                {errors.video_id && <div className="text-red-500 text-sm mt-1">{errors.video_id}</div>}
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    {editingVideo ? 'Mettre à jour' : 'Ajouter'} la vidéo
                                </Button>
                                {editingVideo && (
                                    <Button
                                        type="button"
                                        onClick={() => { setEditingVideo(null); reset(); }}
                                        variant="secondary"
                                    >
                                        Annuler l'édition
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>

                    <hr className="my-8 border-gray-300 dark:border-stone-700" />

                    {/* Tableau des vidéos existantes */}
                    <div className="bg-white dark:bg-stone-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Vidéos existantes</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-stone-700">
                                <thead className="bg-gray-50 dark:bg-stone-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Titre</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID YouTube</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-stone-800 divide-y divide-gray-200 dark:divide-stone-700">
                                    {Array.isArray(videos) && videos.length > 0 ? (
                                        videos.map((video) => (
                                            <tr key={video.id} className="hover:bg-gray-50 dark:hover:bg-stone-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{video.title}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{video.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {video.video_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => handleEdit(video)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                                                        Éditer
                                                    </button>
                                                    <button onClick={() => handleDelete(video.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">
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
        </MainLayout>
    );
};

export default VideoAdmin;