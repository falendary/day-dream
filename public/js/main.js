var hours = 24;


var morning = {
	from: '06:00',
	to: '11:59',
}

var noon = {
	from: '12:00',
	to: '17:59'
}

var evening = {
	from: '18:00',
	to: '23:59'
}

var night = {
	from: '00:00',
	to: '05:59'
}



var animationInterval;

var hoursContainer = document.querySelector('.hoursContainer')

// 1px = 1 second
// 1 minute = 60px;
// 1 hour = 3600px;

function renderHours(){

	var result = '';
	var currentHour = 0;
	var hourCounter = 0;

	for (var i = 0; i < 1440; i = i + 1) {

		var gClass;

		

		gClass = 'g'+currentHour;


		result = result + '<div class="minute '+gClass+'" data-minute="' + i + '"></div>'

		hourCounter = hourCounter + 1;

		if (hourCounter == 60) {
			currentHour = currentHour + 1
			hourCounter = 0;

		}



	}


	hoursContainer.innerHTML = result;


}



function calculatePosition(){


	var start = new Date();
	start.setHours(0,0,0,0);
	var end = new Date();
	end.setHours(23,59,59,999);
	var current = new Date();


	var dayTimeTotal = end.getTime() - start.getTime();
	var dayTimeInOnePercent = dayTimeTotal / 100;

	var diff = current.getTime() - start.getTime();

	var currentTimePercent = diff / dayTimeInOnePercent;


	var viewportHeight = document.body.clientHeight;
	var maxContentHeight = viewportHeight * 4
	var pixelsInOnePercent = 1440 * 60 / 100

	var offset = currentTimePercent * pixelsInOnePercent;

	window.scrollTo({
		top: offset})

	console.log('minute', Math.floor(offset / 60))



}

var lastScrollTime


function startAnimation(){

	calculatePosition();

	animationInterval = setInterval(function(){

		if (!lastScrollTime || new Date().getTime() - lastScrollTime > 1000 * 60)  {

			lastScrollTime = null;
			calculatePosition();

		}

	}, 1000)

}
// NEW CODE

var secondsInDay = 60*60*24;

var currenTimeHolder = document.querySelector('.current-time-holder')
var timeLeftHolder = document.querySelector('.time-left-holder')
var minutesHolder = document.querySelector('.minutes-holder')

var seconds = []
var minutes = []
var current = {}
var timeLeft = {}

var totalMinutes = []

var sleepHours = [0,1,2,3,4,5,6,7]

for (var i =1; i <= 60*24; i =i + 1) {
	totalMinutes.push(i);
}

var startOfDayDate;
var endOfDayDate

function getCurrentSecond(){

	var result = 0

	return result

}

function pushSecond(){

	var second = getCurrentSecond()

	seconds.push(second)
}

function initFillSeconds(){

	var currentTime = new Date()

	var secondsDiff = (currentTime.getTime() - startOfDayDate.getTime()) / 1000

	for (var i = 1; i <= secondsDiff; i = i + 1) {
		seconds.push(i)
	}

}


function initFillMinutes(){

	var currentTime = new Date()

	var minutesDiff = (currentTime.getTime() - startOfDayDate.getTime()) / 1000 / 60

	for (var i = 1; i <= minutesDiff; i = i + 1) {
		minutes.push(i)
	}

}

function addPad(num) {

	if (num < 10) {
		return '0' + num;
	}

	return num
}

function renderCurrentTime(){

	current.hours = Math.floor(seconds.length / 60 / 60)
	current.minutes = Math.floor(seconds.length / 60 - current.hours * 60)
	current.secs = Math.floor(seconds.length - (current.hours * 60 * 60 + current.minutes * 60))

	currenTimeHolder.innerHTML = 'Время - ' + addPad(current.hours) + ':' + addPad(current.minutes) + ':' + addPad(current.secs)

}

function renderTimeLeft(){

	var secondsLeft = secondsInDay - seconds.length;

	timeLeft.hours = Math.floor(secondsLeft / 60 / 60)
	timeLeft.minutes = Math.floor(secondsLeft / 60 - timeLeft.hours * 60)
	timeLeft.secs = Math.floor(secondsLeft - (timeLeft.hours * 60 * 60 + timeLeft.minutes * 60))



	timeLeftHolder.innerHTML = 'Времени до конца дня - ' + addPad(timeLeft.hours) + ':' + addPad(timeLeft.minutes) + ':' + addPad(timeLeft.secs)

}

function render(){

	pushSecond();

	renderCurrentTime();
	renderTimeLeft();

	
	
}

function renderMinutes(){

	var resultHtml = '';

	console.log('seconds', seconds);

	var asHours = []

	for (var i = 0; i < 24; i = i + 1) {
		asHours.push([]) 
	}


	totalMinutes.forEach(function(item, index){

		var hourIndex = Math.floor(index / 60)

		asHours[hourIndex].push(item)

	})

	asHours.forEach(function(hour, index){


		var classes = []

		if (sleepHours.indexOf(index) !== -1) {
			classes.push('sleeping-hour')
		}

		var hourHtml = '<div class="hour-holder hour-'+index +' ' + classes.join(' ') +'" title="'+addPad(index)+':00">'

		hour.forEach(function(item, index) {

			var itemHtml = '';

			var state = '';

			if (minutes.indexOf(item) !== -1) {
				state = 'is-passed';
			}

			itemHtml = itemHtml + '<div class="minute-dot '+state+'">'
			itemHtml = itemHtml + '</div>'


			hourHtml = hourHtml + itemHtml

		})

		hourHtml = hourHtml + '</div>'

		resultHtml = resultHtml + hourHtml


	})

	minutesHolder.innerHTML = resultHtml

}

function init(){

	startOfDayDate = new Date();
	startOfDayDate.setHours(0,0,0,0);

	endOfDayDate = new Date();
	endOfDayDate.setHours(23,59,59,999);

	
	

	initFillSeconds();
	initFillMinutes();

	renderMinutes();
	render();

	setInterval(render, 1000)
	setInterval(renderMinutes, 1000 * 60)

	console.log('seconds', seconds)


}

init();