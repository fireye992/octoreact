<!-- === Navbar Section Start -->
<header
x-data="{navbarOpen: false}"
class="fixed top-0 left-0 z-50 flex items-center w-full h-24 bg-primary shadow-md dark:bg-secondary"
>
<div class="container">
    <div class="relative flex items-center justify-between mx-4">
        <div class="max-w-full pl-4 w-100">
         <a href="/" class="flex items-center w-full py-2">
             <img
             src="{{ url('/img/octo/logo-8phyL.png') }}"
             alt="logo"
             class="w-[70px] lg:w-[70px] inline-block dark:hidden"
             />
             <img
             src="{{ url('/img/octo/logo-8phy.png') }}"
             alt="logo"
             class="w-[70px] lg:w-[70px] hidden dark:inline-block"
             />
             <span class="ml-2 text-xl xl:text-2xl font-bold text-amber-600 dark:secondary"></span> <!-- il y avait un tire dans ce span -->
        </a>
        </div>
        <div class="flex items-center justify-end w-full px-4">
          <div>
             <x-layout.navbar-hamburger
             @click="navbarOpen = !navbarOpen"
             x-bind:class="navbarOpen && 'navbarTogglerActive'">
             </x-layout.navbar-hamburger>
             <nav
             :class="!navbarOpen && 'hidden'"
             id="navbarCollapse"
             class="absolute right-0 z-50 w-full px-6 py-5 bg-primary rounded-lg shadow top-full dark:bg-secondary dark:text-secondary lg:px-0 lg:max-w-full lg:right-4 lg:block lg:static lg:shadow-none"
             >
             <ul class="block lg:flex lg:items-center">
               @foreach($navigationItems as $item)
                <x-layout.navbar-item :href="$item['href']">{{ $item['label'] }}</x-layout.navbar-item>
               @endforeach
               <div class="relative ml-0 lg:ml-10 xl:ml-16 top-1"> <!-- etudier ce code qui decalle le youtube -->
               <div class="g-ytsubscribe" data-channelid="UCCF2FQG9YT4vBkgsFZdnMZw" data-layout="defaut" data-count="defaut"></div>
               </div>
             </ul>
            </nav>
          </div>
        </div>
    </div>
</div>
</header>
<!-- ======= Navbar Section End -->
