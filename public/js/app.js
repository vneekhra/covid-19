const weatherForm = document.querySelector('body')
const search = document.querySelector('input')
const message1 =  document.querySelector('#message-1')
const message2 =  document.querySelector('#message-2')
const message3 =  document.querySelector('#message-3')
const message4 =  document.querySelector('#message-4')
const message5 =  document.querySelector('#message-5')
const message6 =  document.querySelector('#message-6')

window.addEventListener('load', (e) => {
    e.preventDefault()
    //alert("hello");

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('https://api.covid19api.com/summary').then((response) => {
        response.json().then((data) => {
            //console.log(data)
            if (data.error) {
                message1.textContent = data.error
                message2.textContent = ''
            } else {
                message1.textContent = "New Confirmed Cases: "+data.Global.NewConfirmed
                message2.textContent = "Total Confirmed: "+ data.Global.TotalConfirmed
                message3.textContent = "New Deaths: "+data.Global.NewDeaths
                message4.textContent = "Total Deaths: "+ data.Global.TotalDeaths
                message5.textContent = "New Recovered: "+data.Global.NewRecovered
                message6.textContent = "Total Recovered: "+ data.Global.TotalRecovered
            }
            
        })
    })
})