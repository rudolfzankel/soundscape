
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
var rightAnswerList = [], tryingTime = 0;




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
            //birdPlayer.play();
        }, 19000);

        setTimeout(function () {
            //narratorPlayer.play();

            $("#narrator-soundPlayer").attr("src", 'sounds/narration%202.wav');
            narratorPlayer.load();
            narratorPlayer.play();
            $('#next-btn').show();
            setTimeout(function () {

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
});

/*
$('.card').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('flipped');
});*/



$('#value-input').keydown(function (event) {
    if (event.keyCode == 13) {
        var input_value = $(this).val();
        tryingTime++;
        if($.inArray(input_value, rightAnswerList) > -1){
            celebrate();
        }else{
            wrongAnswer();
        }

        console.log(input_value);
        $(this).val('');


        //effectPlayer.play();
        //$survey.remove();
    }
});

function celebrate(){
    effectPlayer.src = "sounds/correct.wav";
    effectPlayer.load();
    effectPlayer.play();
    console.log(tryingTime);


    $('.try-number-message').html('<p class="try-number-message">It took you '+ tryingTime +' tries to guess the right answer.</p>');


    $('#success-message').modal();
    setTimeout(function () {
        $('#success-message').modal('hide');
    },3000);

    tryingTime = 0;
}
function wrongAnswer(){
    effectPlayer.src = "sounds/error.wav";
    effectPlayer.load();
    effectPlayer.play();
}

function playNextNarrator(){

    narratorPlayer.src = "sounds/" + narratorPlayList[curPlaying];
    //Loads the audio song
    narratorPlayer.load();
    //Plays the audio song
    narratorPlayer.play();

    curPlaying++;

}


function playNarrator(link){

    narratorPlayer.src = "sounds/" + link;
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

$('.next-sequence3').on('click', function(e){
    e.preventDefault();
    $('#help-confirm').modal('hide');

    initializeForSequence3();
});


function initializeForSequence2() {

    playNextNarrator();
    $('.next-sequence').hide();
    setTimeout(function(){
        $('.first-page').hide();
        $('.second-page').show();
    },2000);
    setTimeout(function () {
        //$('.second-page-content').css('background-image', 'url("images/BACKGROUND BIRDS.JPG")');
        setTimeout(function () {
            
            playNextNarrator();

            setTimeout(function () {

                playNextNarrator();
                setTimeout(function () {

                    $('.second-page-content').css('background-image', 'url("images/BACKGROUND BIRDS b&w.jpg")');

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



function initializeForSequence3() {

    $('.card').flip();

    $('.rule-box').hide();
    $('#survey').hide();

    $('.second-page').hide();

    $('.first-page').show();

    $('.cards-container').show();


    playNarrator('Narration Sound 6.wav');

    setTimeout(function(){
        playNarrator('narration sound 7.wav');
        setTimeout(function(){
            birdPlayer.src = "sounds/hoopoe final.wav";
            birdPlayer.load();
            birdPlayer.loop = true;
            birdPlayer.play();

            rightAnswerList = ['Hoopoe', 'hoopoe', 'the hoopoe'];
            tryingTime = 0;
        }, 3000);


        setTimeout(function(){

            setTimeout(function(){
                birdPlayer.pause();
                playNarrator('Narrator Sound 8.wav');
                setTimeout(function(){
                    $('#try-confirm-message').modal();
                    setTimeout(function(){
                        $('#try-confirm-message').modal('hide');
                    },3000);
                },2000);


                setTimeout(function(){

                    playNarrator('narration sound 7.5.wav');

                    setTimeout(function(){
                        birdPlayer.src = "sounds/wren final.wav";
                        birdPlayer.load();
                        birdPlayer.loop = true;
                        birdPlayer.play();

                        rightAnswerList = ['Wren', 'wren', 'the wren', 'The wren'];
                        tryingTime = 0;
                    }, 3500);



                    setTimeout(function(){

                        setTimeout(function(){
                            birdPlayer.pause();
                            playNarrator('Narrator Sound 8.wav');
                            setTimeout(function(){
                                setTimeout(function(){
                                    $('#try-confirm-message').modal('hide');
                                },3000);
                            },2000);
                        }, 2000);


                        setTimeout(function(){
                            playNarrator('narration sound 7.5.wav');
                            setTimeout(function(){
                                birdPlayer.src = "sounds/jay final.wav";
                                birdPlayer.load();
                                birdPlayer.loop = true;
                                birdPlayer.play();

                                rightAnswerList = ['Jay', 'jay', 'the jay', 'The jay'];
                                tryingTime = 0;
                            }, 3500);



                            setTimeout(function(){
                                setTimeout(function(){
                                    birdPlayer.pause();
                                    playNarrator('Narrator Sound 8.wav');
                                    setTimeout(function(){
                                        $('#try-confirm-message').modal();
                                        setTimeout(function(){
                                            $('#try-confirm-message').modal('hide');
                                        },3000);
                                    },2000);
                                }, 5000);
                                setTimeout(function(){

                                    playNarrator('narration sound 7.5.wav');
                                    setTimeout(function(){
                                        birdPlayer.src = "sounds/Blackbird final.wav";
                                        birdPlayer.load();
                                        birdPlayer.loop = true;
                                        birdPlayer.play();

                                        rightAnswerList = ['blackbird', 'Blackbird', 'the Blackbird', 'the blackbird'];
                                        tryingTime = 0;
                                    }, 3500);

                                }, 10000);
                            }, 20000);


                        }, 10000);
                    }, 20000);


                }, 5000);
            }, 3000);

        }, 33000);

    }, 11000)

}