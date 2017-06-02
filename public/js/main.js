$(document).ready(function(){
	$('.delete-book').on('click', function(){
		var id = $(this).data('id');
		var url = '/deletebook/' + id;
		if (confirm('Delete Book?')) {
			$.ajax({
				url: url,
				type: 'DELETE',
				success: function(result){
					console.log('Deleting book ...');
					window.location.href = '/';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});

	// Edit book info
	$('.edit-book').on('click', function(){
		$('#edit-book-id').val($(this).data('id'));
		$('#edit-book-name').val($(this).data('name'));
		$('#edit-book-title').val($(this).data('title'));
		$('#edit-book-description').val($(this).data('description'));
	});

	// Show JSON
	var datajson = null;
	$('#show-json').on('click', function(req, res){
		$.ajax({
			url: 'http://json.schemastore.org/tsconfig',
			type: 'get',
			dataType: 'json',
			success: function(result){
				datajson = result;
			}
		});
	});
});