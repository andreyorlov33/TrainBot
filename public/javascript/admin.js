// Progress bar percent
$(document).ready(() => {
    var value = $('.data-storage').attr('id');
    var split = value.split(',');
    console.log(split);

    for (var i = 0; i < split.length; i++){
        var percent = split[i];
        $(`.span-${i+1}`).attr('style', `width:${percent}%`);
    }
});

$(".back-button").on("click", () => {
    $(".program_section").show();
    $(".workouts").hide();
    $(".workouts-content-block").empty();
});


// Choose Program, takes you to page with ALL associated workouts
$('.program_section').on('click','.programChoice' , (e) =>{
    e.preventDefault();
    let id = $(e.target).attr('id');
    let program = $(e.target).attr('value');
    // console.log( program );
    getWorkout(id, program);
});


// Choose Workout to UPDATE
$('.workouts').on('click', '.singleWorkout', (e) =>{
    e.preventDefault();
    let dayId = $(e.target).data('dayId');
    let progId = $(e.target).data('progId');
    console.log(dayId + " " + progId);
});

$('.create-content').on('click', '.submit-workout', (e) =>{
    e.preventDefault();
    let parsedDays = parseInt( sessionStorage.getItem('days') );
    let parsedCount = parseInt( sessionStorage.getItem('count') );

    let newWorkout = {
        day: $('#workout-id').val().trim(),
        text: $('#workout-text').val().trim(),
        ProgramId: $('#workout-program').val()
    }
    console.log( $('#workout-program').val().trim() );
    if( parsedCount <= parsedDays){
        $('#workout-id').attr({value: parsedCount });
        sessionStorage.setItem('count', (parsedCount + 1) );
        $.ajax({
            method: "POST",
            url: '/admin/create/workout',
            data: newWorkout
        }).done(function(){
            window.location.href = '/admin/create/workout';
        });
    }

});

function getWorkout(id, program){
    $('.program_section').hide();
    $('.workouts').show();

    let queryUrl = '/admin/programs/' + id;

    $.get(queryUrl, function(data){

        let allWorkouts = data.WorkoutDays;
       
        for( var iter = 0; iter < allWorkouts.length; iter++){
            
            let words = allWorkouts[iter].text;
            let day = allWorkouts[iter].day;
            let parsedWords = words.replace('\n','<br />');

            let newDiv = $('<div>');
            let h3 = $('<h3>');
            let p = $('<p>');

            h3.html(`Day: ${day}`);
            p.html(parsedWords);
            newDiv.attr('id', allWorkouts[iter].day );
            newDiv.addClass('singleWorkout');

            $(newDiv).prepend(h3);
            $(newDiv).append(p);
            $(newDiv).append( addUpdateButton(day, program) );
            $('.workouts-content-block').append(newDiv);  
        }
    });
};

function addUpdateButton(day, program){
    var newBtn = $('<button>');
    var btnDiv = $('<div>');
    newBtn.attr({
        type: 'submit',
    });
    newBtn.data({
        dayId: day,
        progId: program
    });
    newBtn.text("Update Workout?");
    $(btnDiv).append(newBtn)
    btnDiv.addClass("header-button update-button");
    return btnDiv;
};



function updateWorkout(){
    $('.program_section').hide();
    $('.workouts').hide();

    let queryUrl = '/admin/programs/update';

    $.ajax({
        method: "PUT",
        url: queryUrl,
        data: update
    }).done(function(){
        window.location.href = "/admin/programs/update";
    }); 
};


// Create Program Logic

$(document).on("click", ".submit-program", (e) => {
    e.preventDefault();
    let newProgram = {
        name: $('#program-name').val().trim(),
        days: $('#program-days').val().trim(),
        description: $('#program-description').val().trim()
    }
    let queryUrl = '/admin/create';
    sessionStorage.setItem("days", $('#program-days').val().trim());
    sessionStorage.setItem('count', '1');
    
    $.ajax({
        method: "POST",
        url: queryUrl,
        data: newProgram
    }).done(function(){
        window.location.href = "/admin/create/workout";
    });
});
