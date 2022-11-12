import React, {Component} from 'react';

//Algorithms
import BubbleSort from './algorithms/BS';
import InsertionSort from './algorithms/IS'
//Icons
import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forwards from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import RotateLeft from '@material-ui/icons/RotateLeft';
import './App.css';
import Bar from './components/Bar';

class App extends Component {
  state = { 
    array:[], // Array object to store the array
    arraySteps: [], //To store each step of the algorithm
    colorKey: [], // Color key of bars 
    colorSteps: [],//Steps for colors
    currentStep: 0, // Current step of algorithm
    count: 10, // Current count (Size of array)
    delay: 200, //Delay in visualization
    algorithm1: 'Insertion Sort', // Algorithm algo.
    algorithm2: 'Bubble Sort',
    timeouts:[], // timeouts


    };

    selectSort =() => {
      

    }
    /*
     function selectSort{
      if(bubble-sort){
        algo = bubble.sort
      }
     }
    
    
    */

    ALGORITHMS = {
      'Bubble Sort': BubbleSort,
      'Insertion Sort': InsertionSort,
    }

    


    generateRandomNumber = (min, max) => { // To generate Random Bars min and max of array ..?..

      return Math.floor(Math.random() * (max- min) + min) //Return a random value between 50 and 200

    }

    componentDidMount() {
      this.generateRandomArray();
    }

    
    sortSelect() {
      let algo = this.state.algorithm1;
      
    }

    generateSteps =()=> {
      let array = this.state.array.slice();
      let steps = this.state.arraySteps.slice();
      let colorSteps = this.state.colorSteps.slice();

      
      this.ALGORITHMS[this.state.algorithm2](array, 0, steps, colorSteps); // this.state.algo passes algo at top in state.

      this.setState({
        arraySteps: steps,
        colorSteps: colorSteps
      })
      
    }; 


    clearTimeouts = () => {
      this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
      this.setState({
        timeouts: []
      })
    };

    clearColorKey = () => {
      let blankKey = new Array(this.state.count).fill(0);

      this.setState({
        colorKey: blankKey,
        colorSteps:[blankKey]
      })
    }

    generateRandomArray = () => {
      this.clearTimeouts();
      this.clearColorKey()
      const count = this.state.count; //Take count to generate an array of size count
      const temp = []; // Temporary Array.

      for( let i=0 ; i< count; i++){ //Generate an array 
        temp.push(this.generateRandomNumber(50, 200))
      }
      
      this.setState({ //Set the state of array to temp
        array: temp,
        arraySteps: [temp],
        currentStep: 0,
      }, ()=> {
        this.generateSteps();
      })


    };

    changeArray = (index, value) => {
      let arr = this.state.array;
      arr[index] =value;
      this.setState({
        array: arr,
        arraySteps: [arr],
        currentStep:0
      }, ()=> {
        this.generateSteps();
      });
    };


    previousStep = () => {
      let currentStep = this.state.currentStep;
      if(currentStep===0) return;
      currentStep-= 1;
      this.setState({
        currentStep : currentStep,
        array: this.state.arraySteps[currentStep],
        colorKey: this.state.colorSteps[currentStep]
      })
    }

    nextStep = () => {
      let currentStep = this.state.currentStep;
      if(currentStep >= this.state.arraySteps.length-1) return;
      currentStep += 1;
      this.setState({
        currentStep : currentStep,
        array: this.state.arraySteps[currentStep],
        colorKey: this.state.colorSteps[currentStep]
      })
    }


    start = () => {
      let steps = this.state.arraySteps;
      let colorSteps = this.state.colorSteps;

      this.clearTimeouts();

      let timeouts = []; 
      let i=0;

      while(i<steps.length - this.state.currentStep){
        let timeout = setTimeout(() => {
          let currentStep = this.state.currentStep;
          this.setState({
            array: steps[currentStep],
            colorKey: colorSteps[currentStep],
            currentStep: currentStep+1,
          });
          timeouts.push(timeout);
        }, this.state.delay *i);
        i++;
      }
      this.setState({
        timeouts: timeouts
      })
    };

  render() { 
    let bars = this.state.array.map((value, index) => (  //When you use map it takes 2 values ; ES6 syntax returns bar without specifying to return bar.
        <Bar
          key = {index}
          index ={index}
          length = {value}
          color = {this.state.colorKey[index]}
          changeArray={this.changeArray}
            />)); // Return a bar component with a prop of key.



  let playButton;
    if(this.state.arraySteps.length === this.state.currentStep) {
      playButton = (
        <button className='controller' onClick={this.generateRandomArray}>
          <RotateLeft />
        </button>
      )
    } else {
      playButton = (
        <button className='controller' onClick={this.start}>
          <Play />
        </button>
      )
    }

    return (<div className = "app">
      <div className='backgroundgradient'>
      <div className='frame'>
      
      <div className='barsDiv container card'>{bars}</div>
      </div>
      <div className='control-panel'>
        <div className='control-buttons'>
        <button className='controller' onClick={this.previousStep}>
          <Backward />
        </button>
          {playButton}
          <button className='controller' onClick={this.nextStep}>
          <Forwards />
        </button>
        </div>
      </div>
      <div className='sort-buttons'>
        <button className='bubble-sort'>Bubble Sort</button>
        <button className='insertion-sort'>Insertion Sort</button>
        <button className='selection-sort'>Selection Sort</button>
      </div>
      
      <div className='panel'></div>
      </div>
      
      </div>) ;
  }
}
 
export default App;


