// resources/js/Components/ContactForm.jsx

import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';

export default function ContactForm({ isDarkMode }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');

        post(route('contact.submit'), {
            onSuccess: () => {
                setSuccessMessage('Merci pour votre message, je vous contacterai au plus vite.');
                reset();
            },
            onError: (formErrors) => {
                console.error('Erreurs de validation:', formErrors);
            },
        });
    };

    return (
        <section id="contact" className={`py-20 lg:py-[120px] overflow-hidden relative z-10 ${isDarkMode ? 'bg-stone-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4 lg:justify-between">
                    <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
                        <div className="max-w-[570px] mb-12 lg:mb-0">
                            <h2 className={`mb-6 uppercase font-bold text-xl sm:text-[30px] lg:text-[40px] xl:text-[42px] ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                Contactez-moi
                            </h2>
                            <p className={`text-base leading-relaxed mb-9 ${isDarkMode ? 'text-amber-500' : 'text-gray-600'}`}>
                                Demande de rendez-vous.
                            </p>
                            
                            {/* Information de contact - Adresse */}
                            <div className="flex mb-8 max-w-[370px] w-full">
                                <div
                                    className="
                                        max-w-[60px] sm:max-w-[70px] w-full h-[60px] sm:h-[70px]
                                        flex items-center justify-center mr-6 overflow-hidden
                                        bg-blue-600 bg-opacity-5 text-blue-600 dark:text-amber-500 rounded
                                    "
                                >
                                    <a href="https://www.google.com/maps/@48.6014125,7.7453507,3a,82.2y,342.96h,79.07t/data=!3m6!1e1!3m4!1s-jtllAfUBQk3a9J9SjiMFw!2e0!7i16384!8i8192" target="_blank" rel="noopener noreferrer">
                                        <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                            <path d="M21.8182 24H16.5584C15.3896 24 14.4156 23.0256 14.4156 21.8563V17.5688C14.4156 17.1401 14.0649 16.7893 13.6364 16.7893H10.4026C9.97403 16.7893 9.62338 17.1401 9.62338 17.5688V21.8173C9.62338 22.9866 8.64935 23.961 7.48052 23.961H2.14286C0.974026 23.961 0 22.9866 0 21.8173V8.21437C0 7.62972 0.311688 7.08404 0.818182 6.77223L11.1039 0.263094C11.6494 -0.0876979 12.3896 -0.0876979 12.9351 0.263094L23.2208 6.77223C23.7273 7.08404 24 7.62972 24 8.21437V21.7783C24 23.0256 23.026 24 21.8182 24ZM10.3636 15.4251H13.5974C14.7662 15.4251 15.7403 16.3995 15.7403 17.5688V21.8173C15.7403 22.246 16.0909 22.5968 16.5195 22.5968H21.8182C22.2468 22.5968 22.5974 22.246 22.5974 21.8173V8.25335C22.5974 8.13642 22.5195 8.01949 22.4416 7.94153L12.1948 1.4324C12.0779 1.35445 11.9221 1.35445 11.8442 1.4324L1.55844 7.94153C1.44156 8.01949 1.4026 8.13642 1.4026 8.25335V21.8563C1.4026 22.285 1.75325 22.6358 2.18182 22.6358H7.48052C7.90909 22.6358 8.25974 22.285 8.25974 21.8563V17.5688C8.22078 16.3995 9.19481 15.4251 10.3636 15.4251Z"/>
                                        </svg>
                                    </a>
                                </div>
                                <div className="w-full">
                                    <h4 className={`mb-1 text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Octopus</h4>
                                    <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        21-23 rue Ste Madeleine - Strasbourg
                                    </p>
                                </div>
                            </div>

                            {/* Information de contact - Téléphone */}
                            <div className="flex mb-8 max-w-[370px] w-full">
                                <div
                                    className="
                                        max-w-[60px] sm:max-w-[70px] w-full h-[60px] sm:h-[70px]
                                        flex items-center justify-center mr-6 overflow-hidden
                                        bg-blue-600 bg-opacity-5 text-blue-600 dark:text-amber-500 rounded
                                    "
                                >
                                    <svg width="24" height="26" viewBox="0 0 24 26" className="fill-current">
                                        <path d="M22.6149 15.1386C22.5307 14.1704 21.7308 13.4968 20.7626 13.4968H2.82869C1.86042 13.4968 1.10265 14.2125 0.97636 15.1386L0.092295 23.9793C0.0501967 24.4845 0.21859 25.0317 0.555377 25.4106C0.892163 25.7895 1.39734 26 1.94462 26H21.6887C22.1939 26 22.6991 25.7895 23.078 25.4106C23.4148 25.0317 23.5832 24.5266 23.5411 23.9793L22.6149 15.1386ZM21.9413 24.4424C21.8992 24.4845 21.815 24.5687 21.6466 24.5687H1.94462C1.81833 24.5687 1.69203 24.4845 1.64993 24.4424C1.60783 24.4003 1.52364 24.3161 1.56574 24.1477L2.4498 15.2649C2.4498 15.0544 2.61819 14.9281 2.82869 14.9281H20.8047C21.0152 14.9281 21.1415 15.0544 21.1835 15.2649L22.0676 24.1477C22.0255 24.274 21.9834 24.4003 21.9413 24.4424Z"/>
                                        <path d="M11.7965 16.7805C10.1547 16.7805 8.84961 18.0855 8.84961 19.7273C8.84961 21.3692 10.1547 22.6742 11.7965 22.6742C13.4383 22.6742 14.7434 21.3692 14.7434 19.7273C14.7434 18.0855 13.4383 16.7805 11.7965 16.7805ZM11.7965 21.2008C10.9966 21.2008 10.3231 20.5272 10.3231 19.7273C10.3231 18.9275 10.9966 18.2539 11.7965 18.2539C12.5964 18.2539 13.2699 18.9275 13.2699 19.7273C13.2699 20.5272 12.5964 21.2008 11.7965 21.2008Z"/>
                                        <path d="M1.10265 7.85562C1.18684 9.70794 2.82868 10.4657 3.67064 10.4657H6.61752C6.65962 10.4657 6.65962 10.4657 6.65962 10.4657C7.92257 10.3815 9.18552 9.53955 9.18552 7.85562V6.84526C10.5748 6.84526 13.7742 6.84526 15.1635 6.84526V7.85562C15.1635 9.53955 16.4264 10.3815 17.6894 10.4657H17.7315H20.6363C21.4782 10.4657 23.1201 9.70794 23.2043 7.85562C23.2043 7.72932 23.2043 7.26624 23.2043 6.84526C23.2043 6.50847 23.2043 6.21378 23.2043 6.17169C23.2043 6.12959 23.2043 6.08749 23.2043 6.08749C23.078 4.90874 22.6570 3.94047 21.9413 3.18271L21.8992 3.14061C20.8468 2.17235 19.5838 1.62507 18.6155 1.28828C15.7950 0.193726 12.2587 0.193726 12.0903 0.193726C9.60650 0.235824 8.00677 0.446315 5.60716 1.28828C4.68100 1.58297 3.41805 2.13025 2.36559 3.09851L2.32350 3.14061C1.60782 3.89838 1.18684 4.86664 1.06055 6.04539C1.06055 6.08749 1.06055 6.12959 1.06055 6.12959C1.06055 6.21378 1.06055 6.46637 1.06055 6.80316C1.10265 7.18204 1.10265 7.68722 1.10265 7.85562ZM3.37595 4.15097C4.21792 3.39320 5.27038 2.93012 6.15444 2.59333C8.34355 1.79346 9.77490 1.62507 12.1745 1.58297C12.3429 1.58297 15.6266 1.62507 18.1525 2.59333C19.0365 2.93012 20.0890 3.35110 20.9310 4.15097C21.3940 4.65615 21.6887 5.32972 21.7729 6.12959C21.7729 6.25588 21.7729 6.46637 21.7729 6.80316C21.7729 7.22414 21.7729 7.68722 21.7729 7.81352C21.7308 8.78178 20.8047 8.99227 20.6784 8.99227H17.7736C17.3526 8.95017 16.6790 8.78178 16.6790 7.85562V6.12959C16.6790 5.79280 16.4685 5.54021 16.1738 5.41392C15.9213 5.32972 8.55405 5.32972 8.30146 5.41392C8.00677 5.49811 7.79628 5.79280 7.79628 6.12959V7.85562C7.79628 8.78178 7.12270 8.95017 6.70172 8.99227H3.79694C3.67064 8.99227 2.74448 8.78178 2.70238 7.81352C2.70238 7.68722 2.70238 7.22414 2.70238 6.80316C2.70238 6.46637 2.70238 6.29798 2.70238 6.17169C2.61818 5.32972 2.91287 4.65615 3.37595 4.15097Z"/>
                                    </svg>
                                </div>
                                <div className="w-full">
                                    <h4 className={`mb-1 text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                        Email
                                    </h4>
                                    <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>ly@octopus-philosophie.fr</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                        <div className={`relative p-8 rounded-lg shadow-lg sm:p-12 ${isDarkMode ? 'bg-stone-800' : 'bg-white'}`}>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {successMessage && (
                                    <div className="px-6 py-4 mb-4 text-gray-100 bg-green-600 rounded-md">
                                        {successMessage}
                                    </div>
                                )}
                                
                                <div className="mb-6">
                                    <Label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Votre nom</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Votre nom"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`mt-1 block w-full ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                
                                <div className="mb-6">
                                    <Label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Votre Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Votre Email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`mt-1 block w-full ${errors.email ? 'border-red-500 focus:border-500' : ''}`}
                                    />
                                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>
                                
                                <div className="mb-6">
                                    <Label htmlFor="message" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Votre Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Votre Message"
                                        rows="6"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className={`mt-1 block w-full ${errors.message ? 'border-red-500 focus:border-500' : ''}`}
                                    />
                                    {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
                                </div>
                                
                                <div>
                                    <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                        Envoi
                                    </Button>
                                </div>
                            </form>
                            {/* Decorative elements - Replaced x-contact-dots-top/bottom with inline SVGs if needed */}
                            <div>
                                <span className="absolute -top-10 -right-9 z-[-1]">
                                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z" fill="#CAC6D3"/>
                                    </svg>
                                </span>
                                {/* Assuming x-contact-dots-top and x-contact-dots-bottom are simple SVG/HTML or can be omitted for now */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
