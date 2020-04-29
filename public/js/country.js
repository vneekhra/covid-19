const message2 =  document.querySelector('#message-2')
const message4 =  document.querySelector('#message-4')
const message6 =  document.querySelector('#message-6')
const countryinput =  document.querySelector('#country-input')

window.addEventListener('load', (e) => {
    e.preventDefault()
    //alert("hello");
    //message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('https://api.covid19api.com/summary').then((response) => {
        response.json().then((data) => {
            //console.log(data)
			const objCountry=data["Countries"].find(c => c.Country === "India");
            if (data.error) {
                //message1.textContent = data.error
                message2.textContent = ''
            } else {
				data["Countries"].forEach(({ Country, TotalConfirmed, TotalDeaths, TotalRecovered }) => {
					opt = document.createElement('option')
					opt.appendChild( document.createTextNode(Country) )
					opt.value = Country
					countryinput.appendChild(opt)
				});
				countryinput.value="India"
                message2.textContent =  objCountry.TotalConfirmed
                message4.textContent =  objCountry.TotalDeaths
                message6.textContent =  objCountry.TotalRecovered	
            }
        })
    })
})

countryinput.addEventListener('change', (e) => {
    e.preventDefault()
    //alert("hello");
   // message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('https://api.covid19api.com/summary').then((response) => {
        response.json().then((data) => {
            //console.log(data)
			const objCountry=data["Countries"].find(c => c.Country === countryinput.value);
            if (data.error) {
               // message1.textContent = data.error
                message2.textContent = ''
            } else {
                message2.textContent = objCountry.TotalConfirmed
                message4.textContent =  objCountry.TotalDeaths
                message6.textContent =  objCountry.TotalRecovered
			
            }
            
        })
    })
})