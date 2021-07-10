<?php

namespace Tests\Feature\Articles;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class listArticlesTest extends TestCase
{
  use RefreshDatabase;
  /**
   * @test
   */
  public function can_fetch_single_article()
  {
    $article = Article::factory()->create();

    $response = $this->jsonApi()->get(route('api.v1.articles.read', $article));

    $response->assertJson([
      'data' => [
        'type' => 'articles',
        'id' => (string) $article->getRouteKey(),
        'attributes' => [
          'title' => $article->title,
          'slug' => $article->slug,
          'content' => $article->content,
          'created-at' => $article->created_at->toAtomString(),
          'updated-at' => $article->updated_at->toAtomString(),
        ],
        'links' => [
          'self' => route('api.v1.articles.read', $article)
        ]
      ]
    ]);

    $this->assertNull($response->json('data.relationships.authors.data'),
    "The key 'data.relationships.authors.data' must be null");
  }
  /**
   * @test
   */
  public function can_fetch_all_articles()
  {
    Article::factory()->times(3)->create();

    $response = $this->jsonApi()->get(route('api.v1.articles.index'));
    $response->assertOk();
    $response->assertJsonCount(3, 'data');
  }

}
