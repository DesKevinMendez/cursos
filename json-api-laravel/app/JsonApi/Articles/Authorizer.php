<?php

namespace App\JsonApi\Articles;

use CloudCreativity\LaravelJsonApi\Auth\AbstractAuthorizer;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class Authorizer extends AbstractAuthorizer
{
  protected $guards = ['sanctum'];

  /**
   * Authorize a resource index request.
   *
   * @param string $type
   *      the domain article type.
   * @param Request $request
   *      the inbound request.
   * @return void
   * @throws AuthenticationException|AuthorizationException
   *      if the request is not authorized.
   */
  public function index($type, $request)
  {
    // TODO: Implement index() method.
  }

  /**
   * Authorize a resource create request.
   *
   * @param string $type
   *      the domain article type.
   * @param Request $request
   *      the inbound request.
   * @return void
   * @throws AuthenticationException|AuthorizationException
   *      if the request is not authorized.
   */
  public function create($type, $request)
  {
    $this->authenticate();
    if ($request->has('data.relationships.authors')) {
      $this->authorize('create', [$type, $request]);
    }
  }

  /**
   * Authorize a resource read request.
   *
   * @param object $article
   *      the domain article.
   * @param Request $request
   *      the inbound request.
   * @return void
   * @throws AuthenticationException|AuthorizationException
   *      if the request is not authorized.
   */
  public function read($article, $request)
  {
    // TODO: Implement read() method.
  }

  /**
   * Authorize a resource update request.
   *
   * @param object $article
   *      the domain article.
   * @param Request $request
   *      the inbound request.
   * @return void
   * @throws AuthenticationException|AuthorizationException
   *      if the request is not authorized.
   */
  public function update($article, $request)
  {
    $this->can('update', $article);
    // TODO: Implement update() method.
  }

  /**
   * Authorize a resource read request.
   *
   * @param object $article
   *      the domain article.
   * @param Request $request
   *      the inbound request.
   * @return void
   * @throws AuthenticationException|AuthorizationException
   *      if the request is not authorized.
   */
  public function delete($article, $request)
  {
    $this->can('delete', $article);
  }

  public function modifyRelationship($record, $field, $request)
  {
    $ability = Str::camel('modify-'.$field);
    $this->can($ability, $record, $request);
  }
}
