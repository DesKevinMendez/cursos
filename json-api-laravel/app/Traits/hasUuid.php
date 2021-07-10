<?php
namespace App\Traits;
use Illuminate\Support\Str;

trait hasUuid
{
  public function getIncrementing()
  {
    return false;
  }

  protected static function boothasUuid()
  {
    static::creating(function ($model) {
      $model->{$model->getKeyName()} = Str::uuid();
    });
  }
}
