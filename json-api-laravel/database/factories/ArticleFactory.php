<?php

namespace Database\Factories;

use App\Models\{Article, User};
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Article::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'title' => $this->faker->sentence(4),
      'slug' => $this->faker->slug,
      'content' => $this->faker->paragraphs(3, true),
      'category_id' => Category::factory(),
      'user_id' => User::factory(),
    ];
  }
}
