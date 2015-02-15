//
// Router
//

Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

var HomeController = RouteController.extend({
  template: 'home'
});

Router.map(function() {

  this.route('home', {
    path: '/',
    controller: HomeController
  });

});
