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
        }
      });
}, (1000));