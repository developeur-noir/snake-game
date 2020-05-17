import snake from "./snake.js";
import apple from "./apple.js";
import Drawing from "./drawing.js";




export default class Game {

    constructor(canvaswidth = 900,canvasheight = 600){

        this.canvaswidth   = canvaswidth;
        this.canvasheight  = canvasheight;
        this.blockSize     = 30;
        this.widthInBlock  = this.canvaswidth/this.blockSize; 
        this.heightInBlock = this.canvasheight/this.blockSize;
        this.canvas 	   = document.createElement('canvas');
        this.ctx    	   = this.canvas.getContext('2d'); 
        this.centerX	   = this.canvaswidth/2;
        this.centerY 	   = this.canvasheight/2;
        this.delay;
        this.snakee;
        this.applee;
        this.score;
        this.timeout;
    }

    init() {

        this.canvas.width 				 = this.canvaswidth;
        this.canvas.height 			 	 = this.canvasheight;
        this.canvas.style.border 		 = "30px solid gray";
        this.canvas.style.margin			 = "50px auto"//en haut/bas et centrer a gauche/droite
        this.canvas.style.display		 = "block";
        this.canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(this.canvas);
        //le context de creation du contenu peut etre 2d ou alors 3d
        this.launch();
    }

    launch() {
        this.snakee = new snake('right',[6,4],[5,4],[4,4],[3,4],[2,4]); //on use les valeurs libres
        this.applee = new apple();
        this.score = 0;
        clearTimeout(this.timeout);//pour empecher le bug de relancement
        this.delay = 100;
        this.refreshCanvas();
    }

    refreshCanvas() { 
        this.snakee.advance();

        if (this.snakee.checkCollision(this.widthInBlock,this.heightInBlock)){
            
            Drawing.gameOver(this.ctx,this.centerX,this.centerY);

        } else {

            if (this.snakee.isEatingApple(this.applee)){
                this.score++;//augmenter le score a chaque boufé
                //dans le cas ou le  serpent a mangé la pomme
                this.snakee.ateApple = true; 
                do{
                    this.applee.setNewPosition(this.widthInBlock,this.heightInBlock);//donne lui une nouvelle position
                }
                while(this.applee.isOnSnake(this.snakee)) /*puis verifie si cette nouvelle position est sur le serpent en particulier
                si oui renvoi 'oui' et redonnons lui une autre position*/

                // si le score se divise par 5(j'ai franchi un palier de 5 points ) alors execute la function speedUp
                if (this.score % 5 == 0) { //augmenter la vitesse du serpent apres chaque 5 pommes mangées
                    this.speedUp();
                }

            }
            this.ctx.clearRect(0,0,this.canvaswidth,this.canvasheight);
            Drawing.drawScore(this.ctx,this.centerX,this.centerY,this.score);
            Drawing.drawSnake(this.ctx,this.blockSize,this.snakee);
            Drawing.drawApple(this.ctx,this.blockSize,this.applee);
            this.timeout = setTimeout(this.refreshCanvas.bind(this),this.delay); //referencement de setTimeout
        }	
    }

    speedUp() {
        
         this.delay /= 2;
    }
}