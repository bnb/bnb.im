jQuery.fn.extend({backspace:function(e,t){var n;return n=jQuery.extend({callback:function(){},keypress:function(){},t:100,e:.04},t),this.each(function(){var t;return t=this,jQuery(t).queue(function(){var r,u;return r=t.tagName==="input".toUpperCase()||t.tagName==="textarea".toUpperCase()?"value":"innerHTML",(u=function(e){e?(t[r]=t[r].slice(0,-1),n.keypress.call(t),setTimeout(function(){return u(e-1)},Math.random()*n.t)):(n.callback.call(t),jQuery(t).dequeue())})(e)})})},typetype:function(e,t){var n,r;return r=jQuery.extend({callback:function(){},keypress:function(){},t:100,e:.04},t),n=function(t){return Math.random()*r.t*(e[t-1]===e[t]?1.6:"."===e[t-1]?12:"!"===e[t-1]?12:"?"===e[t-1]?12:"\n"===e[t-1]?12:","===e[t-1]?8:";"===e[t-1]?8:":"===e[t-1]?8:" "===e[t-1]?3:2)},this.each(function(){var t;return t=this,jQuery(t).queue(function(){var u,a,c,i;return a=t.tagName==="input".toUpperCase()||t.tagName==="textarea".toUpperCase()?"value":"innerHTML",u=function(e,n){e?(t[a]+=e[0],r.keypress.call(t),setTimeout(function(){return u(e.slice(1),n)},r.t)):n()},c=function(e,n){e?(t[a]=t[a].slice(0,-1),r.keypress.call(t),setTimeout(function(){return c(e-1,n)},r.t)):n()},(i=function(o){var s,l;e.length>=o?(s=function(){return setTimeout(function(){return i(o)},n(o))},l=Math.random()/r.e,.3>l&&e[o-1]!==e[o]&&e.length>o+4?u(e.slice(o,o+4),function(){return c(4,s)}):.7>l&&o>1&&/[A-Z]/.test(e[o-2]&&e.length>o+4)?u(e[o-1].toUpperCase()+e.slice(o,o+4),function(){return c(5,s)}):.5>l&&e[o-1]!==e[o]&&e.length>o?u(e[o],function(){return c(1,s)}):1>l&&e[o-1]!==e[o]&&e.length>o?u(e[o]+e[o-1],function(){return c(2,s)}):.5>l&&/[A-Z]/.test(e[o])?u(e[o].toLowerCase(),function(){return c(1,s)}):(t[a]+=e[o-1],r.keypress.call(t),setTimeout(function(){return i(o+1)},n(o)))):(r.callback.call(t),jQuery(t).dequeue())})(1)})})}}); //Momentjs

// Header typing

var helloThere = "Hello there.";
var iAm = "I am &!";
var AKA = "Which is synonymous with bnb, bang, bitnb, bitandbang, and Tierney Coren.";
var aboutYou = "I'm a student, a web designer, a web developer, and a writer.";

$('h1.hello')
    .typetype(helloThere, { e: 0.04, t: 100,})
    .delay(1500)
    .backspace(
        helloThere.length, {
            t: 75,
            callback: function() {
                $('h1.hello')
                    .delay(1000)
                    .typetype(iAm, {
                        e: 0.04,
                        t: 100,
                        callback: function() {
                            $('.intro a.hidden')
                                .animate({
                                    opacity: 1
                                },
                                {
                                    queue: false,
                                    complete: function() {
                                         $('.intro a.hidden').removeClass("hidden");
                                    }
                                });
                            $('.subtitle')
                                .delay(1000)
                                .typetype(AKA, {
                                    e: 0.04,
                                    t: 100,
                                    callback: function() {
                                        $('.introAbout')
                                            .delay(2000)
                                            .typetype(aboutYou, {
                                                e: 0.04,
                                                t: 100,
                                                callback: function() {
                                                            console.log("That's all, Folks!");
                                                }
                                            });
                                    }
                                });
                        }
                });
            }
        }
    );
