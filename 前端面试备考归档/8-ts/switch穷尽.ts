type Shape = 'circle' | 'rect';

function getShage(shape: Shape) {
  switch(shape) {
    case 'circle':
      console.log('this is circle');
      break;
    case 'rect':
      console.log('this is rect');
      break;
    default:
      const _exhaustiveShape: never = shape;
      console.log(`this is ${_exhaustiveShape}`);
  }
}