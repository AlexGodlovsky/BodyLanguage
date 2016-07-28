var chars = "berw";

$(document).ready(function(){

    $('#button').click(function(){

        var inputValue = $('#text').val();

        if(inputValue){

            hideInputContainer();

            createVideoQuery(inputValue);

        }
    });

    function createVideoQuery (string) {

        var playQuery = string.split('');

        startQuery(playQuery);

    }

    function startQuery (query) {

        var numOfChar = 0;

        setVideo(numOfChar, query);

        $('#video')[0].addEventListener('ended', nextVideo, false);

        showVideo();

        function nextVideo () {

            numOfChar += 1;

            if(numOfChar < query.length){
                setVideo(numOfChar, query);
            }
            else{
                $('#video')[0].removeEventListener('ended', nextVideo, false);
                resetView()
            }
        }
    }

    function resetView () {

        resetInput();
        showInputContainer();
        hideVideo();
        setGreenBeckground();
    }

    function setVideo (num, query) {

        if(chars.includes(query[num])){

            switch (query[num]) {
                case '#':
                    $('#video').attr('src', 'video/grid.mov');
                    break;

                case '/':
                    $('#video').attr('src', 'video/slash.mov');
                    break;

                case '.':
                    $('#video').attr('src', 'video/dot.mov');
                    break;

                case ' ':
                    $('#video').attr('src', 'video/space.mov');
                    break;

                default :
                    $('#video').attr('src', 'video/' + query[num] + '.mov');
                    break
            }

            $('#video')[0].play();
        }
        else{
            $('#video').attr('src', 'video/notexist.mov');

            $('#video')[0].play();
        }

        console.log($('#video').attr('src'))

        /*$('#video').attr('src', 'video/' + query[num] + '.mov');

        $('#video')[0].play();*/

        setBlackBeckground()
    }

    function hideInputContainer () {
        var container = $('#inputContainer').hide()
    }

    function showInputContainer () {
        var container = $('#inputContainer').show()
    }

    function resetInput () {
        $('#text').val('')

    }

    function hideVideo () {
        $('#video').hide()
    }

    function showVideo () {
        $('#video').show()
    }

    function setBlackBeckground () {
        $('#mainCont').css('background-color', '#000000')
    }

    function setGreenBeckground () {
        $('#mainCont').css('background-color', '#39FF14')
    }

});

    //  Set vertical align
$(function(){

    setMainContainerHeight();
    setInputContainerAlign();
    setVideoAlign();

    function setMainContainerHeight () {
        $('#mainCont').height(window.innerHeight);
    }

    function setInputContainerAlign () {
        var windowHeight = window.innerHeight;
        var inputContHeight = $('#inputContainer').height();

        $('#inputContainer').css('margin-top', (windowHeight - inputContHeight) / 2);
    }

    function setVideoAlign () {
        var video = $('#video');
        var windowHeight = window.innerHeight;
        var videoContHeight =video.height();

        video.css('margin-top', (windowHeight - videoContHeight) / 2)
    }

    $(window).resize(function(){
        setMainContainerHeight();
        setInputContainerAlign();
        setVideoAlign();
    })
});
