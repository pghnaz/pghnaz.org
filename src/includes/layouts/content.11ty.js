/**
 * @file Defines the nested content template
 * @author Reuben L. Lillie <rillie@pghnaz.org>
 */

/**
 * An Eleventy JavaScript template using classes and optional data method
 * @class
 * @see {@link https://www.11ty.io/docs/languages/javascript/#classes 11ty docs}
 */
class Content {

	data() {
		return {
			layout: 'layouts/base'
		}
	}

	render(data) {
		return `
			<main id="site_main">
				<header id="main_header">
					<h1>${data.title}</h1>
				</header>
				${data.content}
			</main>
		`
	}

}

module.exports = Content
