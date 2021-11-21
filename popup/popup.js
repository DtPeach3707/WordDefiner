//popup.js

var off = false;
var multipleWords = false;

function toggle() // For turning the extension on and off
{
	if(!(off))
	{
		document.getElementById('customization').setAttribute('style', 'display: none;');
		document.getElementById('toggle').innerHTML = 'Click to turn on the extension';
		off = true;
	}
	else
	{
		document.getElementById('customization').setAttribute('style', '');
		document.getElementById('toggle').innerHTML = 'Click to turn off the extension entirely';
		off = false;
	}
	chrome.storage.sync.set({define: off}, function() {console.log('The word definer has been toggled')});
}


function toggleMultiWord()
{
	if(!(multipleWords))
	{
		multipleWords = true;
		document.getElementById('phrase').innerHTML = 'Click to turn off phrase (multi-word) support';
	}
	else
	{
		multipleWords = false;
		document.getElementById('phrase').innerHTML = 'Click to turn on phrase (multi-word) support';
	}
	chrome.storage.sync.set({phrase: multipleWords}, function() {console.log('Phrase support has been toggled')});
}


document.getElementById('toggle').addEventListener('click', toggle);
document.getElementById('phrase').addEventListener('click', toggleMultiWord);

chrome.storage.sync.get(['define'], function(toggl)
{
	if(toggl.define)
	{
		toggle();
	}
});

chrome.storage.sync.get(['phrase'], function(toggl)
{
	if(toggl.phrase)
	{
		toggleMultiWord();
	}
});
