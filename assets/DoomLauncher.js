function engines(reqs, path)
{
    this.reqs = reqs;
    this.path = path;
}

window.installedEngines = [
    new engines('DOOM.WAD', 'c:/test/lol.exe'),
    new engines('DOOM2.WAD', 'c:/test/lol2.exe')
];

/**
 * Init
 *  Check to see if WadPath is set, if so, load the list.
 */
function init()
{ 
    var ConfigWadPath = getWadPath();
    if(ConfigWadPath != null) 
    {
        loadWads(ConfigWadPath);
    }
}


/**
 * Load Wads
 *  Loads all .wad and .pk3 files found in the directory.
 */
function loadWads(path)
{
    var folder = new air.File(path);
    var contents = folder.getDirectoryListing();
    var gameIwad;
    var WadCollection = new Array();

    for (var index = 0; index < contents.length; ++index)
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
            // @todo clean this up, especially considering hexen and the others
            if(game == 'd1')
            { gameIwad = 'doom'; }
            else
            { gameIwad = 'doom2'; }
            // Add them to the array to build the front page.
            var gameFiles = new Array();
            gameFiles[0] = gameIwad;
            gameFiles[1] = fname;
            WadCollection.push(gameFiles)
        }
        buildHtml(WadCollection);
    }
}

/**
 * WAD Directory Selection
 *  Opens a explorer prompt for the user to select their WADs
 */
function wadSelect() {

    var folder = new air.File();
    folder.addEventListener(air.Event.SELECT, dirSelected);
    folder.browseForDirectory("Select your WAD Folder.");

    function dirSelected(event) {
        setWadFolderDir(folder.nativePath);
        loadWads(folder.nativePath);
    }
}

/**
 * Engine Exe Selection
 *  Opens a explorer prompt for the user to select their exe.
 */
function engineSelect()
{
    var exe = air.File.documentsDirectory;
    var exeFilter = new air.FileFilter("Executable", "*.exe");
    exe.browseForOpen("Open", new window.runtime.Array(exeFilter));
    exe.addEventListener(air.Event.SELECT, exeSelected);

    function exeSelected(event)
    {
        setEnginePath(exe.nativePath);
    }

}

/**
 * BuildHTML
 *  Populates the UL#wad-list with WADs
 */
function buildHtml(wads) {
    // Clean up the old list first.
    resetHtml();

    // Go through the Wad array, and build a <li> for each.
    // @todo clean this mess
	wads.forEach(function(entry){
		$('#wad-list').append(
			'<li class="wad-listing pointer" id="'+entry[0]+'" rel="'+entry[1]+'">'
            +
            '<img src="/img/'+entry[0]+'.png" class="game-ico">' 
			+
			entry[1]
			+
			'</li>'
			);
	});

    // Start listening for clicks on the list
	clickHandler();
}

/**
 * ResetHtml
 *  Removes the generated HTML from buildHtml()
 *  to populate a new list.
 */
function resetHtml()
{
    var list = document.getElementById("wad-list");
    // Purge the list
    list.innerHTML = '';
    return true;
}

/**
 * EventListener
 *  Listen for clicks on the wad-listing li's
 */
function clickHandler()
{
	$('li.wad-listing').click(function(){
        // The ID will decide the IWAD
		var game = $(this).attr('id');
        // the rel attributes will govern the custom Wad
		var wad = $(this).attr('rel');
        // Launch the Game w/ the IWAD & WAD information.
		playDoom(game, wad);
	})
}

/**
 * Play DOOM
 *  Compiles the data from the list, and launches the users
 *  prefered source port w/ the proper WADs.
 */
function playDoom(iwad, wad) {
    // Get the stored path information
    var wadFolderPath = getWadPath();
    var sourcePort = getEnginePath();

    // Initiate NativeProcess & all required methods.
	var process = new air.NativeProcess();
	var nativeProcessStartupInfo = new air.NativeProcessStartupInfo();
	var exe = new air.File(sourcePort);
	var args = new air.Vector["<String>"]();

	// First two should always be the initial game to play.
	args[0] = "-iwad"; 
	args[1] = iwad + '.wad';
    // @todo recursive looping for multi-wad mods.
	args[2] = "-file";
	args[3] = wadFolderPath + '\\' + wad;

    // Attach the needed information to nativeProcessStartInfo
    nativeProcessStartupInfo.executable = exe;
	nativeProcessStartupInfo.arguments = args;
	// and Launch
	return process.start(nativeProcessStartupInfo);
}

/*******
** GETTERS & SETTERS
********/
/**
 * Set WAD Folder
 */
function setWadFolderDir(path)
{
    var wadPath = path;
    var bytes = new air.ByteArray();
    bytes.writeUTFBytes(wadPath);
    air.EncryptedLocalStore.setItem("wadFolder", bytes);
    return true;
}

/**
 * Get WAD Folder
 */
function getWadPath()
{
    var wadPath = air.EncryptedLocalStore.getItem("wadFolder");
    return wadPath;
}

/**
 * Set Engine Exe Path
 */
function setEnginePath(path)
{
    var enginePath = path;
    var bytes = new air.ByteArray();
    bytes.writeUTFBytes(enginePath);
    air.EncryptedLocalStore.setItem("enginePath", bytes);
    air.trace(path);
    return true;
}

/**
 * Get Engine Exe Path
 */
function getEnginePath()
{
    var enginePath = air.EncryptedLocalStore.getItem("enginePath");
    return enginePath;
}

/*******
** CONFIGURATION AND SET-UP FUNCTIONS
********/
/**
 * Custom WindowChrome Listeners
 */
function onClose() // Close (X)
{
    window.nativeWindow.close();
}
function onMinimize() // Minimize (-)
{
    window.nativeWindow.minimize();
}
function onRestore() // Restore
{
    window.nativeWindow.restore();
}
function onNativeMove()
{
    nativeWindow.startMove();
}