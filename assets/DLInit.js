function wadSelect() {

    var file = new air.File();
    file.addEventListener(air.Event.SELECT, dirSelected);
    file.browseForDirectory("Select a Directory");

    function dirSelected(event) {
    	alert(file.nativePath);
    }
}