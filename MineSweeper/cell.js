

function Cell(i,j,w){
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;
  this.mine = false;
  this.revealed = false;
}

Cell.prototype.show = function(){
  stroke(0);
  noFill();
  rect(this.x,this.y,this.w,this.w);
  if(this.revealed){
    if(this.mine){
      fill(127);
      ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w*0.5);
    }
    else{
      fill(200);
      rect(this.x,this.y,this.w,this.w);
      if(this.neighborCount > 0){
        textAlign(CENTER);
        fill(0);
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 12);
      }
    }
  }
}

Cell.prototype.reveal = function(x,y){
  this.revealed = true;
  if(this.neighborCount == 0){
    //flood Fill time
    this.floodFill();
  }
}

Cell.prototype.contains = function(x,y){
  return (x > this.x && x < this.x+this.w && y > this.y && y < this.y+this.w);
}

Cell.prototype.countMines = function(){
  if (this.mine){
    this.neighborCount = -1;
    return;
  }
  var total = 0;
  for(var xOff = -1; xOff <= 1; xOff++){
    for(var yOff = -1; yOff <= 1; yOff++){
      var i = this.i + xOff;
      var j = this.j + yOff;
      if(i > -1 && i < cols && j > -1 && j < rows) {
        var neighbor = grid[i][j];
        if(neighbor.mine){
          total++;
        }
      }
    }
  }
  this.neighborCount = total;
}


Cell.prototype.floodFill = function(){
  for(var xOff = -1; xOff <= 1; xOff++){
    for(var yOff = -1; yOff <= 1; yOff++){
      var i = this.i + xOff;
      var j = this.j + yOff;
      if(i > -1 && i < cols && j > -1 && j < rows) {
        var neighbor = grid[i][j];
        if(neighbor.neighborCount == 0 && !neighbor.revealed){
          neighbor.reveal();
        }
      }
    }
  }
}
