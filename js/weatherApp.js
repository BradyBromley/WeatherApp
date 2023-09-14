const form = document.getElementById('weatherForm');

form.addEventListener('submit', (event) => {

    // Call the weather api (https://rapidapi.com/weatherapi/api/weatherapi-com)
    event.preventDefault();
    const locationInput = form.elements['locationInput'];
    let location = locationInput.value;
    $.ajax({
        url: 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + location,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        },
        success: function(response) {
            // Process Data
            console.log(response);
            id = response['location']['lat'].toString() + response['location']['lon'].toString();
            
            // Add the location to the list if it has not been added already
            if (!$("#" + id.replace( /(\.)/g, "\\$1" )).length) {
                $('#repeatCityMessage').hide();

                currentCityHtml = '<li class="city" id="' + id + '">';
                currentCityHtml += '<p class="cityName">' + response['location']['name'] + '</p>';
                currentCityHtml += '<p class="regionName">' + response['location']['region'] + '</p>';
                currentCityHtml += '<p class="temperature">' + response['current']['temp_c'] + '°C' + '</p>';
                currentCityHtml += '<img class="conditionImg" src="https://' + response['current']['condition']['icon'] + '">';
                currentCityHtml += '<p class="conditionText">' + response['current']['condition']['text'] + '</p>';
                currentCityHtml += '</li>';
                $('#cities').append(currentCityHtml);
                
            } else {
                $('#repeatCityMessage').show();
            }

        },
        error: function(xhr, status, error) {
            // Handle Errors
            $('#result').text('ERROR');
        }
    });
});