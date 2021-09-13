const a = document.getElementById("name");
const b = document.getElementById("location");
let url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("id");
// var c = "MC-1624260222145-d6ac7bec45e8b73edee";
$.ajax({
  type: "Get",
  crossDomain: true,
  dataType: "json",
  contentType: "application/javascript; charset=utf-8",
  url: `http://localhost:3100/api/public/merchant?id=${c}`,
  success: function (res) {
    console.log(res);
    a.innerHTML = res[0].name_merchant;
    b.innerHTML = res[0].locations;
  },
  error: function (err) {
    console.log(err);
  },
});
