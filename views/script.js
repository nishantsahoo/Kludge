$(function()
{
    $.get('/userdata/getusername', function (username) {
        document.getElementById("username").innerText = 'Username:' + username;
    });

    item_body = $("#item_body");
    $.get('/userdata/getitems', function (items) {
        console.log(items);
    });

}); // end of the script file