ECE9065_Lab1.controller('controlcomment',function($scope,$http){
     
         $scope.facebooklogin=function()
       {

          wfacebook = window.open(facebookurl, 'window', 'status=0,menubar=0,resizable=1,width=500,height=800;');
       }
        $scope.linkedinlogin=function()
       {

          wlinkedin = window.open(linkedinurl, 'window', 'status=0,menubar=0,resizable=1,width=500,height=800;');
          $http.get('/api/linkedinuser/')
                 .success(function(data) {
                  console.log(data);
                 })
                 .error(function(data) {
                console.log('Error:' + data);
                 });
       }
        $scope.twitterlogin=function()
       {

          wtwitter = window.open(twitterurl, 'window', 'status=0,menubar=0,resizable=1,width=500,height=800;');
       }
       
         var oldpostcontent;
         $http.get('api/user')
         .success(function(data){
             
             $scope.record=data;
         });
        // create new post
        $scope.createpost = function(){
        $http.post('/api/posts/'+$scope.record.id, $scope.user)
            .success(function(data) {
                alert(JSON.stringify(data));
               
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
            if($scope.facebook)
            {
                 $http.post('/api/facebookinfo/', $scope.user)
                 .success(function(data) {
                 alert(JSON.stringify(data));
                 $scope.facebookpost_id=data.id;
                 })
                 .error(function(data) {
                console.log('Error:' + data);
                 });
                
            }
            if($scope.linkedin)
            {
              
              $http.post('/api/linkedinpost/',$scope.user)
                 .success(function(data) {
                    
                     alert(JSON.stringify(data));
                 })
                 .error(function(data) {
                console.log('Error:' + data);
                 });
            };
            if($scope.twitter)
            {
              $http.post('/api/twitterpost/',$scope.user)
                 .success(function(data) {
                 $scope.twitter_id=data.id_str;
                 alert(JSON.stringify(data));
                 })
                 .error(function(data) {
                console.log('Error:' + data);
                 }); 
            };
       };
       // updatepost for local
       $scope.updatepost=function(){
          
          $http.put('/api/findposts/'+oldpostcontent, $scope.post)
            .success(function(data) {
                alert(JSON.stringify(data));
               
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
          
       };
       //delete post
       $scope.deletepost = function(){
   
       $http({
           method:'DELETE',
           url:'/api/posts/'+$scope.record.id,
           data:$scope.user.posts
       }).then(function(err,res){
           if(err){console.log(err);}
           alert("successful delete post");
           $scope.user={};
         });
         if($scope.facebook){
         $http({
            method:'DELETE',
            url:'/api/facebookcomment/'+$scope.facebookpost_id,
           }).then(function(err,res){
           if(err){console.log(err);}
           alert("successful delete a post from facebook");
           $scope.newcomment={};
           });
         }
         if($scope.twitter){
              $http({
            method:'POST',
            url:'/api/twitterdestroypost/'+$scope.twitter_id,
            }).then(function(err,res){
            if(err){console.log(err);}
            alert("successful delete a post from twitter");
            $scope.newcomment={};
            });
         }
       };
       $scope.deletefacebookpost=function(facebookpost)
       {
           $http({
            method:'DELETE',
            url:'/api/facebookcomment/'+facebookpost.id,
            }).then(function(err,res){
            if(err){console.log(err);}
            alert("successful delete a post from facebook");
            
          
            });
       }
       $scope.deletetwitterpost=function(twitterpost)
       {
           $http({
            method:'POST',
            url:'/api/twitterdestroypost/'+twitterpost.id_str,
            }).then(function(err,res){
            if(err){console.log(err);}
            alert("successful delete a post from twitter");
            
          
            });
       }
       // show all the posts
       $scope.showpost=function()
       {
          $http.get('api/posts/'+$scope.record.id).success(function(data) {
             $scope.userposts=data; 
             
            });
       };
       $scope.facebookposts=function()
       {
           $http.get('/api/facebookinfo/')
                 .success(function(data) {
                 alert(JSON.stringify(data));
                 $scope.facebookposts=data.data;
                 })
                 .error(function(data) {
                console.log('Error:' + data);
                 });
       }
        $scope.twitterposts=function()
       {
           $http.get('/api/twitterpost/')
                 .success(function(data) {
                 alert(JSON.stringify(data));
                 $scope.twitterposts=data;
                 })
                 .error(function(data) {
                console.log('Error:' + data);
                 });
       }
       $scope.showinpost=function(post)
       {
           $scope.post=post;
            oldpostcontent=$scope.post.postcontent;
            alert(oldpostcontent);
          // alert(JSON.stringify($scope.post));
       };
       $scope.showfacebookpost=function(facebookpost)
       {
           alert(JSON.stringify(facebookpost));
           $scope.media=facebookpost;
       
       };
       $scope.showtwitterpost=function(twitterpost)
       {
           alert(JSON.stringify(twitterpost));
           $scope.media=twitterpost;
       
       };
       $scope.showincomment=function(post)
       {
           $scope.post=post;
           $http.get('api/showcomments/'+$scope.post.postcontent).success(function(data) {
             $scope.comments=data;
             alert(JSON.stringify(data));
           
            });
       };
       $scope.showfacebookcomment=function(facebookpost)
       {
           $scope.facebookpostid=facebookpost.id;
            $http.get('api/facebookcomment/'+$scope.facebookpostid).success(function(data) {
            $scope.facebookcomments=data.data;
            $scope.posttitle=facebookpost.message;
            $scope.posttitleid=facebookpost.id;
             alert(JSON.stringify(data.data));
           
            });
       };
       // create new comment
       $scope.creatcomment = function(){
        if($scope.localpost)
        {
        $http.post('/api/showcomments/'+$scope.post.postcontent, $scope.newcomment)
            .success(function(data) {
                alert("successful insert a comment for "+$scope.post.postcontent);
               
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
        }
        if($scope.checkboxfacebookposts)
        {
            
        $http.post('/api/facebookcomment/'+$scope.posttitleid, $scope.newcomment)
            .success(function(data) {
                alert("successful insert a comment to facebook");
               
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
            $scope.newcomment={};
        }  
        };
        $scope.deletefacebookcomment=function(comment)
        {
            $http({
            method:'DELETE',
            url:'/api/facebookcomment/'+comment.id,
            }).then(function(err,res){
            if(err){console.log(err);}
            alert("successful delete a comment from facebook");
            
          
            });
        }
        $scope.deletecomment=function(){
        if($scope.localpost)
        {
         $http({
            method:'DELETE',
            url:'/api/showcomments/'+$scope.post.postcontent,
            data:$scope.newcomment.content
           
           }).then(function(err,res){
           if(err){console.log(err);}
           alert("successful delete a comment from "+$scope.post.postcontent);
           $scope.newcomment={};
          
          });
        } 
        }
});