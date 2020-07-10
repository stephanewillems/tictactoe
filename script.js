const Player = (name, turn) => {
    name;
    turn;
    return { name, turn };
}
////////////////////////////////////////////////////////////////
//Domcontrol : All buttons and controls
const Domcontrol = (function () {
    //local scope

    let playerOne;
    let playerTwo;
    let start = false;
    let ai = false;

    //cache dom
    const startBtn = document.querySelector(".start");
    
    const playerOneTag = document.querySelector(".player1");
    const playerTwoTag = document.querySelector(".player2");
    const counterP1 = document.querySelector('.counterP1');
    const counterP2 = document.querySelector('.counterP2');
    const gridEl = document.querySelectorAll('.board > div');


    //bind events
    startBtn.addEventListener("click", _createPlayer);
    

    //bind x
    //bind O
    // bind AI


    //create a player PRIVATE FUNCTION
    function _createPlayer() {
        _resetGame();
        start = true;
        ai = false;
        playerOne = Player(prompt("what is your name ,player 1?"), true);
        playerTwo = Player(prompt("what is your name, player 2?"), false);
        _render();
        return playerOne, playerTwo;

    }


    function aiPlayer(){
        return _createOnePlayer();
    }

    function _createOnePlayer() {
        _resetGame();
        start = true;
        ai = true;
        playerOne = Player(prompt("what is your name ,player 1?"), true);
        playerTwo = Player("^     ^  ", false);
        _render();
        return playerOne, playerTwo;
    }

    //render page with names
    function _render() {
        if (Object.getOwnPropertyNames(playerOne).length !== 0) {
            playerOneTag.innerHTML = `<h2> ${playerOne.name}</h2>`;
            playerTwoTag.innerHTML = `<h2> ${playerTwo.name}</h2>`;
            playerOneTag.classList.add('turn');

        } else {
            playerOneTag.innerHTML = `<h2>Player One</h2>`;
            playerTwoTag.innerHTML = `<h2>Player Two</h2>`;
        }

    }


    function _resetGame() {
        start = false;
        ai = false;
        playerOne = {};
        playerTwo = {};
        console.log("reset!");
        if (document.querySelector('.board').classList.contains('pyro')) {
            _removeFireworks();
        } else {
            console.log("no fireworks yet");
        }
        _removeClasses();
        //console.log(counterP2);
        Gamelogic.resetArr();
        _render();


    }


    function _removeFireworks() {
        let bef = document.querySelector('.before');
        let aft = document.querySelector('.after');
        document.querySelector('.board').removeChild(bef);
        document.querySelector('.board').removeChild(aft);
        document.querySelector('.board').classList.remove('pyro');


    }


    function _removeClasses() {
        gridEl.forEach((item) => {
            item.classList.remove('iconx');
            item.classList.remove('icony');
            item.classList.remove('bgGold');
            item.classList.remove('bgRed');
        })
    }
    //GETTERS
    function getStart() {
        return start;
    }

    function getPlayerOne() {
        return playerOne;
    }

    function getPlayerTwo() {
        return playerTwo;
    }
    function getIA(){
        return ai;
    }

    //setters
    function setStart(val) {
        start = val;

        return {
            start
        };
    }

    function setIA(val){
        ai = val;
        return { ai };
    }


    return {
        getPlayerOne,
        getPlayerTwo,
        getStart,
        setStart,
        getIA,
        setIA,
        aiPlayer,
        gridEl,
        playerOneTag,
        playerTwoTag,
        counterP2,
        counterP1
    };
})()



//////////////////////////////////////////////////////////////////
//GAMELOGIC MODULE

