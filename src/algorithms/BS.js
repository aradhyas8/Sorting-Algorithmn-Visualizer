import {swap} from './helpers';



const bs = (array, position, arraySteps, colorSteps) => {

    let colorKey = colorSteps[colorSteps.length-1].slice(); // Make copy of first array in color steps array.

    for(let i=0; i<array.length; i++){
        for(let j=0; j<array.length -i-1; j++){
            if(array[j]>array[j+1]){
                array=swap(array, j, j+1);
            }
            arraySteps.push(array.slice());
            colorKey[j] = 1;                        //Adding the colors
            colorKey[j+1] =1;
            colorSteps.push(colorKey.slice());
            colorKey[j] =0;                         //Removing the colors
            colorKey[j+1]=0;
        }
        colorKey[arraySteps.length-1-i] =2; // After swap. Last element in the end.
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length-1] = new Array(array.length).fill(2);
    return;

};

export default bs;