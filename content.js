//content.js

var fetchd = false;
var wrd = '';

function getWord()
{
    var word = document.getElementById('t-formula-bar-input').getElementsByClassName('cell-input')[0];
    if(word)
    {
        if(word.innerHTML.split(' ').length == 1 && word.innerHTML.split('<br>')[0].length > 0)
        {       
            wrd = word.innerHTML.split('<br>')[0];
            chrome.runtime.sendMessage({msg: wrd});
        }
    }
}

document.getElementsByTagName('body')[0].addEventListener('click', getWord);