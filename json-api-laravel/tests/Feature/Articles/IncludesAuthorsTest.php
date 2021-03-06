<?php

namespace Tests\Feature\Articles;

use App\Models\{Article};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IncludesAuthorsTest extends TestCase
{
  use RefreshDatabase;
  /**
   * @test
   */
  public function can_include_authors()
  {
    $article = Article::factory()->create();
    $this->jsonApi()
      ->includePaths('authors')
      ->get(route('api.v1.articles.read', $article))
      //->assertSee($article->user->name)
      ->assertJsonFragment([
        'related' => route('api.v1.articles.relationships.authors', $article)
      ])
      ->assertJsonFragment([
        'self' => route('api.v1.articles.relationships.authors.read', $article)
      ]);
  }
  /**
   * @test
   */
  public function can_fetch_related_authors()
  {
    $article = Article::factory()->create();

    $url = route('api.v1.articles.relationships.authors', $article);
    $urlRead = route('api.v1.articles.relationships.authors.read', $article);

    $this->jsonApi()->get($url)
      ->assertSee($article->user->name);

    $this->jsonApi()->get($urlRead)
      ->assertSee($article->user->id);
  }
}
