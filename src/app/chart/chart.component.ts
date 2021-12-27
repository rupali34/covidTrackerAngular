import { Component, Input, OnInit, OnChanges } from '@angular/core';
@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
    /** Input variable to hold chart type */
    @Input() type = '';
    /** Input variable to hold chart data */
    @Input() data: any;
    /**variable to hold line chart data */
    lineChartData: any;
    /**variable to hold bar chart data */
    barchartData: any;
    /**variable to hold basic options data */
    basicOptions: any;
    constructor() { }
    /**
     * method to set data on input changes i.e 
     */
    ngOnChanges() {
        console.log(this.data, this.type);
        this.initialData();
    }
    /**
     * method to set initial data
     */
    ngOnInit(): void {
        this.initialData();
    }
    /**
     * Method to fetch initial data
     */
    initialData() {
        let country = this.data.country ? this.data.country : '';
        console.log(this.data, this.type);
        if (this.type === "L") {
            this.lineChartData = {
                labels: this.data.map((data: any) => data.date),
                datasets: [
                    {
                        label: 'Infected',
                        data: this.data.map((data: any) => data.confirmed),
                        fill: true,
                        borderColor: '#3333ff',
                        tension: 0.4
                    },
                    {
                        label: 'Death',
                        data: this.data.map((data: any) => data.deaths),
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            };
            console.log(this.lineChartData);
            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    }
                }
            };
        } else {
            //  this.barchartData = this.data;
            this.barchartData = {
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [
                    {
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [this.data.confirmed, this.data.recovered, this.data.deaths]
                    }
                ]
            };
            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(0, 0, 255, 0.5)'
                        },
                        display: false
                    }
                },
                title: {
                    display: true,
                    text: `Current state in ${country}`,
                    fontSize: 16
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'black'
                        },
                        grid: {
                            color: 'rgba(255,255,255,0.5)'
                        }
                    },
                    y: {
                        ticks: {
                            color: 'black'
                        },
                        grid: {
                            color: 'rgba(255,255,255,0.6)'
                        }
                    }
                }
            };
        }


    }
}
