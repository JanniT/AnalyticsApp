async function fetchData() {
    const fetchDataButton = document.getElementById('fetchDataButton')
    const genderDropDown = document.getElementById('genderDropDown')

    fetchDataButton.addEventListener('click', async () => {
        let selectedGender = genderDropDown.value
        
        if (selectedGender === "all") {
            selectedGender = ["SSS", "1", "2"] //all
        } else if (selectedGender === "women") {
            selectedGender = ["2"] // women
        } else {    
            selectedGender = ["1"] // men
        }

        let apiQuery = {
            "query": [
                {
                "code": "Sukupuoli",
                "selection": {
                    "filter": "item",
                    "values": selectedGender
                    }
                },
                {
                "code": "Tiedot",
                "selection": {
                    "filter": "item",
                    "values": [
                    "vm41"
                    ]
                }
                }
            ],
            "response": {
                "format": "json-stat2"
            }
        }


        try {
            const response = await fetch('/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiQuery),
            })

            if (!response.ok) {
                console.log('Failed to fetch initial data')
                return
            }

            const responseData = await response.json()
            displayData(responseData)

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    })
}

function displayData(responseData){
    // console.log(responseData)
    const dataContainer = document.getElementById('apiData')

    dataContainer.innerHTML = ''

    const yearlabels = Object.values(responseData.dimension.Vuosi.category.label) // Vuosi
    const dataValues = Object.values(responseData.value)

    // console.log(yearlabels)
    // console.log(dataValues)

    const chartContainer = document.createElement('div')
    chartContainer.setAttribute('id', 'frappeChart')
    dataContainer.appendChild(chartContainer)

    const chartData = {
        labels: yearlabels,
        datasets: [{
            name: "Immigration / Year",
            values: dataValues
        }]
    }

    const chart = new frappe.Chart("#frappeChart", {
        type: "line",
        height: 450,
        data: chartData,
        colors: ["#eb5146"],
        title: "Yearly immigration to Finland"
    })
}


document.addEventListener("DOMContentLoaded", fetchData)