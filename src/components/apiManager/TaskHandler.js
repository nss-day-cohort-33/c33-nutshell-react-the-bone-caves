import ApiHandler from "./ApiHandler"

export default Object.create(ApiHandler, {
  get: {
     value: function (id) {
        return  ApiHandler.get("tasks", id)
      }
  },
getAll: {
    value: function (){
        return ApiHandler.all("tasks")
    }
},
delete: {
    value: function(id){
        return ApiHandler.delete("tasks", id)
    }
},
post: {
    value: function(newData){
        return ApiHandler.post("tasks",newData)
    }
},
put: {
    value: function(editData){
    return ApiHandler.put("tasks",editData)
    }
}

})
