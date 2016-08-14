var surveyVar = {	title: 'survey',
    name: 'survey',
    pages: [
        {
            name: 'survey',
            title: 'survey',
            elements: [
                {
                    name: "question",
                    type: 'radio',
                    label: "How does this sound make you feel?",
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
                    ]
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

var surveyVar1 = {	title: 'survey',
    name: 'survey',
    pages: [
        {
            name: 'survey',
            title: 'survey',
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
                    ]
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
var rightAnswerList = [], tryingTime = 0, firstUserInputing =0, birdIndex = 0, letterConfirm1=0, letterConfirm2=0, letterConfirm3=0;




function initializeForSequence1() {
    firstUserInputing = 1;
    var $survey = $('#survey');

    narratorPlayer.play();      //seq1

    setTimeout(function () {
        birdPlayer.loop = true;
        birdPlayer.volume = 0.3;
        birdPlayer.play();

        setTimeout(function () {

            $survey.survey({
                survey: surveyVar1
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

        if(firstUserInputing){
            effectPlayer.play();
        }else{
            tryingTime++;
            if($.inArray(input_value, rightAnswerList) > -1){
                birdPlayer.pause();
                rightAnswerList=[];


                // if(birdIndex == 0){
                    $('#survey').hide();
                    $('#survey').html('');
                // }else
                //     $('#survey'+(birdIndex-1)).hide();


                celebrate();
            }else{
                wrongAnswer();
            }
        }
        console.log(input_value);
        $(this).val('');


        //
        //$survey.remove();
    }
});

function celebrate(){
    effectPlayer.src = "sounds/correct.wav";
    effectPlayer.load();
    effectPlayer.play();

    narratorPlayer.pause();

    if(tryingTime == 1)
        $('.try-number-message').html('<p class="try-number-message">It took you 1 try to guess the right answer.</p>');
    else
        $('.try-number-message').html('<p class="try-number-message">It took you '+ tryingTime +' tries to guess the right answer.</p>');


    $('#success-message').modal();
    setTimeout(function () {
        $('#success-message').modal('hide');
        if(birdIndex == 7){
            playNarrator('Narrator Sound 10.wav');
            setTimeout(function() {
                birdPlayer.src = "sounds/allbirds final.mp3";
                birdPlayer.load();
                birdPlayer.loop = true;
                birdPlayer.play();
                setTimeout(function() {
                    $('#letter-confirm').modal({backdrop: 'static', keyboard: false});
                }, 9000);
            }, 500);
        }else if(birdIndex == 3){
            $('.cards-container-0').hide();
            $('.cards-container-1').show();
            playNarrator('Narrator Sound 9.wav');
            setTimeout(function() {
                playNarrator('Narrator Sound 8.wav');
                setTimeout(function() {
                    $('#try-confirm-message').modal({backdrop: 'static', keyboard: false});
                }, 1000);
            }, 7000);
        }else{
            playNarrator('Narrator Sound 8.wav');
            setTimeout(function() {
                $('#try-confirm-message').modal({backdrop: 'static', keyboard: false});
            }, 1000);
        }

    },5000);

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

letterConfirm1 = 1;
    birdPlayer.pause();
    $('#letter-confirm').modal('hide');
    if(birdIndex == 7){
        effectPlayer.src = "sounds/letter fx.wav";
        effectPlayer.load();
        effectPlayer.play();
        setTimeout(function () {

            $('.letter-container').attr('src', 'images/Letter 2.png');
            $('.first-page').hide();
            $('.next-sequence').hide();
            $('.second-page').show();
            $('.letter-container').show();

            playNarrator('Letter 2 narration.wav');

        },500);
    }else{
        effectPlayer.src = "sounds/letter fx.wav";
        effectPlayer.load();
        effectPlayer.play();
        setTimeout(function () {
            playNextNarrator();
            $('.letter-container').show();
            setTimeout(function () {
                $('.letter-container').hide();
                $('#help-confirm').modal({backdrop: 'static', keyboard: false});
            },16000);
        },500);
    }


});

$("#letter-confirm").on("hidden.bs.modal", function () {
    if(letterConfirm1 == 0) {
        setTimeout(function () {
            $('#letter-confirm').modal({backdrop: 'static', keyboard: false});
        }, 1500);
    }
});

$('.next-sequence3').on('click', function(e){
    e.preventDefault();
    $('#help-confirm').modal('hide');
    initializeForSequence3();
});


function initializeForSequence2() {
    firstUserInputing = 0;
    playNextNarrator();
    // setTimeout(function(){
    //     $('.first-page').hide();
    //     $('.second-page').show();
    // },2000);
    setTimeout(function () {
        //$('.second-page-content').css('background-image', 'url("images/BACKGROUND BIRDS.JPG")');
        // setTimeout(function () {

            playNextNarrator();

            setTimeout(function () {

                    $('.first-page').hide();
                    $('.next-sequence').hide();
                    $('.second-page').show();

                playNextNarrator();
                setTimeout(function () {

                    // $('.second-page-content').css('background-image', 'url("images/BACKGROUND BIRDS b&w.jpg")');

                    // $('.second-page').css('background-color', '#888888');

                    birdPlayer.src = "sounds/ghostown fx.wav";
                    birdPlayer.load();
                    birdPlayer.loop = true;
                    birdPlayer.play();

                    setTimeout(function(){
                        $('#letter-confirm').modal({backdrop: 'static', keyboard: false});
                    }, 4000)
                },3000);
            },3500);
        // },1000);

    }, 4000);

}



function initializeForSequence3() {

    $('.card').flip();

    $('.rule-box').hide();
    $('#survey').hide();

    $('.second-page').hide();

    $('.first-page').show();

    $('.cards-container-0').show();

    $('.rule-box').html('<p>Which one of the birds is making this sound? Make sure to use the rhyme on the back of the cards as clues. Click on the cards to flip them around.</p>');
    $('.rule-box').show();

    nextBird(0);
}

$('.next-bird').on('click', function(e){
    e.preventDefault();
    birdIndex++;
    tryingTime = 0;

    nextBird(birdIndex);

});

function nextBird(id){

    $('#survey').html('<div class="survey-form"></div>');
    $('#survey').show();

    setTimeout(function() {
        switch (id) {
            case 0:
                playNarrator('Narration Sound 6.wav');

                setTimeout(function () {
                    playNarrator('narration sound 7.wav');
                    setTimeout(function () {
                        birdPlayer.src = "sounds/hoopoe final.wav";
                        birdPlayer.load();
                        birdPlayer.loop = true;
                        birdPlayer.play();

                        rightAnswerList = ['Hoopoe', 'hoopoe', 'the hoopoe'];
                        tryingTime = 0;

                        setTimeout(function () {
                            $('.survey-form').survey({
                                survey: surveyVar
                            });
                        }, 32000);

                    }, 3000);
                }, 10000);

                break;
            case 1:

                playNarrator('narration sound 7.5.wav');

                setTimeout(function () {
                    birdPlayer.src = "sounds/wren final.wav";
                    birdPlayer.load();
                    birdPlayer.loop = true;
                    birdPlayer.play();

                    rightAnswerList = ['Wren', 'wren', 'the wren', 'The wren'];
                    tryingTime = 0;

                    setTimeout(function () {
                        $('.survey-form').survey({
                            survey: surveyVar
                        });
                    }, 15500);

                }, 3500);


                break;
            case 2:

                playNarrator('narration sound 7.5.wav');
                setTimeout(function () {
                    birdPlayer.src = "sounds/jay final.wav";
                    birdPlayer.load();
                    birdPlayer.loop = true;
                    birdPlayer.play();

                    rightAnswerList = ['Jay', 'jay', 'the jay', 'The jay'];
                    tryingTime = 0;

                    setTimeout(function () {
                        $('.survey-form').survey({
                            survey: surveyVar
                        });
                    }, 15500);


                }, 3500);

                break;
            case 3:
                playNarrator('narration sound 7.5.wav');
                setTimeout(function () {
                    birdPlayer.src = "sounds/Blackbird final.wav";
                    birdPlayer.load();
                    birdPlayer.loop = true;
                    birdPlayer.play();

                    rightAnswerList = ['blackbird', 'Blackbird', 'the Blackbird', 'the blackbird'];
                    tryingTime = 0;

                    setTimeout(function () {
                        $('.survey-form').survey({
                            survey: surveyVar
                        });
                    }, 15500);

                }, 3500);

                break;
            case 4:

                playNarrator('narration sound 7.5.wav');
                setTimeout(function () {
                    birdPlayer.src = "sounds/greenfinch final.wav";
                    birdPlayer.load();
                    birdPlayer.loop = true;
                    birdPlayer.play();

                    rightAnswerList = ['greenfinch', 'Greenfinch', 'the Greenfinch', 'the greenfinch'];
                    tryingTime = 0;

                    setTimeout(function () {
                        $('.survey-form').survey({
                            survey: surveyVar
                        });
                    }, 15500);

                }, 3500);


                break;
            case 5:
                playNarrator('narration sound 7.5.wav');
                setTimeout(function () {
                    birdPlayer.src = "sounds/cuckoo final.wav";
                    birdPlayer.load();
                    birdPlayer.loop = true;
                    birdPlayer.play();

                    rightAnswerList = ['cuckoo', 'Cuckoo', 'the Cuckoo', 'the cuckoo'];
                    tryingTime = 0;

                    setTimeout(function () {
                        $('.survey-form').survey({
                            survey: surveyVar
                        });
                    }, 15500);

                }, 3500);


                break;
            case 6:

                playNarrator('narration sound 7.5.wav');
                setTimeout(function () {
                    birdPlayer.src = "sounds/Chukar final.wav";
                    birdPlayer.load();
                    birdPlayer.loop = true;
                    birdPlayer.play();

                    rightAnswerList = ['chukar partridge', 'Chukar partridge', 'Chukar Partridge', 'the chukar partridge', 'the Chukar partridge', 'the Chukar Partridge'];
                    tryingTime = 0;

                    setTimeout(function () {
                        $('.survey-form').survey({
                            survey: surveyVar
                        });
                    }, 15500);

                }, 3500);

                break;
            case 7:


                playNarrator('narration sound 7.5.wav');
                setTimeout(function () {
                    birdPlayer.src = "sounds/tawny owl final.wav";
                    birdPlayer.load();
                    birdPlayer.loop = true;
                    birdPlayer.play();

                    rightAnswerList = ['tawny owl', 'Tawny owl', 'the Tawny owl', 'the tawny owl'];
                    tryingTime = 0;

                    setTimeout(function () {
                        $('.survey-form').survey({
                            survey: surveyVar
                        });
                    }, 15500);

                }, 3500);
                break;
            default:
                nextBird(0);
                break;
        }

    },500);

}


$('.card').on('click',function(){
    effectPlayer.src = "sounds/flip.wav";
    effectPlayer.load();
    effectPlayer.play();
})