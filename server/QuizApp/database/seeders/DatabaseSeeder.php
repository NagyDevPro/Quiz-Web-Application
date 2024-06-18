<?php

namespace Database\Seeders;

use App\Models\Choice;
use App\Models\Exam;
use App\Models\Question;
use App\Models\StudentExam;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'role'=>'admin',
            'password'=>'123456'
        ]);
        User::factory(10)->create();
        Exam::factory(10)->create();
        Question::factory(10)->create();
        Choice::factory(10)->create();
        StudentExam::factory(10)->create();

        
    }
}
