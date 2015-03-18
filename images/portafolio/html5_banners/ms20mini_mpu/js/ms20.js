/**
 * Created with JetBrains WebStorm.
 * User: iMig
 * Date: 19/03/13
 * Time: 12:22
 * To change this template use File | Settings | File Templates.
 */
var $wrapper,
    $schematics,
    $schematics2,
    $logoKorg,
    $logoKorg50,
    $copy1,
    $copy2,
    $copy3,
    $copy4,
    $ms20_perfil,
    $ms20_persp1,
    $ms20_persp2,
    $imagesContainer,
    $button,
    timeline;

function initCSS() {
    $wrapper = $("#wrapper");
    $schematics = $("#schematics img");
    $schematics2 = $("#schematics2 img");
    $logoKorg = $("#logoKorg");
    $logoKorg50 = $("#logoKorg50");
    $copy1 = $("#copy1");
    $copy2 = $("#copy2");
    $copy3 = $("#copy3");
    $copy4 = $("#copy4");
    $ms20_perfil = $("#ms20_perfil");
    $ms20_persp1 = $("#ms20_persp1");
    $ms20_persp2 = $("#ms20_persp2");
    $imagesContainer = $("#imagesContainer");
    $button = $("#button");
    timeline;

    TweenMax.set($schematics, {css:{rotationY:0, z:0, rotationX:0, scale:2, autoAlpha:0}});
    TweenMax.set($schematics2, {autoAlpha:0});
    TweenMax.set($logoKorg, {autoAlpha:0});
    TweenMax.set($logoKorg50, {autoAlpha:0, scale:1.5});
    TweenMax.set($copy1, {autoAlpha:0});
    TweenMax.set($copy2, {autoAlpha:0});
    TweenMax.set($copy3, {autoAlpha:0});
    TweenMax.set($copy4, {autoAlpha:0});
    TweenMax.set($ms20_perfil, {x:-300, y:-100, scale:0.8, autoAlpha:1});
    TweenMax.set($ms20_persp1, {x:-150, y:0, autoAlpha:0});
    TweenMax.set($ms20_persp2, {x:0, y:-58, autoAlpha:0});

    createIniTimeline();
}

function getIntroImage() {
    var tl = new TimelineLite();
    tl.to($schematics, 1.5, {scale:1, autoAlpha:1, ease:Back.easeInOut})
        .to($schematics, 0.3, {css:{rotationY:90, z:100, rotationX:20, alpha:0.3}, ease:Power1.easeIn})
        .fromTo($schematics2, 0.5, {css:{rotationY:-90, z:100, rotationX:20}}, {css:{rotationY:0, z:0, rotationX:0}, ease:Power1.easeOut})
        .to($schematics2, 1, {autoAlpha:1, ease:Power1.easeOut}, "-=0.5")
        .to($schematics2, 0.5, {autoAlpha:0, ease:Power1.easeOut, delay:0.5})
        .to($copy1, 1.5, {autoAlpha:1, textShadow:"1px 1px 1px rgba(255, 255, 255, 0.5)", color:"#000"}, "-=0.5")
        .to($logoKorg, 0.5, {autoAlpha:1, ease:Power1.easeOut}, "-=1")
        .to($copy2, 1.5, {autoAlpha:1, textShadow:"1px 1px 1px rgba(255, 255, 255, 0.5)", color:"#000"}, "-=1")
        .staggerTo([$copy1, $copy2], 0.5, {autoAlpha:0, ease:Power1.easeOut, delay:1})
    return tl;
}

function synthReel() {
    var tl = new TimelineLite();
    tl.to($ms20_perfil, 0.5, {x:0, y:0, scale:1, ease:Power3.easeIn})
        .to($ms20_perfil, 0.5, {x:-350, y:-150, scale:1.5, autoAlpha:0, ease:Power3.easeOut, delay:2})
        .to($ms20_persp1, 0, {autoAlpha:0, ease:Power3.easeIn}, "-=0.5")
        .to($ms20_persp1, 1, {x:0, y:-50, autoAlpha:1, ease:Power3.easeOut}, "-=0.5")
        .to($ms20_persp1, 0.25, {autoAlpha:0, ease:Power3.easeOut, delay:1})
        .to($ms20_persp2, 0.25, {autoAlpha:1, ease:Power3.easeIn}, "-=0.25")
        .to($ms20_persp2, 1, {x:-178, y:-58, autoAlpha:1, ease:Power3.easeOut}, "-=0.25")
        .to($ms20_persp2, 0.25, {autoAlpha:0, ease:Power3.easeOut, delay:1})
    return tl;
}

