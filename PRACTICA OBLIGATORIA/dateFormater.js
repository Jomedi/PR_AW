class dateFormater {

    changeDateFormat(result) {
        result.forEach(element => {
            element.fecha = element.fecha.toString().substring(4, 15)
        })
        return result
    }

}

module.exports = dateFormater;