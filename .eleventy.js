/**
 * @file Eleventy’s configuration file
 * @author Reuben L. Lillie <rlillie@pghnaz.org>
 */

// Require theme modules
var caimhoff = require('./src/includes/caimhoff')

var localChurchCard = require('./src/shortcodes/local-church-card')

/**
 * Expose the configuration to 11ty as a function
 * @module .eleventy
 * @param 11ty’s config argument
 * @see {@link https://www.11ty.io/docs/config/ 11ty docs}
 */
module.exports = function (eleventyConfig) {

	// Pass 11ty config argument to theme modules
	caimhoff(eleventyConfig)

	localChurchCard(eleventyConfig)

	/**
	 * Copy static assets directly from includes to output
	 * @see {@link https://www.11ty.io/docs/copy/ 11ty docs}
	 */
	eleventyConfig.addPassthroughCopy('src/includes/assets')
	eleventyConfig.addPassthroughCopy('src/branding')

	/**
	 * Overwrite 11ty’s default configuration options
	 * @see {@link https://www.11ty.io/docs/config/ 11ty docs}
	 */
	return {
		dir: {
			data: 'data', // relative to input
			includes: 'includes', // relative to input
			input: 'src',
			layouts: 'layouts', // relative to input
			output: 'dist'
		}
	}

}
