/**
 *
 */
function init()
{ 
    var ConfigWadPath = air.EncryptedLocalStore.getItem("wadFolder");
    if(ConfigWadPath != '')
    {
        loadWads(ConfigWadPath);
    }
}

/**
 *
 */
function getWadPath()
{
    var wadPath = air.EncryptedLocalStore.getItem("wadFolder");
    return wadPath;
}

/**
 *
 */
function getEnginePath()
{
    var enginePath = air.EncryptedLocalStore.getItem("enginePath");
    return enginePath;
}

/**
 *
 */
function loadWads(path)
{
    //air.trace(ConfigWadPath);
    var folder = new air.File(path);
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
            // @todo clean this up, especially considering hexen and the others
            if(game == 'd1')
            {
                gameIwad = 'doom';
            }
            else
            {
                gameIwad = 'doom2';
            }
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
 *
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
 *
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
 *
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
 * BuildHTML
 */
function buildHtml(wads) {
    resetHtml();
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
	clickHandler();
}

/**
 *
 */
function resetHtml()
{
    var list = document.getElementById("wad-list");
    list.innerHTML = '';
    return true;
}

/**
 * EventListener
 */
function clickHandler()
{
	$('li.wad-listing').click(function(){
		var game = $(this).attr('id');
		var wad = $(this).attr('rel');
        // Launch the Game w/ the IWAD & WAD information.
		playDoom(game, wad);
	})
}

/**
 * Play DOOM
 */
function playDoom(iwad, wad) {
    //air.trace(ConfigWadPath);
    var wadFolderPath = getWadPath();
    var sourcePort = getEnginePath();
    //air.trace(testing);
	var process;
	var nativeProcessStartupInfo = new air.NativeProcessStartupInfo();

	/* Define the startup exe */
	var exe = new air.File(sourcePort);
	nativeProcessStartupInfo.executable = exe;

	/* Build the Args */
	var args = new air.Vector["<String>"]();
	// First two should always be the initial game to play.
    // @todo recursive looping for multi-wad mods.
	args[0] = "-iwad"; 
	args[1] = iwad + '.wad';
	args[2] = "-file";
	args[3] = wadFolderPath + '\\' + wad;
	// Define the remaining files needed.
	nativeProcessStartupInfo.arguments = args;
	// Construct, and Launch
	process = new air.NativeProcess();
	return process.start(nativeProcessStartupInfo);
}