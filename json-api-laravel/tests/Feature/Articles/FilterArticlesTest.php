<?php

namespace Tests\Feature\Articles;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FilterArticlesTest extends TestCase
{
  use RefreshDatabase;
  /**
   * @test
   */
  public function can_filter_articles_by_title()
  {
    Article::factory()->create([
      'title' => 'Aprende Laravel'
    ]);
    Article::factory()->create([
      'title' => 'other article'
    ]);

    $url  = route('api.v1.articles.index', ['filter[title]' => 'Laravel']);

    $this->jsonApi()->get($url)
      ->assertJsonCount(1, 'data')
      ->assertSee('Aprende Laravel');
  }
  /**
   * @test
   */
  public function can_filter_articles_by_content()
  {
    Article::factory()->create([
      'content' => 'Aprende Laravel content'
    ]);
    Article::factory()->create([
      'content' => 'other article'
    ]);

    $url  = route('api.v1.articles.index', ['filter[content]' => 'Laravel']);

    $this->jsonApi()->get($url)
      ->assertJsonCount(1, 'data')
      ->assertSee('Aprende Laravel content');
  }
  /**
   * @test
   */
  public function can_filter_articles_by_year()
  {
    Article::factory()->create([
      'title' => 'Article from 2020',
      'created_at' => now()->year(2020)
    ]);
    Article::factory()->create([
      'title' => 'Article from 2019',
      'created_at' => now()->year(2019)
    ]);

    $url  = route('api.v1.articles.index', ['filter[year]' => 2020]);

    $this->jsonApi()->get($url)
      ->assertJsonCount(1, 'data')
      ->assertSee('Article from 2020');
  }
  /**
   * @test
   */
  public function can_filter_articles_by_month()
  {
    Article::factory()->create([
      'title' => 'Article from February',
      'created_at' => now()->day(1)->month(2)
    ]);
    Article::factory()->create([
      'title' => 'Article from January',
      'created_at' => now()->day(1)->month(1)
    ]);

    $url  = route('api.v1.articles.index', ['filter[month]' => 2]);

    $this->jsonApi()->get($url)
      ->assertJsonCount(1, 'data')
      ->assertSee('Article from February');
  }
  /**
   * @test
   */
  public function cannot_filter_articles_by_unknown_filter()
  {
    Article::factory()->create();

    $url  = route('api.v1.articles.index', ['filter[unknown]' => 2]);

    $this->jsonApi()->get($url)
      ->assertStatus(400);
  }
  /**
   * @test
   */
  public function can_search_articles_by_title_and_content_filter()
  {
    Article::factory()->create([
      'title' => 'this is a title of an article',
      'content' => 'Just content'
    ]);
    Article::factory()->create([
      'title' => 'this is another title of an article',
      'content' => 'Just content and more content'
    ]);
    Article::factory()->create([
      'title' => 'this is a random',
      'content' => 'dont show'
    ]);

    $url  = route('api.v1.articles.index', ['filter[search]' => 'title']);

    $this->jsonApi()->get($url)
      ->assertJsonCount(2, 'data')
      ->assertSee('this is a title of an article')
      ->assertSee('this is another title of an article')
      ->assertDontSee('this is a random');
  }
  /**
   * @test
   */
  public function can_search_articles_by_title_and_content_with_multiple_terms()
  {
    Article::factory()->create([
      'title' => 'this is a title of an article',
      'content' => 'Just content'
    ]);
    Article::factory()->create([
      'title' => 'this is another title of an article',
      'content' => 'Just content and more content'
    ]);
    Article::factory()->create([
      'title' => 'this is a random',
      'content' => 'dont show'
    ]);
    Article::factory()->create([
      'title' => 'another laravel',
      'content' => 'dont show content'
    ]);

    $url  = route('api.v1.articles.index', ['filter[search]' => 'title laravel']);

    $this->jsonApi()->get($url)
      ->assertJsonCount(3, 'data')
      ->assertSee('this is a title of an article')
      ->assertSee('this is another title of an article')
      ->assertDontSee('this is a random');
  }

  /**
   * @test
   */
  function can_filter_articles_by_category()
  {
    Category::factory()->count(3)->create();
    $category = Category::factory()
      ->hasArticles(2)->create();

    $url  = route('api.v1.articles.index');
    $this->jsonApi()
      ->filter(['categories' => $category->getRouteKey()])
      ->get($url)
      ->assertJsonCount(2, 'data');
  }

  /**
   * @test
   */
  function can_filter_articles_by_multiple_categories()
  {
    Category::factory()->count(3)->create();
    $category = Category::factory()
      ->hasArticles(2)->create();
    $category2 = Category::factory()
      ->hasArticles(4)->create();

    $url  = route('api.v1.articles.index');
    $this->jsonApi()
      ->filter(['categories' => 
        $category->getRouteKey().','.$category2->getRouteKey()
      ])
      ->get($url)
      ->assertJsonCount(6, 'data');
  }
}
