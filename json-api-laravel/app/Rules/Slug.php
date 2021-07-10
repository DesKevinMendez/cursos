<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Slug implements Rule
{
  protected $messages;
  /**
   * Create a new rule instance.
   *
   * @return void
   */
  public function __construct()
  {
    //
  }

  /**
   * Determine if the validation rule passes.
   *
   * @param  string  $attribute
   * @param  mixed  $value
   * @return bool
   */
  public function passes($attribute, $value)
  {
    if ($this->hasUnderscore($value)) {
      $this->messages = trans('validation.no_underscores');
      return false;
    }
    if ($this->startWithDashes($value)) {
      $this->messages = trans('validation.no_starting_dashes');
      return false;
    }
    if ($this->endWithDashes($value)) {
      $this->messages = trans('validation.no_ending_dashes');
      return false;
    }
    return true;
  }

  /**
   * Get the validation error message.
   *
   * @return string
   */
  public function message()
  {
    return $this->messages;
  }

  public function hasUnderscore($value) {
    return preg_match('/_/', $value);
  }
  public function startWithDashes($value) {
    return preg_match('/^-/', $value);
  }
  public function endWithDashes($value) {
    return preg_match('/-$/', $value);
  }
}
