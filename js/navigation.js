(() => {
	const groups = [
		['OVERVIEW', [
			['dashboard', 'Dashboard', 'index.html', '▦'],
			['digital-twin', 'Digital Twin', 'digital-twin.html', '◎'],
		]],
		['OPTIMIZATION', [
			['css-optimization', 'CSS Optimization', 'css-optimization.html', '♨'],
			['srp-optimization', 'SRP Optimization', 'srp-optimization.html', '⚙'],
			['joint-optimization', 'Joint CSS–SRP', 'joint-optimization.html', '⇄'],
		]],
		['MONITORING', [
			['simulator', 'What-If Simulator', 'simulator.html', '◇'],
			['operating-envelope', 'Operating Envelope', 'operating-envelope.html', '△'],
			['predictions', 'Predictions', 'predictions.html', '⌁'],
			['risk-monitoring', 'Risk Monitoring', 'risk-monitoring.html', '!'],
		]],
		['ANALYTICS', [
			['production', 'Production', 'production.html', '▥'],
			['energy', 'Energy', 'energy.html', '⚡'],
			['history', 'Well History', 'history.html', '◷'],
		]],
		['SYSTEM', [
			['alerts', 'Alerts', 'alerts.html', '♢'],
			['recommendations', 'Recommendations', 'recommendations.html', '✦'],
			['calibration', 'Calibration', 'calibration.html', '↻'],
			['data-management', 'Data Management', 'data-management.html', '▤'],
			['settings', 'Settings', 'settings.html', '⚙'],
		]],
	];

	const currentPage = window.location.pathname.split('/').pop() || 'index.html';
	const activePage = currentPage === 'dashboard.html' || currentPage === 'index.html'
		? 'dashboard'
		: currentPage.replace(/\.html$/i, '');
	const existingSidebar = document.querySelector('.sidebar');
	const app = document.querySelector('.app, .app-layout, .app-container')
		|| existingSidebar?.parentElement;

	if (!app) return;

	const sidebar = document.createElement('aside');
	sidebar.className = 'sidebar';
	sidebar.innerHTML = `
		<div class="brand">
			<div class="brand-logo">◇</div>
			<div class="brand-text">
				<h2>OPTIMA</h2>
			</div>
		</div>
		<nav class="navigation" aria-label="Main navigation">
			${groups.map(([title, items]) => `
				<div class="nav-section">
					<span class="nav-title">${title}</span>
					${items.map(([id, label, href, icon]) => `
						<a href="${href}" class="nav-item${activePage === id ? ' active' : ''}"${activePage === id ? ' aria-current="page"' : ''}>
							<span class="nav-icon">${icon}</span>
							<span>${label}</span>
							${id === 'alerts' ? '<b class="notification">3</b>' : ''}
						</a>
					`).join('')}
				</div>
				`).join('')}
			</div>
	`;

	if (existingSidebar) {
		existingSidebar.replaceWith(sidebar);
	} else {
		const main = app.querySelector('main');
		app.insertBefore(sidebar, main || app.firstChild);
	}
})();