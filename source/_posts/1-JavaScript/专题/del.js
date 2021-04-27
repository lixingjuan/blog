const hanoi = (disc, A, B, C) => {
  if(disc > 0){
    hanoi(disc-1, A, C, B)
    console.log(`Move disc ${disc} from ${A} to ${C}` )
    hanoi(disc-1, B, A, C)
  }
}



hanoi(4, 'A','B','C')