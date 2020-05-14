/*Copyright Franck Young Dream{web Developper}*/

window.onload = function () {	
	var canvaswidth=900;
	var canvasheight=600;
	var blockSize =30;
	var snakee;
	var ctx;
	var delay=100;
	var score;
	var applee;
	var timeout;
	var widthInBlock = canvaswidth/blockSize; 
	var heightInBlock = canvasheight/blockSize;
	init();
	

	function init(){
	var canvas 					 = document.createElement('canvas');
	canvas.width 				 = canvaswidth;
	canvas.height 			 	 = canvasheight;
	canvas.style.border 		 = "30px solid gray";
	canvas.style.margin			 = "50px auto"//en haut/bas et centrer a gauche/droite
	canvas.style.display		 = "block";
	canvas.style.backgroundColor = "#ddd";
	document.body.appendChild(canvas);
	//le context de creation du contenu peeut etre 2d ou alors 3d
	ctx    = canvas.getContext('2d');
	snakee = new snake([[6,4],[5,4],[4,4],[3,4],[2,4]],'right');//le body du prototype snake est représenté ici par 5 blocs.
	applee = new apple([10,10]); //créons le et donnons lui une position
	score  = 0;
	refreshCanvas();

	}

	function refreshCanvas(){   
		snakee.advance();

		if (snakee.checkCollision()){
			gameOver();
		}
		else{
			if (snakee.isEatingApple(applee)){
				score++;//augmenter le score a chaque boufé
				//dans le cas ou le  serpent a mangé la pomme
				snakee.ateApple = true; 
				do{
					applee.setNewPosition();//donne lui une nouvelle position
				}
				while(applee.isOnSnake(snakee)) /*puis verifie si cette nouvelle position est sur le serpent en particulier
				si oui renvoi 'oui' et redonnons lui une autre position*/

				// si le score se divise par 5(j'ai franchi un palier de 5 points ) alors execute la function speedUp
				if (score % 5 == 0) { //augmenter la vitesse du serpent apres chaque 5 pommes mangées
					speedUp();
				}

			}
		ctx.clearRect(0,0,canvaswidth,canvasheight);
		drawScore();
		snakee.draw();
		applee.draw();
		timeout = setTimeout(refreshCanvas,delay); //referencement de setTimeout
		}
		
	}
	function speedUp() {
		
		delay /= 2;
	}

	function gameOver(){
		ctx.save();
		ctx.font 		 = 'bold 70px sans-serif';
		ctx.fillStyle	 = 'black';
		ctx.textAlign	 = 'center';
		ctx.textBaseline = 'middle';
		var centerX		 = canvaswidth/2;
		var centerY 	 = canvasheight/2;
		ctx.strokeStyle	 = 'white';//contour blanc
		ctx.lineWidth	 = 5;
		ctx.strokeText('Game Over',centerX,centerY-200);//on ecrit le meme texte
		ctx.fillText('Game Over',centerX,centerY-200);
		ctx.font ='bold 30px sans-serif';
		
		ctx.strokeText('Appuyez sur la touche Espace pour rejouer',centerX,centerY-155);
		ctx.fillText('Appuyez sur la touche Espace pour rejouer',centerX,centerY-155);
		ctx.restore();
	}

	function restart(){
		snakee = new snake([[6,4],[5,4],[4,4],[3,4],[2,4]],'right');
		applee = new apple([10,10]);
		score = 0;
		clearTimeout(timeout);//pour empecher le bug de relancement
		refreshCanvas();

	}

	function drawScore(){
		ctx.save();
		
		ctx.font ='bold 200px sans-serif';
		ctx.fillStyle= 'gray';
		var centerX=canvaswidth/2;
		var centerY=canvasheight/2;
		ctx.textAlign='center';
		ctx.fillText(score.toString(),centerX,centerY);
		ctx.textBaseline ='middle';
		ctx.restore();
	}

	function drawBlock(ctx,position){
		var x = position[0]*blockSize;
		var y = position[1]*blockSize;
		ctx.fillRect(x,y,blockSize,blockSize);
	}

	//fonction constructeur de serpent
	function snake(body,direction){
		this.body=body;
		this.ateApple= false;
		this.direction =direction;

		this.draw = function()
		{
			ctx.save();
			ctx.fillStyle ="#ff0000";
			for (var i = 0 ; i <this.body.length; i++) 
			{
				drawBlock(ctx,this.body[i]);
			}
			ctx.restore();
		};
		//faire avancer le serpent dans les differents axes
		this.advance = function ()
		{
			var nextPosition =this.body[0].slice();
			switch(this.direction)
			{
				case 'left':
				nextPosition[0] -=1;
				break;
				case 'right':
				nextPosition[0] +=1;
				break;
				case 'up':
				nextPosition[1] -=1;
				break;
				case 'down':
				nextPosition[1] +=1;
				break;
				default:
				throw('invalid direction');     
			}
			this.body.unshift(nextPosition);
			if (!this.ateApple)
				this.body.pop();
			else
				this.ateApple = false;
		};
		//passons cette nouvelle direction créee sur onkeydown a notre serpent

		this.setDirection = function(newDirection)
		{
			var allowedDirection;
			switch(this.direction)
			{
				case 'left':
				case 'right':
				allowedDirection =['up','down'];
				break;
				case "down":
				case 'up':
				allowedDirection =['left','right'];
				break;
				default: 
				throw('invalid direction');
			}
			if (allowedDirection.indexOf(newDirection)> -1)//si position des tab coincident avec 0 ou1 alors les directions sont permises
			{
				this.direction=newDirection;
			}
		};

		this.checkCollision =function()
		{
			var wallCollision =false;//collision sur un mur
			var snakeCollision =false;//collision sur lui meme
			var head = this.body[0];//tete du serpent
			var rest = this.body.slice(1);//reste du serpent hors mis sa tete
			var snakeX =head[0];//le X de la tete du serpent
			var snakeY =head[1]; //le Y de la tete du serpent
			var minX = 0;//point minimal sur l'axe des x initialisé a zero
			var minY = 0;
			var maxX = widthInBlock -1;
			var maxY = heightInBlock -1;
			var isNotBetweenHorizontalWall =snakeX<minX ||snakeX >maxX;
			var isNotBetweenVerticalWall =snakeY<minY || snakeY >maxY;
			//SI L'un isNotBetweenVerticalWalldes 2 est vrai la wallColision s'allume
			//si le serpent n'est pas a l'interieur des murs vertical et horizontal...alors il es hors jeu
			if(isNotBetweenHorizontalWall||isNotBetweenVerticalWall)
			{
				wallCollision =true;//verification des murs

			}
			//verification pour savoir si le serpent ne s'est pas mis sur le reste du corps 2eme cas d'hors game
			for (var i = 0;i<rest.length;i++)//pour une check sur toute l'étendue du reste du corps 
			{
				//ils n'ont pas le droit d'avoir le meme x et le meme y
				if (snakeX ==rest[i][0] && snakeY ==rest[i][1] )
				//si le x ou y des 2 blocs du rest est egale a un x ou y de la tete du serpent alors allumer l'alarme de collision sur lui meme
				{
					snakeCollision = true;

				}
			}
			return wallCollision || snakeCollision;//soit il a hurté le mur soit sur lui meme
		};

		this.isEatingApple = function(appvaroEat)
		{
			var head = this.body[0];
			if ( head[0] === appvaroEat.position[0] && head[1] === appvaroEat.position[1])
				return true;
			else
				return false;	
		};
	}

	function apple(position){
		this.position=position;
		this.draw =function()
		{
			ctx.save();
			ctx.fillStyle="#33cc33";//couleur verte
			ctx.beginPath();//on peut enlever ce code car n'impacte pas dans l'exécution de la methode.
			var radius =blockSize/2;
			var x =this.position[0]*blockSize + radius;
			var y =this.position[1]*blockSize + radius;
			ctx.arc(x,y,radius,0,Math.PI*2,true);
			ctx.fill();
			ctx.restore();
		};

		this.setNewPosition =function()
		{
			var newX = Math.round(Math.random()*(widthInBlock-1));
			var newY = Math.round(Math.random()*(heightInBlock-1));
			//donnons cette nouvelle position a notre pomme
			this.position = [newX,newY];
		};
		//METHODE PERMETTANT DE SAVOIR SI UNE CERTAINE POSITION CREE EST SUR LE SERPENT
		this.isOnSnake=function (snakeToCheck)//methode sous forme de question'isOnSnake?'
		{
			//créons la variable qu'on va retourner a la fin
			var isOnSnake =false;
			//now on va passer sur tout le corps du serpent avec une boucle;sur chacun des blocs du corps de snakee
			for (var i = 0; i < snakeToCheck.body.length; i++)
			{
				//la pomme est dessus oui ou non?

				if (this.position[0]===snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1])
					/*si le x de ma pomme est egal a---- et le y de ma pomme egal a ---- alors...*/
				{
					 isOnSnake=true;//allume moi le isOnSnake;
				}
			}
			return isOnSnake;
		};
	}

	
	document.onkeydown = function handleKeydown(e){
		var key =e.keyCode;
		var newDirection;
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
			restart();
			return;            //arrete l'exécution de la fonction
			default:
			return;
		}
		snakee.setDirection(newDirection);

	}	
}
/*Fonctionnalités a  ajouter:la faculté de mettre la pause dans le jeu,celle de switcher d'une étape a une autre au cours du jeu ,la  faculte de 
de distinguer la tete du serpent*/