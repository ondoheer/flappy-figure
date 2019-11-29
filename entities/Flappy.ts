import { Entity } from "./Entity";

export class Flappy extends Entity {
  

  constructor(x: number,y: number,height:number,width:number,color:string,speed:number, direction:string){
    super(x,y,height,width,color,speed,direction)
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  
}
