<?php

namespace Tests\Feature\Commands;

use App\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GeneratePermissionTest extends TestCase
{
  use RefreshDatabase;
  /**
   * @test
   */
  public function can_geernate_permission_for_registered_api_resources()
  {
    config([
      'json-api-v1.resources' => [
        'articles' => \App\Models\Article::class
      ]
    ]);

    $this->artisan('generate:permissions')
      ->expectsOutput('Permissions generated');

    foreach (Permission::$abilities as $ability) {
      $this->assertDatabaseHas('permissions', [
        'name' => "articles:{$ability}"
      ]);
    }


    $this->artisan('generate:permissions')
      ->expectsOutput('Permissions generated');

    $this->assertDatabaseCount('permissions', count(Permission::$abilities));
  }
}
