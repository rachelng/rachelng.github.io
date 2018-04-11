// API's:
// New York Times
// https://developer.nytimes.com/
// API: cc89dd4fb04d4da3b00ee49683eeb860

// Guardian:
// http://open-platform.theguardian.com/explore/
// API: e62aa5fb-3675-4ccd-852c-8c3b1fc4c8be

// NewsApi.org
// https://newsapi.org/
// API: e0d61882c3a644ad80ef87552378e529

// Handlebars templating:
var source = $('#article-template').html();
var template = Handlebars.compile(source);

// 1. Setup AJAX requests to fetch data from each news source

function fetchNewYorkTimes() {
	var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
		url += '?' + $.param({
		  'api-key': "cc89dd4fb04d4da3b00ee49683eeb860"
	});

	return $.ajax({
		type: 'GET',
		url: url,
		success: function(response) {
			response.results.forEach(function(article) {

			var image

			if (article.multimedia[0]) {
				image = article.multimedia[0].url
			} else {
				image = 'http://www.nytimes.com/services/mobile/img/ios-newsreader-icon.png'
			}

				allArticles.push({
					title: article.title,
					date: article.published_date,
					image: image,
					type: article.section,
					link: article.url
				})
			})
		}
	})	
}

function fetchGuardian() {
	var guardianAPI = "e62aa5fb-3675-4ccd-852c-8c3b1fc4c8be";
	var url = "http://content.guardianapis.com/search?order-by=newest&api-key=" + guardianAPI;

	return $.ajax({
		type: 'GET',
		url: url,
		success: function(response) {
			response.response.results.forEach(function(article) {

				allArticles.push({
					title: article.webTitle,
					date: article.webPublicationDate,
					image: 'https://bridgingtheunbridgeable.files.wordpress.com/2014/04/the-guardian-logo.png',
					type: article.pillarName,
					link: article.webUrl
				})
			})
		}
	})	
}

function fetchNewsAPI() {
	var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=e0d61882c3a644ad80ef87552378e529';

		return $.ajax({
			type: 'GET',
			url: url,
			success: function(response) {
				response.articles.forEach(function(article) {

				allArticles.push({
					title: article.title,
					date: article.publishedAt,
					image: article.urlToImage,
					link: article.url
				})
			})
		}
	})	
}

var allArticles = []

$.when(
	fetchNewYorkTimes(),
	fetchGuardian(),
	fetchNewsAPI()
).done(function() {
	allArticles.sort(function(a,b) {
		var dateA = new Date(a.date)
		var dateB = new Date(b.date)

		return dateB - dateA
	})

	allArticles = allArticles.map(function(article) {
		var date = article.date

		article.date = new Date(date).toLocaleDateString()

		return article
	})

	var articleTemplates = template(allArticles)
	$('#main').append(articleTemplates)
})


// 2. Set up functions to handle each of the above AJAX requests:
// - Use Array's .map method to transform the response into an array of objects that you will pass to the Handlebars template
// - Check out the id=article-template in index.html to see what properties the template expects
// - To properly format article dates, use new Date() and the .toLocaleDateString() method
// Note: not all articles will have all the expected properties :D




