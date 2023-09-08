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
            $('#appTitle').text(response["location"]["name"]);

        },
        error: function(xhr, status, error) {
            // Handle Errors
            $('#appTitle').text('ERROR');
        }
    });
});