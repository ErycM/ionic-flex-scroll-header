(function () {
angular
    .module('app')

    .directive('flexHeader', flexHeader);

    function flexHeader() {
        return {
        restrict: 'AE',
        scope: true,
        template: '',
        controller: function($scope, $element, $attrs, $ionicScrollDelegate, $window){
            $attrs["flexHeader"] = false;
            var checkState = false;
            var ionContent = document.querySelector('ion-content');  

            $("ion-pane").append('<div id="blockNameHeader"></div>'); //insert html reference
            $(".scroll").prepend('<div id="blockHeader"></div>'); //below ion-content > .scroll


            //onscroll ion content
            $("ion-content").scroll(function(){
                var position = $ionicScrollDelegate.getScrollPosition().top;
                $attrs["flexHeader"] = true;
                var init = 60;
                var max = 90;
                var checkState = false;
                var positionHeight = 170;

                //console.log($ionicScrollDelegate.getScrollPosition().top);
                if(position <= 0.3){
                      jQuery('#blockHeader').css('opacity', '1'); 
                }

                if(position > init){
                    
                    jQuery('#blockNameHeader').css('opacity', String((position/max) -0.5));
                    document.getElementById('blockNameHeader').style.display = 'flex';
                    //console.log(position);
                    jQuery('#blockHeader').css('opacity', String(1.8 - position/max));
                }

                if(position > max){
                    
                    if(!checkState){    //check to scroll has already been defined
                        $scope.setBar = "has-header";
                        $scope.setHideBar = "false";
                        $attrs["flexHeader"] = false; //scroll postitions state (scroll > 125 || scroll < 125)
                        checkState = true; //check once state - scroll
                    }
                    
                }else if($attrs["flexHeader"]){ 
                    checkState = false;
                    document.getElementById('blockNameHeader').style.display = 'none'; //hide block
                    
                }
            }); 

        }, 
        link:  function(scope, element, attrs){
                //console.log(element[0]);
                var myEl = angular.element( document.querySelector('#blockHeader'));
                //console.log(headerImg);
                myEl.prepend('<div style="margin-bottom: 15px;" class="flex_headerTop">'+
                            '<div class="boxHeader">'+
                                '<div class="photoPerson perfilSubHeader">'+
                                '<img src="'+attrs["headerImg"]+'" alt="test">'+
                                '</div>'+
                            '</div>'+
                            '<h4 class="headerName">'+
                                attrs["headerName"]+
                            '</h4>'+
                        '</div>'); 
                attrs["flexHeader"] = false;
                
                var myEl = angular.element( document.querySelector('#blockNameHeader'));
                myEl.prepend('<div class="bar bar-header bar-dark">'+
                                '<a class="button icon-left ion-android-arrow-back button-clear button-light">'+
                                '</a>'+
                                '<h1 class="title">'+attrs["headerName"]+'</h1>'+
                                '<a class="button button-clear icon-right ion-android-more-vertical button-light"></a>'+
                            '</div>'
                            ); 
                $('#blockNameHeader').hide();
                


            }
         }
    }



}());
