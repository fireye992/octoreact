<!-- ====== Cards Section Start -->
<section id="tutos" class="pt-16 pb-16 dark:bg-stone-800">
    <div class="container">
        <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4">
                <div class="text-center mx-auto mb-[60px] max-w-[510px]">
                    <h2 class="mb-4 text-3xl font-bold text-dark dark:text-gray-300">
                        Les medias à tentacules
                    </h2>
                    <p class="text-base text-body-color">
                        Il faut savoir s'arrêter
                    </p>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-4">
            @foreach ($videoTutorials as $video)
                {{-- Les attributs sont convertis en camelCase pour le constructeur du composant --}}
                <x-video-tutorial-item :video-id="$video['video_id']" {{-- La clé dans ton tableau $video est 'video_id' (snake_case) --}} :title="$video['title']" :description="$video['description']" />
            @endforeach
        </div>
        <div class="flex justify-center">
            <x-button-link href="https://www.youtube.com/channel/UCCF2FQG9YT4vBkgsFZdnMZw" target="_blank"
                class="rounded-lg">
                Voir toutes les videos
            </x-button-link>
        </div>
    </div>
</section>
<!-- ====== Cards Section End -->
