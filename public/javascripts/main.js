'use-strict'

var angRoute = angular.module('angRoute', ['ui.router','ngAnimate']);

angRoute.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true)

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    .state('home', {
    url: '/home',
    templateUrl: 'views/home.html'
})

.state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
})

.state('events', {
    url: '/events',
    templateUrl: 'views/events.html',
})
.state('gallery', {
    url: '/gallery',
    templateUrl: 'views/gallery.html',
})
.state('connect', {
    url: '/connect',
    templateUrl: 'views/connect.html',
})
.state('tickets', {
    url: '/tickets',
    templateUrl: 'views/tickets.html',
})

// .state('admin', {
//     url: '/admin',
//     templateUrl: 'views/admin.html',
// })

})
angRoute.config(function ($provide) {
  $provide.decorator('$uiViewScroll', function ($delegate) {
    return function (uiViewElement) {
      window.scrollTo(0, (top - 30));
    };
  });
});
