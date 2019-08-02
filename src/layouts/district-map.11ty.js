/**
 * @file Defines the nested “District Map” template
 * @author Reuben L. Lillie <rlillie@pghnaz.org>
 */

/**
 * An Eleventy JavaScript template using classes and optional data method
 * @class
 * @see {@link https://www.11ty.io/docs/languages/javascript/#classes 11ty docs}
 */
class DistrictMap {
	data() {
		return {
			layout: '../includes/layouts/content' // relative to src/layouts/
		}
	}

	render(data) {
		// Create an array from a JavaScript object containing keyed objects
		var churches =  this.arrayFromObject(data.churches)

		// The map template
		return `
			${data.content}
			<div id="map"></div>
			<script async defer>
			${this.minifyJS(
				`var map
				var initMap = function () {

					// Define the map properties
					var map = new google.maps.Map(document.getElementById('map'), {
						// Coordinates for Mt. Chestnut Nazarene Center
						center: {
							lat: 40.89822,
							lng: -79.98357
						},
						zoom: 7, // wide area, large metropolitan area
						styles: ${this.fileToString('branding/data/google-maps-styles.json')}
					})

					// An array of GeoJSON feature objects
					var churches = ${JSON.stringify(churches)}

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
									'<a href="/' +
										slugify(church.properties.name) +
									'">' +
									church.properties.name + '<br>Church of the Nazarene' +
									'</a>' +
								'</h2>'
								: html += ''
							church.properties.zone
								? html += '<span>Zone: <a href="/zones/#' +
										slugify(church.properties.zone) +
									'">' +
									church.properties.zone +
									'</a></span>'
								: html += ''
							church.properties.pastor
								? html += '<p>Pastor ' + church.properties.pastor + '</p>'
								: html += '<p>Praying for our next pastor ' + '</p>'
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

					// Add a dynamic marker to the map for each church
					churches.forEach(function (church) {
						addMarker(church)
					})
				}`)
			}
			</script>
			${this.googleMapsAPI()}
		`
	}
}

module.exports = DistrictMap