function copyFinal() {
    var tl = new TimelineLite();
    tl.fromTo($copy3, 1, {scale: 0.8, textShadow:"1px 1px 2px rgba(0, 0, 0, 0)", color:"#000"},
        {scale: 1, autoAlpha:1, textShadow:"2px 2px 1px rgba(255, 255, 255, 0.8)", color:"#000"})
        .to($copy3, 1, {autoAlpha:0, ease: Power1.easeOut, delay:1})
    tl.fromTo($copy4, 1, {scale: 0.8, textShadow:"1px 1px 2px rgba(0, 0, 0, 0)", color:"#000"},
        {scale: 1, autoAlpha:1, textShadow:"2px 2px 1px rgba(255, 255, 255, 0.8)", color:"#000"})
        .to($copy4, 1, {autoAlpha:0, ease:Power1.easeOut, delay:1, onComplete:imgFastForward})
    return tl;
}

function createIniTimeline() {
    timeline = new TimelineLite();
    timeline.set($wrapper, {autoAlpha:1})
        .add(getIntroImage())
        .add(synthReel())
        .add (copyFinal())
    timeline.timeScale(1);
}

function imgFastForward() {
    var $imgWrap	= $('.images'),
        $images		= $imgWrap.find('img'),
        $currImg	= $images.eq(0),
        $currW      = $currImg.attr('width'),
        $currH      = $currImg.attr('height'),
        $currX      = ( 300 -  $currW ) *0.5,
        $currY      = ( 250 -  $currH ) *0.5,
        index		= 0,
        numImgs		= $images.length,
        fadeDur		= 150,
        tlFF = new TimelineLite({onComplete:loopImages}),

        loop = setInterval(function() {
                $images.eq(0).hide();
                tlFF.append(function() {
                           $images.eq(index-1).hide();
                           $images.eq(index).show();
                    });
                tlFF.fromTo($images.eq(index), 0.05, {x:$currX, y:$currY,autoAlpha: 0},{x:$currX, y:$currY, autoAlpha: 1, ease:Power4.easeOut});
                }, fadeDur);

    $images.eq(0).show();
    index++;

    function loopImages() {
        index++;
        $currImg = $images.eq(index);
        $currW      = $currImg.attr('width'),
        $currH      = $currImg.attr('height'),
        $currX = ( 300 -  $currW ) *0.5;
        $currY = ( 250 -  $currH ) *0.5;
        if (index >= numImgs){
            tlFF.staggerTo ( [$images.eq(index-1), $logoKorg], 1, {autoAlpha:0, delay:1, ease:Power1.easeOut,
                onComplete:function(){
                    //$images.eq(index-1).hide();
                    toGo();
                    tlFF.kill();
                }});
            }
    }
    function toGo(){
        window.clearInterval(loop);
        finalSeq();
    }
}

function finalSeq() {
    var tl = new TimelineLite();
        tl.fromTo($logoKorg50, 1.5, {scale:1.5}, {autoAlpha:1, scale:1, ease:Back.easeOut}, "-=0.5")
            .to($logoKorg50, 1, {autoAlpha:0, ease:Power4.easeOut, delay:5, onComplete:theEnd});
   }

function theEnd(){
    TweenMax.killAll();
    initCSS();
}

function bgExitHandler(e) {
//    Enabler.exit("Background Exit");
    console.log("click");
    $(document.getElementById("bg-edit")).on("click", function(){
        $(this).css("cursor", "hand");
    });
}

function onMouseHandler(e) {
    console.log("mouse over");
    $(document.getElementById("bg-edit")).on("onmouseover", function(){
        $(this).css("cursor", "pointer");
    });
}

function enablerInitHandler() {
    initCSS();
    document.getElementById("bg-exit").addEventListener("click", bgExitHandler, false);
    document.getElementById("bg-exit").addEventListener("mouseover", onMouseHandler, false);
}

$(document).ready(function () {
// If true, start function. If false, listen for INIT.
//    if (Enabler.isInitialized()) {
//    enablerInitHandler();
//    } else {
//    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
//    }
    enablerInitHandler();
});



