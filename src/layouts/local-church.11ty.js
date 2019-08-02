/**
 * @file Defines the nested local church template
 * @author Reuben L. Lillie <rlillie@pghnaz.org>
 */

/**
 * An Eleventy JavaScript template using classes and optional data method
 * @class
 * @see {@link https://www.11ty.io/docs/languages/javascript/#classes 11ty docs}
 */
class LocalChurch {
	data() {
		return {
			layout: '../includes/layouts/content' // relative to src/layouts/
		}
	}

	render(data) {
		var church = data.churches[data.page.fileSlug]
		var id = church.properties.gmcID.substr(4)

		return `
			<article id="article_${id}">
				<header>
					<h1>${church.properties.name} Church of the Nazarene</h1>
				</header>
				<section>
					<p class="small gray">
						${church.properties.yearOrganized
							? `Organized: <span id="churchYearOrganized_${id}">
								${church.properties.yearOrganized}
							</span><br>`
							: ''
						}
						${church.properties.gmcID
							? `ID: <span id="churchID_${id}">
								${church.properties.gmcID}
							</span><br>`
							: ''
						}
						${church.properties.zone
							? `Zone: <span id="churchZone_${id}">
								<a href="/zones/#${this.slugify(church.properties.zone)}">
									${church.properties.zone}
								</a>
							</span>`
							: ''
						}
					</p>
						${church.properties.address
							? `<section class="grid grid-repeat-columns">
									<address>
									${church.properties.mailingAddress
										? `<h1>Physical Address</h1>`
										: ''
									}
									<p>
										<span>${church.properties.address.street}</span></br>
										<span id="churchCity_${id}">${church.properties.address.city}</span>,
										<span>${church.properties.address.state}</span>
										<span>${church.properties.address.zip}</span>

									</p>
									${church.properties.phone
										? `<p>
											<a href="tel:+1${this.numberfy(church.properties.phone)}">
												${church.properties.phone}
											</a>
										</p>`
										: ''
									}
								</address>
								${church.properties.mailingAddress
									? `<address>
										<h1>Mailing Address</h1>
										<p>
											<span>${church.properties.mailingAddress.street}</span></br>
											<span id="churchCity_${id}">${church.properties.mailingAddress.city}</span>,
											<span>${church.properties.mailingAddress.state}</span>
											<span>${church.properties.mailingAddress.zip}</span>

										</p>
									</address>`
									: ''
								}
							</section>`
							: ''
						}
					<p>
						${church.properties.pastor
							? `Pastor ${church.properties.pastor}`
							: 'Praying for our next pastor'
						}
					</p>
					${church.properties.website
						? `<p>
							<a href="${church.properties.website}">
								${church.properties.website}
							</a>
						</p>`
						: ''
					}
					${church.properties.social
						? `${this.socialLinks(church.properties.social)}`
						: ''
					}
					<div id="map"></div>
					<p>Find more local churches on our <a href="/map/">District Map</a>.</p>
				</section>
				${data.content}
			</article>
			<script async defer>
			${this.minifyJS(`
				var map
				var initMap = function () {
				var map = new google.maps.Map(document.getElementById('map'), {
					center: {
						lat: ${church.geometry.coordinates[1]},
						lng: ${church.geometry.coordinates[0]}
					},
					zoom: 13,
					styles: ${this.fileToString('branding/data/google-maps-styles.json')}
				})

					// A GeoJSON feature object
					var church = ${JSON.stringify(church)}

					// Add a map marker with an info window when clicked
					var addMarker = function (church) {

						var image = {
							url: '/includes/assets/images/nazarene-logo-map-marker-red.png',
							size: new google.maps.Size((35.184), 48),
							origin: new google.maps.Point (0, 0),
							anchor: new google.maps.Point (0, 48)
						}

						//Define the map marker properties
						var marker = new google.maps.Marker({
							position: {
								lat: church.geometry.coordinates[1],
								lng: church.geometry.coordinates[0]
							},
							map: map,
							icon: image
						})

						// A helper function to format a string like a url
						var slugify = function (text) {
							return text.toString().toLowerCase().trim()
								.replace(/\\s+/g, '-')
								.replace(/\\-\\-+/g, '-')
						}

						// A helper function to format a string for Google Maps
						var plusify = function (text) {
							return text.toString().trim()
								.replace(/\\s+/g, '+')
								.replace(/\\+\\++/g, '+')
						}

						// A template to load into a Google Maps info window
						var infoWindowContent = function () {
							var html = ''
							church.properties.name
								? html += '<h2 class="medium">' +
										church.properties.name + '<br>Church of the Nazarene' +
								'</h2>'
								: html += ''
							church.properties.address
								? html += '<address>' +
									church.properties.address.street + '<br>' +
									church.properties.address.city + ', ' +
									church.properties.address.state +  ' ' +
									church.properties.address.zip +
								'</address>'
								: ''
							church.geometry.coordinates
								? html += '<p class="small gray">' +
									'<a href="https://maps.google.com/maps/place/' +
										plusify(church.properties.name + ' Church of the Nazarene') +
									'/@' +
										church.geometry.coordinates[1] + ',' +
										church.geometry.coordinates[0] + ',19z/">' +
										'View on Google Maps' +
									'</a>' +
									'<br>' +
									church.geometry.coordinates[1] + ', ' +
									church.geometry.coordinates[0] +
								'</p>'
								: ''

							return html
						}

						// Define the info window properties
						var infoWindow = new google.maps.InfoWindow({
							content: infoWindowContent()
						})

						// Load an info window when a marker is clicked
						marker.addListener('click', function () {
							infoWindow.open(map, marker)
						})

					}

					// Add a dynamic marker to the map
					addMarker(church)

				}`)
			}
			</script>
			${this.googleMapsAPI()}
		`
	}
}

module.exports = LocalChurch
