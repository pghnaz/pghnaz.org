/**
 * @file Defines a shortcode for displaying overview data for local churches
 * @author Reuben L. Lillie <rlillie@pghnaz.org>
 */

/**
 * An 11ty univeral shortcode
 * @module includes/filters/local-church-card
 * @param {Object} eleventyConfig 11ty’s Config API
 * @see {@link https://www.11ty.io/docs/filters/ 11ty docs}
 */
module.exports = function (eleventyConfig) {

	/**
	 * Local church card markup
	 * @method
	 * @name localChurchCard
	 * @param {Object} data The 11ty `data` object
	 * @church {Object} data GeoJSON for the local church in src/data/churches
	 * @return {string} HTML template literal
	 * @example `${this.localChurchCard(data)}`
	 */
	eleventyConfig.addShortcode('localChurchCard', function (data, church) {
		var id = church.properties.gmcID.substr(4)
		var href = `/${this.slugify(church.properties.name)}/`
		return `
			<article class="border border-radius more-padding margin shadow" id="church_${id}">
				<header>
					<h1>
						<a href="${href}">
							<span id="churchName_${id}">
								${church.properties.name}
							</span>
						</a>
					</h1>
					${church.properties.zone
						? `<p class="small gray">Zone: <span id="churchZone_${id}">
							<a href="/zones/#${this.slugify(church.properties.zone)}">
								${church.properties.zone}
							</a>
						</span></p>`
						: ''
					}
				</header>
				<section>
					<address>
						${church.properties.address
							? `
								<p>
									<span>${church.properties.address.street}</span></br>
									<span id="churchCity_${id}">${church.properties.address.city}</span>,
									<span>${church.properties.address.state}</span>
									<span>${church.properties.address.zip}</span>

								</p>
							`
							: ''
						}
					</address>
					<p>
						${church.properties.pastor
							? `Pastor ${church.properties.pastor}`
							: 'Praying for our next pastor'
						}
					</p>
				</section>
				<footer class="small">
					<p><a href="${href}">${data.site.baseURL}${href.substr(1)}</a></p>
				</footer>
			</article>
		`
	})

}
