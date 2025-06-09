<!-- ====== Portfolio Section Start -->
<section
  id="enseignement"
  x-data="
        {
          selectedTab: 'all',
          activeClasses: 'bg-primary text-primary',
          inactiveClasses: 'text-body-color hover:bg-primary hover:text-primary',
        }
      "
  class="pt-8 lg:pt-[120px] pb-12 lg:pb-[90px]"
>
  <div class="block">
    <div class="flex flex-wrap bg-stone-500 -mx-4">
      <div class="w-full px-4 mt-8">
        <div class="text-center mx-auto mb-[60px] max-w-[510px]">
          <h2 class="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark dark:text-primary mb-4">
            Enseignement
          </h2>
          <p class="text-secondary text-body-color">
            Découvrez les spécificités et les techniques par disciplines.
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-center mt-4 mx-4">
      <div class="w-full px-4">
        <ul class="flex flex-wrap justify-center mb-12 space-x-1">
          <li class="mb-1">
            <button
              @click="selectedTab = 'all' "
              :class="selectedTab == 'all' ? activeClasses : inactiveClasses "
              class="inline-block px-5 py-2 text-base font-semibold text-center transition rounded-lg md:py-3 lg:px-8 ">
              Toutes
            </button>
          </li>
          @foreach($tabs as $tab)
          <li class="mb-1">
            <button
              @click="selectedTab = '{{$tab}}' "
              :class="selectedTab === '{{$tab}}' ? activeClasses : inactiveClasses "
              class="inline-block px-5 py-2 text-base font-semibold text-center transition rounded-lg md:py-3 lg:px-8 ">
              {{$tab}}
            </button>
          </li>
          @endforeach
        </ul>
      </div>
    </div>
    <div class="flex flex-wrap -mx-4">
      @foreach ($items as $item)
        <x-portfolio-item :title="$item['title']"
                          :categories="$item['category']"
                          :image="$item['image']"
                          :github="$item['github']"></x-portfolio-item>
      @endforeach
    </div>
  </div>
</section>
<!-- ====== Portfolio Section End -->
