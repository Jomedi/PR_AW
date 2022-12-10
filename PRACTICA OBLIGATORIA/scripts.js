$('#picker').on('change', function() {
    $('#form2 #' + $(this).val()).prop('disabled', false).siblings().prop('disabled', true);
});



// $('#inputState').on('change', function() {
//     $($(this).val()).prop('disabled', false);
// });