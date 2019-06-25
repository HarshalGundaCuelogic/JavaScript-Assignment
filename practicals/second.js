 "use strict"

var globalVariable = 'Global';

function print()
{
    var localVariable = 'Local';
    
    function child()
    {
        var childVariable = 'Child';
        /* console.log(globalVariable);
        console.log(localVariable);
        console.log(childVariable); */
    }
    child();
    /* console.log(globalVariable);
    console.log(localVariable);
    console.log(childVariable); */
}
print();

console.log(globalVariable);
console.log(localVariable);
console.log(childVariable);