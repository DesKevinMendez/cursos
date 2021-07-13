<?php

namespace Tests\Feature\Articles;

use App\Models\{Article, Category, User};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UpdateArticleTest extends TestCase
{
  use RefreshDatabase;
  /**
   * @test
   */
  public function guests_users_cannot_update_article()
  {
    $article = Article::factory()->create();

    $this->jsonApi()->patch((route('api.v1.articles.update', $article)))
      ->assertStatus(401);
  }
  /**
   * @test
   */
  public function authentcated_users_can_update_their_article()
  {
    $article = Article::factory()->create();

    $category = Category::factory()->create();
    Sanctum::actingAs($user = $article->user, ['articles:update']);

    $this->jsonApi()
      ->withData([
        'type' => 'articles',
        'id' => $article->getRouteKey(),
        'attributes' => [
          'title' => 'title of article',
          'slug' => 'slug-of-article',
          'content' => 'content of article',
        ],
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
      ])->patch((route('api.v1.articles.update', $article)))
      ->assertStatus(200);

    $this->assertDatabaseHas('articles', [
      'title' => 'title of article',
      'slug' => 'slug-of-article',
      'content' => 'content of article'
    ]);
  }

  /**
   * @test
   */
  public function can_replace_the_categories()
  {
    $article = Article::factory()->create();

    $category = Category::factory()->create();
    Sanctum::actingAs(
      $article->user,
      ['articles:modify-categories']
    );

    $this->jsonApi()
      ->withData([
        'type' => 'categories',
        'id' => $category->getRouteKey(),
      ])->patch((route('api.v1.articles.relationships.categories.replace', $article)))
      ->assertStatus(204);

    $this->assertDatabaseHas('articles', [
      'category_id' => $category->id,
    ]);
  }

  /**
   * @test
   */
  public function can_replace_the_author()
  {
    $article = Article::factory()->create();

    $author = User::factory()->create();
    Sanctum::actingAs(
      $article->user,
      ['articles:modify-authors']
    );

    $this->jsonApi()
      ->withData([
        'type' => 'authors',
        'id' => $author->getRouteKey(),
      ])->patch((route('api.v1.articles.relationships.authors.replace', $article)))
      ->assertStatus(204);

    $this->assertDatabaseHas('articles', [
      'user_id' => $author->id,
    ]);
  }
  /**
   * @test
   */
  public function authentcated_users_cannot_update_their_article_without_permissions()
  {
    $article = Article::factory()->create();

    $category = Category::factory()->create();
    Sanctum::actingAs($user = $article->user);

    $this->jsonApi()
      ->withData([
        'type' => 'articles',
        'id' => $article->getRouteKey(),
        'attributes' => [
          'title' => 'title of article',
          'slug' => 'slug-of-article',
          'content' => 'content of article',
        ],
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
      ])->patch((route('api.v1.articles.update', $article)))
      ->assertStatus(403);

    $this->assertDatabaseMissing('articles', [
      'title' => 'title of article',
      'slug' => 'slug-of-article',
      'content' => 'content of article'
    ]);
  }
  /**
   * @test
   */
  public function authentcated_users_cannot_update_others_article()
  {
    $article = Article::factory()->create();

    Sanctum::actingAs(User::factory()->create());

    $this->jsonApi()
      ->withData([
        'type' => 'articles',
        'id' => $article->getRouteKey(),
        'attributes' => [
          'title' => 'title of article',
          'slug' => 'slug-of-article',
          'content' => 'content of article',
        ]
      ])->patch((route('api.v1.articles.update', $article)))
      ->assertStatus(403);

    $this->assertDatabaseMissing('articles', [
      'title' => 'title of article',
      'slug' => 'slug-of-article',
      'content' => 'content of article'
    ]);
  }
  /**
   * @test
   */
  public function can_update_the_title_only()
  {
    $article = Article::factory()->create();

    Sanctum::actingAs($article->user, ['articles:update']);

    $this->jsonApi()
      ->withData([
        'type' => 'articles',
        'id' => $article->getRouteKey(),
        'attributes' => [
          'title' => 'title of article',
        ]
      ])->patch((route('api.v1.articles.update', $article)))
      ->assertStatus(200);

    $this->assertDatabaseHas('articles', [
      'title' => 'title of article',
    ]);
  }
  /**
   * @test
   */
  public function can_update_the_slug_only()
  {
    $article = Article::factory()->create();

    Sanctum::actingAs($article->user, ['articles:update']);

    $this->jsonApi()
      ->withData([
        'type' => 'articles',
        'id' => $article->getRouteKey(),
        'attributes' => [
          'slug' => 'slug-changes',
        ]
      ])->patch((route('api.v1.articles.update', $article)))
      ->assertStatus(200);

    $this->assertDatabaseHas('articles', [
      'slug' => 'slug-changes',
    ]);
  }
}
