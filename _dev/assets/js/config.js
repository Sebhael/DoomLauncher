var app_version = '1.0';

var validExts = [
	'wad', // DooM Engine
	'pk3', // DooM & iDTech
	'map'  // BUILD Engine
]

var conf_install = function() {
	this.game = '',
	this.installed = '0',
	this.engine = '',
	this.path = '',
	this.params = '',
}

window.firstLaunch = false;

/**
@todo remove
this is backend logic testing
*/
function game_test()
{
	var test = [];
	window.doom = new conf_install();
	doom.game = 'doom';
	var doom2 = new conf_install();
	doom2.game = 'doom2';
	var heretic = new conf_install();
	heretic.game = 'heretic';

	test.push(doom, doom2, heretic);

	var jsontest = JSON.stringify(test, null, 4);
	air.trace(jsontest);
}