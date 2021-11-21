<template>
  <div class="wrapper bg-main-background   h-screen w-screen flex  xl:items-center justify-center ">
    <div class="calculator-container mt-20  xl:w-1/4 2xl:w-2/5  rounded ">

      <!--calculator header  -->
      <div class="calculator-header  flex items-center justify-between mb-6">
        <div class="text">
          <p class="text-white calc text-3xl mt-6">calc</p>
        </div>
        <div class="theme flex items-center  ">
          <p class="text-xs theme-p tracking-widest text-gray-200 mr-5 mt-6">THEME</p>
          <div class="toggler-container flex items-center flex-col  ">
            <div class="numbers flex justify-between w-full px-1 py-0.5">
              <span class="text-xs text-white cursor-pointer" @click="toggleHandler">1</span>
              <span  class="text-xs text-white cursor-pointer" @click="toggleHandler">2</span>
              <span  class="text-xs text-white cursor-pointer" @click="toggleHandler">3</span>
            </div>
            <div :class="toggleClass" class="toggler transition-all duration-150 ease-in-out  flex items-center  px-0.5 w-14 h-5 rounded-full">
              <div class="ball transition-all duration-150 ease-in-out  h-3 w-3 rounded-full "></div>
            </div>
          </div>
        </div>
      </div>

      <!-- calculator screen -->
      <div class="calculator-screen w-full px-5 2xl:px-8 py-1.5 bg-screen-background rounded-md flex items-center justify-end ">
        <p id="screen" class="text-4xl max-w-full flex flex-wrap overflow-hidden  text-white font-medium screen">{{ screen }}</p>
      </div>

      <!-- calculator buttons -->
      <div class="calculator-buttons pb-5 rounded-md">
        <!-- upper -->
        <div class="upper  mt-4 p-5 2xl:p-7 grid grid-cols-4 gap-x-4 2xl:gap-x-6 2xl:gap-y-6 gap-y-4">
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">1</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">2</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">3</button>
          <button id="del" class="bg-white font-bold del 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md text-sm" @click="deleteHandler">DEL</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">4</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">5</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">6</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">+</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">7</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">8</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">9</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">-</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">.</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">0</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">/</button>
          <button class="bg-white font-bold text-xl 2xl:text-2xl px-4 2xl:px-6 2xl:py-5 py-1.5 cursor-pointer rounded-md" @click="buttonHandler">*</button>
        </div>

        <!--  lower -->
        <div class="lower px-5  2xl:px-7 grid grid-cols-2 gap-x-4 2xl:gap-x-6 ">
          <button  class="reset bg-white font-medium text-sm px-4 py-2.5 2xl:py-6 cursor-pointer rounded-md" @click="resetHandler">RESET</button>
          <button  class="equal bg-white font-medium  text-sm px-4 py-2.5 2xl:py-6 cursor-pointer rounded-md" @click="equalHandler">=</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import { ref,  computed } from 'vue';


export default {
  name: 'App',
  setup(){

    // reactive variables
    const screen = ref('');
    const toggleBallPosition = ref('justify-start');

    // computed start

    const toggleClass = computed(()=>{
      return toggleBallPosition.value;
    })
    //computed ends

    // methods start
    const buttonHandler = (event)=>{
      screen.value = screen.value + event.target.textContent;
    }

    const resetHandler = ()=>{
      screen.value = '';
    }

    const deleteHandler = ()=>{
      screen.value = screen.value.toString().slice(0, -1);
    }

    // for some reason the eval function throws an error when one of these operands end the screen value
    // so this helps to check and handle the error
    const validateScreenValue = ()=>{

      //leading zero error; bug spotted by Badmus Damola
      // used regex to remove leading zero

      screen.value = screen.value.replace(/^0+/, '');
         
      if(screen.value.slice(screen.value.length-1,) ===  '+' ||
         screen.value.slice(screen.value.length-1,) ===  'x' ||
         screen.value.slice(screen.value.length-1,) ===  '-' ||
         screen.value.slice(screen.value.length-1,) ===  '/'){
         screen.value = 'Math Error ';
         return false;
      }else{
        return true;  
      } 
    }

    const equalHandler = ()=>{
      if(validateScreenValue()){
        screen.value = eval(parseInt(screen.value));
      }
    
    }

    const toggleHandler = (event)=>{
      toggleBallPosition.value = event.target.textContent === '1' ? 'justify-start': event.target.textContent === '2' ? 'justify-center' : 'justify-end';
      themeChanger(event);
    }

    const themeChanger = (event)=>{
      switch (event.target.textContent){
        case '1':
          document.querySelector('html').className = 'theme1';
          break;
        case '2':
          document.querySelector('html').className = 'theme2';
          break;
        case '3':
          document.querySelector('html').className = 'theme3';
          break;
      }
    }

    return{
      screen,
      buttonHandler,
      resetHandler,
      deleteHandler,
      equalHandler,
      toggleClass,
      toggleHandler,
     
    }
  }
}
</script>

<style scoped>



</style>