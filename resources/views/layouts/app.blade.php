<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/@fortawesome/fontawesome-free/css/all.css') }}">

</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-info shadow border-primary border-bottom">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center" href="{{ url('/') }}">
                    <i class="fas fa-basketball-ball fa-3x"></i>
                    <div class="ml-3">
                        <h2 class="mb-0">{{ config('app.name', 'Laravel') }}</h2>
                        <h5 clkass="mb-0">laravel/React sport app</h5>
                    </div>

                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link btn btn-danger text-white m-1" href="/">
                                <h4 class="mb-0"><i class="fas fa-home"></i> Home</h4>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn btn-warning text-dark m-1" href="/">
                                <h4 class="mb-0"><i class="fas fa-info-circle"></i> About app</h4>
                            </a>
                        </li>
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">


                        <!-- Authentication Links -->
                        @guest
                        @if (Route::has('login'))
                        <li class="nav-item">
                            <a class="nav-link btn btn-light text-dark shadow m-1 m-sm-1 m-md-1 m-lg-1 m-xl-0 mt-2 mt-sm-2 mt-md-2 mt-lg-2 mt-xl-0"
                                href="{{ route('login') }}">{{ __('Login') }}</a>
                        </li>
                        @endif

                        @if (Route::has('register'))
                        <li class="nav-item">
                            <a class="nav-link btn btn-success text-light shadow m-1 m-sm-1 m-md-1 m-lg-1 m-xl-0 mt-2 mt-sm-2 mt-md-2 mt-lg-2 mt-xl-0 ml-0 ml-sm-0 ml-md-0 ml-lg-0 ml-xl-2"
                                href="{{ route('register') }}">{{ __('Register') }}</a>
                        </li>
                        @endif
                        @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link btn btn-success text-white dropdown-toggle h4"
                                href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                v-pre>
                                {{ Auth::user()->name }}
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

                                <a class="dropdown-item" href="/dashboard">
                                    Dashboard
                                </a>
                                <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </div>
                        </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="">
            @yield('content')
        </main>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="{{asset('js/custom.js')}}"></script>
    <script>
        $(function(){
        
            $('input[type="file"]').on('change',function(){
            //get the file name
            var fileName = $(this).val().split('\\').pop();
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileName);
            });

        });
       
    </script>
</body>

</html>