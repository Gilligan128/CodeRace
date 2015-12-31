$(document).ready(function() {
  setInterval(refreshRace, 1000);

  function refreshRace() {
    $.ajax({
      url: "http://localhost:8081/status",
      crossDomain: true
    }).then(function(data) {
      var leaders = [];
      var leaderWidth = 0;

      var racers = $.parseJSON(data);
      $.each(racers, function(index, racer) {
	var percComplete = racer.percent;
	var percWidth = parseInt(racer.percent);

	if (percWidth < 15) {
	  percWidth = 15;
	}

	$("#" + index).text(percComplete + '%');
        $('#' + index).width(percWidth + '%');
	$('#' + index).removeClass('leader');
	
	if (percWidth > leaderWidth) {
		leaders = [index];
		leaderWidth = percWidth;
	} else if (percWidth == leaderWidth) {
		leaders.push(index);
	}

      });

	$.each(leaders, function(index, leader) {
		$('#' + leader).addClass('leader');
	});
    });
  }
});
