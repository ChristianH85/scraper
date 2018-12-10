// $(document).on('ready', function(){


$.getJSON("/articles", function(stories) {
    console.log(stories)
    for (let i = 0; i < stories.length; i++) {
 $("#stories").append(
    '<div class="card" style="width: 70rem;">'+
    
    '<div class="card-body">'+
      '<h5 class="card-title">'+stories[i].title+'</h5>'+
      '<p class="card-text">'+stories[i].summary+'</p>'+
      '<a href='+stories[i].url+'class="btn btn-warning">'+stories[i].url+'</a>'+'<br>'+
      
      '<button type="button" data-toggle="modal" class="btn btn-warning" data-target="#exampleModalLong">'+
        "Comment"+
      '</button>'+
    '</div>'+
  '</div>'
        // '<div class="modal" tabindex="-1" role="dialog">'+
    //   '<div class="modal-dialog" role="document">'+
    //     '<div class="modal-content">'+
    //       '<div class="modal-header">'+
    //         '<h5 class="modal-title">'+ stories[i].title +'</h5>'+
    //         '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
    //           '<span aria-hidden="true">&times;</span>'+
    //         '</button>'+
    //       '</div>'+
    //       '<div class="modal-body">'+
    //         '<p>'+ stories[i].summary +'</p>'+
    //         '<p>'+ stories[i].url +'</p>'+
    //       '</div>'+
    //       '<div class="modal-footer">'+
    //         '<button type="button" class="btn btn-primary" data-target="#exampleModalLong">'+
    //         "Comment"+
    //         '</button>'+
    //       '</div>'+
    //     '</div>'+
    //   '</div>'+
    // '</div>'
    )
    }
  });
// })
//   "<p " + stories[i].title + "'>" + stories[i].summary + "<br />" + stories[i].url + "</p>");