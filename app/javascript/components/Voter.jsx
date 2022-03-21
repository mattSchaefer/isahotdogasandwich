import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
require('isomorphic-fetch')
const captchaComplete = {background: 'black !important',}
export default class Voter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            step: 1,
            selection: '',
            totalSteps: 2,
            captchaComplete: 'no',
            voteComplete: 'no',
            submissionError: 'no',
            captchaToken: ''
        }
        this.buttonHover = this.buttonHover.bind(this)
        this.buttonUnhover = this.buttonUnhover.bind(this)
        this.completeChoice = this.completeChoice.bind(this)
        this.goBack = this.goBack.bind(this)
        this.captchaChange = this.captchaChange.bind(this)
        this.submitVote = this.submitVote.bind(this)
    }
    componentDidUpdate(){
        if(this.state.step == 2){
            document.getElementById('pane-2').classList.add('slide-to-the-right-animation')
            setTimeout(() => {
                document.getElementById('pane-2').classList.remove('slide-to-the-right-animation')
                document.getElementById('pane-2').classList.add('no-more-right-margin')
            },100)
        }else if(this.state.step == 1){
            document.getElementById('vote-buttons-span').classList.add('slide-to-the-right-animation')
        }
        if(this.state.captchaComplete == 'yes' && this.state.voteComplete == 'no'){
            document.getElementById('recaptcha-container').classList.remove('recaptcha-error-animation')
            document.getElementById('recaptcha-outer').classList.add('black-bg-override')
        }else{
            if(this.state.step == 2 && this.state.voteComplete == 'no')
                document.getElementById('recaptcha-outer').classList.remove('black-bg-override')
        }
    }
    buttonHover(){
        
    }
    buttonUnhover(){
        
    }
    completeChoice(which){
        //this function should switch the pane from 1 to 2, and set the user-selected choice.  pane 2 should be captcha and submit button
        if(which=='yes'){
            document.getElementById('no-button').classList.add('fade-animation')
            document.getElementById('no-button-outer').classList.add('fade-animation')
            setTimeout(() => {
                document.getElementById('no-button').classList.remove('fade-animation')
                document.getElementById('no-button-outer').classList.remove('fade-animation')
                document.getElementById('no-button').classList.add('faded')
                document.getElementById('no-button-outer').classList.add('faded')
                setTimeout(() => {
                    document.getElementById('yes-button').classList.add('to-the-left')
                    document.getElementById('yes-button-outer').classList.add('to-the-left')
                    this.setState({
                        step: 2,
                        selection: which
                    })
                },200)
            },200)
        }else{
            document.getElementById('yes-button').classList.add('fade-animation')
            document.getElementById('yes-button-outer').classList.add('fade-animation')
            setTimeout(() => {
                document.getElementById('yes-button').classList.remove('fade-animation')
                document.getElementById('yes-button-outer').classList.remove('fade-animation')
                document.getElementById('yes-button').classList.add('faded')
                document.getElementById('yes-button-outer').classList.add('faded')
                setTimeout(() => {
                    this.setState({
                        step: 2,
                        selection: which
                    })
                },200)
            },200)
        }
    }
    submitVote(){
        if(this.state.captchaComplete == 'no'){
            document.getElementById('recaptcha-container').classList.add('recaptcha-error-animation')
            document.getElementById('recaptcha-outer').classList.add('red-bg')
        }else{
            const url = "/vote"
            const csrf =  document.querySelector('meta[name="csrf-token"]').content
            var captcha_token = this.state.captchaToken
            var body = JSON.stringify({
                choice: this.state.selection
            })
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf,
                'Captcha-Token': captcha_token
            }
            const options = {
                method: 'POST',
                headers: headers,
                body: body
            }
            fetch(url,options)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if(json.status == 200){
                    this.setState({
                        voteComplete: 'yes'
                    })
                }else{
                    this.setState({submissionError: 'yes'})
                }
            })
            .catch((e) => {
                console.log(JSON.stringify(e))
            })
        }
    }
    goBack(){
        document.getElementById('pane-2').classList.add('fade-animation')
        setTimeout(() => {
            document.getElementById('pane-2').classList.remove('fade-animation')
            document.getElementById('pane-2').classList.add('faded')
            this.setState({
                step: 1, 
                selection: '',
                captchaComplete: 'no'
            })
        },200)
    }
    captchaChange(token){
        this.setState({captchaComplete: 'yes', captchaToken: token})
    }
    render(){
        return (
            <div className="voterContainer">
                <h1>Make it official</h1>
                <p>Do you think a hotdog is a sandwich?</p>
                <p className="step-vs-total">
                    <span id="step-one-indicator" className={this.state.step == 1 ? "white-bg" : ""}></span>
                    <span id="step-two-indicator" className={this.state.step == 2 ? "white-bg" : ""}></span>
                </p>
                {
                    this.state.step == 1 && 
                    <span id="vote-buttons-span" className="vote-buttons-span">
                        <span className="vote-button-outer" id="no-button-outer">
                            <button id="no-button" className="vote-button-button" onMouseEnter={this.buttonHover} onMouseLeave={this.buttonUnhover} onClick={() => this.completeChoice('no')} >
                                <span className="vote-button-inner">
                                <span className="selection-second-pane">No</span>, a hotdog is not a sandwich.
                                </span>
                            </button>
                        </span>
                        <span className="vote-button-outer" id="yes-button-outer">
                            <button id="yes-button" className="vote-button-button" onMouseEnter={this.buttonHover} onMouseLeave={this.buttonUnhover} onClick={() => this.completeChoice('yes')}>
                                <span className="vote-button-inner">
                                <span className="selection-second-pane">Yes</span>, a hotdog is a sandwich.
                                </span>
                            </button>
                        </span>
                    </span>
                }
                {
                    this.state.step == 2 && this.state.voteComplete == "no" &&
                    <span className="pane-2" id="pane-2">
                        <span className="pane-2-ele">
                            <span>
                                <h1 className="black-text">Your vote: <span className="selection-second-pane">{this.state.selection}</span></h1>
                                <span id="recaptcha-outer" className="recaptcha-outer" style={this.state.captchaComplete == 'yes' ? captchaComplete : {}}>
                                    <span id="recaptcha-container" className="recaptcha-container">
                                        <ReCAPTCHA sitekey={process.env.REACT_APP_RCAPTCHA_SITE_KEY} onChange={(token) => this.captchaChange(token)} />
                                    </span>
                                </span>
                            </span>
                            <span className="back-button-container-outer">
                                <span className="back-button-container">
                                    <span className="back-button-outer">
                                        <button className="back-button-button" onClick={() => this.goBack()}><span className="back-button-inner black-text">go back</span></button>
                                    </span>
                                </span>
                            </span>
                        </span>
                        {
                            this.state.submissionError == 'no' &&  
                            <span className="pane-2-ele submit-button-outer">
                                <button id="vote-submit-button" className="vote-submit-button" onClick={() => this.submitVote()}>
                                    <span className="submit-button-inner black-text">submit your vote</span>
                                </button>
                            </span>
                        }
                        {
                            this.state.submissionError == 'yes' &&
                            <h1 id="submisisonErrorFrown">:-(</h1>
                        }
                    </span>
                }
                {
                    this.state.step == 2 && this.state.voteComplete == "yes" &&
                    <span className="pane-2" id="pane-2">
                        <h1 className="vote-success">Success!  Thanks for your vote.  Scroll down to see the live results of this poll.</h1>  
                    </span>
                }
            </div>
        )
    }
}