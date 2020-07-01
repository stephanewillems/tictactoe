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

const PlayerFactory = (name) => {
    const sayHello = () => console.log(`Hello ${name}`);
    return  { name, sayHello };
};

