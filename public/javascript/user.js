// Progress bar percent
$(document).ready(() => {
    let currentDay = $('.progress-bar h1').attr('id');
    let days = $('.progress-bar h1').attr('value');
    let percent = (currentDay / days) * 100;
    $('.progress-bar span').css('width', `${percent}%`)
});

$('.edit-button').on('click', () => {
    $('.user-info').hide();
    $('.info-list input').show();
    $('.edit-button').hide();
    $('.save-button').show();
})

$('.save-button').on('click', () => {
    $('.user-info').show();
    $('.info-list input').hide();
    $('.edit-button').show();
    $('.save-button').hide();
});

// complete button update
$('.workout-card').on('click', '.complete-button button', (e) => {
    e.preventDefault();
    let day = parseInt($(e.target).attr('id'));
    day = day+1;
    let update = {
        currentDay: day
    }

    let queryUrl = '/user/workout/';
    
    $.ajax({
        method: "PUT",
        url: queryUrl,
        data: update
    }).done(function(){
        window.location.href = "/user/profile";
    }); 
    
})