
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
  'ride.jpg',
  'curie.jpg',
  'hopper.jpg',
  'carson.jpg',
  'goodall.jpg',
  'franklin.jpg'
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
		$('.container').append('<div class="ficha" data-id="' + ficha_id +
     '"><div class="logo cara"></div><div data-bid="0" class="back cara"></div></div>')
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
  	 fichados = null;



  	$('.ficha').find('.logo').click(function(){

  	$(this).parent('.ficha').toggleClass('flip');

  	if (count == 1) {
      console.log("uno");
  		fichauno = $(this).parent('.ficha').find('.back').attr('data-bid');
      console.log("total", total);

  	}
  	else if (count == 2) {
      console.log("dos");
  		fichados = $(this).parent('.ficha').find('.back').attr('data-bid');
      moves++;
      $('.c_move').html(moves);
      console.log("total", total);
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
    $('.container').addClass("disable")
    console.log("tres");
    fichauno = null;
    fichados = null;

    setTimeout(function(){
      $('.ficha').removeClass('flip');
      $('.container').removeClass("disable")
    }, 600)

      count = 1;

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
