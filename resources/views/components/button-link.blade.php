<a
  href="{{$href}}"
  target="{{$target}}"
  {{
    $attributes->class([
      'py-4 px-6 md:px-9 lg:px-6 xl:px-9 rounded leading-normal border inline-block transition',
      'hover:bg-primary hover:border-primary hover:text-primary' => $variant === 'outline-primary',
      'hover:bg-red-700 hover:border-red-700 hover:text-white' => $variant === 'outline-red',
      'bg-red-700 border-red-700 text-white hover:bg-red-800 ' => $variant === 'red',
      'bg-secondary border-gray-700 text-secondary hover:bg-secondary ' => $variant === 'dark',
      '
      bg-primary
      border-primary
      text-primary
      hover:text-primary
      hover:bg-primary
      hover:border-primary
      dark:bg-secondary
      dark:border-secondary
      dark:text-secondary
      hover:dark:text-secondary
      hover:dark:bg-primary
      '
      => $variant === 'primary',
    ])
  }}
>
  {{$slot}}
</a>
