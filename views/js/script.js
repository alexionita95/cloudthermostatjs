setInterval(() => {
    $.ajax({
        type: 'GET',
        url: '/data',
        success: function(data) {

          $('#temperature').html(data.temperature);
          $('#humidity').html(data.humidity);
          $('#pressure').html(data.pressure);
          $('#altitude').html(data.altitude);
          $('#timestamp').html(data.timestamp);
          if(data.online === true) {
              $("#online").css({color: "lime"});
              $("#online").html("Online");
          }
          else
          {
            $("#online").css({color: "red"});
            $("#online").html("Offline");
          }
        }
      });
}, (1000));