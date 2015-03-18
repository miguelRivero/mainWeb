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
    $logoKorg50,
    $copy1,
    $copy2,
    $copy3,
    $ms20_perfil,
    $ms20_persp1,
    $ms20_persp2,
    $imagesContainer,
    timeline;

function initCSS() {
    $banner = $("#banner");
    $schematics = $("#schematics img");
    $schematics2 = $("#schematics2 img");
    $logoKorg = $("#logoKorg");
    $logoKorg50 = $("#logoKorg50");
    $copy1 = $("#copy1");
    $copy2 = $("#copy2");
    $copy3 = $("#copy3");
    $ms20_perfil = $("#ms20_perfil");
    $ms20_persp1 = $("#ms20_persp1");
    $ms20_persp2 = $("#ms20_persp2");
    $imagesContainer = $("#imagesContainer");
    timeline;

    TweenLite.set($schematics, {scale:2, autoAlpha:0});
    TweenLite.set($schematics2, {autoAlpha:0});
    TweenLite.set($logoKorg, {autoAlpha:0});
    TweenLite.set($logoKorg50, {autoAlpha:0});
    TweenLite.set($copy1, {autoAlpha:0});
    TweenLite.set($copy2, {autoAlpha:0});
    TweenLite.set($copy3, {autoAlpha:0});
    TweenLite.set($ms20_perfil, {x:-300, y:-100, scale:0.8});
    TweenLite.set($ms20_persp1, {x:-150, y:0, autoAlpha:0});
    TweenLite.set($ms20_persp2, {x:0, y:-58, autoAlpha:0});

    createMasterTimeline1();
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
        .to($ms20_persp2, 0.25, {autoAlpha:0, ease:Power1.easeOut, delay:1, onComplete:imgFastForward})
    return tl;
}

function imgFastForward() {
    var $imgWrap	= $('.images'),
        $images		= $imgWrap.find('img'),
        $currImg	= $images.eq(0),
        $currX      = ( 300 -  $images.eq(0).width() ) *0.5,
        $currY      = ( 250 -  $images.eq(0).height() ) *0.5,
        index		= 0,
        numImgs		= $images.length,
        fadeDur		= 300,

        loop = setInterval(function() {
                    var tl = new TimelineLite({
                        onComplete: function() {
                            index++;
                            $currImg = $images.eq(index);
                            $currX = ( 300 -  $images.eq(index).width() ) *0.5;
                            $currY = ( 250 -  $images.eq(index).height() ) *0.5;
                            if (index >= numImgs){
                                tl.to ( $images.eq(index-1), 2, {autoAlpha:0, ease:Power1.easeOut,
                                                                onComplete:function(){
                                                                    $images.eq(index-1).hide();
                                                                    tl.stop();
                                                                }});
                                //clearInterval(loop);
                                toGo();
                                //tl.stop();
                            }
                        }
                    });
                    tl.append(function() {
                        $images.eq(index-1).hide();
                        $images.eq(index).show();
                    });
                    tl.fromTo($images.eq(index), 0.05, {x:$currX, y:$currY,autoAlpha: 0},{x:$currX, y:$currY, autoAlpha: 1, ease:Power4.easeOut});
                }, fadeDur);

    $images.eq(index).show();
    index++;

    function toGo(){
        window.clearInterval(loop);
        finalSeq();
        console.log("toGo");
    }
}

function finalSeq() {
    var tl = new TimelineLite();
        tl.to($copy3, 1, {autoAlpha:1, textShadow:"2px 2px 1px rgba(255, 255, 255, 0.8)", color:"#000"})
            .to( $copy3, 1, {autoAlpha:0, ease:Power1.easeOut, delay:1})
            //.staggerTo([$logoKorg, $copy3], 1, {autoAlpha:0, ease:Power1.easeOut, delay:1})
            .to($logoKorg50, 2, {autoAlpha:1, ease:Power1.easeOut}, "-=1");
   }

function createMasterTimeline1() {
    timeline = new TimelineLite();
    timeline.set($banner, {autoAlpha:1})
        .add(getIntroImage())//add the first animation at a time of 0.3 seconds
        .add(synthReel())
    timeline.timeScale(8);// put a 4 in there, I dare you ;)
}

$(document).ready(function () {
    initCSS();
});