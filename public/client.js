

$(document).ready(function(){    
    //Change nav button background and text color on hover
    $(".btn").mouseenter(function(){
        $(this).animate({backgroundColor: "rgba(245,245,220,.4)", color:'beige'},100)
    }).mouseleave(function(){
        $(this).animate({backgroundColor: "rgba(100,100,100,.0)", color: '#DBDBDB'},100)
    });
    
//     $(".btn").click(function(){
//         //Gets the data-target value inside the button clicked
//         var clicked = $(this).data('target').split('-').slice(-1)[0];
//         var base = window.location.href.split('/')[3] + '/';
//         console.log(base);
//         window.location.replace(base + clicked);
//    }); 
});