const checkOther = function (key, node) {
        
    if(node && node[key] && node[key]  && JSON.stringify(node[key]).length > 0 && JSON.stringify(node[key]) !==  "[]"){
        return true
    }
    return false
}

export default{


    //capacity

    checkCapacity: function (node){
        if(node === undefined || node === null){
            return false;
        }

        if(node["specifications"] && node["specifications"].length > 0){
            let nodeCapacity = node["specifications"][0]

            if(!nodeCapacity)
                return false
            
            if(nodeCapacity["capacity"] && nodeCapacity["capacity"] !== "[]"){
                return true
            }


        }
        return false

    },
    //location

    
    checkRestrictions: function (node){

        if(node === undefined || node === null){
            return false;
        }

        if(node["specifications"] && node["specifications"].length > 0){
            let nodeCapacity = node["specifications"][0]

            if(!nodeCapacity)
                return false
            
            if(nodeCapacity["minimumHeightInMeters"] && nodeCapacity["minimumHeightInMeters"] !== "[]" ){
                return true
            }


        }
        return false

    },

    checkTarrifs: function (node) { return checkOther("tariffs", node) },
    checkContactData: function (node) { return checkOther("contactPersons", node) },
    checkOpeningHours: function (node) { return checkOther("openingTimes", node) },
}
