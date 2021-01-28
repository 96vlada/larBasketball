<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\League;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\DB;

class LeaguesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexFrontPage()
    {

        $leagues = League::orderByDesc('id')->paginate(3);

        return view('index', ['leagues' => $leagues]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        // $leagues = League::all();

        $leagues = League::orderByDesc('id')->paginate(2);

        // $leagues = DB::table('leagues')->get()->paginate(5);

        // dd($leagues);

        return response()->json([
            'leagues' => $leagues
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if ($request->hasFile('league_image')) {
            $this->validate($request, [
                'league_name' => 'required|min:2',
                'league_image' => 'image|mimes:jpg,png'
            ]);
            $image_file = $request->file('league_image');
            $imageType = $image_file->getClientOriginalExtension();
            $image = Image::make($image_file)->resize(200, 150)->encode('data-url');
        } else {
            $image = "";
            $this->validate($request, [
                'league_name' => 'required|min:2',
            ]);
        }


        $league = League::create([
            'league_name' => $request->league_name,
            'league_image' => $image,
        ]);

        $league->save();

        $created_league = League::orderBy('id', "desc")->first();


        if (isset($validator)) {
            return response()->json($validator->messages(), 200);
        } else {
            return response()->json([
                "leagues" => $created_league,
                "success" => "League created successfully",
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $leagueForEdit = League::findOrFail($id);

        return response()->json([
            'league' => $leagueForEdit
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        if ($request->hasFile('league_image')) {
            $this->validate($request, [
                'league_name' => 'required|min:2',
                'league_image' => 'image|mimes:jpg,png'
            ]);
            $image_file = $request->file('league_image');
            $image = Image::make($image_file)->resize(200, 150)->encode('data-url');

            $updated_league = League::where('id', $id)
                ->update([
                    'league_name' => $request->league_name,
                    'league_image' => $image,
                ]);
        } else {
            // $image = "";
            $this->validate($request, [
                'league_name' => 'required|min:2',
            ]);

            $updated_league = League::where('id', $id)
                ->update([
                    'league_name' => $request->league_name,
                ]);
        }



        $findUpdatedLeague = League::findOrFail($id);
        // $updated_league->save();


        if (isset($validator)) {
            return response()->json($validator->messages(), 200);
        } else {
            return response()->json([
                "leagues" => $findUpdatedLeague,
                "success" => "League updated successfully",
            ]);
        }

        // return response()->json([
        //     'id' => $id
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleteLeague = League::findOrFail($id);
        $deleteLeague->delete();
    }
}
