var firebaseConfig = {
	 apiKey: "AIzaSyDECWTVXYcx5QKb8lepVREee19t10F7Ric",
    authDomain: "maxapp-f35f8.firebaseapp.com",
    databaseURL: "https://maxapp-f35f8.firebaseio.com",
    projectId: "maxapp-f35f8",
    storageBucket: "maxapp-f35f8.appspot.com",
    messagingSenderId: "676825114501",
    appId: "1:676825114501:web:bb36fe627473e24a11c6ec",
    measurementId: "G-N1V566V5EJ"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	//base de datos
	var database = firebase.database();
	var storage = firebase.storage();

angular.module('starter.controllers', [])

//Controlador Para registro de usuario
.controller("registroCtrl",function($scope, $state){
	//cerrar sesion del  usuario
	firebase.auth().signOut().then(function(){
	}).catch(function(error){
		var mensaje = error.message;
		console.log(mensaje);
	})

	$scope.uid = "";
	
	$scope.obtener = function(user){
		// usuario con la autenticacion
		firebase.auth().createUserWithEmailAndPassword(user.email, user.contra).then(function a(y){
			// se creo el usuario
			swal("Se creó correctamente la cuenta");
			//obteber uid del ususario refistrado
			$scope.uid = y.user.uid;
			//Almacena el usuario en la base de datos
			firebase.database().ref("/users").child($scope.uid).set({
				correo: user.email,
				nombre: user.nombre,
				uid: $scope.uid
			})
		})
	}
})


//Controlador vista inicio
.controller("loginCtrl",function($scope, $ionicPopover, $state, $rootScope){

	$rootScope.uid;

	//cerrar sesion del  usuario
	firebase.auth().signOut().then(function(){
	}).catch(function(error){
		var mensaje = error.message;
		console.log(mensaje);
	})
	
	$scope.Inicio = function(userL){
		//Inicio de sesion con firebase
		firebase.auth().signInWithEmailAndPassword(userL.email,userL.password).then(function b(x){
			swal("Inicio de Sesión correcto");
			//get data user
			firebase.auth().onAuthStateChanged(function(user) {
				$rootScope
 	 			if (user) {
    				$rootScope.uid = user.uid;
 				 }
			})
			$state.go("tab.dash");
		}).catch(function(error){
			var mensaje = error.message;
			console.log(mensaje);
		})	

	
	
	}	
})

//Controlador vista principal
.controller("tutorialCtrl",function($scope){

})

//Controlador vista products mostrar productos por categoria filtrados

.controller("productsCtrl",function($scope, $rootScope){

	$rootScope.carrito = [];
	$rootScope.favoritos = [];
	$rootScope.vista;
	$rootScope.nada;
	//Agrega Productos al Carrito
	$scope.agregar = function(x,cantidad){
		x["cantidad"]=parseInt(cantidad);
		$rootScope.carrito.push(x);
			swal("SI", "Se agregó el producto", "success");
		$rootScope.vista = true;
		$rootScope.subtotal = $rootScope.carrito[0].precio * $rootScope.carrito[0].cantidad;
		$rootScope.nada = false;
	}

	//Agregar Productos a Favoritos

	$scope.addFavorites = function(y){
		$rootScope.favoritos.push(y);
		swal("SI", "Se agrego a favoritos", "success")
	}

})

//controlador vista de productos por categoria sin filtrar
.controller('DashCtrl', function($scope,$rootScope, $state) {

	$rootScope.name;
	$rootScope.email;
	$rootScope.foto;
	
	firebase.database().ref("users/"+$rootScope.uid).once("value").then(function(data){
		$rootScope.name = data.val().nombre;
		$rootScope.email = data.val().correo;
		$rootScope.foto = data.val().foto;
	})


	$rootScope.listaProductos=[];
	$rootScope.lista = [];
	firebase.database().ref("/productos").on("value", function(p){
		$rootScope.listaProductos = p.val();

	p.forEach(function(datos){
		$rootScope.lista.push(datos.val());
	})

		console.log($rootScope.listaProductos);
	})

	//Diccionario categoria de productos
	$rootScope.Categorias = [
		{
			nombreCategoria : "TV y VIDEO",
			imagen : "img/tag1.png",
			descripcion:"Televisores, Audio y Reproductores.",
			banner: "img/tele.jpg"
		},
		{
			nombreCategoria : "CELULARES",
			imagen : "img/tag2.png",
		 	descripcion:"Tigo, Claro y Liberados.",
		 	banner: "img/cel.jpg"
		},
		{
			nombreCategoria : "LINEA BLANCA",
			imagen : "img/tag3.png",
			descripcion:"Refrigeracion, Estufas, Lavadoras.",
			banner: "img/refri.jpg"
		},
		{
			nombreCategoria : "VIDEOJUEGOS",
			imagen : "img/tag4.png",
			descripcion:"Playstation, Xbox One.",
			banner: "img/juego.jpg"
		},
		{
			nombreCategoria : "COMPUTACIÓN",
			imagen : "img/tag5.png",
			descripcion:"Laptop, Desktop, Accesorios.",
			banner: "img/compu.jpg"
		},
		{
			nombreCategoria : "AUDIO",
			imagen : "img/tag6.png",
			descripcion:"Audifonos, Bocinas.",
			banner: "img/audio.jpg"
		}
  
	]

	//mostrar productos filtrados por categoria
	$scope.viewProducts = function(ncategoria){
		$rootScope.nombreCategoria = ncategoria;
		$state.go("products")
	}

})

.controller('carritoCtrl', function($scope, Chats, $rootScope) {
	
	if($rootScope.favoritos == undefined){
		$rootScope.vista = false;
		$rootScope.nada = true;
	}

})

.controller("perfilCtrl", function ($scope,$rootScope,$state){
var uploadFoto;
		var foto;
		var nav;

		$("#foto").on("change",function(){
		    var uploadFoto = document.getElementById("foto").value;
		    var foto       = document.getElementById("foto").files;
		    var nav = window.URL || window.webkitURL;

		    if(uploadFoto !=''){
		        var type = foto[0].type;
		        var name = foto[0].name;
		        if(type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png'){
		            $("#img").remove();
		            $(".delPhoto").addClass('notBlock');
		            $('#foto').val('');
		            return false;
		        }else{
		            $("#img").remove();
		            $(".delPhoto").removeClass('notBlock');
		            var objeto_url = nav.createObjectURL(this.files[0]);
		            file = this.files[0];
		            $(".prevPhoto").append("<img class='previewProfile' id='img' src="+objeto_url+">");
		            $(".upimg label").remove();
		        }
		    	}else{
		    	  	  alert("No seleccionó foto");
		    	    $("#img").remove();
		    	}
		});


	$scope.saveChange = function(){
		var refStorage = storage.ref('Users/').child(file.name);

		var uploadTask = refStorage.put(file).then(function(result){
			//obtiene el enlace de la imagen cargada

			refStorage.getDownloadURL().then(function(result){
				var enlace = result;


				//Crear una referencia hacia el usuario
				var database = firebase.database().ref().child("users/"+ $rootScope.uid);
				database.update({
					foto: enlace
				})


			})
		})
	}
})



//controlador favoritos
.controller("favoritosCtrl", function($scope, $rootScope, $state){

	if($rootScope.carrito == undefined){
		$rootScope.vista = false;
		$rootScope.nada = true;
	}

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

//controlador de la cuenta
.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};



		
});