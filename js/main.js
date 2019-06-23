$(document).ready(function() {
  $("#code").css({ display: "none"});
  $("#embed").css({display: "none"});
  $("#header").addClass("header"); 
  $('#uname').on("keyup", function(e){
    if(e.which){
        $('#butt').click();
        $("#profile").css({visibility: "visible"});   
        $("#header").removeClass("header");    
        $("#footer").css({ display: "unset", "padding-bottom": "20px;"}); 
        $("#scrollbar").css({ "overflow-y" : "scroll"});
        $("#generated").addClass("small");
    }
      if($("#uname").val() === ""){
          $("#profile").css({visibility: "hidden"});
          $("#generated").text("It's like magic. ✨ No signup required!");
          $("#generated").removeClass("small"); 
          $("#header").addClass("header");
          $("#scrollbar").css({ "overflow" : "hidden"});
        }
  });
  $("#butt").click(function() {
    var username = $("#uname").val();
    url = "https://mixer.com/api/v1/channels/" + username;
    $.get(url, function(result) {
     var desc = result.description;
     if (desc === null) {
       desc = "No description detected.";
     }
     var name = result.token;
     $("#code").html("// CHANGE USERNAME TO WHAT YOU LIKE // \n var username = '"+name+"' ").css({display: "unset" });
     $("#pagetitle").text(name + " on Mixer");
     $("#about").text("About "+name)
     $("#desc").html(desc + "<p style='visibility: hidden;'>.</p>");
    });
    $("#embed").attr("src", "https://mixer.com/embed/player/" + username).css({display: "unset"});
    setInterval(function(){  
    $.get(url, function(result) {
      var name = result.token;
      $("#app").css({ background: "#282828" });
      var online = result.online;
      var avatarUrl = result.user.avatarUrl;
      if (avatarUrl === null) {
        avatarUrl = "https://mixer.com/_latest/assets/images/main/avatars/default.png";
      }
      var viewers = result.viewersCurrent;
      var bio = result.user.bio;
      var channelid = result.id;
      var title = result.name;
      var followers = new Intl.NumberFormat().format(result.numFollowers);
      vodurl = "https://mixer.com/api/v1/channels/" + channelid + "/recordings";
      $("#bio").text(bio);
      if (result.type === null ) {
        gameTitle = " nothing...";
      } else {
        var gameTitle = result.type.name;
        $("#app").css("background-image", "url(" + result.type.backgroundUrl + ")");
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
        } 
        else if (gameTitle === "Music") {
          $("#gametitle").text("Playing Music 🎶");
        }   
        else if (gameTitle === "Web Show") {
          $("#gametitle").text("Hosting a Web Show 📺");
        }  
        else if (gameTitle === "Creative") {
          $("#gametitle").text("Being Creative 🎨");
        }
        else {
          $("#gametitle").text("Currently playing " + gameTitle );       
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

      $("#avatar").attr("src", avatarUrl);
      $("#favicon").attr("href", avatarUrl);
      $("#generated")
        .text(
          "Golly gumdrops! Your requested profile for " +
            name +
            " has been generated below. Check it out!"
        )
        .addClass("small");
          $("#codetitle").html("Generate Profile for " + name);
          $("#alphanote").css({display: "unset"});
    });
    }, 1000);
  });
});