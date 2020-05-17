
export default class snake {

    constructor(direction,...body){
        this.body = body;
        this.ateApple = false;
        this.direction = direction;
    }

    //faire avancer le serpent dans les differents axes
    advance (){
            const nextPosition = this.body[0].slice();
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
    }
    //passons cette nouvelle direction créee sur onkeydown a notre serpent

    setDirection(newDirection){
            let allowedDirection;
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
            if (allowedDirection.includes(newDirection))//si position des tab coincident avec 0 ou1 alors les directions sont permises
            {
                this.direction = newDirection;
            }
    }

    checkCollision(widthInBlock,heightInBlock){
            let wallCollision  = false;//collision sur un mur
            let snakeCollision = false;//collision sur lui meme
            //tete du serpent//reste du serpent hors mis sa tete 
            const [head,...rest] = this.body;	//Destructurons
            //le X de la tete du serpent//le Y de la tete du serpent
            const [snakeX,snakeY] = head;

            const minX = 0;//point minimal sur l'axe des x initialisé a zero
            const minY = 0;
            const maxX = widthInBlock -1;
            const maxY = heightInBlock -1;
            const isNotBetweenHorizontalWall =snakeX<minX ||snakeX >maxX;
            const isNotBetweenVerticalWall =snakeY<minY || snakeY >maxY;
            //SI L'un isNotBetweenVerticalWalldes 2 est vrai la wallColision s'allume
            //si le serpent n'est pas a l'interieur des murs vertical et horizontal...alors il es hors jeu
            if(isNotBetweenHorizontalWall||isNotBetweenVerticalWall){
                wallCollision =true;//verification des murs

            }
            //verification pour savoir si le serpent ne s'est pas mis sur le reste du corps 2eme cas d'hors game
            for (let block of rest) { //pour une check sur toute l'étendue du reste du corps
                //ils n'ont pas le droit d'avoir le meme x et le meme y
                if (snakeX === block[0] && snakeY === block[1] ){
                //si le x ou y des 2 blocs du rest est egale a un x ou y de la tete du serpent alors allumer l'alarme de collision sur lui meme
                
                    snakeCollision = true;

                }
            }
            return wallCollision || snakeCollision;//soit il a hurté le mur soit sur lui meme
    }

    isEatingApple(appConsToEat){
            const head = this.body[0];
            if ( head[0] === appConsToEat.position[0] && head[1] === appConsToEat.position[1])
                return true;
            else
                return false;	
    }
}
