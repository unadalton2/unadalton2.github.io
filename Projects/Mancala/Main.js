class GameState {
  constructor(state, alive) {
    this.state = state;
    this.alive = alive;
    this.moves = [];
  }
  clone() {
    let temp = new GameState(JSON.parse(JSON.stringify(this.state)), this.alive);
    
    temp.moves = JSON.parse(JSON.stringify(this.moves));
    return temp;
  }
  
  getMoves(){
        let output = [];

        for(let i = 0; i < 6; i++){
            output.push(this.state[i]!=0)
        }
        return output;
  }

  moveP(index){
        let holding = this.state[index];
        this.state[index] = 0;

        let current_index = index;
        for(let i = 0; i < holding; i++){
            current_index++;
            if(current_index == this.state.length) {current_index = 0;}

            this.state[current_index]++;
        }

        return current_index;
  }

  move(index){
        this.moves.push(index);
        let nextHole = index;

        while (true) {
            nextHole = this.moveP(nextHole);
            if(nextHole == 6) {
                this.alive = true;
                return true;
            }
            if(this.state[nextHole] == 1) {
                this.alive = false;
                return false;
            }
        }
  }

  isGameOver() {
        let v1 = true;

        for ( let i = 0; i < 6; i++) {
            if(this.state[i] != 0) {
                v1 = false;
                break;
            }
        }

        let v2 = true;

        for (let i = 0; i < 6; i++) {
            if(this.state[i] != 0) {
                v2 = false;
                break;
            }
        }

        return v1 || v2;
  }

  getScore() {
        if(this.isGameOver()) {return this.state[6]+1000;}
        return this.state[6];
  }
}

function main(startPos){
    startState = []; 

    for (let input = 0; input < 13; input++){
        if(input == 6){startState.push(0);}
        else{startState.push(document.getElementById("P"+(1+input)).value);}
    }

    console.log(startState);

    let start = new GameState(startState, true);

    let queue = [start];
    let visited = [];

    while(queue.length != 0) {
        let m = queue.shift();

        if(m.alive) {
            let neighbour = m.getMoves();
            for(let i = 0; i < neighbour.length; i++) {
                if(neighbour[i]){
                    let n = m.clone();
                    n.move(i);
                    queue.push(n);
                }
            }
        } else {
            visited.push(m);
        }
    }

    console.log(visited.length);
    document.getElementById("demo").innerHTML =
    "My car is " + visited.length + " years old.";

    //Gets best moves
    let max = 0;
    let index = 0;
    let total = 0;
    for(let i = 0; i < visited.length; i++){
        let score = visited[i].getScore();
        if(score > max){
            max = score;
            index = i;
        }
        total += score;
    }

    if(max > 1000){max-= 1000;}

    document.getElementById("demo").innerHTML =
    "The best possible set of moves is: "+JSON.stringify(visited[index].moves+ " With a score of: "+ max);



}