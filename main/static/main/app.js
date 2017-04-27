var postApp = angular.module('postApp', ['ngRoute', 'ngResource']);

postApp.config(function ($routeProvider, $httpProvider, $resourceProvider) {
  // https://docs.djangoproject.com/en/1.10/ref/csrf/
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $routeProvider.
    when('/', {
      template: '<post-list></post-list>'
    }).
    when('/:postId', {
      template: '<post-detail></post-detail>'
    }).
    otherwise('/');
});

postApp.component('postList', {
  templateUrl: '/static/main/posts.template.html',
  controller: function PostListController($scope, $rootScope, PostApi) {
    $scope.posts = [];
    $scope.noPosts = function() {
      return $scope.posts.length === 0;
    }
    $rootScope.$on('refetch', fetch);

    fetch();

    function fetch() {
      PostApi.query(function(resp) {
        $scope.posts = resp;
      });
    }
  },
});

postApp.component('postDetail', {
  templateUrl: '/static/main/single.template.html',
  controller: function PostDetailController($scope, $routeParams, PostApi, $location) {
    var postId = $routeParams.postId;
    PostApi.get({id: postId}, function(resp) {
      $scope.post = resp;
    });

    $scope.deletePost = function() {
      var confirmMsg = "Are you sure you want to delete this post?";

      confirm(confirmMsg) && PostApi.remove({
        id: $scope.post.id
      }, function() {
         $location.path('/');
      });
    }
  }
});

postApp.component('postForm', {
  templateUrl: '/static/main/form.template.html',
  controller: function PostFormController($scope, $rootScope, PostApi) {
    $scope.addPost = function() {
      var post = {
        title: $scope.postTitle,
        text: $scope.postText,
      };
      PostApi.save(post, function() {
        $rootScope.$broadcast('refetch');
      });
      $scope.postTitle = "";
      $scope.postText = "";
    }
  }
});

postApp.service('PostApi', function($resource) {
  return $resource('/api/posts/:id', {});
});