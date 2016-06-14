
/* *******************************************************************
  Define which view file is loaded into <div data-ng-view></div> based
  on the URL requested by the browser. The below code tells AngularJS:
  - "When /   is requested, load views/default.html."
  - "When /a/ is requested, load views/a.html."
  - "When /b/ is requested, load views/b.html."
  - "When /c/ is requested, load views/c.html."
  - "If anything else is requested, redirect to '/', which will
     trigger the first .when() rule."
  ******************************************************************* */

angular.module('offlineDemo', ['ngRoute'])
.controller('MainController', function($scope, $routeParams, $location, $http){
         // MENU TOGGLE
        $('#menu_bgr').on('click', function (){
            $('#menu_curtain').fadeToggle();
            $('#nav-icon').toggleClass('open');
            return false;
        
        });
        $('html').click(function() {
            $('#menu_curtain').fadeOut();
            $('#nav-icon').removeClass('open');
        });
          // OPEN ON HOME PAGE AFTER RELOAD
        $location.path("/");
        // INITIAL MENU TITLE
        $scope.title = "Home";
        // MENU ITEMS JSON
        var menuitems = [
            {
                "id": "home",
                "title": "Home",
                "href": "#/",
                "icon": "fa fa-home",
                "li-class": "menu-element",
            }, 
            {
                "id": "schedule",
                "title": "Schedule",
                "href": "#/schedule",
                "icon": "fa fa-calendar",
                "li-class": "menu-element",
            }, 
            {
                "id": "speakers",
                "title": "Speakers",
                "href": "#/speakers",
                "icon": "fa fa-microphone",
                "li-class": "menu-element",
            },
            {
                "id": "delegates",
                "title": "Delegates",
                "href": "#/delegates",
                "icon": "fa fa-users",
                "li-class": "menu-element",
            },
            {
                "id": "venue",
                "title": "Venue",
                "href": "#/venue",
                "icon": "fa fa-map-marker",
                "li-class": "menu-element",
            },
            {
                "id": "register",
                "title": "Register",
                "href": "#/register",
                "icon": "fa fa-check",
                "li-class": "menu-element",
            },
            {
                "id": "splash",
                "title": "Splash",
                "href": "#/splash",
                "icon": "fa fa-plane",
                "li-class": "menu-element",
            }
        ]
        // BINDING ITEMS
        this.items = menuitems;
})
.controller('scheduleController', function($scope, $location, $http, $routeParams){
    // TABS
    $scope.filters =  {};
    // $scope.active = '06 Mon';

    // GET DATA FOR AGENDA
    $http.get('agenda.json').then(function(res){
        $scope.days = res.data;
        var agendas = [];
        for (i = 0; i < res.data.length; i++) { 
            var day = res.data[i];
            for (x = 0; x < day.agenda.length; x++) { 
                console.log(day.agenda[x]);
                agendas.push(day.agenda[x]);
            }         
        }
        console.log("agendas " + agendas);
        $scope.agendas = agendas;
        
    }); 
})
.controller('splashController', function($scope, $location){
    // window.onload = function() {
    //   document.getElementById('cloud').className = 'float_right';
    // };
    $(".cloud").animate({ //be sure to change the class of your element to "header"
        right:'0px',
        opacity:'0.5',
        height:'150px',
        width:'150px'
    });
})
// ROUTING
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/',   {templateUrl: 'views/default.html'})
  .when('/schedule/', {templateUrl: 'views/schedule.html'})
  .when('/speakers/', {templateUrl: 'views/speakers.html'})
  .when('/delegates/', {templateUrl: 'views/delegates.html'})
  .when('/venue/', {templateUrl: 'views/venue.html'}) 
  .when('/splash/', {templateUrl: 'views/splash.html'})
  .otherwise({redirectTo: '/'});
}]);

/* *******************************************************************
This will inform visitors that the website is done downloading itself
onto their device, making it safe to go offline.
******************************************************************* */

window.applicationCache.addEventListener('cached', function() {
alert('Done downloading. It’s safe to go offline now.');
}, false);

/* *******************************************************************
This will inform visitors that the website has been updated, and it
will ask them to accept or reject the updated resource(s). This
occurs when three things happen:
1. The visitor has downloaded your website in the past
2. You have updated one or more resources AND the cache manifest
3. The visitor accesses the website, again, while they're online
******************************************************************* */

window.addEventListener('load', function() {
window.applicationCache.addEventListener('updateready', function() {
  if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
    if (confirm('A new version is available. Load it?')) {
      window.location.reload();
    }
  }
}, false);
}, false);


