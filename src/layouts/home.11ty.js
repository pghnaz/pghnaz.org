/**
 * @file Defines the nested Home Page
 * @author Reuben L. Lillie <rlillie@pghnaz.org>
 */

module.exports = function (data) {
	// The home page template
	return `
	<!DOCTYPE html>
	<html lang="en">
		${this.headTag(data)}
		<body class="grid no-margin home">
			<header id="site_header" class="grid-column-full-bleed large justify-center white xx-large" style="background-position:center;background-size:cover;">
				<div class="flex flex-wrap align-items-center space-between">
					${data.site.logo
						? `<span class="logo flex">${this.fileToString(data.site.logo)}</span>`
						: data.title
							? `<h1>${data.site.title}</h1>`
							: ''
					}
					${this.callToAction(data)}
				</div>
				<div class="flex flex-column justify-content align-items-center text-center text-shadow flex-end" style="line-height:1;">
					<picture class="logo x-small black">
						${this.fileToString('branding/logo-mock-ups/pghnaz-logo-stencil.svg')}
					</picture>
					<h1 class="no-margin">You can’t get very far without a bridge</h1>
					<p class="no-margin">Let’s cross life’s toughest obstacles together</p>
					<a class="call-to-action border-radius shadow padding more-margin" style="background-color:transparent;border:var(--base-unit-half) solid var(--white);" href="${data.site.callToAction.link}">${data.site.callToAction.text}</a>
				</div>
			</header>
			<nav class="grid grid-column-full-bleed grid-repeat-columns border-top border-bottom more-padding text-center" style="z-index:1;background-color:var(--white);">
				<a class="call-to-action more-margin padding border-radius" href="/about/">Learn More</a>
				<a class="call-to-action more-margin padding border-radius" href="/calendar/">Attend an Event</a>
				<a class="call-to-action more-margin padding border-radius" href="/contact/">Contact Us</a>
			</nav>
			<main id="site_main" class="grid-column-full-bleed flex flex-column">
				<section class="grid grid-repeat-columns align-items-center">
					<a href="/map/" style="height:50vw;background-image:url('branding/images/district-map-screenshot.png');background-position:center;background-size:cover;"></a>
					</a>
					<div class="text-center flex flex-column space-around" style="justify-items:center;position:relative;">
						<div role="hidden" class="gray" style="z-index: -1;position: absolute;font-size: 1.5em;text-align: justify;opacity: 0.1;line-height: 0.87;hyphens: auto;word-break: break-all;">
							${(function () {
									var shuffle = function (array) {
										var currentIndex = array.length
										var temporaryValue, randomIndex

										// While there remain elements to shuffle...
										while (0 !== currentIndex) {
											// Pick a remaining element...
											randomIndex = Math.floor(Math.random() * currentIndex);
											currentIndex -= 1

											// And swap it with the current element.
											temporaryValue = array[currentIndex]
											array[currentIndex] = array[randomIndex]
											array[randomIndex] = temporaryValue
										}

										return array
									}

									var arr =  shuffle(Object.keys(data.churches))
									return arr.map(item => data.churches[item].properties.name).join(' ')
							}
							)()}
						</div>
						<h2>Hi, Neighbor!</h2>
						<p><a href="/directory/">${Object.keys(data.churches).length} local churches</a><br> across western Pennsylvania</p>
						<p>Check out our interactive <a href="/map/">District Map</a></p>
						${this.callToAction(data)}
					</div>
				</section>
			<section class="grid grid-column-full-bleed grid-repeat-columns border-top border-bottom more-padding text-center" style="z-index:1;background-color:var(--white);">
					<p>The local church, the Body of Christ, is the representation of our <a href="/articles-of-faith/">faith</a> and <a href="/mission/">mission</a>.</p>
				</section>
				<section id="auxiliaries" class="grid grid-repeat-columns text-center white text-shadow">
					<div style="background-color:rgba(198,12,48,0.66);align-content:space-between;" class="grid more-padding">
						<h2>Sunday School and Discipleship Ministries</h2>
						<p>preparing all ages for a lifetime on mission</p>
						<a href="https://sdmi.pghnaz.org/" class="border-radius margin call-to-action" style="border:var(--base-unit-half) solid white;background-color:transparent;text-decoration:none;">Learn more</a>
					</div>
					<div style="background-color:rgba(0,48,135,0.66);align-content:space-between;" class="grid more-padding">
						<h2>Missions</h2>
						<p>mobilizing the church through praying, giving, educating, and engaging children and youth</p>
						<a href="https://nmi.pghnaz.org/" class="border-radius margin call-to-action" style="border:var(--base-unit-half) solid white;background-color:transparent;text-decoration:none;">Learn more</a>
					</div>
					<div style="background-color:rgba(255,182,18,0.87);align-content:space-between;" class="grid more-padding">
						<h2>Youth</h2>
						<p>calling our generation to a dynamic life in Christ</p>
						<a href="https://nyi.pghnaz.org/" class="border-radius margin call-to-action" style="border:var(--base-unit-half) solid white;background-color:transparent;text-decoration:none;">Learn more</a>
					</div>
				</section>
			</main>
			${this.siteFooter(data)}
		</body>
	</html>
	`
}
