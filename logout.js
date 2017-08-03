// Name: Desai, Rutvik
// Class Account#: jadrn010
// Project #1

$(document).ready(function() {
    window.onpopstate = function() {
        window.location.href = "http://jadran.sdsu.edu/~jadrn010/proj1/index.html";
    };
    history.pushState({}, '');
});