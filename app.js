/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/ 

var scores, roundScore, activePlayer, gamePlaying;



//dice = Math.ceil(Math.random() * 6);//also Math.floor() this will eliminate all the decimal part
//          SETTER
//document.querySelector('#current-' + activePlayer).textContent = dice;
//to add html to the selected data
/*document.querySelector('#current-' + activeplayer).innerHTML = '<em>' + dice + '<\em>';*/

/*//        GETTER
var x = document.querySelector('#score-1').textContent;
console.log(x);*/
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector("#name-0").textContent = 'Player 1';
    document.querySelector("#name-1").textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
}
init();
/* call Back Function
function btn() {
    //do something here
}
btn();//callbackfunction

document.querySelector('.btn-roll').addEventListener('click', btn);//there are a lot of em refer MDN: docs/Web/Events/mouse_events*/

//get element by id



//Anonymous function that we can use only once
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
            // 1. Random number
        var dice = Math.ceil(Math.random() * 6);

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'https://github.com/Anuran32z/DiceGame/blob/master/dice-' + dice + '.png?raw=true';

        // 3. Update the round score IF the rolled number was NOT a 1
        // != and == does type coercion and !== and === does not
        if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }// static variable used
    
});
//hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // add CURRENT score to GLOBAL score

        scores[activePlayer] += roundScore;

        // update the UI

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game

        if(scores[activePlayer] >= 100){
            document.querySelector("#name-"  + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            //we have already created a class in the css file for this perpose
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            window.alert("Player-"+ (activePlayer+1) +" WON! click New Game\n");
            gamePlaying = false;
        } else {
            nextPlayer();
        }        
    }
    
});

//new game button
document.querySelector('.btn-new').addEventListener('click', init);
//not init() bcoz this will call the function immediately

document.querySelector('.btn-rules').addEventListener('click', function() {
   alert("GAME RULES: \n- The game has 2 players, playing in rounds\n- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score\n- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn\n- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn\n- The first player to reach 100 points on GLOBAL score wins the game"); 
});

function nextPlayer(){
    //next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        /*document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');*/
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'solid';
    
}
