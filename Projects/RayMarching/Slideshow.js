let index = [1, 1, 1, 1, 1, 1]

let SlideID = ["Slides1", "Slides2", "Slides3", "Slides4", "Slides5"]

let i;
for (i=0; i<index.length; i++){
	showSlides(1, i);
}


function updateSlides(n, slideIndex){
	index[slideIndex] += n;
	showSlides(index[slideIndex], slideIndex);
}

function showSlides(n, slideIndex) {
	let i;
	let x = document.getElementsByClassName(SlideID[slideIndex]);
	if (n > x.length) {
		index[slideIndex] = 1;
	}
	if (n < 1) {
		index[slideIndex] = x.length;
	}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	x[index[slideIndex]-1].style.display = "block";
}