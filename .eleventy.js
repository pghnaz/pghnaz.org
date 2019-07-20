/**
 * @file Eleventy’s configuration file
 * @author Reuben L. Lillie <rlilie@pghnaz.org>
 */

// Require local modules
var arrayFromObject = require('./src/includes/filters/array-from-object')
var callToAction = require('./src/includes/shortcodes/call-to-action')
var fileToString = require('./src/includes/filters/file-to-string')
var favicon = require('./src/includes/shortcodes/favicon')
var googleMapsAPI = require('./src/includes/shortcodes/google-maps-api')
var headTag = require('./src/includes/shortcodes/head-tag')
var minifyCSS = require('./src/includes/filters/minify-css')
var minifyHTML = require('./src/includes/filters/minify-html')
var minifyJS = require('./src/includes/filters/minify-js')
var siteTagline = require('./src/includes/shortcodes/site-tagline')
var socialMeta = require('./src/includes/shortcodes/social-meta')
var titleTag = require('./src/includes/shortcodes/title-tag')

/**
 * Expose the configuration to 11ty as a function
 * @module .eleventy
 * @param 11ty’s config argument
 * @see {@link https://www.11ty.io/docs/config/ 11ty docs}
 */
module.exports = function (eleventyConfig) {


	// Pass 11ty config argument to local modules
	arrayFromObject(eleventyConfig)
	callToAction(eleventyConfig)
	fileToString(eleventyConfig)
	favicon(eleventyConfig)
	googleMapsAPI(eleventyConfig)
	headTag(eleventyConfig)
	minifyCSS(eleventyConfig)
	minifyHTML(eleventyConfig)
	minifyJS(eleventyConfig)
	siteTagline(eleventyConfig)
	socialMeta(eleventyConfig)
	titleTag(eleventyConfig)

	/**
	 * Copy static assets directly from includes to output
	 * @see {@link https://www.11ty.io/docs/copy/ 11ty docs}
	 */
	eleventyConfig.addPassthroughCopy('src/includes/assets')
	eleventyConfig.addPassthroughCopy('favicons')

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
