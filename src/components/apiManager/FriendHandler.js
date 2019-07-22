import ApiHandler from "./ApiHandler"

export default Object.create(ApiHandler, {
  get: {
     value: function (id) {
        return  ApiHandler.get("events", id)
      }
  },
getAll: {
    value: function (){
        return ApiHandler.all("events")
    }
},
delete: {
    value: function(id){
        return ApiHandler.delete("events", id)
    }
},
post: {
    value: function(newData){
        return ApiHandler.post("events",newData)
    }
},
put: {
    value: function(editData){
    return ApiHandler.put("events",editData)
    }
}

})
