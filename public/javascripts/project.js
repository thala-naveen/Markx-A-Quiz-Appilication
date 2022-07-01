$(document).ready(function(){
    $('#btn').click(function(){
        $.getJSON('/users/quizpage',{qid:$('#quizid').val()},function(data){
            //alert(JSON.stringify(data))
            if(data.length==0)
            {
                $('#result').html('<h6>quiz not found</h6>')
            }
            else
            {
                

                var htm=''
                
                htm+='<table class="stripped"><thead><tr><th>Question</th><th>option 1</th><th>option 2</th><th>option 3</th><th>Option 4</th></thead><tbody>'

                data.map((item)=>{
                    htm += '<tr><td>'+item.quesname+'</td><td><label><input class="with-gap" name="'+item.quesid+'" type="radio" value="1"/><span>'+item.optionone+'</span></label></td><td><label><input class="with-gap" name="'+item.quesid+'" type="radio" value="2"/><span>'+item.optiontwo+'</span></label></td><td><label><input class="with-gap" name="'+item.quesid+'" type="radio" value="3"/><span>'+item.optionthree+'</span></label></td><td><label><input class="with-gap" name="'+item.quesid+'" type="radio" value="4"/><span>'+item.optionfour+'</span></label></td><tr>'

                })

                htm += '</tbody></table>'
                
                $("#result").html(htm)
                    //<label><input class="with-gap" name="difficulty" type="radio" value="Easy"/><span>Easy</span></label>
            }
        })
    })
})
