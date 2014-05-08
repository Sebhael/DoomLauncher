window.firstLaunch = false;

//# Initial Configuration #///////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// DooMLauncher Initialization
function startLauncher()
{
	// Show tips, and offer assistance to first-time users.
	if(firstLaunch == true)
	{
		$('#first-launch-tips').show();
	}
}

//# OS Interaction Functions #///////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Modification Folder Selection
function modFolderSelect(game)
{
	var dir = new air.File();

	dir.addEventListener(air.Event.SELECT, dirSelected);
	dir.browseForDirectory("Select Your MODs Folder.");

	function dirSelected(event)
	{
		set_modFolder(dir.nativePath);
		loadMods(dir.nativePath);
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Source Port EXE File Selection
function enginePathSelect(game)
{
	var exe = air.File.documentsDirectory;
	var exeFilter = new air.FileFilter("Executables", "*.exe;*.dmg");

	exe.browseForOpen("Open", new window.runtime.Array(exeFilter));

	exe.addEventListener(air.Event.SELECT, exeSelected);

	function exeSelected(event)
	{
		set_enginePath(game, exe.nativePath);
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Play the Game!
function loadMods(path)
{
	air.trace('loading mods');
	var dir = new air.File(path);
	var files = dir.getDirectoryListing();
	var mods = new Array();

	for (var count = 0; count < files.length; ++count)
	{
		var fileName = files[count].name;
		var fileExt = fileName.substr((~-fileName.lastIndexOf(".") >>> 0) + 2);
		var chex = jQuery.inArray(fileExt, validExts);
		if(chex != -1)
		{
			var modInfo = new Array();
			modInfo[0] = fileName //mod name
			modInfo[1] = dir.nativePath + '/' + fileName; //mod path
			modInfo[2] = ['this','that'], // requires
			modInfo[3] = '-param testing.exe -another-param why not?',
			mods.push(modInfo);
		}
		air.trace(mods);
	}
}

//# DOM Manipulation #///////////////////////

//# LocalStorage Processing #///////////////////////
function set_modFolder(path)
{
    var wadPath = path;
    var bytes = new air.ByteArray();
    bytes.writeUTFBytes(wadPath);
    air.EncryptedLocalStore.setItem("wadFolder", bytes);
    return true;
}

//# Database Processing #///////////////////////

//# Get/Set Methods #///////////////////////

//# Various Helpers & Others #///////////////////////

//#  #///////////////////////