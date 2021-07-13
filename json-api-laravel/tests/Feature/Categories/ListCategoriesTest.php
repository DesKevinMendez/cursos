<?php

namespace Tests\Feature\Categories;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListCategoriesTest extends TestCase
{
  use RefreshDatabase;
  /**
   * @test
   */
  public function can_fetch_single_category()
  {
    $category = Category::factory()->create();

    $response = $this->jsonApi()->get(route('api.v1.categories.read', $category));

    $response->assertJson([
      'data' => [
        'type' => 'categories',
        'id' => (string) $category->getRouteKey(),
        'attributes' => [
          'name' => $category->name,
          'slug' => $category->slug,
        ],
        'links' => [
          'self' => route('api.v1.categories.read', $category)
        ]
      ]
    ]);

    $this->assertNull(
      $response->json('data.relationships.authors.data'),
      "The key 'data.relationships.authors.data' must be null"
    );
  }
  /**
   * @test
   */
  public function can_fetch_all_categories()
  {
    Category::factory()->times(3)->create();

    $response = $this->jsonApi()->get(route('api.v1.categories.index'));
    $response->assertOk();
    $response->assertJsonCount(3, 'data');
  }
}
