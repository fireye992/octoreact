<!-- ====== Cards Section Start -->
<section id="tutos" class="pt-24 pb-16 dark:bg-stone-800">
    <div class="container">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div class="text-center mx-auto mb-[60px] max-w-[510px]">
            <h2 class="mb-4 text-3xl font-bold text-dark dark:text-gray-300">
              Tutos & combats
            </h2>
            <p class="text-base text-body-color">
              N'oubliez pas sans pratique régulière, sinon les tutos ne servent à rien.
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-4">
        @foreach($videoTutorials as $video)
          <x-video-tutorial-item :video-id="$video['videoId']" :title="$video['title']"
                                 :description="$video['description']"></x-video-tutorial-item>
        @endforeach
      </div>
      <div class="flex justify-center">
        <x-button-link href="https://www.youtube.com/channel/UCf_G5MhFombgS5jiu68QYsg" target="_blank" class="rounded-lg">
          Voir toutes les videos
        </x-button-link>
      </div>
    </div>
  </section>
  <!-- ====== Cards Section End -->
