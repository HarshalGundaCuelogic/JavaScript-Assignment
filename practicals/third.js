function addnum(no1,no2){
    var result = "Addition is ";

    function addition()
    {
        return (result + (no1+no2));
    }

    return addition();
}

iret = addnum(10,20);
console.log(iret);