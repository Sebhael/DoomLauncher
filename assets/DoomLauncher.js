var config = {
	enginePath: 'F:/Games/Source Ports/Zandronum/zandronum.exe',
	wadPath: 'F:/Games/Source Ports/Zandronum/wads/'
}

/// I'd recommend not editing anything below, but you are your own person, so you do so at your own risk. 
/**
 * WAD Directory Selection
 */
function wadSelect() {

    var folder = new air.File();
    folder.addEventListener(air.Event.SELECT, dirSelected);
    folder.browseForDirectory("Select a Directory");

    function dirSelected(event) {
    	//alert(folder.nativePath);
    	
    	var contents = folder.getDirectoryListing();
    	var index;
    	var gameIwad;
    	var WadCollection = new Array();

    	for (index = 0; index < contents.length; ++index)
    	{
    		// Place File Name in Var
    		var fname = contents[index].name;
    		// Get the File's EXT
    		var ext = fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2)
    		if(ext.toLowerCase() == 'wad' || ext.toLowerCase() == 'pk3')
    		{
    			// Get the Game
    			var game = fname.substr(0, fname.indexOf('_'));
    			// Check if it's D1(Doom), or D2(Doom2)
    			if(game == 'd1')
    			{
    				gameIwad = 'doom';
    			}
    			else
    			{
    				gameIwad = 'doom2';
    			}
    			// Add them to the array to build the front page.
    			var theseThings = new Array();
    			theseThings[0] = gameIwad;
    			theseThings[1] = fname;
    			WadCollection.push(theseThings)
    		}
    		//air.trace(fname.substr(0, fname.indexOf('_')));
    	}
    	// Send to BuildHTML Function
    	buildHtml(WadCollection);
    }
}

/**
 * BuildHTML
 */
function buildHtml(wads) {
	wads.forEach(function(entry){
		$('#wad-list').append(
			'<li class="wad-listing pointer" id="'+entry[0]+'" rel="'+entry[1]+'">' 
			+
			entry[1]
			+
			'</li>'
			);
	});
	attachEvents();
}

/**
 * EventListener
 */
function attachEvents()
{
	$('li.wad-listing').click(function(){
		var game = $(this).attr('id');
		var wad = $(this).attr('rel');
		air.trace(wad);
		playZ(game, wad);

	})
}

/**
 * Play DOOM
 */
function playZ(iwad, wad) {
	var process;
	var nativeProcessStartupInfo = new air.NativeProcessStartupInfo();

	/* Define the startup exe */
	var exe = new air.File(config.enginePath);
	nativeProcessStartupInfo.executable = exe;

	/* Build the Args */
	var args = new air.Vector["<String>"]();
	// First two should always be the initial game to play.
	args[0] = "-iwad"; 
	args[1] = iwad + '.wad';
	args[2] = "-file";
	args[3] = config.wadPath + wad;
	// Define the remaining files needed.
	nativeProcessStartupInfo.arguments = args;
	// Construct, and Launch
	process = new air.NativeProcess();
	return process.start(nativeProcessStartupInfo);
}