import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { getQuizData } from '../config';

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      selectedIndex: 0,
      selectedChoices: [],
      showLoading: false,
      correctAnswers: []
    }
  }

  componentDidMount() {
    let questions;
    getQuizData(15, 'easy').then(res => {
      console.log(res)
      questions = res.data.results.map(x => {
        x.choices = [];
        x.choices = [...x.incorrect_answers, x.correct_answer];
        return x;
      })
      this.setState({ questions: questions });
    });
  }

  selectedAnswer = (choice, index) => {
    let selectedChoices = this.state.selectedChoices;
    if (typeof (selectedChoices.find(x => x.globalIndex === this.state.selectedIndex)) === 'undefined') {
      selectedChoices.push({
        choice,
        index,
        globalIndex: this.state.selectedIndex
      });
    } else {
      let index = selectedChoices.findIndex(x => x.globalIndex === this.state.selectedIndex);
      console.log(index);
      if (index >= 0) {
        selectedChoices[index].choice = choice;
        selectedChoices[index].index = index;
      }
    }
    console.log(selectedChoices);
    this.setState({ selectedChoices });
  }

  showNextQuestion = () => {
    let difficulty;
    let questions;
    if (this.state.selectedIndex === 44) {
      return;
    }
    if (this.state.selectedIndex < (this.state.questions.length - 1)) {
      this.setState({ selectedIndex: this.state.selectedIndex + 1 });
      return;
    }
    if (this.state.selectedIndex === (this.state.questions.length - 1)) {
      if (this.state.selectedIndex === 14) {
        this.setState({ showLoading: true });
        difficulty = 'medium';
      } else if (this.state.selectedIndex === 29) {
        this.setState({ showLoading: true });
        difficulty = 'hard';
      }
      getQuizData(15, difficulty).then(res => {
        console.log(res)
        questions = res.data.results.map(x => {
          x.choices = [];
          x.choices = [...x.incorrect_answers, x.correct_answer];
          return x;
        });
        this.setState({
          showLoading: false,
          questions: [...this.state.questions, ...questions],
          selectedIndex: this.state.selectedIndex + 1
        });
      });
    }
  }

  showPrevAnswer = () => {
    this.setState(state => ({ selectedIndex: state.selectedIndex - 1 }));
  }

  checkAnswers = () => {
    console.log(this.refs.overlay);
    let correctAnswers = [...this.state.questions];
    for (let i = 0; i < correctAnswers.length; i++) {
      if (typeof this.state.selectedChoices.find(x => x.globalIndex === i) !== 'undefined') {
        this.state.selectedChoices.filter(x => {
          if (x.choice === correctAnswers[i].correct_answer) {
            correctAnswers[i].given_answer = x.choice;
            correctAnswers[i].is_answer_correct = true;
          } else if (x.choice !== correctAnswers[i].correct_answer) {
            correctAnswers[i].given_answer = x.choice;
            correctAnswers[i].is_answer_correct = false;
          }
        });
      } else {
        correctAnswers[i].given_answer = 'Not Attempted';
        correctAnswers[i].is_answer_correct = null;
      }
    }
    this.setState({ correctAnswers }, () => {
      this.refs.overlay.style.width = '50%';
    });
  }

  onCloseOverlay = () => {
    this.refs.overlay.style.width = '0';
  }

  render() {
    if (this.state.questions.length === 0) {
      return <Loader
        visible={this.state.isSearching}
        type='ThreeDots'
        color="#00BFFF"
        height={100}
        width={100}
      />;
    }

    return (
      <div style={{
        width: '60%',
        height: '100%',
        backgroundColor: '#f9fafc',
        animationDirection: 'alternate'
      }}>
        <h1>{this.state.questions[this.state.selectedIndex].question}</h1>
        <div>
          {this.state.questions[this.state.selectedIndex].choices.map((choice, index) => {
            return (
              <div
                onClick={() => this.selectedAnswer(choice, index)}
                key={index}
                style={{ columns: 2, marginBottom: '10px' }}
              >
                <h3>{choice}</h3>
                <div
                  style={{
                    height: '25px',
                    width: '25px',
                    borderRadius: 50,
                    backgroundColor: typeof this.state.selectedChoices.find(x => x.choice === choice) !== 'undefined' ? '#ebae34' : '#fff',
                    borderStyle: 'inset'
                  }} />
              </div>
            )
          })}
          <button
            onClick={this.showNextQuestion}
            disabled={this.state.showLoading}
            style={{
              width: '70px',
              height: '35px',
              borderRadius: '8px',
              color: '#fff',
              backgroundColor: '#ebae34',
              borderStyle: 'none'
            }}>Next</button>
          {this.state.selectedIndex > 0 &&
            <button
              onClick={this.showPrevAnswer}
              style={{
                marginLeft: '10px',
                width: '70px',
                height: '35px',
                borderRadius: '8px',
                color: '#fff',
                backgroundColor: '#ebae34',
                borderStyle: 'none'
              }}>Previous</button>
          }
          {this.state.selectedIndex > 0 &&
            <button
              onClick={this.checkAnswers}
              style={{
                marginLeft: '10px',
                width: '80px',
                height: '35px',
                borderRadius: '8px',
                color: '#fff',
                backgroundColor: '#ebae34',
                borderStyle: 'none',
                float: 'right'
              }}>Check Answers</button>
          }
          <div style={{ float: 'right' }}>
            {this.state.selectedIndex + 1} / {this.state.questions.length}
          </div>
        </div>
        <div
          ref='overlay'
          style={{
            position: 'fixed',
            // display: 'none',
            width: '0',
            height: '100%',
            top: '0',
            left: '0',
            backgroundColor: '#fff',
            zIndex: 1,
            overflowX: 'hidden',
            transition: '0.5s'
          }}
        >
          <button onClick={this.onCloseOverlay}>close</button>
          {
            this.state.correctAnswers.map((answer, index) => {
              return (
                <div
                  style={{
                    position: 'relative',
                    top: '5%',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '30px',
                    display: 'inline-block',
                  }}
                  key={index}
                >
                  <p>question : {answer.question}</p>
                  <p>your-answer: {answer.given_answer}</p>
                  {answer.is_answer_correct !== null &&
                    <p>correct-answer: {answer.correct_answer}</p>
                  }
                  {answer.is_answer_correct !== null &&
                    <p>{answer.is_answer_correct === true ? 'true' : 'false'}</p>
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}