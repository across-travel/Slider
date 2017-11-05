const allSlides = document.querySelectorAll('.slide'),	// All slides in slider
	arrows = document.querySelector('.arrows');		// Arrows (next and prev)
let currentSlide = 0;		// Slide number that will be showed first. Can be changed to 0,1,2...

// Show slide number 0 and make appropriate dot selected

function createSlider($n) {
	let dots = createSliderPagination(allSlides[$n].parentNode);
	reset(dots);
	allSlides[$n].style.display = 'block';
	dots[$n].classList.add('selected');
}

createSlider(currentSlide);

//Hide all Slides and remove selected effects from all Dots

function reset(dots = document.querySelectorAll('.pagination li')) {
	for ( let i = 0; i < allSlides.length; i++ ) {
		allSlides[i].style.display = 'none';
		dots[i].classList.remove('selected');
	}
	return dots;
}

// Create appropriate count of Dots and add it to DOM.
// Call function changeSlide when click on dots.

function createSliderPagination(slider) {
	let pagination = document.createElement('ul');
	pagination.className = "pagination";
	slider.appendChild(pagination);
	allSlides.forEach(function (item, index) {
		let dotWrapper = document.createElement('li'),
			dot = document.createElement('a');
		dotWrapper.addEventListener('click', function (event) {
			event.preventDefault();
			changeSlide(index); // call function changeSlide with index of slide what we want to see
		});
		dot.setAttribute('href', index);
		dotWrapper.appendChild(dot);
		pagination.appendChild(dotWrapper);
	});
	return pagination.childNodes
}


// Reset first and than show appropriate slide with dot


function changeSlide($n = currentSlide, $changer = 0) {
	let dots = reset();
	if ( $n === 0 && $changer === -1 ) {
		$n = allSlides.length;
		currentSlide = allSlides.length;
	}
	if ( $n === allSlides.length - 1 && $changer === 1 ) {
		$n = -1;
		currentSlide = -1;
	}
	allSlides[$n + $changer].style.display = 'block';
	dots[$n + $changer].classList.add('selected');
	currentSlide = $n + $changer;
}

// Call function changeSlide onclick buttons (next and prev)

arrows.addEventListener('click', function (e) {

	if ( e.target.classList.contains("next") ) changeSlide(undefined, 1);

	if ( e.target.classList.contains("prev") ) changeSlide(undefined, -1);

});

// Navigation with Keys

document.onkeydown = function(event) {
	event = event || window.event;
	switch (event.keyCode) {
		case 37:
			changeSlide(undefined, -1);
			break;
		case 39:
			changeSlide(undefined, 1);
			break;
	}
};


//Autoplay every 6 second

setInterval(function() { changeSlide(undefined, 1)}, 6000);

