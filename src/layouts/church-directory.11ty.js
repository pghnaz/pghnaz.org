/**
 * @file Defines the nested “Church Directory” template
 * @author Reuben L. Lillie <rlillie@pghnaz.org>
 */

/**
 * An Eleventy JavaScript template using classes and optional data method
 * @class
 * @see {@link https://www.11ty.io/docs/languages/javascript/#classes 11ty docs}
 */
class ChurchDirectory {
	data() {
		return {
			layout: '../includes/layouts/content' // relative to src/layouts/
		}
	}

	render(data) {
		// Create an array from a JavaScript object containing keyed objects
		var churches =  this.arrayFromObject(data.churches)

		return `
			${data.content}
			<section class="grid">
				${churches.map(church => this.localChurchCard(data, church)).join('')}
			</section>
		`
	}
}

module.exports = ChurchDirectory
