var functionname=(function fun(){

  var id = 101;
  var name = "Harshal";
  
  var gun = function(){
  		document.write(id);
  		document.write(name);
  }
  
  return {
      gun12:gun
      }
})()
functionname.gun12();
functionname.id=102;
document.write(functionname.id);
functionname.gun12();
functionname.name="gunda";
document.write(functionname.name);
functionname.name();