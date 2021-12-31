//background.js
//listens to message from content script to get word, then gets defention
//With the defenition, it executes script to put it on the sheets

const makeDeffunc = `
function makeDef(defin)
{
    var txt = document.getElementById('t-formula-bar-input').getElementsByClassName('cell-input')[0];
    if(txt)
    {
        txt.innerHTML = defin + '<br>';
    }
}`;


async function getDef(word)
{
    urlStr = 'https://www.google.com/search?q=' + word + '+defenition';
    const defData = await fetch(urlStr);
    const defText = await defData.text();
    if(defText.split('data-dobid="dfn"><span>')[1])
    {
        var definition = defText.split('data-dobid="dfn"><span>')[1].split('</span>')[0];
    }
    else if (defText.split('"LC20lb DKV0Md">'))
    {
        console.log(defText.split('"LC20lb DKV0Md">')[1].split('</h3>')[0].split('-')[1]);
        if(defText.split('"LC20lb DKV0Md">')[1].split('</h3>')[0].split('-')[1] == ' Urban Dictionary')
        {
            var definition = '(From Urban Dictionary) ' + defText.split('"VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc lEBKkf"')[1].split('<em>')[0].split('<span>')[1];
        }
        else
        {
            var definition = 'ERR: Cannot find a defention for this word!';
        }
    }
    else
    {
        var definition = 'ERR: Cannot find a defention for this word!'
    }
    chrome.scripting.executeScript({code: makeDeffunc + '\nmakeDef(' + definition + ');'});
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if(request)
    {
        getDef(request.msg);
    }
});
