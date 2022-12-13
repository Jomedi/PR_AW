class dateFormater {

    obtainCurrentDate(){
        // crea un nuevo objeto Date
        var today = new Date();
        
        // getDate() devuelve el día del mes (del 1 al 31)
        var day = today.getDate();
        
        // getMonth() devuelve el mes (de 0 a 11)
        var month = today.getMonth() + 1;
        
        // getFullYear() devuelve el año completo
        var year = today.getFullYear();

        return year + "-" + month + "-" + day;
    }

    changeDateFormat(result) {
        result.forEach(element => {
            element.fecha = element.fecha.toString().substring(4, 15)
        })
        return result
    }

}

module.exports = dateFormater;