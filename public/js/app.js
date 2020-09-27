const message2 = document.querySelector('#message-2')
const message4 = document.querySelector('#message-4')
const message6 = document.querySelector('#message-6')


const message_2 = document.querySelector('#message_2')
const message_4 = document.querySelector('#message_4')
const message_6 = document.querySelector('#message_6')

window.addEventListener('load', (e) => {
    e.preventDefault()
    //alert("hello");
    // message1.textContent = 'Loading...'
    message2.textContent = ''
    
    fetch('https://api.covid19api.com/summary').then((response) => {
        response.json().then((data) => {
            //console.log(data)
            var indiaData = data["Countries"].find(c => c.Country === "India");
            if (data.error) {
                //message1.textContent = data.error
                message2.textContent = ''
            } else {
                message2.textContent = data.Global.TotalConfirmed
                message4.textContent = data.Global.TotalDeaths
                message6.textContent = data.Global.TotalRecovered

                message_2.textContent = indiaData.TotalConfirmed
                message_4.textContent = indiaData.TotalDeaths
                message_6.textContent = indiaData.TotalRecovered

            }
        })
    })
 
    // Fetch data for charts and statewise information
    fetch('https://api.covid19india.org/data.json').then((response) => {
        response.json().then((data) => {
            
            //select only statewise informtaion from JSON
            objStateWise = data["statewise"]
            //console.log(objStateWise[0].confirmed);

            //set response data to localStorage object to use outside fetch function
            data_1 = JSON.stringify(objStateWise)
            localStorage.setItem('setDataToLS', data_1)


            objCasesTimeWise = data["cases_time_series"]

            data_2 = JSON.stringify(objCasesTimeWise)
            localStorage.setItem('setDataToLSTimeWise', data_2)
            
            data["statewise"].sort(function (a, b) {
                return b.confirmed - a.confirmed;
            });
            
            if (data.error) {
                alert("No response. Please refresh");
            } else {
                objStateWise.forEach(({
                    state,
                    active,
                    confirmed,
                    deaths,
                    recovered,
                    lastupdatedtime
                }) => {
                    //console.log(state +' has '+ active +' active cases, toatal confirmed ' + confirmed + ' cases' + ' and total deaths ' + deaths );                                                     
                     $("#stateWiseData").append("<tr> <td>" + state + "</td>" + "<td>" + confirmed + "</td>" + "<td>" + active + "</td>" + "<td>" + recovered + "</td>" + "<td>" + deaths + "</td> </tr>");
                });
            }

        })

       

    })


                let getDataFromLS = JSON.parse(localStorage.getItem('setDataToLS'))
                //console.log(getDataFromLS)
                
                // Chart view showing total of India 
                var ctx = document.getElementById('chartView').getContext('2d');
                var chartView = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Confirmed', 'Active', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: "",
                            data: [getDataFromLS[0].confirmed, getDataFromLS[0].active, getDataFromLS[0].recovered, getDataFromLS[0].deaths],
                            backgroundColor: [
                                'rgba(220, 53, 69, .7)',
                                'rgba(23, 162, 184, .7)',
                                'rgba(40, 167, 69, .7)',
                                'rgba(255, 193, 7, .7)'
                            ]
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
    
                // Chart view showing Worst affected state of India  
                var ctx_state = document.getElementById('chartView_state').getContext('2d');
                var chartView_state = new Chart(ctx_state, {
                    type: 'bar',
                    data: {
                        labels: [getDataFromLS[1].state, getDataFromLS[2].state, getDataFromLS[3].state, getDataFromLS[4].state, getDataFromLS[5].state],
                        datasets: [{
                            label: ["#Confirmed Cases"],
                            data: [getDataFromLS[1].confirmed, getDataFromLS[2].confirmed, getDataFromLS[3].confirmed, getDataFromLS[4].confirmed, getDataFromLS[5].confirmed ],
                            backgroundColor: [
                                'rgba(220, 53, 69, .7)',
                                'rgba(220, 53, 69, .7)',
                                'rgba(220, 53, 69, .7)',
                                'rgba(220, 53, 69, .7)',
                                'rgba(220, 53, 69, .7)'
                                
                            ]
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
    
                //Calculate % value for each active, recovered and deaths value:
                var totalValue =  getDataFromLS[0].confirmed
                var activePercent, recoveredPercent, deathPercent  
                activePercent = ((getDataFromLS[0].active/totalValue)*100).toFixed(2)
                recoveredPercent = ((getDataFromLS[0].recovered/totalValue)*100).toFixed(2)
                deathPercent= ((getDataFromLS[0].deaths/totalValue)*100).toFixed(2)
                
                var ctx_piePercent = document.getElementById('chartView_pieChart').getContext('2d');
                var chartView_state = new Chart(ctx_piePercent, {
                    type: 'doughnut',
                    data: {
                        labels: ['Active', 'Recovered', 'Deaths'],
                        datasets: [
                            {
                            data: [activePercent, recoveredPercent, deathPercent],
                            backgroundColor: [
                                'rgba(23, 162, 184, .7)',
                                'rgba(40, 167, 69, .7)',
                                'rgba(255, 193, 7, .7)'
                            ],
                            borderColor: [
                            "#fff"
                            ],
                            borderWidth: [2, 2, 2, 2]
                        }
                        ]
                    },
                    options:{
                        responsive: true,
                        legend: {
                          display: true,
                          position: "right",
                          labels: {
                            fontColor: "#333",
                            fontSize: 16
                          }
                        }
                      }
                });
    
            // Chart view showing Time Wise COVID cases of India
            let getDataFromLSTimeWise = JSON.parse(localStorage.getItem('setDataToLSTimeWise'))
            //console.log(getDataFromLSTimeWise)
            
            //Filter last 30 days data only
            var lastthirtyDaystData = getDataFromLSTimeWise.slice(getDataFromLSTimeWise.length-30, getDataFromLSTimeWise.length)
            //console.log(lastthirtyDaystData)

            let getXAxisInfo = []
            let getdataSet1Info = []
            let getdataSet2Info = []
            let getdataSet3Info = []
                lastthirtyDaystData.forEach(({
                    dailyconfirmed,
                    dailyrecovered,
                    dailydeceased,
                    date
                }) => {
                        //console.log(dailyconfirmed +' cases confirmed on '+ date );  
                        var labelInfo = getXAxisInfo.push(date) 
                        var dataSet1 = getdataSet1Info.push(dailyconfirmed) 
                        var dataSet2 = getdataSet2Info.push(dailyrecovered) 
                        var dataSet3 = getdataSet3Info.push(dailydeceased) 
                    });

            
            var config = {
                type: 'line',
                data: {
                  labels: getXAxisInfo,
                  datasets: [{
                    label: "Daily Confirmed Cases",                    
                    borderColor: "#dc3545",
                    pointBorderColor: "#dc3545",
                    pointBackgroundColor: "#dc3545",
                    pointHoverBackgroundColor: "#dc3545",
                    pointHoverBorderColor: "#dc3545",
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: false,
                    borderWidth: 2,
                    data: getdataSet1Info                   
                  },
                  {
                    label: "Daily Recovered Cases",
                    borderColor: "#28a745",
                    pointBorderColor: "#28a745",
                    pointBackgroundColor: "#28a745",
                    pointHoverBackgroundColor: "#28a745",
                    pointHoverBorderColor: "#28a745",
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: false,
                    borderWidth: 2,
                    data: getdataSet2Info,
                    fill: false
                  },
                  {
                    label: "Daily Deceased Cases",
                    borderColor: "#ffc107",
                    pointBorderColor: "#ffc107",
                    pointBackgroundColor: "#ffc107",
                    pointHoverBackgroundColor: "#ffc107",
                    pointHoverBorderColor: "#ffc107",
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: false,
                    borderWidth: 2,
                    data: getdataSet3Info,
                    fill: false
                  }
                ]
                },
                options: {
                    responsive: true,
                  legend: {
                      display: true
                  },
                    tooltips: {
                      callbacks: {
                        label: function(tooltipItem) {
                        console.log(tooltipItem)
                        return tooltipItem.yLabel;
                      }
                    }
                  }
                }
              };

              var ctx = document.getElementById("timeViewChart").getContext("2d");
              new Chart(ctx, config);
              
   

})