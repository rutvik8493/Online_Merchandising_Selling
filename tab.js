// Name: Desai, Rutvik
// Class Account#: jadrn010
// Project #1

$(document).ready(function() {
    $(".tabs").tabs();
    $('ul.tab_link li').click(function() {

        var tab_id = $(this).attr('href');

        $('ul.tab_link li').removeClass('active');
        $('.tab_content').removeClass('active');

        $(this).addClass('active');
        $("#" + tab_id).addClass('active');
    })
});