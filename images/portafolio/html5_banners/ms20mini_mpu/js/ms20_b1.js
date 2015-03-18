/**
 * Created with JetBrains WebStorm.
 * User: iMig
 * Date: 19/03/13
 * Time: 12:22
 * To change this template use File | Settings | File Templates.
 */
var $banner,
    $schematics,
    $schematics2,
    $logoKorg,
    $copy1,
    $copy2,
    $ms20_perfil,
    $ms20_persp1,
    $ms20_persp2,
    $imagesContainer,
    maxImages,
    numImagesSeen,
    timeline;


function initCSS() {
    $banner = $("#banner");
    $schematics = $("#schematics img");
    $schematics2 = $("#schematics2 img");
    $logoKorg = $("#logoKorg")
    $copy1 = $("#copy1");
    $copy2 = $("#copy2");
    $ms20_perfil = $("#ms20_perfil");
    $ms20_persp1 = $("#ms20_persp1");
    $ms20_persp2 = $("#ms20_persp2");
    $imagesContainer = $("#imagesContainer");
    timeline;

    TweenLite.set($schematics, {scale:2, autoAlpha:0});
    TweenLite.set($schematics2, {autoAlpha:0});
    TweenLite.set($logoKorg, {autoAlpha:0});
    TweenLite.set($copy1, {autoAlpha:0});
    TweenLite.set($copy2, {autoAlpha:0});
    TweenLite.set($ms20_perfil, {x:-300, y:-100, scale:0.8});
    TweenLite.set($ms20_persp1, {x:-150, y:0, autoAlpha:0});
    TweenLite.set($ms20_persp2, {x:0, y:-58, autoAlpha:0});
    //TweenLite.set($imagesContainer, {x:0, y:0, autoAlpha:0});
    //TweenLite.set($schematics2,{scaleX:0.01, autoAlpha:0});

    createMasterTimeline();
}

function getIntroImage() {
    var tl = new TimelineLite();
    tl.to($schematics, 1.5, {scale:1, autoAlpha:1, ease:Back.easeInOut})
        .to($schematics, 0.3, {css:{rotationY:90, z:100, rotationX:20, alpha:0.3}, ease:Power1.easeIn})
        .fromTo($schematics2, 0.5, {css:{rotationY:-90, z:100, rotationX:20}}, {css:{rotationY:0, z:0, rotationX:0}, ease:Power1.easeOut})
        .to($schematics2, 1, {autoAlpha:1, ease:Power1.easeOut}, "-=0.5")
        .to($schematics2, 1, {autoAlpha:0, ease:Power1.easeOut, delay:0.5})
        .to(copy1, 2, {autoAlpha:1, textShadow:"1px 1px 1px rgba(255, 255, 255, 0.5)", color:"#000"}, "-=0.5")
        .to(copy2, 2, {autoAlpha:1, textShadow:"1px 1px 1px rgba(255, 255, 255, 0.5)", color:"#000"}, "-=1")
        .to($logoKorg, 1, {autoAlpha:1, ease:Power1.easeOut}, "-=1")
        .staggerTo([copy1, copy2], 0.5, {autoAlpha:0, ease:Power1.easeOut})

    //FLIP USANDO SCALEX
    /*.to($schematics, 0.2, {scaleX:0.01, autoAlpha:0, ease:Power1.easeIn})
     .to($schematics2, 0.2, {scaleX:1, autoAlpha:0.2, ease:Power1.easeOut})
     .to($schematics2, 2, {autoAlpha:1, ease:Power1.easeOut})*/
    /*.from($stunning, 0.2, {top:-60}, "+=0.1") //added 0.1 seconds after current end of timeline
     .from($animations, 0.4, {top:400, ease:Power2.easeIn})
     .to($slide1, 0.3, {rotation:-90, left:-125, top:26}, "rotateOut") //creates a label called "rotateOut" at current end of timeline and places tween there
     .to($stunning, 0.2, {left:-300}, "rotateOut") //adds tween at "rotateOut" label
     .to($animations, 0.2, {left:30}, "+=0.2")
     .to($animations, 0.2, {left:122}, "for") //label marks the start of the reveal of the word "for"
     .to($for, 0.2, {autoAlpha:1}, "for")
     .add("introOut", "+=0.7")
     .to($for, 0.2, {autoAlpha:0, left:300}, "introOut")
     .to($animations, 0.2, {autoAlpha:0, top:"-=300px"}, "introOut")*/
    return tl;

}

