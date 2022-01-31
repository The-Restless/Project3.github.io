/*Sounds from Zapsplat.com*/

window.onload = () => {
    let gss_btn = document.querySelector("#gss_num");  
    let ply_btn = document.querySelector("#continue");
    let rst_btn = document.querySelector("#reset");
   //listeners
    gss_btn.addEventListener("click", guessNum);
    ply_btn.addEventListener("click", disNormal);
    rst_btn.addEventListener("click", resetScore);
}; 


let the_score = 10; 
let the_highscore = 0;
let random_num = Math.floor((Math.random() * 100) + 1);
let guess_history = [];
var id = null;

/*Function to display all the GUI changes*/
function outputFunct(rslt, sc, hs){
    let result = document.querySelector("#result");    
    let score = document.querySelector("#score"); 
 

 	result.innerHTML = rslt; 	
 	score.innerHTML = sc; 

} 


/*Reset Score*/
function resetScore(){
	let score = document.querySelector("#score");
	let history = document.querySelector("#history");
	let result = document.querySelector("#result");    

	the_score = 10;
	score.innerHTML = the_score; 

	result.innerHTML = ``;
	history.innerHTML = ``;
	guess_history = [];

	/*re-randomize the number on lost */
	random_num = Math.floor((Math.random() * 100) + 1);
}

/*Function to search for repeated guesses*/
function historySearch(gnum){

	for(var i = 0; i < guess_history.length; i++) {
        if(gnum == guess_history[i]){
        	return true;
        }
    
    }
    return false;  
}


/*laser animation*/
function fire() {
  var elem = document.getElementById("beam");   
  var pos = 0;
  clearInterval(id);
  id = setInterval(frame, 10);
  function frame() {
    if (pos == 21) {
      clearInterval(id);
    } else {
      pos++; 
   
      elem.style.left = pos + 'vw'; 
    }
  }
}

function disNormal() { 
	let mainDis = document.querySelector("#mid1");
	let endDis = document.querySelector("#mid2");

	mainDis.style.display = "block";   
	endDis.style.display = "none";  

	resetScore(); 	
}	




/*Win or Lost outputs*/
function WinLost(status, sc){
	let highscore = document.querySelector("#highscore"); 
	let mainDis = document.querySelector("#mid1");
	let endDis = document.querySelector("#mid2");
	let winlostimage = document.querySelector("#tier_ranking");
	let e1 = document.querySelector("#entertext1");
	let e2 = document.querySelector("#entertext2");


	if (status == false){
		/*audio
		var laudio = new Audio('audio/loseaudio.mp3');
		window.focus();
		laudio.play();
		*/

		/*Changing the gif*/
		winlostimage.style.backgroundImage = "url('https://c.tenor.com/KGHNYLeVygwAAAAC/death-star-alderaan.gif')";
		
		mainDis.style.display = "none";
		endDis.style.display = "block";   
		e1.innerHTML = `You failed us... you scored <span style="fontsize: 2vw;">${sc}</span>.`;
		e2.innerHTML = `${random_num} was the secret number. You need more practice.`;
	} else if (status == true){
		/*audio
		var waudio = new Audio('audio/winaudio.mp3');
		window.focus();
		waudio.play();
		*/
		
	    if (Number(sc) > the_highscore){
	    	highscore.innerHTML = `${sc}`;
	    	the_highscore = Number(sc); 
	    }

	    /*Changing the gif*/
	    winlostimage.style.backgroundImage = "url('https://media3.giphy.com/media/ZwxpIHk5LutMc/giphy.gif?cid=ecf05e47b9obzqobhomfy4afcqs8lrhb1bxajrj0lbivized&rid=giphy.gif&ct=g')";

		mainDis.style.display = "none";
		endDis.style.display = "block";   
		e1.innerHTML = `NICE! The force really is with you! You managed to score ${sc}!`;
		e2.innerHTML = `You guessed- I mean read the secret number correctly, ${random_num}, correctly! You will make a fine jedi!`;
	}
}


function guessNum(){
	let gss = parseInt(document.querySelector("#guess").value);
	let history = document.querySelector("#history");

	if (historySearch(gss) == true){
		outputFunct(`You already picked that numnber! Please select another...`, the_score, the_highscore);
		return; 
	}else if (gss == "" || isNaN(gss)){
		outputFunct(`Please enter a number between 1 - 100...`, the_score, the_highscore);
		return;
	}else if (gss > 100 || gss < 1){
		WinLost();
		outputFunct(`The range is 1 - 100! Can you count!?!`, the_score, the_highscore);
		return;
	}
 

	/*playing laser audio*/
	let audio = new Audio('audio/zap.mp3');
	audio.play();
	fire();

	/*Adding items to the top of the list, and adding them to an array to be checked*/
	var entry = document.createElement('li');
	guess_history.push(gss);
	entry.appendChild(document.createTextNode(gss));
	history.prepend(entry);


     if (gss == random_num){ 
     	WinLost(true, the_score, gss);
        outputFunct(`You're RIGHT!`, the_score);

     }else if(gss > random_num && Number(gss - random_num) >= 30 && the_score > 1){
     	the_score -= 1; 
     	outputFunct(`WAY TOO HIGH!`, the_score);
     }else if(gss > random_num  && the_score > 1){
     	the_score -= 1;
     	outputFunct(`Too high!`, the_score);
     }else if(gss < random_num && Number(random_num - gss) >= 30  && the_score > 1){
     	the_score -= 1;
     	outputFunct(`WAY TOO LOW!`, the_score);
     }else if(gss < random_num && the_score > 1){
     	the_score -= 1;
     	outputFunct(`Too low!`, the_score);
     } else if(the_score == 1){
     	the_score -= 1;
     	WinLost(false, the_score, gss);
     	outputFunct(`You're pretty bad...`, the_score);
     }

}