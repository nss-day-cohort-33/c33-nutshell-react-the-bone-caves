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
removeAndList: {
    value: function(id){
        return ApiHandler.delete("messages", id)
        .then(this.getAll)
    }
},
post: {
    value: function(newData){
        return ApiHandler.post("messages",newData)
        .then(this.getAll)
    }
},
put: {
    value: function(editData){
    return ApiHandler.put("messages",editData)
    .then(this.getAll)
    }
}

})
