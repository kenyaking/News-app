$(document).ready(function(){
  $(document).on("click", "#article", function(){
    $(".modal").show()
    var articleID = $(this).attr("data-id")
    showComments(articleID)

    $(document).on("click","#add-comment",function(){
      $.ajax({
        method: "POST",
        url: "/articles/" + articleID,
        data: {
          name:$("#name").val(),
          comment:$("#comment").val()
        }
      }).then(function(){
        $("#comment-form")[0].reset();
        showComments(articleID)
      })
    })   
  })
 
  $(document).on("click",".delete_comment",function(){
    var commentID = this.id  
    var articleID = $(this).attr("data-id")
    console.log(articleID)
    $.ajax({
      method: "DELETE",
      url: "/comments/" + commentID
    }).done(function(){ 
    })

    showComments(articleID)  
  })
  
  var showComments = function(articleID){
    $("#comment-data").empty()
    $.ajax({
      method: "GET", 
      url: "/articles/" + articleID 
    }).then(function(data){
      console.log(data.comments);
      $(".modal-title").text(data.title)

      $.each(data.comments,function(index, value){
        var comment = '<div><button type="button" id="' + value._id + '" class="btn btn-danger btn-sm delete_comment" data-id="' + data._id + '">Delete</button>' + value.name + ": " + value.comment + '</div>'
        $("#comment-data").append(comment)
      })
    })  
  }

  $(document).on("click", "#close", function(){
    $(".modal").hide()
  })
})