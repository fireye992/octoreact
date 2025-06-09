<div
  x-data="{categories: {{ json_encode($categories) }} }"
  :class="selectedTab == 'all' || categories.includes(selectedTab) ? 'block' : 'hidden' "
  class="w-full px-4 md:w-1/2 xl:w-1/3"
>
  <div class="relative mb-12 bg">
    <a href="{{$github}}" target="_blank">
      <div class="overflow-hidden duration-100 ease-in rounded-lg hover:scale-105">
        <img
          src="{{ $image }}"
          alt="portfolio"
          class="w-full h-[260px] object-cover"
        />
      </div>
    </a>
    <div
      class="text-center bg-white dark:bg-stone-300 relative z-10 py-9 px-3 rounded-lg shadow-lg mx-7 -mt-4 h-[260px]">
      <span class="block mb-2 text-sm font-semibold text-primary">
        {{ implode(", ", $categories) }}
      </span>
      <h3 class="mb-4 text-lg font-bold text-dark dark:text-primary">
        {{ $title }}
      </h3>
      <x-button-link :href="$github" variant="outline-primary">Détails</x-button-link>
    </div>
  </div>
</div>
