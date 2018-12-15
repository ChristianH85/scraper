    $.getJSON("/articles", function(stories) {
 
    for (let i = 0; i < stories.length; i++) {
      
 $("#stories").append(
    `<div class="card">
      <div class="card-body">
      <h5 class="card-title">${stories[i].title}</h5>
      <p class="card-text"data-id= "${stories[i]._id}"q >${stories[i].summary}</p>
      <a href=${stories[i].url} class="btn btn-warning">${stories[i].url}</a><br>
      <button type="click" data-toggle="modal" id = "compose" class="btn btn-warning" data-target="#exampleModalLong"> "Comment"
      </button>
      </div>
      </div>`
   

    )
    }
  });
  
  $(document).on('click',"p",  function(){
    $("#stories").empty()
    var thisId = $(this).attr("data-id");
    console.log(thisId)
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
      }).then(function(data){
          console.log(data)
          $("#comment").append(
            `<h2>${data.title}</h2>
            <form class= "input-form" >
            <div class = "form-group">
            <input placeholder= "Author 'Be Honest Now'" id = "authName" class = "form-control">
            <textarea placeholder="Write comment here" id = "post"class ="form-control" rows= "8"></textarea>
            <button type="button" data-id= "${data._id}" class="btn btn-primary id= "postIt">Post</button>
            </div>
            </form>`
            )
            if(data.post){
              console.log(data.post)
              $("#stories").append(`
              <div class="card">
              <div class="card-body">
              <h3>${data.post.title}</h3>
              <p class="card-text" >${data.post.body}</p>
              </div>
              </div>`)
            }
            else{
              $("#stories").append(`<h2> No Stories Yet</h2>`)
            }
        // 
  })
  })
  $(document).on("click", "button", function() {
    console.log("click")
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#authName").val(),

        body: $("#post").val()
      }
    })
      .then(function(data) {
        console.log(data);
        $("#stories").empty();
      });
 
    $("#authName").val("");
    $("#post").val("");
  });
