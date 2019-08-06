/**
 * @file Defines the nested template for churches currently without a pastor
 * @author Reuben L. Lillie <rlillie@pghnaz.org>
 */

/**
 * An Eleventy JavaScript template using classes and optional data method
 * @class
 * @see {@link https://www.11ty.io/docs/languages/javascript/#classes 11ty docs}
 */
class OpenChurches {
	data() {
		return {
			layout: '../includes/layouts/content' // relative to src/layouts/
		}
	}

	render(data) {
		// Create an array from a JavaScript object containing keyed objects
		var churches =  this.arrayFromObject(data.churches)

		// Filter only churches without a pastor
		var noPastor = churches.filter(church => !church.properties.pastor)

    // Declare an html object containing the page content
		var html = data.content

    // Append a card for each local church
		noPastor.length > 0
			? noPastor.map(church => html += this.localChurchCard(data, church)).join('')
			: html = `<article>
				<h2>Praise God with us!</h2>
				<p>We’re in a season when each of our <a href="/directory/">local churches</a> has a pastor.</p>
			</article>`

		return html
	}

}

module.exports = OpenChurches
