/**
 * @file Defines the nested template for district zones
 * @author Reuben L. Lillie <rlillie@pghnaz.org>
 */

/**
 * An Eleventy JavaScript template using classes and optional data method
 * @class
 * @see {@link https://www.11ty.io/docs/languages/javascript/#classes 11ty docs}
 */
class Zones {
	data() {
		return {
			layout: '../includes/layouts/content' // relative to src/layouts/
		}
	}

	render(data) {
	  // An array of churches from GeoJSON files in `src/data/churches`
		var churches =  this.arrayFromObject(data.churches)

    // Group churches by the zone property using the groupBy filter
    var churchesByZone = this.groupBy(churches, church => church.properties.zone)

    // Alphabetize churchesByZone array
    var sortedZones = {};
    Object.keys(churchesByZone).sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    }).forEach(function(key) {
      sortedZones[key] = churchesByZone[key]
    })

    // Declare an html object containing the page content
    var html = data.content

    // Append a list with a heading for each zone
    Object.keys(sortedZones).map(zone => html += `
      <ul>
        <header id="${this.slugify(zone)}">
          <h1>
            <span>${zone}</span>
            <span class="small">(${sortedZones[zone].length} local churches)</span>
          </h1>
        </header>
        ${sortedZones[zone].map(church =>
            `<li>
              <a href="/${this.slugify(church.properties.name)}/">
                ${church.properties.name}
              </a>
            </li>`
          ).join('')
        }
      </ul>
    `)

    return html
	}
}

module.exports = Zones
