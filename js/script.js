
var surveyVar = {	title: 'Survey',
    name: 'survey',
    pages: [
        {
            name: 'survey',
            title: 'Survey',
            elements: [
                {
                    name: "question",
                    type: 'radio',
                    label: "How do these sounds make you feel?",
                    options: [
                        {
                            value: 'a) Sad',
                            key: 'a'
                        },
                        {
                            value: 'b) Nervous',
                            key: 'b'
                        },
                        {
                            value: 'c) No Answer',
                            key: 'c'
                        },
                        {
                            value: 'd) Relaxed',
                            key: 'd'
                        },
                        {
                            value: 'e) Happy',
                            key: 'e'
                        }
                    ],
                    required: true
                }
            ],
            options: [
                {
                    type: 'nextPage',
                    caption: 'Submit'
                }
            ]
        },
        {
            name: "thanks",
            elements: [
                {
                    type: 'handlebars',
                    source: 'thanks for your help.</p>'
                }
            ]
        }
    ]};

var narratorPlayer = document.getElementById("narrator-soundPlayer"), birdPlayer = document.getElementById("bird-soundPlayer"), effectPlayer = document.getElementById("effect-soundPlayer");
var narratorPlayList=["Narrator Sound 3.wav", "Narrator Sound 4.wav", "Narration Sound 5.wav", "Letter 1 narration.wav"], curPlaying = 0;

function initializeForSequence1() {
    var $survey = $('#survey');

    narratorPlayer.play();      //seq1

    setTimeout(function () {
        birdPlayer.loop = true;
        birdPlayer.volume = 0.3;
        birdPlayer.play();

        setTimeout(function () {

            $survey.survey({
                survey: surveyVar
            });

        }, 15000);

        setTimeout(function () {
            birdPlayer.volume = 0.4;
            narratorPlayer.pause();
            //birdPlayer.play();
        }, 19000);

        setTimeout(function () {
            //narratorPlayer.play();

            $("#narrator-soundPlayer").attr("src", 'sounds/narration%202.wav');
            narratorPlayer.load();
            narratorPlayer.play();
            $('#next-btn').show();
            setTimeout(function () {
                narratorPlayer.pause();
            }, 3000);

        }, 50000);

    }, 24000);


    setTimeout(function () {
        $('.rule-box').show();
    }, 27000);
}


$('#preliminary-survey input.submitSurvey').on('click', function (e) {
    e.preventDefault();
    $('#preliminary-survey').hide();
     initializeForSequence1();
    //initializeForSequence2();
});



$('#value-input').keydown(function (event) {
    if (event.keyCode == 13) {
        var input_value = $(this).val();
        console.log(input_value);
        $(this).val('');
        effectPlayer.play();
        //$survey.remove();
    }
});



function playNextNarrator(){

    narratorPlayer.src = "sounds/" + narratorPlayList[curPlaying];
    //Loads the audio song
    narratorPlayer.load();
    //Plays the audio song
    narratorPlayer.play();

    curPlaying++;

}

$('.next-sequence').on('click', function(e){
    e.preventDefault();
    initializeForSequence2();
});


$('.open-letter').on('click', function(e){
    e.preventDefault();
    $('#letter-confirm').modal('hide');
    effectPlayer.src = "sounds/letter fx.wav";
    effectPlayer.load();
    effectPlayer.play();
    setTimeout(function () {
        playNextNarrator();
        $('.letter-container').show();
        setTimeout(function () {
            $('.letter-container').hide();
            $('#help-confirm').modal();
        },16000);
    },500);

});


function initializeForSequence2() {

    playNextNarrator();
    $('.next-sequence').hide();
    setTimeout(function(){
        $('.first-page').hide();
    },2000);
    setTimeout(function () {   
        $('.second-page').show();
        $('.second-page').css('background-image', 'url("images/BACKGROUND BIRDS.JPG")');
        setTimeout(function () {
            
            playNextNarrator();

            setTimeout(function () {
                
                playNextNarrator();
                setTimeout(function () {
                    birdPlayer.pause();
                    $('.second-page-content').css('background-image', 'url("images/BACKGROUND BIRDS b&w.jpg")');
                    $('.birds-bubbles-container').hide();
                    birdPlayer.src = "sounds/ghostown fx.wav";
                    birdPlayer.load();
                    birdPlayer.loop = true;
                    birdPlayer.play();

                    setTimeout(function(){
                        $('#letter-confirm').modal();
                    }, 16000)
                },4000);
            },4000);
        },1000);

    }, 3000);

}