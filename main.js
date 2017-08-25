var total_miles = 0 

$(function () {

    $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/homeworks/distance.json',
            success: function (data) {
                var obj = JSON.parse(data);
                var count = $("#emp").val();
                for (i = 0; i < obj.info.length; i++) {    
                    var name = obj.info[i].name;
                    $('#emp').append('<option value="'+i+'">'+ name +' </option>')  ;              
                }
            }

        })

    function calculateDistance(origin, dest) {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [dest],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false,
            }, callback);

        function callback(response, status) {
            var dist = response.rows[0].elements[0].distance.text;
            total_miles += parseFloat(dist);
            $("#distance").html("<p>Total Distance travelled by "+ nameEmp + " : "+ total_miles+ "</p>")
        }
    }

    $('#form').submit(function (e) {
        event.preventDefault();

        total_miles = 0;

        $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/homeworks/distance.json',
            success: function (data) {
                var obj = JSON.parse(data);
                var count = $("#emp").val();
                for (i = 0; i < obj.info[count].locations.length - 1; i++) {
                    nameEmp = obj.info[count].name;
                    var origin = obj.info[count].locations[i].loc;
                    var dest = obj.info[count].locations[i + 1].loc;
                    calculateDistance(origin, dest);
                }
            }

        })
    })
})