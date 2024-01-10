const container = document.body.querySelector('.container');
const search = document.body.querySelector('.search-box button');
const weather_box = document.body.querySelector('.weather-box');
const weather_info = document.body.querySelector('.weather-info');
const error404 = document.body.querySelector('.not_found');

const Apikey = 'fb264fda72a100d77dc0fc82496a4298';
console.log(Apikey);
search.addEventListener('click',()=>{
    // e.preventDefault();

    const Apikey = 'fb264fda72a100d77dc0fc82496a4298';
    const city = document.body.querySelector('.search-box input').value;
    
    if(city === ''){
        return ;
    }
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Apikey}`).then(response=>response.json())
    .then(json=>{


        if(json.cod == '404')
        {
            container.style.height = '400px'
            weather_box.classList.remove('active');
            weather_info.classList.remove('active');
            error404.classList.add('active');
            return ;
        }


        container.style.height = '555px'
        weather_box.classList.add('active');
        weather_info.classList.add('active');
        error404.classList.remove('active');
        
        const image = document.body.querySelector('.weather-box img');
        const temperature = document.body.querySelector('.weather-box .temperature');
        const description = document.body.querySelector('.weather-box .description');
        const humidity = document.body.querySelector('.weather-info .humidity span');
        const wind = document.body.querySelector('.weather-info .wind span');

        switch(json.weather[0].main){

            case 'Clear':
                image.src = 'clear_sun.png';
                break; 
            case 'Rain':
                image.src = 'rain.png';
                break; 
            case 'Snow':
                image.src = 'snow.png';
                break; 
            case 'Clouds':
                image.src = 'cloudsss.png';
                break; 
            case 'Mist':
                image.src = 'mist.png';
                break; 
            case 'Haze':
                image.src = 'mist.png';
                break; 
            default:
                image.src = 'cloud_sun.png';
                         
        }

        temperature.innerHTML =`${parseInt(json.main.temp)}<span>°C</span>`; 
        description.innerHTML =`${(json.weather[0].description)}`; 
        humidity.innerHTML =`${(json.main.humidity)}%`; 
        wind.innerHTML =`${parseInt(json.wind.speed)}km/h`; 
    });
});