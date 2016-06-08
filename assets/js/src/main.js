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
