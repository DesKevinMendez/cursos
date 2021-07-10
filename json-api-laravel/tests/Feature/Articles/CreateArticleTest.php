<?php

namespace Tests\Feature\Articles;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CreateArticleTest extends TestCase
{
  use RefreshDatabase;
  /**
   * @test
   */
  public function authenticated_users_can_create_articles()
  {
    $user = User::factory()->create();
    $article = Article::factory()->raw([
      'category_id' => null,
      'user_id' => null
    ]);
    $category = Category::factory()->create();
    Sanctum::actingAs($user, ['articles:create']);

    $this->assertDatabaseMissing('articles', $article);
    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
      'relationships' => [
        'categories' => [
          'data' => [
            'id' => $category->getRouteKey(),
            'type' => 'categories'
          ]
        ],
        'authors' => [
          'data' => [
            'id' => $user->getRouteKey(),
            'type' => 'authors'
          ]
        ]
      ]
    ])->post(route('api.v1.articles.create'))->assertCreated();

    // dd($article);
    $this->assertDatabaseHas('articles', [
      'user_id' => $user->id,
      'title' => $article['title'],
      'slug' => $article['slug'],
      'content' => $article['content'],

    ]);
  }
  /**
   * @test
   */
  public function authenticated_users_cannot_create_articles_without_permissions()
  {
    $user = User::factory()->create();
    $article = Article::factory()->raw();
    $category = Category::factory()->create();
    Sanctum::actingAs($user);

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
      'relationships' => [
        'categories' => [
          'data' => [
            'id' => $category->getRouteKey(),
            'type' => 'categories'
          ]
        ],
        'authors' => [
          'data' => [
            'id' => $user->getRouteKey(),
            'type' => 'authors'
          ]
        ]
      ]
    ])->post(route('api.v1.articles.create'))->assertStatus(403);

    $this->assertDatabaseCount('articles', 0);
  }

  /**
   * @test
   */
  public function authenticated_users_cannot_create_articles_on_behalf_of_another_user()
  {
    $user = User::factory()->create();
    $article = Article::factory()->raw([
      'category_id' => null,
      'user_id' => null,
    ]);
    $category = Category::factory()->create();
    Sanctum::actingAs($user);

    $this->assertDatabaseMissing('articles', $article);
    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
      'relationships' => [
        'categories' => [
          'data' => [
            'id' => $category->getRouteKey(),
            'type' => 'categories'
          ]
        ],
        'authors' => [
          'data' => [
            'id' => User::factory()->create()->getRouteKey(),
            'type' => 'authors'
          ]
        ]
      ]
    ])->post(route('api.v1.articles.create'))
      ->assertStatus(403);

    $this->assertDatabaseCount('articles', 0);
  }
  /**
   * @test
   */
  public function guests_users_cannot_create_articles()
  {
    $article = Article::factory()->raw(['user_id' => null]);


    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))->assertStatus(401);

    // dd($article);
    $this->assertDatabaseMissing('articles', [
      'title' => $article['title'],
      'slug' => $article['slug'],
      'content' => $article['content'],

    ]);
  }
  /**
   * @test
   */
  public function title_is_required()
  {
    $article = Article::factory()->raw(['title' => '']);

    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))
      ->assertStatus(422)->assertSee('The title field is required.');
    $this->assertDatabaseMissing('articles', $article);
  }
  /**
   * @test
   */
  public function category_is_required()
  {
    $article = Article::factory()->raw(['category_id' => null]);

    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))
      ->assertStatus(422)->assertSee('The categories field is required.');
    $this->assertDatabaseMissing('articles', $article);
  }

  /**
   * @test
   */
  public function authors_is_required()
  {
    $article = Article::factory()->raw(['category_id' => null]);
    $category = Category::factory()->create();

    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
      'relationships' => [
        'categories' => [
          'data' => [
            'id' => $category->getRouteKey(),
            'type' => 'categories'
          ]
        ]
      ]
    ])->post(route('api.v1.articles.create'))
      ->assertStatus(422)->assertSee('The authors field is required.');
    $this->assertDatabaseMissing('articles', $article);
  }
  /**
   * @test
   */
  public function category_must_be_relationship_object()
  {
    $article = Article::factory()->raw(['category_id' => null]);

    $article['categories'] = 'slug';
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))
      ->assertStatus(422)->assertSee('The categories field must be a to-one relationship containing categories resources.');
    $this->assertDatabaseMissing('articles', $article);
  }

  /**
   * @test
   */
  public function authors_must_be_relationship_object()
  {
    $article = Article::factory()->raw();
    $category = Category::factory()->create();

    $article['authors'] = 'slug';
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
      'relationships' => [
        'categories' => [
          'data' => [
            'id' => $category->getRouteKey(),
            'type' => 'categories'
          ]
        ]
      ]
    ])->post(route('api.v1.articles.create'))
      ->assertStatus(422)->assertSee('The authors field must be a to-one relationship containing authors resources.');
    $this->assertDatabaseMissing('articles', $article);
  }
  /**
   * @test
   */
  public function content_is_required()
  {
    $article = Article::factory()->raw(['content' => '']);

    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))
      ->assertStatus(422)->assertSee('The content field is required.');
    $this->assertDatabaseMissing('articles', $article);
  }
  /**
   * @test
   */
  public function slug_is_required()
  {
    $article = Article::factory()->raw(['slug' => '']);

    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))
      ->assertStatus(422)->assertSee('The slug field is required.');
    $this->assertDatabaseMissing('articles', $article);
  }
  /**
   * @test
   */
  public function slug_must_be_unique()
  {
    Article::factory()->create(['slug' => 'this-is-slug']);
    $article = Article::factory()->raw(['slug' => '']);
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))
      ->assertStatus(422)->assertSee('The slug field is required.');
    $this->assertDatabaseMissing('articles', $article);
  }
  /**
   * @test
   */
  public function slug_must_only_contain_letters_numbers_and_dashes()
  {
    $article = Article::factory()->raw(['slug' => '#$~~$%S']);
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))
      ->assertStatus(422);
    $this->assertDatabaseMissing('articles', $article);
  }
  /**
   * @test
   */
  public function slug_must_not_contain_underscores()
  {
    $article = Article::factory()->raw(['slug' => 'with_undescores']);
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))
      ->assertSee(trans('validation.no_underscores', ['attribute' => 'slug']))
      ->assertStatus(422);
    $this->assertDatabaseMissing('articles', $article);
  }
  /**
   * @test
   */
  public function slug_must_not_start_with_dashes()
  {
    $article = Article::factory()->raw(['slug' => '-start-with-dashes']);
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))
      ->assertSee(trans('validation.no_starting_dashes', ['attribute' => 'slug']))
      ->assertStatus(422);
    $this->assertDatabaseMissing('articles', $article);
  }
  /**
   * @test
   */
  public function slug_must_not_end_with_dashes()
  {
    $article = Article::factory()->raw(['slug' => 'end-with-dashes-']);
    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()->withData([
      'type' => 'articles',
      'attributes' => $article,
    ])->post(route('api.v1.articles.create'))
      ->assertSee(trans('validation.no_ending_dashes', ['attribute' => 'slug']))
      ->assertStatus(422);
    $this->assertDatabaseMissing('articles', $article);
  }
}
