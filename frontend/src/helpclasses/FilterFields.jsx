

export default{


    //capacity

    checkCapacity : function checkCapacity(node){
        if(node === undefined){
            console.log("UNDEFINED" + node)

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

    checkRestrictions: function checkRestrictions(node){

        if(node["specifications"] && node["specifications"].length > 0){
            let nodeCapacity = node["specifications"][0]

            if(!nodeCapacity)
                return false
            
            if(nodeCapacity["minimumHeightInMeters"] && nodeCapacity["capacity"] !== "[]")
                return true


        }
        return false

    }
    

}
