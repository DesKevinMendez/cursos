<?php

namespace Tests\Feature\Articles;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SortArticlesTest extends TestCase
{
  use RefreshDatabase;
  /**
   * @test
   */
  public function it_can_sort_articles_by_title_asc()
  {
    Article::factory()->create(['title' => 'C Title']);
    Article::factory()->create(['title' => 'A Title']);
    Article::factory()->create(['title' => 'B Title']);

    $url = route('api.v1.articles.index', ['sort' => 'title']);
    $this->jsonApi()->get($url)->assertSeeInOrder([
      'A Title',
      'B Title',
      'C Title',
    ]);
  }

  /**
   * @test
   */
  public function it_can_sort_articles_by_title_desc()
  {
    Article::factory()->create(['title' => 'C Title']);
    Article::factory()->create(['title' => 'B Title']);
    Article::factory()->create(['title' => 'A Title']);

    $url = route('api.v1.articles.index', ['sort' => '-title']);
    $response = $this->jsonApi()->get($url);
    $response->assertSeeInOrder([
      'C Title',
      'B Title',
      'A Title',
    ]);
  }
  /**
   * @test
   */
  public function it_can_sort_articles_by_title_and_content_desc()
  {
    Article::factory()->create(['title' => 'C Title', 'content' => 'B content']);
    Article::factory()->create(['title' => 'A Title', 'content' => 'C content']);
    Article::factory()->create(['title' => 'B Title', 'content' => 'D content']);

    // \DB::listen(function ($db) {
    //   dump($db->sql);
    // });

    $url = route('api.v1.articles.index') . '?sort=title,-content';
    $response = $this->jsonApi()->get($url);
    $response->assertSeeInOrder([
      'A Title',
      'B Title',
      'C Title',
    ]);

    $url = route('api.v1.articles.index') . '?sort=-content,title';
    $response = $this->jsonApi()->get($url);
    $response->assertSeeInOrder([
      'D content',
      'C content',
      'B content',
    ]);
  }
  /**
   * @test
   */
  public function it_can_sort_articles_by_unknow_fields()
  {
    Article::factory()->times(4)->create();
    $url = route('api.v1.articles.index') . '?sort=unknow';
    $response = $this->jsonApi()->get($url);
    $response->assertStatus(400);
  }
}
