<?php

namespace Tests\Feature\Auth;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\PersonalAccessToken;
use Tests\TestCase;

class LoginTest extends TestCase
{
  use RefreshDatabase;

  /**
   * @test
   */
  public function can_login_with_valid_credentials()
  {
    $user = User::factory()->create([]);


    $permission = Permission::factory()->create([
      'name' => 'articles:create'
    ]);

    $user->givePermissionTo($permission);

    $response = $this->postJson(route('api.v1.login'), [
      'email' => $user->email,
      'password' => 'password',
      'device_name' => 'iPhone of ' . $user->name
    ]);

    $token = $response->json('token');
    $this->assertNotNull(
      $dbToken = PersonalAccessToken::findToken($token),
      'the palin text token is invalid'
    );

    $this->assertTrue($dbToken->can('articles:create'));
  }

  /**
   * @test
   */
  public function cannot_logout_twice()
  {
    $user = User::factory()->create();
    $token = $user->createToken($user->name)
      ->plainTextToken;

    $this->withHeader('Authorization', 'Bearer ' . $token)
      ->postJson(route('api.v1.login'))
      ->assertNoContent();
  }

  /**
   * @test
   */
  public function cannot_login_with_invalid_credentials()
  {
    $response = $this->postJson(route('api.v1.login'), [
      'email' => 'kevin@dev.io',
      'password' => 'another password',
      'device_name' => 'iPhone'
    ]);

    $response->assertJsonValidationErrors('email');
  }

  /**
   * @test
   */
  public function email_is_required()
  {
    $this->postJson(route('api.v1.login'), [
      'email' => '',
      'password' => 'another password',
      'device_name' => 'iPhone'
    ])->assertSee(__('validation.required', ['attribute' => 'email']))
      ->assertStatus(422);
  }

  /**
   * @test
   */
  public function email_must_be_email()
  {
    $this->postJson(route('api.v1.login'), [
      'email' => 'a-new-email',
      'password' => 'another password',
      'device_name' => 'iPhone'
    ])->assertSee(__('validation.email', ['attribute' => 'email']))
      ->assertStatus(422);
  }

  /**
   * @test
   */
  public function password_is_required()
  {
    $this->postJson(route('api.v1.login'), [
      'email' => 'a-new-email',
      'password' => '',
      'device_name' => 'iPhone'
    ])->assertSee(__('validation.required', ['attribute' => 'password']))
      ->assertStatus(422);
  }

  /**
   * @test
   */
  public function device_name_is_required()
  {
    $this->postJson(route('api.v1.login'), [
      'email' => 'kevin@dev.io',
      'password' => 'password',
      'device_name' => ''
    ])->assertSee(__('validation.required', ['attribute' => 'device name']))
      ->assertStatus(422);
  }
}
