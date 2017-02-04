// Progress bar percent
$(document).ready(() => {
    var length = $('.data-storage').attr('id');

    for (var i = 0; i < length; i++){
        var currentDay = $(`.${i+1}`).attr('id');
        var day = $(`.${i+1}`).attr('value');
        var percent = (currentDay / day) *100;
        $(`.span-${i+1}`).attr('style', `width:${percent}%`);
    }
});

// Allows us to use the addDayInput function
$(document).ready(() => {
    $('.create__workout-day').empty();
    addDayInput();
})

// Go back button...solid
$('.back-button').on('click', () => {
    $('.program_section').show();
    $('.workouts').hide();
    $('.workouts-content-block').empty();
});


// Choose Program, takes you to page with ALL associated workouts
$('.program_section').on('click','.programChoice' , (e) =>{
    e.preventDefault();
    let id = $(e.target).attr('id');
    let program = $(e.target).attr('value');
    getWorkout(id, program);
});


// Choose Workout to UPDATE
$('.workouts').on('click', '.singleWorkout', (e) =>{
    e.preventDefault();
    let dayId = $(e.target).data('dayId');
    let progId = $(e.target).data('progId');
});

// Create Program Logic at Admin/Create
$(document).on('click', '.submit-program', (e) => {
    e.preventDefault();

    let newProgram = {
        name: $('#program-name').val().trim(),
        days: $('#program-days').val().trim(),
        description: $('#program-description').val().trim()
    }
    
    sessionStorage.setItem('days', $('#program-days').val().trim());
    sessionStorage.setItem('count', '1');

    let queryUrl = '/admin/create';

    $.ajax({
        method: 'POST',
        url: queryUrl,
        data: newProgram
    }).done(function(){
        window.location.href = '/admin/create/workout';
    });
});

// Create new workout AFTER creating new program at Admin/Create/Workout
$('.create-content').on('click', '.submit-workout', (e) =>{
    e.preventDefault();
    
    var parsedDays = parseInt( sessionStorage.getItem('days') );
    var parsedCount = parseInt( sessionStorage.getItem('count') );

    var newWorkout = {
        day: $('#workout-id').val().trim(),
        text: $('#workout-text').val().trim(),
        ProgramId: parseInt( $('.workout-program').attr('id') )
    }
    if (parsedCount >= parsedDays){
        $.ajax({
            method: 'POST',
            url: '/admin/create/workout',
            data: newWorkout
        }).done(function(){
            window.location.href = '/admin/programs';
        });
    } else {
        parsedCount++;
        sessionStorage.setItem('count', parsedCount);

        $.ajax({
            method: 'POST',
            url: '/admin/create/workout',
            data: newWorkout
        }).done(function(){
            window.location.href = '/admin/create/workout';
        });
    }

});

// Adds all Workouts from a particular program
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
            // $(newDiv).append( addUpdateButton(day, program) );
            $('.workouts-content-block').append(newDiv);  
        }
    });
};

// Puts update button on individual workout, from the Admin/Program/Workout
// function addUpdateButton(day, program){
//     var newBtn = $('<button>');
//     var btnDiv = $('<div>');
//     newBtn.attr({
//         type: 'submit',
//     });
//     newBtn.data({
//         dayId: day,
//         progId: program
//     });
//     newBtn.text('Update Workout?');
//     $(btnDiv).append(newBtn)
//     btnDiv.addClass('header-button update-button');
//     return btnDiv;
// };


// Update button for individual workout, from the Admin/Program/Workout
function updateWorkout(){
    $('.program_section').hide();
    $('.workouts').hide();

    let queryUrl = '/admin/programs/update';

    $.ajax({
        method: 'PUT',
        url: queryUrl,
        data: update
    }).done(function(){
        window.location.href = '/admin/programs/update';
    }); 
};

// Adds the Day Input Field so we Auto-Increment the day number
function addDayInput(){
    let parsedCount = parseInt( sessionStorage.getItem('count') );
    let newLabel = $('<label>');
    newLabel.html('Day Number: ');
    let newInput = $('<input>');
    newInput.attr({
        type: 'number',
        name: 'day',
        id: 'workout-id',
        value: parsedCount
    });
    newLabel.append(newInput);
    $('.create__workout-day').append(newLabel);
};
