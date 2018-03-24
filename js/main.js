"use strict";

let MainApp={};

//Instantiate our custom carousel control and feed data
MainApp.onLoadApp = function() 
{
	SimpleCarousel.images = [
		{"image": "./images/home1.jpg","content":"Page 1"},
		{"image": "./images/home2.jpg","content":"Page 2"},
		{"image": "./images/home3.jpg","content":"Page 3"},
		{"image": "./images/home4.jpg","content":"Page 4"},
		{"image": "./images/home5.jpg","content":"Page 5"}
	]
	SimpleCarousel.isAutoScrollEnabled = true;

	SimpleCarousel.show();
};