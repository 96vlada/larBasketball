<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LeagueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('leagues')->insert([
            'league_name' => "Eurocup",
            'league_image' => file_get_contents("public/images/eurocup.jpeg"),
            // 'password' => Hash::make('password'),
        ]);
    }
}
