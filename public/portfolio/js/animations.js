var panelIsOpen = false;
var isInViewOfPanel = false;
var inNavTab = false;
var currentScrollPosition = 0;
var hoveringOverImage = false;
var clickedPanel;
var emailNotificationInterval;
var emailNotificationCurrentTimer = 0;

$(document).ready(function(){
    var topOfPanel = $("#panel-container").offset().top;
    
    //Change nav button background and text color on hover
    $(".btn").mouseenter(function(){
        $(this).animate({backgroundColor: "rgba(245,245,220,.4)", color:'beige'},100)
    }).mouseleave(function(){
        $(this).animate({backgroundColor: "rgba(100,100,100,.0)", color: '#DBDBDB'},100)
    })
    
    //
    $(".popup-info").fadeOut(0);

    $("#panel-container").toggle();

    $(".btn").click(function(){
        //Gets the data-target value inside the button clicked
        var clicked = $(this).data('target').split('-').slice(-1)[0]
    
        //Scroll down to the section header identified by the data-target
        $('html, body').animate({
            scrollTop: $(clicked).offset().top - 50}, 500);
        });
         
    //If using the dropdown menu. Identifies if the nav is open
    $("#nav-tab").click(function(){
        
        //Every click reverses inNavTab, keeping in step with the fluid menu's current state
        inNavTab = !inNavTab;

        //Record the current position of viewPort.top
        $(window).scroll(function(){
            currentScrollPosition = $(window).scrollTop();
        })
    })
    
    //Click on any panel to view the game's basic info
    $(".project-panel").click(function(){
        //Get the target-data, which directs to the corrolating div inside panel
        clickedPanel = $(this).data('target').split('-').slice(-1)[0]
        
        //Fade in the current selected project info
        $(clickedPanel).fadeIn(200);
        console.log(clickedPanel);
        
        //Run once
        if(!panelIsOpen){
            panelIsOpen = true;
            //Open panel with scale
            $("#panel-container").toggle("scale");
            $('html, body').animate({
                //Scroll to the top of the panel
                scrollTop: $("#panel-container").offset().top - 50}, 500);
            
            //Record the current position of viewport.top
            $(window).scroll(function(){currentScrollPosition = $("#panel-container").offset().top - 50
        })
        }
    });
    
    $(".project-panel-wrapper").mouseenter(
        function(){  
            console.log("works;")
            
            //if animations are currently active, stop them
            $(".game-Image",this).stop();
            $(".project-panel-outline",this).stop();
            
            //Get the width of the game's image and enlarge it
            $(".game-Image", this).animate({ "width":document.querySelector(".game-Image").naturalWidth + 15}, 150);
            
            //Change text colot
            $(".project-name",this).animate({color:'beige'},150)
            
            //Change outline color
            $('.project-panel-outline',this).animate({borderColor:'#FFFFFF'},150)
    }).mouseleave(function(){   
        //if animations are currently active, stop them
        $(".game-Image",this).stop();
        $(".project-panel-outline",this).stop();
        
        //Bring image back to normal scale
        $(".game-Image",this).animate({ "width":document.querySelector(".game-Image").naturalWidth}, 150);
        
        //Revert back to white text and original border color
        $(".project-name",this).animate({color:'white'},150)
        $(".project-panel-outline",this).animate({borderColor: '#222222'},150);
    });
    
    //Minimize the info panel
    $("#exit-button").click(function(){
        if(panelIsOpen){
            panelIsOpen = false;
            //Scale back to 0%;
            $("#panel-container").toggle("scale");
        }
    });
    
    
    
    
    $(window).scroll(function(){ 
        
        //If the top of viewport is within 10 pixels of currentScrollPosition
        if($(window).scrollTop() < currentScrollPosition +10 && $(window).scrollTop() > currentScrollPosition - 10)
        {
            //If fluid menu is opened
            if(inNavTab)
            {
                //Retract the fluid menu
                $("#nav-tab").trigger("click");
                
                //No longer in fluid menu
                inNavTab = false;
            }
            //if a game's info panel has been opened 
            else if(panelIsOpen)
                //You are in view of the info panel
                isInViewOfPanel = true;
        }
        //if you have been fully autoscrolled up to the info panel,    
        //and the info Panel is open,
        //and you have moved move than 200 pixels from the currentScrollPosition
        else if(($(window).scrollTop() > currentScrollPosition + 200 || 
            $(window).scrollTop() < currentScrollPosition - 200) && panelIsOpen && isInViewOfPanel)
        {
            //Disable info panel
            $("#panel-container").toggle("scale");
            
            //Disable content of selected project
            $(clickedPanel).fadeOut(200);
            
            //Set clickedPanel back to null
            clickedPanel = null;
            
            //Set 
            panelIsOpen = false;
        }else if($(window).scrollTop() > currentScrollPosition + 201 || 
            $(window).scrollTop() < currentScrollPosition - 201)
            isInViewOfPanel = false;
    })

    
    //Clicking the social icons
    $(".social-link-button").mouseenter(function()
    {
        //Each color of the overlay, indicated by the index in the div attributes
        var colors = ['rgba(0,0,0,.7)','rgba(250,92,92,.85)','rgba(1,127,178,.85)'];
        
        //Overlay with color based on index in attributes
        $(".color-overlay",this).animate({backgroundColor:colors[$(this).attr('index')]},200);

        //Fly in social name and raise opacity
        $(".logo-overlay-container",this).animate({left:'-15%', opacity: '.7'},200);

    }).mouseleave(function(){
        
        //Remove overlay
        $(".color-overlay",this).animate({backgroundColor:'rgba(0,0,0,0)'},200);
        
        //Fly out social name and lower opacity
        $(".logo-overlay-container",this).animate({left:'-33%', opacity: '0'},200);

    })
    
    $("#email-container").click(function(){
        if(emailNotificationCurrentTimer > 0)
            return;
        $("#notification-email-copy").animate({opacity: '1', marginTop: '-90px'},300);
        
        emailNotificationInterval = setInterval(removeNotification,64);
    });
    
    function removeNotification(){
        console.log("running");
        emailNotificationCurrentTimer++;
        if(emailNotificationCurrentTimer == 20){
            $("#notification-email-copy").animate({opacity: '0',},300);
        }
        else if(emailNotificationCurrentTimer > 30){
             $("#notification-email-copy").css({margin: '-60px 0 0 0'});
            clearInterval(emailNotificationInterval);
            emailNotificationCurrentTimer = 0;
        }
    }
});

//Copy content from id
function copyToClipboard(id){
    
    //Prepare to get a range of text
    var range = document.createRange();
    
    //Gets the content of the div by id
    range.selectNode(document.getElementById(id));
    
    //Remove any previous selected content
    window.getSelection().removeAllRanges();
    
    //Add the new selection temporarily
    window.getSelection().addRange(range);
        
    //Copy selection to clipboard
    document.execCommand("copy");
    
    //Removes selection after copying
    window.getSelection().empty();
}