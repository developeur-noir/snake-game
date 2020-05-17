export default class apple{

    constructor(position = [10,10] ){

        this.position=position;
    }

    setNewPosition(widthInBlock,heightInBlock){
        const newX = Math.round(Math.random()*(widthInBlock-1));
        const newY = Math.round(Math.random()*(heightInBlock-1));
        //donnons cette nouvelle position a notre pomme
        this.position = [newX,newY];
    }
    //METHODE PERMETTANT DE SAVOIR SI UNE CERTAINE POSITION CREE EST SUR LE SERPENT
    //methode sous forme de question'isOnSnake?'
    isOnSnake(snakeToCheck){ 
        //créons la constiable qu'on va retourner a la fin
        let isOnSnake = false;
        //now on va passer sur tout le corps du serpent avec une boucle;sur chacun des blocs du corps de snakee
        for (let block of snakeToCheck.body){
            //la pomme est dessus oui ou non?

            if (this.position[0] === block[0] && this.position[1] === block[1]){
                /*si le x de ma pomme est egal a---- et le y de ma pomme egal a ---- alors...*/
                 isOnSnake = true;//allume moi le isOnSnake;
            }
        }
        return isOnSnake;
    }
}