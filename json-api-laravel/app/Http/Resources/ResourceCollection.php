<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection as baseResourceCollerction;

class ResourceCollection extends baseResourceCollerction
{

  public $collects = ResourceObject::class;

  /**
   * Transform the resource collection into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    return [
      'data' => $this->collection,
    ];
  }
}
