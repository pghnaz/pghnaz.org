/**
 * @file Defines the nested template for the Eastern Nazarene College page
 * @author Reuben L. Lillie <rlillie@pghnaz.org>
 */

/*
 * Import module for making AJAX requests
 * @see {@link https://github.com/request/request-promise-native GitHub}
 */
var rp = require('request-promise-native')

/*
 * Define options to request the five latest posts from ENC’s website
 * @see {@link https://developer.wordpress.org/rest-api/ WP REST API Docs}
 */
var options = {
	uri: 'https://enc.edu/wp-json/wp/v2/posts/?per_page=5',
	json: true
}

/**
 * An Eleventy JavaScript template using classes and optional data method
 * @class
 * @see {@link https://www.11ty.io/docs/languages/javascript/#classes 11ty docs}
 */
class ENC {
	data() {
		return {
			layout: '../includes/layouts/content' // relative to src/layouts/
		}
	}

	render(data) {
	  // An array of posts from ENC’s REST API
		var posts =  async () => {
			var data = await rp(options)
			return template(data)
		}

		// A template for displaying posts from the API request data
		var template = data => html += `
			<ul>
				<header>
					<h1>Latest News from ENC</h1>
				</header>
				${data.map(post => `
					<li>
						<a href="${post.link}">${post.title.rendered}</a>
					</li>
				`).join(' ')}
			</ul>
		`

    // Declare an html object containing the page content
    var html = data.content

    // Append a list with requested posts from ENC
    return posts()
	}
}

module.exports = ENC
