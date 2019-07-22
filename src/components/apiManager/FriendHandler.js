import ApiHandler from "./ApiHandler"

export default Object.create(ApiHandler, {
  get: {
     value: function (id) {
        return  ApiHandler.get("friends", id)
      }
  },
getAll: {
    value: function (){
        return ApiHandler.all("friends")
    }
},
delete: {
    value: function(id){
        return ApiHandler.delete("friends", id)
    }
},
post: {
    value: function(newData){
        return ApiHandler.post("friends",newData)
    }
},
put: {
    value: function(editData){
    return ApiHandler.put("friends",editData)
    }
}

})
