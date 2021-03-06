<?php

namespace App\Models;

use App\Traits\hasUuid;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;
use App\Models\Article;

class User extends Authenticatable
{
  use Notifiable, HasApiTokens, hasUuid, HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name', 'email', 'password',
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
    'password', 'remember_token',
  ];

  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $casts = [
    'id' => 'string',
    'email_verified_at' => 'datetime',
  ];
  public function articles()
  {
    return $this->hasMany(\App\Models\Article::class);
  }

  public function permissions() {
    return $this->belongsToMany(Permission::class);
  }

  public function givePermissionTo(Permission $permission){
    $this->permissions()->syncWithoutDetaching($permission); 
  }

}
