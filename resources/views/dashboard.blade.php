@extends('layouts.app')

@section('content')

<div class="container-fluid">

    <div class="row">

        {{-- admin dashboard start --}}

        <div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 admin-dashboard border-right p-2 shadow">

            <div
                class="logo bg-info p-3 text-white rounded shadow-sm text-center text-sm-center text-md-center text-lg-left text-xl-left">
                <div class="text-center">
                    <i class="fas fa-tachometer-alt fa-3x"></i>
                </div>
                <h2>JovaDev Sport app</h2>
                <h5>Admin Dashboard</h5>
            </div>

            {{-- links --}}

            <div class="links mt-2">

                <a class="text-white btn btn-danger d-block p-3 mt-1" href="#leagues">
                    <h4 class="mb-0"><i class="fas fa-trophy"></i> Leagues</h4>
                </a>


            </div>

        </div>
        {{-- admin dashboard end --}}


        {{-- main area start --}}
        <div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 mt-3">


            <div id="leagues"></div>


        </div>
        {{-- main area end --}}



    </div>



</div>

@endsection