jasmine.getFixtures().fixturesPath = 'public/partials/';

function loadTemplates($templateCache) {
	$templateCache.put('partials/infeccion-detail.html', jasmine.getFixtures().getFixtureHtml_('infeccion-detail.html'));
    $templateCache.put('partials/otros-cultivos.html', jasmine.getFixtures().getFixtureHtml_('otros-cultivos.html'));
}