function createList(mods)
{
	purgeList();

	mods.forEach(function(m){
		$('#mods-list').append(
			'<li class="mod-listing pointer" id="'+ m[0] +'" rel="'+ m[1] +'">'
			+ m[1] + '</li>';
			);
	});

	startClickListener();
}

function startClickListener()
{
	$('li.mod-listing').click(function(){
		launchGame(
			$(this).attr('id'),
			$(this).attr('rel')
			);
	});
}

function purgeList()
{
	var listToPurge = document.getElementById("mods-list");
	listToPurge.innerHTML = '';
	return;
}