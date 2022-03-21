import React, { useEffect, useState } from 'react';
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export default class VotesSoFar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            incriment: 1,
            votesDisplay: 0,
            total_votes: this.props.total_votes,
            countingFinished: 'no'
        }
        this.startCounting = this.startCounting.bind(this)
    }
    componentDidMount(){
        window.addEventListener('scroll', (e) => {
            setTimeout(() => {
                if(document.getElementById('number-votes').getBoundingClientRect().top <= window.innerHeight - 50){
                    setInterval(() => {
                        if(this.state.countingFinished == 'no'){
                            if(this.state.votesDisplay + this.state.incriment < this.props.total_votes && this.state.votesDisplay != this.props.total_votes){
                               this.startCounting()
                            }
                            else{
                                this.setState(
                                    {
                                        votesDisplay: this.props.total_votes,
                                        countingFinished: 'yes'
                                    }
                                )
                                clearInterval()
                            }
                        }
                    },250)
                }
            },250)
        })
    }
    componentDidUpdate(prevProps, prevState){

    }
    componentWillUnmount(){
        clearInterval()
    }
    startCounting = () => {
        
            if(this.state.votesDisplay + this.state.incriment < this.props.total_votes && this.state.votesDisplay != this.props.total_votes){
                var to_set = this.state.votesDisplay + this.state.incriment
                this.setState({votesDisplay: to_set})
            }else{
                this.setState({votesDisplay: this.props.total_votes})
                clearInterval()
            }
        
        
    }
    render(){
        return(
            <div className="text-center">
                <h1 className="black-text">Please share your voice.</h1>
                <h2 className="black-text votes-so-far-h2">
                    <span className="number-votes" id="number-votes">
                    {
                        this.state.votesDisplay.toString().length > 3 ? 
                        this.state.votesDisplay.toString().charAt(0) +  ',' + this.state.votesDisplay.toString().substring(1) :
                        this.state.votesDisplay
                    }
                    </span>
                    <span> 
                        votes so far!
                    </span>
                </h2>
            </div>
        )
    }
}