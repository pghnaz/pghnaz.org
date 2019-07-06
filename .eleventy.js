module.exports = function (eleventyConfig) {

	/**
	 * Copy static assets directly from input to output
	 * @see {@link https://www.11ty.io/docs/copy/ 11ty docs}
	 */
	eleventyConfig.addPassthroughCopy('assets')

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
