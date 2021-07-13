<?php

namespace App\Console\Commands;

use App\Models\Permission;
use Illuminate\Console\Command;

class GeneratePermissions extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'generate:permissions';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Generate permissions for registerd api resources';

  /**
   * Create a new command instance.
   *
   * @return void
   */
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Execute the console command.
   *
   * @return int
   */
  public function handle()
  {
    $resources = config('json-api-v1.resources');

    foreach ($resources as $resource => $class) {
      $this->comment("Permissions for '{$resource}'");
      foreach (Permission::$abilities as $ability) {
        Permission::firstOrCreate([
          'name' =>$line = "{$resource}:{$ability}"
        ]);
        $this->line($line);
      }
    }
    $this->info('Permissions generated');
  }
}
