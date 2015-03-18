
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"document","compositionReady",function(sym,e){sym.$("stage").css({"margin-left":"auto","margin-right":"auto","margin-top":"25px"});sym.$("stage").css({"border-style":"solid","border-width":"1px"});var youtubevid=$("<iframe/>");sym.$("vcontainer").append(youtubevid);youtubevid.attr('type','text/html');youtubevid.attr('width','300');youtubevid.attr('height','168');youtubevid.attr('src','http://www.youtube.com/embed/KoQN3AWNrGI');youtubevid.attr('frameborder','0');youtubevid.attr('allowfullscreen','0');});
//Edge binding end
})("stage");
//Edge symbol end:'stage'
})(jQuery,AdobeEdge,"EDGE-18389911");