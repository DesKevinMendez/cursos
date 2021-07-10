<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RegisterTest extends TestCase
{
  use RefreshDatabase;

  /**
   * @test
   */
  public function can_register()
  {
    $response = $this->postJson(route('api.v1.register'), [
      'name' => 'Kevin Mendez',
      'email' => 'kevin@dev.io',
      'password' => 'password',
      'device_name' => 'iphone',
      'password_confirmation' => 'password',
    ]);

    $token = $response->json('token');
    $this->assertNotNull(
      PersonalAccessToken::findToken($token),
      'the palin text token is invalid'
    );

    $this->assertDatabaseHas('users', [
      'name' => 'Kevin Mendez',
      'email' => 'kevin@dev.io',
    ]);
  }

  /**
   * @test
   */
  public function cannot_register_twice()
  {
    Sanctum::actingAs(User::factory()->create());

    $this->postJson(route('api.v1.register'))
      ->assertNoContent();
  }

  /**
   * @test
   */
  public function name_is_required()
  {
    $this->postJson(route('api.v1.register'), [
      'name' => '',
      'email' => 'kevin@dev.io',
      'password' => 'password',
      'device_name' => 'iphone',
      'password_confirmation' => 'password',
    ])->assertJsonValidationErrors('name');
  }

  /**
   * @test
   */
  public function email_is_required()
  {
    $this->postJson(route('api.v1.register'), [
      'name' => 'hola',
      'email' => '',
      'password' => 'password',
      'device_name' => 'iphone',
      'password_confirmation' => 'password',
    ])->assertJsonValidationErrors('email');
  }

  /**
   * @test
   */
  public function email_must_be_email()
  {
    $this->postJson(route('api.v1.register'), [
      'name' => 'hola',
      'email' => 'otro-email',
      'password' => 'password',
      'device_name' => 'iphone',
      'password_confirmation' => 'password',
    ])->assertJsonValidationErrors('email');
  }

  /**
   * @test
   */
  public function email_must_be_unique()
  {
    $user = User::factory()->create();
    $this->postJson(route('api.v1.register'), [
      'name' => 'hola',
      'email' => $user->email,
      'password' => 'password',
      'device_name' => 'iphone',
      'password_confirmation' => 'password',
    ])->assertJsonValidationErrors('email');
  }

  /**
   * @test
   */
  public function password_is_required()
  {
    $this->postJson(route('api.v1.register'), [
      'name' => 'hola',
      'email' => 'hola@dev.io',
      'password' => '',
      'device_name' => 'iphone',
      'password_confirmation' => 'password',
    ])->assertJsonValidationErrors('password');
  }

  /**
   * @test
   */
  public function password_confirmation_is_required()
  {
    $this->postJson(route('api.v1.register'), [
      'name' => 'hola',
      'email' => 'hola@dev.io',
      'password' => 'password',
      'device_name' => 'iphone',
      'password_confirmation' => '',
    ])->assertJsonValidationErrors('password');
  }

  /**
   * @test
   */
  public function device_name_is_required()
  {
    $this->postJson(route('api.v1.register'), [
      'name' => 'hola',
      'email' => 'hola@dev.io',
      'password' => 'password',
      'device_name' => '',
      'password_confirmation' => 'password',
    ])->assertJsonValidationErrors('device_name');
  }
}
