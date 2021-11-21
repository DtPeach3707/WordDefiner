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

function getMultiWord()
{
    var word = document.getElementById('t-formula-bar-input').getElementsByClassName('cell-input')[0];
    if(word)
    {
        if((word.innerHTML.split(' ').length >= 1 && word.innerHTML.split('<br>')[0].length > 0))
        {    
            var totwrd = '';
            var i = 0;
            for (w of word.innerHTML.split('<br>')[0].split(' '))
            {
                if(i > 0)
                {
                    totwrd = totwrd + '-'
                }
                totwrd = totwrd + w;
                i++;
            }  
            chrome.runtime.sendMessage({msg: totwrd});
        }
    }
}


function togEventListener(togl, multi)
{
    if(togl)
    {
        if(multi)
        {
            document.getElementsByTagName('body')[0].removeEventListener('click', getMultiWord);
        }
        else
        {
            document.getElementsByTagName('body')[0].removeEventListener('click', getWord);
        }
    }
    else
    {
        if(multi)
        {
            document.getElementsByTagName('body')[0].addEventListener('click', getMultiWord);
        }
        else
        {
            document.getElementsByTagName('body')[0].addEventListener('click', getWord);
        }
    }
}


chrome.storage.sync.get(['define', 'phrase'], function(toggle)
{
    if(!(toggle.define == null))
    {
        off = toggle.define;
        if(toggle.phrase)
        {
            multiWord = toggle.phrase;
            togEventListener(toggle.define, toggle.phrase);
        }  
        else
        {
            togEventListener(toggle.define, false);
        }
    }
    else
    {
        if(toggle.phrase)
        {
            multiWord = toggle.phrase;
            togEventListener(false, toggle.phrase);
        }  
        else
        {
            togEventListener(false, false);
        }
    }
});


chrome.storage.onChanged.addListener(function (changes, namespace)
{
    for(let [key, {oldValue, newValue}] of Object.entries(changes))
    {
        if(key == 'phrase')
        {
            multiWord = newValue;
        }
        else if(key == 'define')
        {
            off = newValue;
        }
    }
    togEventListener(off, multiWord);
});
