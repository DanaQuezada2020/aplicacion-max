// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs).
		// The reason we default this to hidden is that native apps don't usually show an accessory bar, at
		// least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
		// useful especially with forms, though we would prefer giving the user a little more room
		// to interact with the app.
		if (window.cordova && window.Keyboard) {
		  window.Keyboard.hideKeyboardAccessoryBar(true);
		}

		if (window.StatusBar) {
		  // Set the statusbar to use the default style, tweak this to
		  // remove the status bar on iOS or change it to use white instead of dark colors.
		  StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	//Estado vista Tutorial

	.state("tutorial",{
		url:"/tutorial",
		templateUrl:"templates/tutorial.html",
		controller:"tutorialCtrl"
	})

	//Estado vista products mostrar productos al hacer click

	.state("products",{
		url: "/products",
		templateUrl: "templates/products.html",
		controller : "productsCtrl"
	})

	//Estado vista registro

	.state("registro",{
		url:"/registro",
		templateUrl:"templates/register.html",
		controller:"registroCtrl"
	})

	// Estado vista inicio

	.state("login",{
		url: "/login",
		templateUrl: "templates/login.html",
		controller:"loginCtrl"
	})

  	// setup an abstract state for the tabs directive
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

  	

	.state('tab.dash', {
		url: '/dash',
		views: {
			'tab-dash': {
				templateUrl: 'templates/tab-dash.html',
				controller: 'DashCtrl'
			}
		}
	})

	.state('tab.carrito', {
		url: '/carrito',
		views: {
			'tab-carrito': {
				templateUrl: 'templates/tab-carrito.html',
				controller: 'carritoCtrl'
			}
		}
	})

	.state("tab.favoritos",{
		url: "/favoritos",
		views: {
			"tab-favoritos": {
				templateUrl: "templates/favoritos.html",
				controller: "favoritosCtrl"
			}
		}
	})

	.state("tab.perfil", {
		url: "/perfil",
		views: {
			"tab-perfil": {
				templateUrl: "templates/profile.html",
				controller: "perfilCtrl"
			}
		}
	})

	.state('tab.chat-detail', {
		url: '/chats/:chatId',
		views: {
			'tab-chats': {
				templateUrl: 'templates/chat-detail.html',
				controller: 'ChatDetailCtrl'
			}
		}
	})

	.state('tab.account', {
		url: '/account',
		views: {
			'tab-account': {
				templateUrl: 'templates/tab-account.html',
				controller: 'AccountCtrl'
			}	
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});