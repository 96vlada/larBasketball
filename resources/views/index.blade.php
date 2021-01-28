@extends('layouts.app')

@section('content')

<div class="container-fluid">

    <div class="row">

        {{-- navbar start --}}

        <div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-2 admin-dashboard border-right p-2 shadow">

            {{-- links --}}

            <div class="links mt-2">

                <a class="text-white btn btn-danger d-block p-3 mt-1" href="#frontPageLeagues">
                    <h4 class="mb-0"><i class="fas fa-trophy"></i> Leagues</h4>
                </a>


            </div>

        </div>
        {{-- navbar end --}}


        {{-- main area start --}}
        <div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-10 mt-3">

            <div id="frontPageLeagues" class="alert alert-info shadow">
                <h2 class="mb-0">Leagues</h2>
            </div>

            <ul class="list-group shadow">
                @foreach ($leagues as $league)

                <li class="list-group-item d-flex align-items-center">
                    @if ($league->league_image == "")

                    <img src="{{asset('images/no-image.png')}}" alt="" style="width: 50px; height: 60px;">
                    @else
                    <img src="{{ $league->league_image }}" alt="" style="width: 50px; height: 60px;">
                    @endif

                    <h4 class="mb-0 ml-3">
                        {{$league->league_name}}
                    </h4>
                </li>
                @endforeach


            </ul>

            <div class="mt-4">
                {{$leagues->links()}}
            </div>

        </div>
        {{-- main area end --}}



    </div>



</div>

@endsection