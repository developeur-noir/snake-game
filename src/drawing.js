export default class Drawing {

    static gameOver(ctx,centerX,centerY){ //on fourni les parameters dont elle aura besoin pour qu'elle soit independante

        ctx.save();
        ctx.font 		 = 'bold 70px sans-serif';
        ctx.fillStyle	 = 'black';
        ctx.textAlign	 = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle	 = 'white';//contour blanc
        ctx.lineWidth	 = 5;
        ctx.strokeText('Game Over',centerX,centerY-200);//on ecrit le meme texte
        ctx.fillText('Game Over',centerX,centerY-200);
        ctx.font 		 = 'bold 30px sans-serif';
        ctx.strokeText('Appuyez sur la touche Espace pour rejouer',centerX,centerY-155);
        ctx.fillText('Appuyez sur la touche Espace pour rejouer',centerX,centerY-155);
        ctx.restore();
    }

    static drawScore(ctx,centerX,centerY,score) {
        ctx.save();
        ctx.font 		= 'bold 200px sans-serif';
        ctx.fillStyle   = 'gray';
        ctx.textAlign   = 'center';
        ctx.fillText(score.toString(),centerX,centerY);
        ctx.textBaseline= 'middle';
        ctx.restore();
    }

    static drawSnake(ctx,blockSize,snake) {

            ctx.save();
            ctx.fillStyle ="#ff0000";
            for (let block of snake.body) 
            {
                this.drawBlock(ctx,block,blockSize);
            }
            ctx.restore();
    }

    static drawApple(ctx,blockSize,apple){

        const radius = blockSize/2;
        const x 	 =apple.position[0]*blockSize + radius;
        const y 	 =apple.position[1]*blockSize + radius;
        ctx.save();
        ctx.fillStyle="#33cc33";//couleur verte
        ctx.beginPath();//on peut enlever ce code car n'impacte pas dans l'exécution de la methode.
        ctx.arc(x,y,radius,0,Math.PI*2,true);
        ctx.fill();
        ctx.restore();

    }

    static drawBlock(ctx,position,blockSize) {
        // destructurons le array position
        const [x,y] = position;
        ctx.fillRect(x*blockSize,y*blockSize,blockSize,blockSize);
    }
}