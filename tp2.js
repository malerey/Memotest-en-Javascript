
$('.header .moves').hide();
$('.start').hide();



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
	  first_card = null,
  	secn_card = null ;

var stop_fa = false,
	  stop_fc = true;

var card_id = 0

 for (i = 0; i < 3; i++ ) {
	for (j = 0; j < 4; j++) {
		$('.container').append('<div class="card" data-id="' + card_id + '"><div class="front face"></div><div data-bid="0" class="back face"></div></div>')
		card_id++;
		}
	}

$('.start').click(function(){
	total = 0;
	stop_fa = true;
	stop_fc = false;
  $('.header .moves').show();
  $('.card').removeClass('flip');
	$('.start').hide();
	randomIMG();
})

$('.again').click(function() {
    location.reload();
});

$('.board').hide();
randomIMG();
flip_auto();
flip_click();

function randomIMG(){
	var c_array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
	var c_length = c_array.length;

	$('.card').each(function(){
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

	return 0;
}

function flip_click(){
	 total = 0;
	 moves = 0;
	 count = 1;
	 var i = 0
	 first_card = null;
	 secn_card = null ;

	$('.card').find('.front').click(function(){
		if (stop_fc == true) {
			return 0;
		}

	$(this).parent('.card').toggleClass('flip');


	if (count == 1) {
		first_card = $(this).parent('.card').find('.back').attr('data-bid');

	}
	else if (count == 2) {
		secn_card = $(this).parent('.card').find('.back').attr('data-bid');
    moves++;
    $('.c_move').html(moves);
	}

	if (first_card == secn_card) {

		$('[data-bid="'+first_card+'"]').parent('.card').addClass('fliped')
		total++;
		if (total == 6) {
		    stop_fc = reset(moves);
		    stop_fc = true;
		    moves = 0;
		}

	}

	if (stop_fc) {
		return
	}

count++
		if (count > 2) {
			first_card = null;
			secn_card = null;
			count = 1;
		    setTimeout(function(){
			$('.card').removeClass('flip');

		},400)
	}
	});
}


function flip_auto(time){

  setTimeout(function(){
  	if (stop_fa) {
	return;
	}

	var r_ran = randomNum(1,24)
	$('[data-id="'+r_ran+'"]').toggleClass('flip')

	var newTime = randomNum(500,1000);
	flip_auto(newTime)
  }, time)
}

 function randomNum( min, max ) {
    return Math.floor(Math.random() * ((max - min)+1) + min);
  }



function reset(moves) {
  $('.board').show()
  $('.board').find('.scr_moves').html(moves);
  return true;
}
