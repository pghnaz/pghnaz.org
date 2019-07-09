/**
 * @file Defines the base template
 * @author Reuben L. Lillie <rillie@pghnaz.org>
 */

/**
 * The base JavaScript template layout
 * @module layouts/base
 * @param {Object} data The 11ty data object for a given URL
 * @return ${String} HTML
 * @see {@link https://www.11ty.io/docs/languages/javascript/ 11ty docs}
 */
module.exports = function (data) {
	return `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>
				${data.page.url === '/'
					? `${data.site.title}`
					: `${data.site.title} - ${data.title}`
				}
			</title>
		</head>
		<body>
			<header id="site_header">
				${data.page.url === '/'
					? `<h1>${data.site.title}</h1>`
					: `<a href="/"><h1>${data.site.title}</h1></a>`
				}
			</header>
			${data.content}
			<footer id="site_footer">
				<p><a href="/copyright/">Copyright</a> &copy; ${data.site.copyright.year} by ${data.site.copyright.owner}</p>
			</footer>
		</body>
	</html>
	`
}
