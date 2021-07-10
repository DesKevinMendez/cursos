<?php

namespace Tests\Feature\Categories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UpdateCategoriesTest extends TestCase
{
  use RefreshDatabase;
  /**
   * @test
   */
  public function guests_users_cannot_update_category()
  {
    $category = Category::factory()->create();

    $this->jsonApi()->patch((route('api.v1.categories.update', $category)))
      ->assertStatus(401);
  }
  /**
   * @test
   */
  public function authentcated_users_can_update_category()
  {
    $category = Category::factory()->create();

    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()
      ->withData([
        'type' => 'categories',
        'id' => (string) $category->getRouteKey(),
        'attributes' => [
          'name' => 'name of category',
          'slug' => 'slug-of-category',
        ]
      ])->patch((route('api.v1.categories.update', $category)))
      ->assertStatus(200);

    $this->assertDatabaseHas('categories', [
      'name' => 'name of category',
      'slug' => 'slug-of-category',
    ]);
  }
}
