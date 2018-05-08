
$('.header .moves').hide();
$('.start').hide();
$('.ganador').hide();
$('.perdedor').hide();


function enviar() {
  const nombre = $('#name').val()
  $('.nombre-ocultar').hide()
  $('.header').prepend('<div class="saludo">¡Hola ' + nombre +'!</div><br>')
  $('.start').show();
}

$(document).on("keypress", '#name', function(e) {
  if (e.keyCode == 13) {
    enviar()
  }
});


var img = [
  'curie.jpg',
  'carson.jpg',
  'franklin.jpg',
  'goodall.jpg',
  'hopper.jpg',
  'ride.jpg'
 ]

var	total = 0,
	  moves = 0,
	  count = 1,
	  fichauno = null,
  	fichados = null,
	  stopclick = true;
    ficha_id = 0

 for (i = 0; i < 3; i++ ) {
	for (j = 0; j < 4; j++) {
		$('.container').append('<div class="ficha" data-id="' + ficha_id + '"><div class="logo cara"></div><div data-bid="0" class="back cara"></div></div>')
		ficha_id++;
		}
	}

function startgame() {
	total = 0;
	stopclick = false;
  $('.header .moves').show();
  $('.ficha').removeClass('flip');
	$('.start').hide();
  shuffle();
  clic();

  function shuffle(){
  	var c_array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
  	var c_length = c_array.length;

  	$('.ficha').each(function(){
  		var r_id = Math.floor(Math.random() * (c_length - 1));
  		var temp = c_array[r_id];
  		c_array[r_id]= c_array[c_length - 1];
  		c_array[c_length - 1] = temp;
  		c_length--

  		$(this).find('.back').css({
  			'background-image' : 'url('+img[temp-1]+')',
  		})

  		$(this).find('.back').attr('data-bid',temp)
  	})

  }

  function clic(){
  	 total = 0;
  	 moves = 0;
  	 count = 1;
  	 var i = 0
  	 fichauno = null;
  	 fichados = null ;

  	$('.ficha').find('.logo').click(function(){
  		if (stopclick == true) {
  			return 0;
  		}

  	$(this).parent('.ficha').toggleClass('flip');


  	if (count == 1) {
  		fichauno = $(this).parent('.ficha').find('.back').attr('data-bid');

  	}
  	else if (count == 2) {
  		fichados = $(this).parent('.ficha').find('.back').attr('data-bid');
      moves++;
      $('.c_move').html(moves);
  	}

  	if (fichauno == fichados) {

  		$('[data-bid="'+fichauno+'"]').parent('.ficha').addClass('fliped')
  		total++;
  		if (total == 6) {
  		    stopclick = reset(moves);
  		    stopclick = true;
  		    moves = 0;
  		}

  	}


  count++
  		if (count > 2) {
  			fichauno = null;
  			fichados = null;
  			count = 1;
  		    setTimeout(function(){
  			$('.ficha').removeClass('flip');

  		},600)

  	}

    if (moves == 24) {
      endgame();

    }
  	});
  }

  function reset(moves) {
    $('.ganador').find('.scr_moves').html(moves);
    $('.ganador').show(600)
  }

  function endgame() {
    stopclick = true;
    $('.perdedor').find('.scr_moves').html(moves);
    $('.perdedor').show(600);
  }
}




$('.again').click(function(){

$('.c_move').html(0);

  $('.perdedor').hide();
  $('.ganador').hide()
  $('.container').empty();


  total = 0,
  	  moves = 0,
  	  count = 1,
  	  fichauno = null,
    	fichados = null,
  	  stopclick = true;
      ficha_id = 0

   for (i = 0; i < 3; i++ ) {
  	for (j = 0; j < 4; j++) {
  		$('.container').append('<div class="ficha" data-id="' + ficha_id + '"><div class="logo cara"></div><div data-bid="0" class="back cara"></div></div>')
  		ficha_id++;
  		}
  	}

  startgame()

})
