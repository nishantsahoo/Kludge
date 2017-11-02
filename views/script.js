$(function()
{
    $.get('/userdata/getusername', function (username) {
        document.getElementById("username").innerText = 'Username:' + username;
    });


}); // end of the script file