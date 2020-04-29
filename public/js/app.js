const message2 =  document.querySelector('#message-2')
const message4 =  document.querySelector('#message-4')
const message6 =  document.querySelector('#message-6')

window.addEventListener('load', (e) => {
    e.preventDefault()
    //alert("hello");
   // message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('https://api.covid19api.com/summary').then((response) => {
        response.json().then((data) => {
            //console.log(data)
            if (data.error) {
                //message1.textContent = data.error
                message2.textContent = ''
            } else {
                message2.textContent = data.Global.TotalConfirmed
                message4.textContent =  data.Global.TotalDeaths
                message6.textContent =  data.Global.TotalRecovered
            }
        })
    })
})