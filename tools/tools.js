function convertStarsToArray(str){
  var num = +str;
  var ten = Math.floor(num /10);
  var arr = [0,0,0,0,0];
  for(var i = 0;i < ten;i++){
    arr[i] = 1;
  }
  if(num % 10 >= 5){
    arr[i] = 2;
  }
  return arr;
}
module.exports = {
  convertStarsToArray: convertStarsToArray
}