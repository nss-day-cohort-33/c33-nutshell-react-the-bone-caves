import ApiHandler from "./ApiHandler"

export default Object.create(ApiHandler, {
  get: {
     value: function (id) {
        return  ApiHandler.get("messages", id)
      }
  },
getAll: {
    value: function (){
        return ApiHandler.all("messages")
    }
},
delete: {
    value: function(id){
        return ApiHandler.delete("messages", id)
    }
},
post: {
    value: function(newData){
        return ApiHandler.post("messages",newData)
    }
},
put: {
    value: function(editData){
    return ApiHandler.put("messages",editData)
    }
}

})
