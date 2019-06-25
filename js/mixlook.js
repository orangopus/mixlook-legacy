

var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("profile");
var emb = url.searchParams.get("embed");
var player = url.searchParams.get("player");

console.log("Username: " + c + " | Embed: " +emb);
username = c;

function linkSearch(){
  $(document).ready(function() {
  $("#scrollbar").css({ "overflow-y": "scroll" }); 
  $("#uname").remove();
  $("#header").removeClass("header");
  $("#generated").remove();
  $("#user").text(username)
  grabUser();
  });
}

function embeds() {
  $(document).ready(function() {
  $('head').append('<link rel="stylesheet" type="text/css" href="embed.css">');
  console.log("Embed is turned on.");
  $("#scrollbar").css({ overflow: "hidden" });
  $("#widget").hide();
  }); 
}

function disablePlayer() {
  $(document).ready(function() {
  $("#embedshow").remove();
  console.log("Player is disabled");
  }); 
}


$(document).ready(function() {
  $("#uname").add();
  $("#widgetbutts").hide();
  $("#header").addClass("header animated slideInDown");
  $("#embed").css({ display: "none" });
  if (username = c) {
    linkSearch();
  }
  if (emb === "show"){
    embeds();
  }
  if (player === "hide"){
    disablePlayer();
  }
  $("#uname").on("keyup", function(e) {
    if (e.which) {
      username = $("#uname").val();
      grabUser();
      $("#profile").css({ visibility: "visible" });
      $("#header").removeClass("header");
      $("#footer").css({ display: "unset", "padding-bottom": "20px;" });
      $("#scrollbar").css({ "overflow-y": "scroll" });
      $("#generated").addClass("small");
    }
    if ($("#uname").val() === "") {
      $("#profile").css({ visibility: "hidden" });
      $("#generated").removeClass("small");
      $("#generated").text("It's like magic. ✨ No signup required!");
      $("#header").removeClass("animated slideInUp");
      $("#header").addClass("header animated slideInDown");
      $("#scrollbar").css({ overflow: "hidden" });
      $("#pagetitle").text("Mixlook");
      $("#favicon").attr(
        "href",
        "https://mixer.com/_latest/assets/favicons/favicon-16x16.png"
      );
    }
  });
});

  function grabUser() {
    $(document).ready(function() {
    var url = "https://mixer.com/api/v1/channels/" + username;
    $.get(url, function(result) {
      var desc = result.description;
      if (desc === null) {
        desc = "No description detected.";
      }
      var name = result.token;
      $("#pagetitle").text(name + " on Mixer");
      $("#about").text("About " + name);
      $("#desc").html(desc + "<p style='visibility: hidden;'>.</p>");
      var twitter = result.user.social.twitter;
      if (twitter === undefined) {
        $("#twitter-timeline").hide();
      } else {
        twitter =
          "<a class='twitter-timeline' data-height='400' data-dnt='true' data-theme='dark' data-link-color='#FAB81E' href='https://twitter.com/" +
          twitter +
          "'></a><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>";
        $("#twitter-timeline")
          .html(twitter)
          .show();
      }
    });
    $("#embed")
      .attr("src", "https://mixer.com/embed/player/" + username)
      .css({ display: "unset" });
      setTimeout(function() {
      $.get(url, function(result) {
        var name = result.token;
        $("#app").css({ background: "#282828" });
        var online = result.online;
        var avatarUrl = result.user.avatarUrl;
        if (avatarUrl === null) {
          avatarUrl =
            "https://mixer.com/_latest/assets/images/main/avatars/default.png";
        }
        var viewers = result.viewersCurrent;
        var bio = result.user.bio;
        var channelid = result.id;
        var title = result.name;
        var followers = new Intl.NumberFormat().format(result.numFollowers);
        vodurl =
          "https://mixer.com/api/v1/channels/" + channelid + "/recordings";
        $("#bio").text(bio);
        if (result.type === null) {
          gameTitle = " nothing...";
        } else {
          var gameTitle = result.type.name;
          $("#app").css(
            "background-image",
            "url(" + result.type.backgroundUrl + ")"
          );
        }
        var partner = result.partnered;
        if (partner === true) {
          $("#name").html(
            name +
              "<img class='partner' data-toggle='tooltip' data-placement='right' title='Verified Partner' src='https://mixer.com/_latest/assets/images/channel/verified.png'><span class='followers'>" +
              followers +
              " followers</span>"
          );
        } else {
          $("#name").html(
            name + " <span class='followers'>" + followers + " followers</span>"
          );
        }
        $(".layer").css({ "background-color": "rgba(40,40,40, 0.8)" });
        if (online === true) {
          online = "is online";
          var audience = result.audience;
          $("#audience").css({ display: "unset" });
          $("#viewers").css({ display: "unset" });
          if (audience === "18+") {
            $("#audience")
              .html("18+")
              .css({ background: "red", color: "#fff" });
          } else if (audience === "teen") {
            $("#audience")
              .html("Teen")
              .css({ background: "green", color: "#fff" });
          } else if (audience === "family") {
            $("#audience")
              .html("Family-Friendly")
              .css({ background: "green", color: "#fff" });
          }
          $("#embedshow").css({ display: "unset" });
          $("#avatar").css({ border: "5px solid green" });
          if (gameTitle === "Programming") {
            $("#gametitle").text("Programming 👨‍💻");
          } else if (gameTitle === "Music") {
            $("#gametitle").text("Playing Music 🎶");
          } else if (gameTitle === "Web Show") {
            $("#gametitle").text("Hosting a Web Show 📺");
          } else if (gameTitle === "Creative") {
            $("#gametitle").text("Being Creative 🎨");
          } else {
            $("#gametitle").text("Currently playing " + gameTitle);
          }
          $("#status")
            .html(title)
            .css({ background: "green", color: "#fff" });
          $("#viewers")
            .html("<i class='fa fas fa-eye'></i> " + viewers)
            .css({ background: "rgba(0,0,0,0.3)", color: "#fff" });
        } else if (online === false) {
          online = "is offline";
          $("#viewers").css({ display: "none" });
          $("#audience").css({ display: "none" });
          $("#embedshow").css({ display: "none" });
          $("#avatar").css({ border: "5px solid grey" });
          $("#gametitle").text("Last seen playing " + gameTitle);
          $("#status")
            .html("offline")
            .css({ background: "grey", color: "#fff" });
        }
        $("#widgetbutts").show();
        $("#code").text('<iframe src="https://mixlook.ml?profile='+name+'&embed=show" frameborder="0" allowfullscreen></iframe>')
        $("#avatar").attr("src", avatarUrl);
        $("#favicon").attr("href", avatarUrl);
        $("#viewb").attr("href", "/?profile="+name+"&embed=true");
        $("#clipb").click(function(){
          $("textarea").select();
          document.execCommand('copy');
          $("#clipb").text("Copied to clipboard!")
        });
        $("#generated")
          .text(
            "Golly gumdrops! Your requested profile for " +
              name +
              " has been generated below. Check it out!"
          )
          .addClass("small");
        $("#codetitle").html("Mixlook Widget for " + name);
        $("#alphanote").css({ display: "unset" });
      });
     }, 500);
    });
  }
