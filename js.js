var chars = "berw";

$(document).ready(function(){

    $('#button').click(function(){

        var inputValue = $('#text').val();

        if(inputValue){

            hideInputContainer();

            setBlackBeckground();

            createVideoQuery(inputValue);

        }
    });

    var video1Active = false;

    var numOfChar = 0;

    function createVideoQuery (string) {

        var playQuery = string.split('');

        startQuery(playQuery);

    }

    function startQuery (query) {

        var video1 = $('#video1');

        var video2 = $('#video2');

        video1[0].addEventListener('timeupdate', nextVideo, false);

        video2[0].addEventListener('timeupdate', nextVideo, false);

        video1[0].addEventListener('ended', decremNumOfChar, false);

        video2[0].addEventListener('ended', decremNumOfChar, false);


        function nextVideo () {

            //console.log(numOfChar);

            if(video1Active){

                if((video1[0].currentTime / (video1[0].duration / 100)) > 70){
                    if(numOfChar + 1 < query.length){
                        setVideo(numOfChar + 1, query);
                    }
                }

                if((video1[0].currentTime / (video1[0].duration / 100)) > 90){

                    if(numOfChar + 1 < query.length){

                        showVideo2();
                        video2[0].play();
                        v1ToV2();
                    }
                    else{
                        video1[0].removeEventListener('timeupdate', nextVideo, false);

                        video2[0].removeEventListener('timeupdate', nextVideo, false);

                        resetView()
                    }
                }
            }
            else{

                if((video2[0].currentTime / (video2[0].duration / 100)) > 70){
                    if(numOfChar + 1 < query.length){
                        setVideo(numOfChar + 1, query);
                    }
                }

                if((video2[0].currentTime / (video2[0].duration / 100)) > 90){

                    if(numOfChar + 1 < query.length){

                        showVideo1();
                        video1[0].play();
                        v2ToV1();

                    }
                    else{
                        video1[0].removeEventListener('timeupdate', nextVideo, false);

                        video2[0].removeEventListener('timeupdate', nextVideo, false);

                        resetView()
                    }
                }
            }
        }

        playFirst(numOfChar, query);

    }

    function decremNumOfChar () {
        numOfChar += 1;
        //console.log('decr')
    }

    function playFirst (num, query) {
        var vid1 = $('#video1');

        if(chars.includes(query[num])){

            switch (query[num]) {
                case '#':
                    vid1.attr('src', 'video/grid.mov');
                    break;

                case '/':
                    vid1.attr('src', 'video/slash.mov');
                    break;

                case '.':
                    vid1.attr('src', 'video/dot.mov');
                    break;

                case ' ':
                    vid1.attr('src', 'video/space.mov');
                    break;

                default :
                    vid1.attr('src', 'video/' + query[num] + '.mov');
                    break
            }

            vid1.one('canplay', function () {
                showVideo1();
                vid1[0].play();
            });
        }
        else{

            vid1.attr('src', 'video/notexist.mov');

            vid1.one('canplay', function () {
                showVideo1();
                vid1[0].play();
            });
        }

        video1Active = true;
    }

    function setVideo (num, query) {

        var vid1 = $('#video1');

        var vid2 = $('#video2');

        if(!video1Active) {

            if(chars.includes(query[num])){

                switch (query[num]) {
                    case '#':
                        vid1.attr('src', 'video/grid.mov');
                        break;

                    case '/':
                        vid1.attr('src', 'video/slash.mov');
                        break;

                    case '.':
                        vid1.attr('src', 'video/dot.mov');
                        break;

                    case ' ':
                        vid1.attr('src', 'video/space.mov');
                        break;

                    default :
                        vid1.attr('src', 'video/' + query[num] + '.mov');
                        break
                }
            }
            else{

                vid1.attr('src', 'video/notexist.mov');
            }

        }
        else{

            if(chars.includes(query[num])){

                switch (query[num]) {
                    case '#':
                        vid2.attr('src', 'video/grid.mov');
                        break;

                    case '/':
                        vid2.attr('src', 'video/slash.mov');
                        break;

                    case '.':
                        vid2.attr('src', 'video/dot.mov');
                        break;

                    case ' ':
                        vid2.attr('src', 'video/space.mov');
                        break;

                    default :
                        vid2.attr('src', 'video/' + query[num] + '.mov');
                        break
                }
            }
            else{

                vid2.attr('src', 'video/notexist.mov');
            }
        }

    }

    function resetView () {

        //console.log('reset');

        $('#video1')[0].removeEventListener('ended', decremNumOfChar, false);

        $('#video2')[0].removeEventListener('ended', decremNumOfChar, false);

        resetInput();
        showInputContainer();
        hideVideo();
        setGreenBeckground();
        resetOpacity();
        numOfChar = 0;
        document.getElementById("text").focus();
    }

    function hideInputContainer () {
        $('#inputContainer').hide()
    }

    function showInputContainer () {
        $('#inputContainer').show()
    }

    function resetInput () {
        $('#text').val('');

    }

    function hideVideo () {
        $('.video').css('display', 'none');
    }

    function showVideo () {
        $('.video').css('opacity', 1)
    }

    function setBlackBeckground () {
        $('#mainCont').css('background-color', '#000000')
    }

    function setGreenBeckground () {
        $('#mainCont').css('background-color', '#39FF14')
    }

    function hideVideo1 () {
        $('#video1').css('display', 'none');
    }

    function showVideo1 () {
        $('#video1').css('display', 'block');
    }

    function hideVideo2 () {
        $('#video2').css('display', 'none');
    }

    function showVideo2 () {
        $('#video2').css('display', 'block');
    }

    function v1ToV2 () {
        video1Active = false;
        $('#video1').transition({ opacity: 0 }, 200);
        $('#video2').transition({ opacity: 1 }, 200);
    }

    function v2ToV1 () {
        video1Active = true;
        $('#video2').transition({ opacity: 0 }, 200);
        $('#video1').transition({ opacity: 1 }, 200);
    }

    function resetOpacity () {
        $('#video1').css('opacity', 1);
        $('#video2').css('opacity', 0);
    }

});

/*$(document).ready(function(){

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

        setBlackBeckground()
    }

    function hideInputContainer () {
        $('#inputContainer').hide()
    }

    function showInputContainer () {
        $('#inputContainer').show()
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

});*/

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