function synthReel() {
    var tl = new TimelineLite();
    tl.to($ms20_perfil, 0.5, {x:0, y:0, scale:1, ease:Power1.easeIn})
        .to($ms20_perfil, 0.5, {x:-350, y:-150, scale:1.5, autoAlpha:0, ease:Power1.easeOut, delay:2})
        .to($ms20_persp1, 0.25, {autoAlpha:1, ease:Power1.easeIn})
        .to($ms20_persp1, 1, {x:0, y:-50, autoAlpha:1, ease:Power1.easeOut}, "-=0.25")
        .to($ms20_persp1, 0.25, {autoAlpha:0, ease:Power1.easeOut, delay:1})
        .to($ms20_persp2, 0.25, {autoAlpha:1, ease:Power1.easeIn}, "-=0.25")
        .to($ms20_persp2, 1, {x:-178, y:-58, autoAlpha:1, ease:Power1.easeOut}, "-=0.25")
        .to($ms20_persp2, 0.25, {autoAlpha:0, ease:Power1.easeOut, delay:1, onComplete:loadFastForward})
    return tl;
}

function loadFastForward() {
    var container = document.getElementById('imagesContainer');
    //var container = document.getElementById('imagesContainer');
// houses the dynamically loaded images
    var images = new Array();
// list of the images that will be loaded dynamically
    var imageFiles = new Array(
        'img/knob1.jpg',
        'img/knob2.jpg',
        'img/knob1.jpg',
        'img/knob2.jpg',
        'img/knob3.jpg',
        'img/knobsx4.jpg',
        'img/schem2.jpg',
        'img/MS20_solo.png',
        'img/ms20_pan.jpg',
        'img/knobs_cable.jpg',
        'img/MS20_cable.png'
    );
// max images from the array of image file names
    maxImages = imageFiles.length;
// the image count, to track where we are in the images array
    var imageCount = 0;
// the frames per second
    var fps = 10;
// the interval calculated to the proper ms delay based on fps
    var interval = Math.round(1000 / fps);
//var i;
    var img = null;
    numImagesSeen = 0;

    for (var i = 0; i < maxImages; i++) {
        // new image created, overwrites previous image within the for loop
        img = new Image();
        // set the src attribute path to the image file names in the for loop
        img.src = imageFiles[i];
        img.onload = imagesLoaded;

        // if last array index, set onload complete handler
        if (i == (maxImages - 1)) {
            fastForward();
        }
        // store the image object to the images array
        images.push(img);
    }
    // this essentially starts our loaded sequence for the first time and sets the first image
    function imagesLoaded(evt){
        container.appendChild(images[imageCount]);
        imageCount++;
        //startTimeout();
    }
    // wrapper for the interval timeout so we only declare once here
    function startTimeout(){
        //       setTimeout('nextImage()', interval);
        setTimeout(function(){
            container.removeChild(container.firstChild);
            imageCount++;
            if(imageCount == (maxImages - 1)){
                //imageCount = 0;
                return;
            } else {
                container.appendChild(images[imageCount]);
                startTimeout();
            }
        }, interval, this);
    }
}

//function fastForward() {
//    if (numImagesSeen == 0){
//        TweenMax.to($imagesContainer, 0, {autoAlpha:1});
//        TweenMax.to($imagesContainer, 0, {y:"-=250", delay:0.25, onComplete:function(){numImagesSeen++;fastForward()}});
//    } else if (numImagesSeen < maxImages-1){
//        TweenMax.to($imagesContainer, 0, {y:"-=250", delay:0.25, onComplete:function(){numImagesSeen++;fastForward()}});
//    } else {
//        TweenMax.to($imagesContainer, 0, {autoAlpha:0});
//    }
//    console.log("numImagesSeen "+numImagesSeen);
//}
//you build these functions into your objects (classes, MovieClips, whatever):
function animateIn(){
    var tl = new TimelineLite();
    tl.append( new TweenMax(this, 1, {y:0, autoAlpha:1}) );
    return tl;
    console.log (this + " in");
}

function animateOut() {
    var tl = new TimelineLite();
    tl.append( new TweenMax(this, 1, {y:0, autoAlpha:0}) );
    return tl;
    console.log (this + " out");
}

function fastForward(){
    var tl = new TimelineLite();
    //TweenLite.to ($imagesContainer, 0, {autoAlpha:1});
    console.log (this + " loop");
    $imagesContainer.children().each(function(){
        TweenLite.to(this, 0, {autoAlpha:0});
        tl.append( this.animateIn() );
        tl.append( this.animateOut() );
    })
    return tl;
}

function createMasterTimeline() {
    timeline = new TimelineLite();
    timeline.set($banner, {autoAlpha:1})
        //.add(getIntroImage())//add the first animation at a time of 0.3 seconds
        .add(synthReel())
    // .add(fastForward());  //add the first animation at a time of 0.3 seconds
    /*.add("devices", "-=0.1") //add "devices" label just 0.1 seconds before the end of the previous animation for a bit of overlap
     .add(getDevicesTimeline(), "devices") //add the second animation and the "devices" label
     .add("tabletAnimation", "+=0.4")
     .add(getTabletAnimation(), "tabletAnimation");*/
    timeline.timeScale(4);// put a 4 in there, I dare you ;)


}

function imWorking() {
    console.log("im working");
}
$(document).ready(function () {

    // Handler for .ready() called.

    //imWorking();
    initCSS();

});