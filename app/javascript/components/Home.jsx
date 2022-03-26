import React from 'react';
import { Link, Button } from 'react-router-dom';
import VotesSoFar from '../components/VotesSoFar';
import Voter from '../components/Voter';
import LiveResults from '../components/LiveResults';
import Quote from '../components/Quote';
import { Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
require('isomorphic-fetch')
export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            totalVotes: 0,
            totalYes: 0,
            totalNo: 0
        }
        this.getTotalVotes = this.getTotalVotes.bind(this)
        this.sortTotalVotes = this.sortTotalVotes.bind(this)
        this.scrollToTheTop = this.scrollToTheTop.bind(this)
    }
    getTotalVotes(){
        //alert('called')
        const url = '/votes'
        const csrf =  document.querySelector('meta[name="csrf-token"]').content
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf
        }
        var options = {
            method: 'GET',
            headers: headers
        }
        fetch(url, options)
        .then((response) => response.json())
        .then((json) => this.sortTotalVotes(json))
    }
    sortTotalVotes(votes){
        console.log(votes)
        var votes_arr = votes.votes
        let counted_votes = votes_arr.reduce((allVotes, vote) => {
            if(vote.choice == 'yes'){
                allVotes['yes']++
            }else{
                allVotes['no']++
            }
            return allVotes
        }, {no: 0, yes: 0})
        this.setState({
            totalVotes: votes_arr.length,
            totalNo: counted_votes.no,
            totalYes: counted_votes.yes
        })
    }
    componentDidMount(){
        this.getTotalVotes()
        
        document.getElementById('header-svg').classList.add('shrink-header-animation')
        setTimeout(() => {
            document.getElementById('header-svg').classList.remove('shrink-header-animation')
            document.getElementById('header-svg').classList.add('no-right-margin')
            //document.getElementById('hotdog-emoji').classList.add('spin-animation')

        },500)
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.totalVotes != this.state.totalVotes){

        }
    }
    scrollToTheTop(){
        document.getElementById('hotdog-emoji').classList.add('spin-animation')
        scroll.scrollToTop()
        setTimeout(() => {
            document.getElementById('hotdog-emoji').classList.remove('spin-animation')
        },1000)
    }
    render(){
        return(
            <div className="main-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" id="header-svg">
                    <path fill="#116209" fill-opacity="1" d="M0,192L1440,96L1440,0L0,0Z"></path>
                    <text x={ window.screen.width < 650 ? 150 : 100 } y={ window.screen.width < 650 ? 50 : 100 } className="header">isahotdogasandwichdotdog</text>
                </svg>
                <section className="container">
                    <span id="hotdog-emoji" onClick={() => this.scrollToTheTop()}><span>🌭</span></span>
                    <h1 className="black-text">"<Quote />"</h1>
                    <i className="black-text fade-in-quote">-Socrates</i>
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#116209" fill-opacity="1" d="M0,0L480,128L960,64L1440,0L1440,320L960,320L480,320L0,320Z"></path></svg>
                <section className="container green-bg">
                <h1 className="need-help">We need your help.</h1>
                    <p className="center-pg">Is a hotdog a sandwich? </p>
                    <p className="center-pg">The question is as simple as it is convoluted.  Think about overall form, the structure of a hotdog.  Think about the word "sandwich".  What does it mean?  What are the boundries?  Given the existential implications of the classification that is "sandwich" and the intrinsic nature of a hotdog, are they one-in-the-same?  Is a hotdog to a sandwich like a square is to a rectangle, or are we dealing with apples and oranges here? </p>
                    <p className="center-pg">This is a place where you can let your voice be heard, by answering a simple, 1 question long, yes-or-no survey.  Please scroll down and take the survey to cast your vote. </p>
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#116209" fill-opacity="1" d="M0,160L480,288L960,160L1440,160L1440,0L960,0L480,0L0,0Z"></path></svg>
                <section className="container black-text">
                    <VotesSoFar total_votes={this.state.totalVotes} />
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#116209" fill-opacity="1" d="M0,0L480,128L960,64L1440,0L1440,320L960,320L480,320L0,320Z"></path></svg>
                <section className="container green-bg">
                    <Voter />
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#116209" fill-opacity="1" d="M0,160L480,288L960,160L1440,160L1440,0L960,0L480,0L0,0Z"></path></svg>
                <section className="container black-text live-results-container">
                    <LiveResults num_yes={this.state.totalYes} num_no={this.state.totalNo} />
                </section>
            </div>
            
        )
    }
}