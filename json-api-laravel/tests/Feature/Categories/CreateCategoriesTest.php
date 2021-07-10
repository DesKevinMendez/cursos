<?php

namespace Tests\Feature\Categories;

use App\Models\{Category, User};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CreateCategoriesTest extends TestCase
{
  use RefreshDatabase;
  /**
   * @test
   */
  public function guess_users_cannot_create_categories()
  {
    $category = Category::factory()->raw();

    $this->jsonApi()->withData([
      'type' => 'categories',
      'attributes' => $category
    ])->post(route('api.v1.categories.create'))
      ->assertStatus(401);

    $this->assertDatabaseMissing('categories', $category);
  }
  /**
   * @test
   */
  public function authenticated_users_can_create_categories()
  {
    $category = Category::factory()->raw();
    $user = User::factory()->create();

    $this->assertDatabaseMissing('categories', $category);
    Sanctum::actingAs($user);

    $this->jsonApi()->withData([
      'type' => 'categories',
      'attributes' => $category
    ])->post(route('api.v1.categories.create'))
      ->assertCreated();

    $this->assertDatabaseHas('categories', [
      'name' => $category['name'],
      'slug' => $category['slug'],
    ]);
  }
  /**
   * @test
   */
  public function name_is_required()
  {
    $category = Category::factory()->raw(['name' => '']);
    $user = User::factory()->create();

    Sanctum::actingAs($user);

    $this->jsonApi()->withData([
      'type' => 'categories',
      'attributes' => $category
    ])->post(route('api.v1.categories.create'))
      ->assertStatus(422);
    $this->assertDatabaseMissing('categories', $category);
  }
  /**
   * @test
   */
  public function slug_is_required()
  {
    $category = Category::factory()->raw(['slug' => '']);
    $user = User::factory()->create();

    Sanctum::actingAs($user);

    $this->jsonApi()->withData([
      'type' => 'categories',
      'attributes' => $category
    ])->post(route('api.v1.categories.create'))
      ->assertStatus(422);
    $this->assertDatabaseMissing('categories', $category);
  }
  /**
   * @test
   */
  public function slug_must_be_unique()
  {
    Category::factory()->create(['slug' => 'this-slug']);
    $category = Category::factory()->raw(['slug' => 'this-slug']);
    $user = User::factory()->create();

    Sanctum::actingAs($user);

    $this->jsonApi()->withData([
      'type' => 'categories',
      'attributes' => $category
    ])->post(route('api.v1.categories.create'))
      ->assertStatus(422);
    $this->assertDatabaseMissing('categories', $category);
  }
  /**
   * @test
   */
  public function slug_must_only_contain_letters_numbers_and_dashes()
  {
    $category = Category::factory()->raw(['slug' => '#$~~$%S']);
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'categories',
      'attributes' => $category,
    ])->post(route('api.v1.categories.create'))
      ->assertStatus(422);
    $this->assertDatabaseMissing('categories', $category);
  }
  /**
   * @test
   */
  public function slug_must_not_contain_underscores()
  {
    $category = Category::factory()->raw(['slug' => 'with_undescores']);
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'categories',
      'attributes' => $category,
    ])->post(route('api.v1.categories.create'))
      ->assertSee(trans('validation.no_underscores', ['attribute' => 'slug']))
      ->assertStatus(422);
    $this->assertDatabaseMissing('categories', $category);
  }
  /**
   * @test
   */
  public function slug_must_not_start_with_dashes()
  {
    $category = Category::factory()->raw(['slug' => '-start-with-dashes']);
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'categories',
      'attributes' => $category,
    ])->post(route('api.v1.categories.create'))
      ->assertSee(trans('validation.no_starting_dashes', ['attribute' => 'slug']))
      ->assertStatus(422);
    $this->assertDatabaseMissing('categories', $category);
  }
  /**
   * @test
   */
  public function slug_must_not_end_with_dashes()
  {
    $category = Category::factory()->raw(['slug' => 'end-with-dashes-']);
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'categories',
      'attributes' => $category,
    ])->post(route('api.v1.categories.create'))
      ->assertSee(trans('validation.no_ending_dashes', ['attribute' => 'slug']))
      ->assertStatus(422);
    $this->assertDatabaseMissing('categories', $category);
  }
}
