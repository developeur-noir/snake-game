import "babel-polyfill";
import Game from "./game.js";

window.onload = () => {	
	
	//on cree le game avant de l'initialisers
	let myGame = new Game();
	myGame.init();  

	document.onkeydown = e => {
		const key = e.keyCode;
		let newDirection;
		switch(key){
			case 37:
				newDirection ='left';
			break;
			case 38:
				newDirection ='up';
			break;
			case 39:
				newDirection ='right';
			break;
			case 40:
				newDirection='down'
			break;
			case 32:
				myGame.launch();
				return;      //arrete l'exécution de la fonction
			default:
			return;
		}
		myGame.snakee.setDirection(newDirection);
	}

}

/*Fonctionnalités a  ajouter:la faculté de mettre la pause dans le jeu,celle de switcher d'une étape a une autre au cours du jeu ,la  faculte de 
de distinguer la tete du serpent*/
/*Copyright Franck Young Dream{web Developper}*/ //Copyright Developpeur Prince franck
//C.execution GLOBAL//Fonction window.onload
