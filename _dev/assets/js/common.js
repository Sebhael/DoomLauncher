///////////////////////////////////////////////////////////////////////////////////////////////////
// OnDOMLoad Functions
$(function(){
	$('img.game-box, div.back-button').click(function() {
		$('.box-images').toggle();
		$('.setup-form').toggle();
		$('.back-button').toggle();

		$('.img-place').attr('src', $(this).attr('src'));
		//$('h2.game-name').html('');
		$('h2.game-name').html($(this).attr('rel'));
		$('div.game-desc').html($(this).data('desc'));
	});

	$('li.mod-listing').click(function() {
		$('li.mod-listing').css('background-color','rgba(30, 32, 31, 0.5)');
		$(this).css('background-color','rgba(0,0,0,0.8)');
	});
});

///////////////////////////////////////////////////////////////////////////////////////////////////
// LocalStorage Setter
function createList(mods)
{
	purgeList();
/*
	mods.forEach(function(m){
		$('#mods-list').append(
			'<li class="mod-listing pointer" id="'+ m[0] +'" rel="'+ m[1] +'">'
			+ m[1] + '</li>';
			);
	});
*/
	startClickListener();
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// LocalStorage Setter
function startClickListener()
{
	$('li.mod-listing').click(function(){
		launchGame(
			$(this).attr('id'),
			$(this).attr('rel')
			);
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// LocalStorage Setter
function purgeList()
{
	var listToPurge = document.getElementById("mods-list");
	listToPurge.innerHTML = '';
	return;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// LocalStorage Setter
function changePage()
{
	$('div#dl-config').slideToggle('fast');
	$('div.container').slideToggle('fast');
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// LocalStorage Setter
function onClose() // Close (X)
{
    window.nativeWindow.close();
}
function onMinimize() // Minimize (-)
{
    window.nativeWindow.minimize();
}
function onMaximize() // Minimize (-)
{
    window.nativeWindow.maximize();
    $('.wc-maxi').toggle();
    $('.wc-rest').toggle();
}
function onRestore() // Restore
{
    window.nativeWindow.restore();
    $('.wc-rest').toggle();
    $('.wc-maxi').toggle();
}
function onNativeMove()
{
    nativeWindow.startMove();
}
function onResize(type)
{
	nativeWindow.startResize(type);
}