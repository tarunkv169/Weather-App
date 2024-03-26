const container = document.body.querySelector('.container');
const search = document.body.querySelector('.search-box button');
const weather_box = document.body.querySelector('.weather-box');
const weather_info = document.body.querySelector('.weather-info');
const error404 = document.body.querySelector('.not_found');
const cityHide = document.body.querySelector('.city-hide');

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
            cityHide.textContent = city
            container.style.height = '400px'
            container.classList.add('active');
            weather_info.classList.remove('active');
            error404.classList.add('active');
            return ;
        }
        
        setTimeout(() => {
            container.classList.remove('active');
            
        }, 2500);
        

        
        const image = document.body.querySelector('.weather-box img');
        const temperature = document.body.querySelector('.weather-box .temperature');
        const description = document.body.querySelector('.weather-box .description');
        const humidity = document.body.querySelector('.weather-info .humidity span');
        const wind = document.body.querySelector('.weather-info .wind span');
        
        if(cityHide.textContent == city)
        {
            return;
        }
        else{
            cityHide.textContent = city;
            container.style.height = '555px'
            weather_box.classList.add('active');
            weather_info.classList.add('active');
            error404.classList.remove('active');
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

            const infoweather = document.querySelector('.info-weather');
            const infohumidity = document.querySelector('.info-humidity');
            const infowind = document.querySelector('.info-wind');

            const elcloneinfoweather = infoweather.cloneNode(true);
            const elcloneinfohumidity = infohumidity.cloneNode(true);
            const elcloneinfowind = infowind.cloneNode(true);

            elcloneinfoweather.id = 'clone-info-weather';
            elcloneinfoweather.classList.add('active-clone');

            elcloneinfohumidity.id = 'clone-info-humidity';
            elcloneinfohumidity.classList.add('active-clone');

            elcloneinfowind.id = 'clone-info-wind';
            elcloneinfowind.classList.add('active-clone');

            setTimeout(()=>{
               infoweather.insertAdjacentElement("afterend", elcloneinfoweather);
               infohumidity.insertAdjacentElement("afterend", elcloneinfohumidity);
               infowind.insertAdjacentElement("afterend", elcloneinfowind);
            },1500);

            const cloneinfoweather = document.querySelectorAll('.info-weather.active-clone');
            const totalcloneinfoweather = cloneinfoweather.length;
            const cloneinfoweatherfirst = cloneinfoweather[0];

            const cloneinfohumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneinfohumidityfirst = cloneinfohumidity[0];

            const cloneinfowind = document.querySelectorAll('.info-wind.active-clone');
            const cloneinfowindfirst = cloneinfowind[0];
            
            if(totalcloneinfoweather > 0){
                cloneinfoweatherfirst.classList.remove('active-clone');
                cloneinfohumidityfirst.classList.remove('active-clone');
                cloneinfowindfirst.classList.remove('active-clone');

                setTimeout(()=>{
                    cloneinfoweatherfirst.remove();
                    cloneinfohumidityfirst.remove();
                    cloneinfowindfirst.remove();
                },1000)
            }
            
        }
    });
});