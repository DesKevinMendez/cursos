<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Responses\TokenResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class loginController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function login(Request $request)
  {

    $request->validate([
      'email' => ['required', 'email'],
      'password' => ['required'],
      'device_name' => ['required'],
    ]);

    $user = User::where('email', $request->email)->first();

    if (!Hash::check($request->password, optional($user)->password)) {
      throw ValidationException::withMessages([
        'email' =>[__('auth.failed')]
      ]);
    }

    return new TokenResponse($user);
  }

  function logout(Request $request){
    $request->user()->currentAccessToken()->delete();

    return response()->noContent();
  }
}
