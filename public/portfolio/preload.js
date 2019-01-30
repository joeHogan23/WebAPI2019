$(document).ready(function(){
    var clicked = false;
    var preloaderIsActive = false;
    var preload=document.getElementById("#preloader");
    var loading = 0;
    var interval = setInterval(frame,64);
    console.log("START LOAD");
    
    $(".social-link-button").click(function(){
        clicked = true;
        interval = setInterval(frame, 64);
    })
    
    function frame(){        
        if(clicked)
        {
            if(!preloaderIsActive){
                console.log("Works");
            
                $("#preloader").toggle();
                preloaderIsActive = true;
            }          
            $("#preloader").animate({top:'0'}, 100);
            $(".logo-container").fadeIn(100);
            $(".loader-circle-container").fadeIn(100); 

        }
        
        else if(loading <= 70){
            loading++;
            
            if(loading == 10){
                console.log("Enabled Container...");
                console.log("Getting Elements into Place...");
                $("#container").css({opacity: 1});

            }else if(loading == 50){
                $(".logo-container").fadeOut(1000);
                $(".loader-circle-container").fadeOut(1000); 
            }else if(loading ==60)
            {
                $("#preloader").animate({top:'-1000px'}, 1000);
                console.log("Raising The Curtains...");

            }else if(loading == 70){
                $(".navbar").fadeTo(200, 1, function(){});
                $('html').css({overflowY: 'auto'});
                $("#preloader").toggle();
                clearInterval(interval);
                console.log("END LOAD");
            }
        }
    }
    
});