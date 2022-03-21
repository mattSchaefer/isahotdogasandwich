import React from 'react'
import Chart from 'chart.js/auto';
const activeButton = {
    background: "#116209 !important",
    color: 'white !important',
    animation: 'animation: button-hover-animate-small .5s ease-in infinite',
}
export default class LiveResults extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            chartDisplay: 'pie',
            percentage: 0,
            verbiage: '',
            lean: 'no',
            chart: '',
            chartInitialized: 'no'
        }
        this.toggleChartDisplay = this.toggleChartDisplay.bind(this)
    }
    componentDidMount(){
        
        window.addEventListener('scroll', (e) => {
            setTimeout(() => {
                if(this.state.chartInitialized == 'no')
                    document.getElementById('bar-filter-button').click()
                 if( document.getElementById('pie-filter-button').getBoundingClientRect().top <= window.innerHeight){
                    if(this.state.chartInitialized == 'no'){
                        // setTimeout(() => {
                            setTimeout(() => {
                                document.getElementById('pie-filter-button').click()
                                this.setState({
                                    chartInitialized: 'yes'
                                })
                            },250)
                        // },250)
                    }
                }
            },50)
        })
        // var ctx = document.getElementById('mainChart')
        //     var chart = new Chart(ctx, {
        //         type: 'pie',
        //         data: {
        //             labels: ['yes', 'no'],
        //             datasets: [{
        //                 label: 'is a hotdog a sandwich',
        //                 data: [this.props.num_yes, this.props.num_no],
        //                 backgroundColor: ['rgb(17, 98, 9)','rgb(0,0,0)'],
        //                 hoverOffset: 4
        //             }]
        //         }
        //     })
        if(this.state.chartDisplay == 'pie'){
            document.getElementById('pie-filter-button').classList.add('active-chart-filter')
            document.getElementById('bar-filter-button').classList.remove('active-chart-filter')
        }else{
            document.getElementById('bar-filter-button').classList.add('active-chart-filter')
            document.getElementById('pie-filter-button').classList.remove('active-chart-filter')
        }
        var more_no = this.props.num_no > this.props.num_yes
        var percentage, verbiage, lean
        if(more_no){
            percentage = this.props.num_no / (this.props.num_no + this.props.num_yes)
            verbiage = "a hotdog is not a sandwich"
            lean = "no"
        }else{
            percentage = this.props.num_yes / (this.props.num_no + this.props.num_yes)
            verbiage = "a hotdog is a sandwich"
            lean = "yes"
        }
        percentage*=100
        this.setState({
            percentage: percentage,
            verbiage: verbiage,
            lean: lean
        })
    }
    componentDidUpdate(prevProps, prevState){
        console.log(prevState)
        if(prevState.chartDisplay != "pie" && this.state.chartDisplay == 'pie'){
            document.getElementById('pie-filter-button').classList.add('active-chart-filter')
            document.getElementById('bar-filter-button').classList.remove('active-chart-filter')
            var ctx = document.getElementById('mainChart')
            var chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['yes', 'no'],
                    datasets: [{
                        label: 'is a hotdog a sandwich',
                        data: [this.props.num_yes, this.props.num_no],
                        backgroundColor: ['rgb(17, 98, 9)','rgb(0,0,0)'],
                        hoverOffset: 4
                    }]
                }
            })
        }else if(prevState.chartDisplay != "bar" && this.state.chartDisplay == 'bar'){
            document.getElementById('bar-filter-button').classList.add('active-chart-filter')
            document.getElementById('pie-filter-button').classList.remove('active-chart-filter')
            var ctx2 = document.getElementById('mainBarChart')
            var chart2 = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: ['yes', 'no'],
                    datasets: [{
                        label: 'Is a Hotdog a Sandwich?',
                        data: [this.props.num_yes, this.props.num_no],
                        backgroundColor: ['rgb(17, 98, 9)','rgb(0,0,0)'],
                        hoverOffset: 4
                    }]
                },
                options: {indexAxis: 'y'}
            })
        }
        if(prevProps.num_no != this.props.num_no || prevProps.num_yes != this.props.num_yes){
            var more_no = this.props.num_no > this.props.num_yes
            var percentage, verbiage, lean
            if(more_no){
                percentage = this.props.num_no / (this.props.num_no + this.props.num_yes)
                verbiage = "a hotdog is not a sandwich"
                lean = "no"
            }else{
                percentage = this.props.num_yes / (this.props.num_no + this.props.num_yes)
                verbiage = "a hotdog is a sandwich"
                lean = "yes"
            }
            percentage*=100
            this.setState({
                percentage: percentage,
                verbiage: verbiage,
                lean: lean
            })
        }
        
        
    }
    componentWillUnmount(){
        document.getElementById('mainChart').remove()
        document.getElementById('mainBarChart').remove()
    }
    toggleChartDisplay(which){
        this.setState({chartDisplay: which})
    }
    render(){
        return(
            <div className="live-results-inner-container black-text">
                <span>
                    <h1 className="black-text">Live Results</h1>
                    <p className="black-text results-para">The results are in but the polls are still open.  
                        The numbers are telling us, according to 
                        <span className="percentage black-text"> {Math.round(this.state.percentage)}% </span> 
                        of the votes, that <span className="lean"> {this.state.lean}</span>,<span> </span>
                        {this.state.verbiage}. 
                    </p>
                </span>
                <span className="graph-outer-container">
                    <h2 className="black-text graph-header">Is a Hotdog a Sandwich?</h2>
                    <span className="canvas-wrapper">
                        {
                            this.state.chartDisplay == 'pie' &&
                            <canvas id="mainChart"></canvas>
                        }
                        {
                            this.state.chartDisplay == 'bar' &&
                            <canvas id="mainBarChart"></canvas>
                        }
                    </span>
                    <span className="radios-outer-container">
                        <span className="chart-button-outer">
                            <button className="chart-button-button" id="pie-filter-button" onClick={() => this.setState({chartDisplay: 'pie'})}>pie</button>
                        </span>
                        <span className="chart-button-outer">
                            <button className="chart-button-button" id="bar-filter-button" onClick={() => this.setState({chartDisplay: 'bar'})}>bar</button>
                        </span>
                    </span>
                </span>
            </div>
        )
    }
}