const Gamelogic = (function () {

    let scoreOne = [];
    let scoreTwo = [];

    const win = ["1", "2", "3"];
    const win1 = ["1", "2", "3"];
    const win2 = ["4", "5", "6"];
    const win3 = ["7", "8", "9"];
    const win4 = ["1", "4", "7"];
    const win5 = ["2", "5", "8"];
    const win6 = ["3", "6", "9"];
    const win7 = ["1", "5", "9"];
    const win8 = ["2", "6", "7"];

    const mutliArr = [win, win2, win3, win4, win5, win6, win7, win8];



    //get value from PlayerOne;
    let valOne = () => Domcontrol.getPlayerOne();
    let valTwo = () => Domcontrol.getPlayerTwo();

    Domcontrol.gridEl.forEach((item) => { item.addEventListener("click", _gridPlay); });

    //CLICK on grid WHEN started PRIVATE function
    function _gridPlay(e) {
        console.log("test clicked");
        if (Domcontrol.getStart() === true && Domcontrol.getIA() === false) {

            //push value of clicked data-index into array
            if (valOne().turn && !(e.target.matches('.iconx'))) {
                e.target.classList.add('iconx');
                //e.target.classList.add('bgGold');
                scoreOne.push(e.target.dataset.board);
                console.log("scoreone " + scoreOne);

                for (let i = 0; i < mutliArr.length; i++) {

                    if (JSON.stringify(_win(scoreOne)) == JSON.stringify(mutliArr[i])) {
                        //console.log(_win(scoreOne));

                        mutliArr[i].forEach((item) => {
                            document.querySelector('.div' + [item]).classList.add('bgGold');

                        });

                        _fireworks("board");
                        Domcontrol.setStart(false);
                        Domcontrol.counterP1.innerHTML = "winner!";


                    }
                }


            }
            if (valTwo().turn && !(e.target.matches('.icony'))) {

                e.target.classList.add('icony');
                scoreTwo.push(e.target.dataset.board);
                //e.target.classList.add('bgRed');

                for (let i = 0; i < mutliArr.length; i++) {

                    if (JSON.stringify(_win(scoreTwo)) == JSON.stringify(mutliArr[i])) {
                        //console.log(_win(scoreTwo));

                        mutliArr[i].forEach((item) => {
                            document.querySelector('.div' + [item]).classList.add('bgGold');

                        });
                        //Domcontrol.gridEl.forEach((item) => { item.removeEventListener("click", _gridPlay); });
                        _fireworks("board");
                        Domcontrol.setStart(false);
                        Domcontrol.counterP2.innerHTML = "winner!";


                    }

                }
            }
            _turnBase();


        } else {
            console.log("not started yet");
        }

    }

    ///private firworks
    function _fireworks(divEl) {
        const div_b = document.createElement('div');
        const div_a = document.createElement('div');
        div_a.setAttribute('class', 'before');
        div_b.setAttribute('class', 'after');
        document.querySelector('.' + divEl).classList.add('pyro');
        document.querySelector('.' + divEl).appendChild(div_a);
        document.querySelector('.' + divEl).appendChild(div_b);
    }



    //private winner check
    function _win(arr) {

        let newArray = [];

        for (let i = 0; i < arr.length; i++) {
            //console.log(typeof(arr[i]));

            if (win.indexOf(arr[i]) >= 0 || win2.indexOf(arr[i]) >= 0 || win3.indexOf(arr[i]) >= 0 || win4.indexOf(arr[i]) >= 0 || win5.indexOf(arr[i]) >= 0 || win6.indexOf(arr[i]) >= 0 || win7.indexOf(arr[i]) >= 0 || win8.indexOf(arr[i]) >= 0) {
                newArray.push(arr[i]);
                console.log("newArray" + newArray);
            } else {
                console.log(arr[i] + "not in winning array");
            }
        }
        //return newArray.sort();  
        //console.log("winarray" + newArray) 
        let res = newArray.filter(f => win.includes(f));
        let res2 = newArray.filter(f => win2.includes(f));
        let res3 = newArray.filter(f => win3.includes(f));
        let res4 = newArray.filter(f => win4.includes(f));
        let res5 = newArray.filter(f => win5.includes(f));
        let res6 = newArray.filter(f => win6.includes(f));
        let res7 = newArray.filter(f => win7.includes(f));
        let res8 = newArray.filter(f => win8.includes(f));

        if (JSON.stringify(res) === JSON.stringify(win)) {
            return win;
        } else if (JSON.stringify(res2) === JSON.stringify(win2)) {
            return win2;
        } else if (JSON.stringify(res3) === JSON.stringify(win3)) {
            return win3;
        } else if (JSON.stringify(res4) === JSON.stringify(win4)) {
            return win4;
        } else if (JSON.stringify(res5) === JSON.stringify(win5)) {
            return win5;
        } else if (JSON.stringify(res6) === JSON.stringify(win6)) {
            return win6;
        } else if (JSON.stringify(res7) === JSON.stringify(win7)) {
            return win7
        } else if (JSON.stringify(res8) === JSON.stringify(win8)) {
            return win8;
        }
    }




    // private check who's turn it is.
    function _turnBase() {
        if (valOne().turn) {
            //console.log("turn player two")
            valOne().turn = false;
            valTwo().turn = true;
            Domcontrol.playerTwoTag.classList.add('turn');
            Domcontrol.playerOneTag.classList.remove('turn');
        } else if (valTwo().turn) {
            // console.log("turn player one")
            valTwo().turn = false;
            valOne().turn = true;
            Domcontrol.playerTwoTag.classList.remove('turn');
            Domcontrol.playerOneTag.classList.add('turn');
        }
    }
    //pulbic reset arrays
    function resetArr() {
        scoreOne = [];
        scoreTwo = [];
        return {
            scoreOne, scoreTwo
        }
    }


    //getters
    function getvalOne() {
        return valOne, valTwo;

    }




    return {
        valOne,
        valTwo,
        getvalOne,
        resetArr,
        scoreOne,
        scoreTwo,
        mutliArr

    }

})()




const iaEngine = (function(){

    const aiBtn = document.querySelector(".computer");

    aiBtn.addEventListener("click", Domcontrol.aiPlayer);

    if(Domcontrol.getStart() === true && Domcontrol.getIA() === true){

        console.log('ai');




    }




















})()