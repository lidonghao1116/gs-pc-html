var video={

    init:function(){
        var video = $('#video');
        $('.videoContainer')
            .on('click', function() {
                $('#init').remove();
                $('.btnPlay').addClass('paused');
                $(this).unbind('click');
                video[0].play();
            });

        video.on('click', function() { playpause(); } );
        $('.btnPlay').on('click', function() { playpause(); } );
        var playpause = function() {
            if(video[0].paused || video[0].ended) {
                $('.btnPlay').addClass('paused');
                video[0].play();
            }
            else {
                $('.btnPlay').removeClass('paused');
                video[0].pause();
            }
        };

    }
}