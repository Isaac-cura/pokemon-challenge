export const chartGrowFactor = 40;
export const options: any = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio:false,
    backgroundColor: "#072AC8",
    datasets: {
        bar: {
            barThickness: 20
        }
    },
    scales: {
        y: {
            ticks: {
                margin:0,
                padding:0,
                align: "start",
                crossAlign: 'far',
                font: {
                    size: 12,
                    family: 'Roboto'
                }
            }
        },
        x: {
            autoSkip: true,
            maxTicksLimit: 4
        }
    },
    plugins:{
        legend: {
            display: false
        }
    }
}