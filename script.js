// wanneer je op start duwt
// MODAL voor de naam van PLAYER ONE ( default: player one) & PLAYER TWO (default: player two)
// HET SPEL START
// WANNEER JE KLIKT OP EEN VAK KOMT JOU 'X' OP HET SCHERM en is de huidige speler aangeduid
// DAARNA IS HET DE BEURT AAN PLAYER TWO EN DUID AAN MET 'O'
// WANNEER JE 3 OP EEN RIJ HEBT KRIJG JE PUNTEN EN KAN JE GAAN TOT X AANTAL PUNTEN


// JE KAN OOK RESETTEN EN VAN 0 STARTEN
// JE KAN OOK ALS PLAYER 2 DE COMPUTER AANDUIDEN. PLayer two naam wordt dan computer.



// init game
// GAME ENGINE
// SCORE ENGINE
//PLAYER ENGINE
// AI ENGINE
// RESET


// PLAYER FACTORY FUNCTION we hebben er meer als 1 nodig dus maak je een factory

const Player =(name, turn)=>{
    name;
    turn;

  return{name,turn};
}

//Domcontrol : All buttons and controls
const Domcontrol = (function(){
    //local scope

    let playerOne;
    let playerTwo;
    let start = false;

    //cache dom
    const startBtn = document.querySelector(".start");
    const resetBtn = document.querySelector(".reset");
    const aiBtn = document.querySelector(".computer");
    const playerOneTag = document.querySelector(".player1");
    const playerTwoTag = document.querySelector(".player2");
    const counterP1 =  document.querySelector('.counterP1');
    const counterP2 =  document.querySelector('.counterP2');
    const gridEl = document.querySelectorAll('.board > div');
    

    //bind events
    startBtn.addEventListener("click",_createPlayer);
    
    resetBtn.addEventListener("click", _resetGame);
        //bind x
        //bind O
        // bind AI


    //create a player PRIVATE FUNCTION
    function _createPlayer(){
        playerOne = Player(prompt("what is your name ,player 1?"), true);
        playerTwo = Player(prompt("what is your name, player 2?"), false);
        start = true;
        _render();
        return  playerOne, playerTwo ;
        
    }

    // TEST PUBLIC FUNCTION
    function logconsole(){
        console.log( playerOne.name + " versus " + playerTwo.name );
        return {playerOne, playerTwo};
    }

    //render page with names
    function _render(){
        if(Object.getOwnPropertyNames(playerOne).length !== 0){
            playerOneTag.innerHTML = `<h2> ${playerOne.name}</h2>`;
            playerTwoTag.innerHTML = `<h2> ${playerTwo.name}</h2>`;
            console.log("player one starts");
        }else{
            playerOneTag.innerHTML = `<h2>Player One</h2>`;
            playerTwoTag.innerHTML = `<h2>Player Two</h2>`;
        }
       
    }

    function _resetGame(){
        start = false;
        playerOne = {};
        playerTwo = {};
        console.log("reset!");
        _removeClasses();
        Gamelogic.resetArr();
        _render();
        
    }


    function _removeClasses(){
        gridEl.forEach((item)=>{
                item.classList.remove('iconx');
                item.classList.remove('icony');
        }) 
    }
    //GETTERS
    function getStart(){
        return start;
    }

    function getPlayerOne(){
            return playerOne;
    }

    function getPlayerTwo(){
        return playerTwo;
    }



    return{
        logconsole,
        getPlayerOne,
        getPlayerTwo,
        playerTwo,
        getStart,
        gridEl,
        playerOneTag,
        playerTwoTag
    };
})()


//GAMELOGIC MODULE

const Gamelogic = (function(){

    let scoreOne = [];
    let scoreTwo = [];
    //get value from PlayerOne;
    let valOne = () => Domcontrol.getPlayerOne();
    let valTwo = () => Domcontrol.getPlayerTwo();
    Domcontrol.gridEl.forEach((item)=>{item.addEventListener("click",_gridPlay);});


    //CLICK on grid WHEN started PRIVATE function
    function _gridPlay(e){
        

        if(Domcontrol.getStart()){
            

            if(valOne().turn &&  !(e.target.matches('.iconx'))){
                console.log(`${valOne().name} clicked on ${e.target.dataset.board}`);
                e.target.classList.add('iconx');
                e.target.classList.add('bgGold');
                scoreOne.push(e.target.dataset.board);
                console.log(`PlayerOne =${scoreOne}`);
                

            }
            if(valTwo().turn &&  !(e.target.matches('.icony'))){
                console.log(`${valTwo().name} clicked on ${e.target.dataset.board}`);
                e.target.classList.add('icony');
                scoreTwo.push(e.target.dataset.board);
                console.log(`PlayerTwo =${scoreTwo}`);
                console.log(Domcontrol.playerTwoTag);
                e.target.classList.add('bgRed');
                
            }
            _turnBase();
            
        

        }else{
            console.log("not started yet");
        }      

    }
    //check who's turn it is.
    function _turnBase(){
        if(valOne().turn){
            console.log("turn player two")
            valOne().turn = false;
            valTwo().turn = true;
            Domcontrol.playerTwoTag.classList.toggle('turn');
        } else if(valTwo().turn) {
            console.log("turn player one")
            valTwo().turn = false;
            valOne().turn = true;
            Domcontrol.playerOneTag.classList.toggle('turn');
        }
    }
 //winning values are => 
            //[1,2,3] || [4,5,6] || [7,8,9]
            //[1,4,7] || [2,5,8] || [3,6,9]
            //[1,4,7] || [2,5,8] || [3,6,9]
            //[1,5,9] || [2,6,7] 
            //put winning values in array en check if array of x's or O's 
            //values are in the winning arays.
    function _checkSolution(arr){
           
          for(let i = 0; i<arr.length;i++){
              //if values of winning array are found in player array WON!
          }
    }

    function resetArr(){
        scoreOne = [];
        scoreTwo = [];
        return {
            scoreOne, scoreTwo
        }
    }


    //getters
    function getvalOne(){
        return valOne,valTwo;
    }




    return {
        valOne,
        valTwo,
        getvalOne,
        resetArr

    }

})()