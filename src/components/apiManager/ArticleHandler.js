import ApiHandler from "./ApiHandler"

export default Object.create(ApiHandler, {
  get: {
     value: function (id) {
        return  ApiHandler.get("Articles", id)
      }
  },
getAll: {
    value: function (){
        return ApiHandler.all("Articles")
    }
},

getAllExpand: {
    value: function (){
        return ApiHandler.getAllExpand("articles", "articles")
    }
},

delete: {
    value: function(id){
        return ApiHandler.delete("Articles", id)
    }
},
post: {
    value: function(newData){
        return ApiHandler.post("Articles",newData)
    }
},
put: {
    value: function(editData){
    return ApiHandler.put("Articles",editData)
    }
}

})
