window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `
            http://api.weatherapi.com/v1/current.json?key=bb91a61a80b94154bf3193735212201&q=${lat},${long}`;
        
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temp_f} = data.current;
                const {text, icon} = data.current.condition;
                const {tz_id} = data.location;
                
                //Set DOM Elements from the API
                temperatureDegree.textContent = temp_f;
                temperatureDescription.textContent = text;
                locationTimezone.textContent = tz_id;
                //Formula for celcius
                let celcius = (temp_f - 32) * (5 / 9);
                //Set Icon
                setIcons(icon, document.querySelector(".icon "));

                //Change temperature to Celcius
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = celcius;
                        temperatureDegree.textContent = Math.floor(celcius);

                    }else{
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temp_f;
                    }
                });
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
        
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});