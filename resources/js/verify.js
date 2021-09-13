document.getElementById("message1").innerHTML = "Your request is processing";
document.getElementById("message1").style.fontWeight = "bold";
document.getElementById("message2").innerHTML = "";
setTimeout(() => {
  let url_string = window.location.href;
  var url = new URL(url_string);
  var c = url.searchParams.get("token");
  console.log(c);
  $.ajax({
    type: "Get",
    crossDomain: true,
    dataType: "json",
    contentType: "application/javascript; charset=utf-8",
    url: `http://localhost:3100/api/public/verify?token=${c}`,
    success: function (res) {
      if (res.status) {
        document.getElementById("message1").innerHTML =
          "Your Email Address Has Been Verified.";
        document.getElementById("message2").innerHTML = "Thank you";
        document.getElementsByClassName("loader")[0].style.display = "none";
        var img = document.createElement("img");
        img.src = "./upload/success_icon.png";
        var src = document.getElementById("icon");
        src.appendChild(img);
      } else {
        document.getElementById("message1").innerHTML =
          "Uh-oh! The verification is failed!";
        document.getElementById("message2").innerHTML =
          "The reset link is invalid. Please try again on Boo app";
        document.getElementsByClassName("loader")[0].style.display = "none";
        var img = document.createElement("img");
        img.src = "./upload/fail_icon.png";
        var src = document.getElementById("icon");
        src.appendChild(img);
      }
    },
    error: function (err) {
      document.getElementById("message1").innerHTML =
        "Uh-oh! The verification is failed!";
      document.getElementById("message2").innerHTML =
        "The reset link is invalid. Please try again on Boo app";
      document.getElementsByClassName("loader")[0].style.display = "none";
      var img = document.createElement("img");
      img.src = "./upload/fail_icon.png";
      var src = document.getElementById("icon");
      src.appendChild(img);
    },
  });
}, 2000);
