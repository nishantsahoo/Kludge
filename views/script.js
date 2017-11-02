$(function()
{
    $.get('/userdata/getusername', function (username) {
        document.getElementById("username").innerText = 'Welcome: ' + username;
    });

    item_body = document.getElementById("item_body");
    $.get('/userdata/getitems', function (items) {
        console.log(items);
    });
    str = "<tr><td>1000</td><td>Item_1</td><tr><tr><td>2000</td><td>Item_2</td><tr><tr><td>3000</td><td>Item_3</td><tr><tr><td>4000</td><td>Item_4</td><tr><tr><td>5000</td><td>Item_5</td><tr><tr><td>6000</td><td>Item_6</td><tr><tr><td>8000</td><td>Item_8</td><tr>";
    item_body.innerHTML = str;
});