$(function()
{
    $.get('/sniff/ippack', function (username) {
        document.getElementById("username").innerText = username;
    });      
}); // end of the script file