/**
 * @file Eleventy’s configuration file
 * @author Reuben L. Lillie <rlilie@pghnaz.org>
 */

// Require local modules
var fileToString = require('./src/includes/filters/file-to-string')
var minifyCSS = require('./src/includes/filters/minify-css')

/**
 * Expose the configuration to 11ty as a function
 * @module .eleventy
 * @param 11ty’s config argument
 * @see {@link https://www.11ty.io/docs/config/ 11ty docs}
 */
module.exports = function (eleventyConfig) {


	// Pass 11ty config argument to local modules
	fileToString(eleventyConfig)
	minifyCSS(eleventyConfig)

	/**
	 * Copy static assets directly from includes to output
	 * @see {@link https://www.11ty.io/docs/copy/ 11ty docs}
	 */
	eleventyConfig.addPassthroughCopy('src/includes/assets')

	/**
	 * Overwrite 11ty’s default configuration options
	 * @see {@link https://www.11ty.io/docs/config/ 11ty docs}
	 */
	return {
		dir: {
			data: 'data', // relative to input
			includes: 'includes', // relative to input
			input: 'src',
			output: 'dist'
		}
	}

}
