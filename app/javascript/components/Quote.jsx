import React from 'react'

export default class Quote extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.fadeOne = this.fadeOne.bind(this)
    }
    componentDidMount(){
        var to_fade = document.getElementsByClassName('fade-in-quote')
        for(var i = 0; i < to_fade.length; i++){
            var randomWait = Math.round(Math.random() * 600) + 50
            console.log(randomWait)
            this.fadeOne(to_fade[i], randomWait)
        }
    }
    fadeOne(ele, thisLong){
        setTimeout(() => {
            ele.classList.add('fadein-animation')
            setTimeout(() => {
                ele.classList.remove('fadein-animation')
                ele.classList.remove('fade-in-quote')
                ele.classList.add('full-opac')
            },thisLong)
        },thisLong)
        
    }
    render(){
        return(
            <span className="header-quote">
                <span className="fade-in-quote">T</span><span className="fade-in-quote">h</span><span className="fade-in-quote">e</span><span className="fade-in-quote">r</span><span className="fade-in-quote">e </span>
                <span className="fade-in-quote">i</span><span className="fade-in-quote">s </span> 
                <span className="fade-in-quote">n</span><span className="fade-in-quote">o </span> 
                <span className="fade-in-quote">g</span><span className="fade-in-quote">r</span><span className="fade-in-quote">e</span><span className="fade-in-quote">a</span><span className="fade-in-quote">t</span><span className="fade-in-quote">e</span><span className="fade-in-quote">r </span> 
                <span className="fade-in-quote">e</span><span className="fade-in-quote">v</span><span className="fade-in-quote">i</span><span className="fade-in-quote">l </span> 
                <span className="fade-in-quote">o</span><span className="fade-in-quote">n</span><span className="fade-in-quote">e </span> 
                <span className="fade-in-quote">c</span><span className="fade-in-quote">a</span><span className="fade-in-quote">n </span> 
                <span className="fade-in-quote">s</span><span className="fade-in-quote"></span><span className="fade-in-quote">u</span><span className="fade-in-quote">f</span><span className="fade-in-quote">f</span><span className="fade-in-quote">e</span><span className="fade-in-quote">r </span> 
                <span className="fade-in-quote">t</span><span className="fade-in-quote">h</span><span className="fade-in-quote">a</span><span className="fade-in-quote">n </span> 
                <span className="fade-in-quote">t</span><span className="fade-in-quote">o </span> 
                <span className="fade-in-quote">h</span><span className="fade-in-quote">a</span><span className="fade-in-quote">t</span><span className="fade-in-quote">e </span> 
                <span className="fade-in-quote">r</span><span className="fade-in-quote">e</span><span className="fade-in-quote">a</span><span className="fade-in-quote">s</span><span className="fade-in-quote">o</span><span className="fade-in-quote">n</span><span className="fade-in-quote">a</span><span className="fade-in-quote">b</span><span className="fade-in-quote">l</span><span className="fade-in-quote">e </span> 
                <span className="fade-in-quote">d</span><span className="fade-in-quote">i</span><span className="fade-in-quote">s</span><span className="fade-in-quote">c</span><span className="fade-in-quote">o</span><span className="fade-in-quote">u</span><span className="fade-in-quote">r</span><span className="fade-in-quote">s</span><span className="fade-in-quote">e.</span> 
            </span>
        )
    }
}