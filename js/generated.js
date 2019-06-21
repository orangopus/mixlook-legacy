$(document).ready(function() {
  $("#code").css({ display: "none"});
    var path = window.location.pathname.replace(/\.[^/.]+$/, "");
    var page = path.split("/").pop();
    var username = page;
    url = "https://mixer.com/api/v1/channels/" + username;
    $.get(url, function(result) {
      $("#app").css({ background: "#282828" });
      var online = result.online;
      var name = result.token;
      var avatarUrl = result.user.avatarUrl;
      var background = result.type.backgroundUrl;
      var viewers = result.viewersCurrent;
      var bio = result.user.bio;
      var channelid = result.id;
      var title = result.name;
      var followers = new Intl.NumberFormat().format(result.numFollowers);
      vodurl = "https://mixer.com/api/v1/channels/" + channelid + "/recordings";
      $("#bio").text(bio);
      if (result.type === null) {
        gameTitle = " nothing...";
      } else {
        var gameTitle = result.type.name;
      }
      $("#app").css("background-image", "url(" + background + ")");
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
        $("#gametitle").text("Currently playing " + gameTitle);
        $("#avatar").css({ border: "5px solid green" });
        $("#embed").attr("src", "https://mixer.com/embed/player/" + name);
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

      $("#avatar").attr("src", avatarUrl);
      $("#favicon").attr("href", avatarUrl);
      $("#pagetitle").text(name + " on Mixer");
      $("#generated")
        .text(
          "Golly gumdrops! Your requested profile for " +
            name +
            " has been generated below. Check it out!"
        )
        .css({ "font-size": "25px" });
        $("#generatecode").text("Generate Code");
          var code = $("#profile").innerHTML;
          $("#codetitle").html("Generated Profile Code for " + name);
          $("#alphanote").html("This feature is in alpha and doesn't fully work yet!</p>");
          $("#code").html(code).css({display: "unset"});
    });
  });
