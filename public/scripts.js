$(function(){
    $('#search').autocomplete({

        source: function(req, res){
            $.ajax({
                url:'autocomplete',
                dataType: 'jsonp',
                type:'GET',
                data: req,
                success: function(data){

                },
                error: function(err){
                    console.log(err);
                }
            });
        },

        minLength: 1,
        select: function(event, ui){
            if(ui.item){
                $('#search').text(ui.item.label);
            }
        }
    });
})

