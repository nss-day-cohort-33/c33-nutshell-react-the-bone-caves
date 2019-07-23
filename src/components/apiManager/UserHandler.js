import ApiHandler from "./ApiHandler"

export default Object.create(ApiHandler, {
    get: {
       value: function (id) {
          return  ApiHandler.get("users", id)
        }
    },
  getAll: {
      value: function (){
          return ApiHandler.all("users")
      }
  },
  delete: {
      value: function(id){
          return ApiHandler.delete("users", id)
      }
  },
  post: {
      value: function(newData){
          return ApiHandler.post("users",newData)
      }
  },
  put: {
      value: function(editData){
      return ApiHandler.put("users",editData)
      }
  }

  })
