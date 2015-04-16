// function add_content (data) {
//   if (data != null){
//     content = data.content;
//     time = data.created
//     stars = data.stars
//     retweets = data.retweets
//     name = data.name
//     var tweet = '<div class="row"> \
//     <div class="col-md-12 col-sm-6">   \
//         <div class="panel panel-default"> \
//            <div class="panel-heading"><a href="#" class="pull-right">'+time+'h ago</a> <h4>'+name+'</h4></div> \
//         <div class="panel-body"> \
//               <p>'+content+'</p> \
//               <hr> \
//               <div class="input-group"> \
//                 <img src="golden_star.png" width="20" /><span style="margin-right: 150px;" class="star">'+stars+'</span>Retweets:<span id="retweets">'+retweets+'</span> \
//               </div> \
//             </div> \
//          </div> \
//     </div> \
//   </div>';
//   $("#main").append(tweet);
//   }
// }

// function conver_tweets (objects) {
//   var i=0;
//   var len = objects.length;
//   while (i < len){
//     add_content(objects[i])
//     i += 1
//   }
// }

// $.ajax({
//   url: "/tweets",
//   }).done(function(data) {
//     console.log(data);
//     window.localStorage.setItem("tweets",JSON.stringify(data));
//     conver_tweets(data);
//   });

// // var content = '<div class="row"> \
// //   	<div class="col-md-12 col-sm-6">   \
// //         <div class="panel panel-default"> \
// //            <div class="panel-heading"><a href="#" class="pull-right">2h ago</a> <h4>Vikas</h4></div> \
// //    			<div class="panel-body"> \
// //               <p>My tweet heree</p> \
// //               <hr> \
// //               <div class="input-group"> \
// //                 <img src="golden_star.png" width="20" /><span style="margin-right: 150px;" id="star">10</span>Retweets:<span id="retweets">2</span> \
// //               </div> \
// //             </div> \
// //          </div> \
// //     </div> \
// //   </div>';
