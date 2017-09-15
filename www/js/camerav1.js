var app={
  inicio: function(){
    this.iniciaFastClick();
    this.iniciaBoton();
  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  iniciaBoton: function(){
    var buttonAction = document.querySelector('#button-action');
    buttonAction.addEventListener('click', function(){
		app.cargarFoto(Camera.PictureSourceType.Camera);
	});
	
	var buttonGallery = document.querySelector('#button-gallery');
	buttonGallery.addEventListener('click',function(){
		app.cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
	});
	
	var filterButtons = document.querySelectorAll('.button-filter');
	filterButtons[0].addEventListener('click',function(){
		app.aplicaFiltro('gray');
	});
		filterButtons[1].addEventListener('click',function(){
		app.aplicaFiltro('negative');
	});
		filterButtons[2].addEventListener('click',function(){
		app.aplicaFiltro('sepia');
	});
  },

  tomarFoto: function() {
    var opciones = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation: true
    };
    navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
  },

  fotoTomada: function(imageURI){
   var img = document.createElement('img');
   img.onload = function(){
	   app.pintarFoto(img);
   }
   img.src = imageURI;
  },
  
  cargarFoto: function(pictureSourceType){
	  var opciones = {
		  quality: 50,
		  sourceType: pictureSourceType,
		  destinationType: Camera.DestinationType.FILE_URI,
		  targetWidth: 300,
		  targetHeight 300,
		  correctOrientation: true
	  };
	  navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
  },

  pintarFoto: function(img) {
	  var canvas = document.querySelector('#foto');
	  var context = canvas.getContext('2d');
	  canvas.width = img.width;
	  canvas.height = img.height;
	  context.drawImage(img, 0, 0, img.width, img.height);
  },

  errorAlTomarFoto: function(message) {
    console.log('Fallo al tomar foto o toma cancelada: ' + message);
  },

  aplicaFiltro: function(filtro){
	  var canvas = document.querySelector('#foto');
	  var context = canvas.getContext('2d');
	  imageData = context.getImageData(0,0,canvas.width,canvas.height);
	  effects[filtro](imageData.data);
	  context.putImageData(imageData,0,0);
  }
};
var imageData;
	  
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
    }, false);
}
