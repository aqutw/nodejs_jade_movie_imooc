$(function(){
  $('.del').click(function(e){
    var $e=$(this),//$(e.target),
        id=$e.attr('data-id'),
        $tr=$('.item-id-'+id);
console.log('---------$e--------');
console.log($e);
console.log(id);
    $.ajax({type:'DELETE', url:'/admin/list?id='+id})
     .done(function(o){
       if(o.success===1)$tr.remove();
     });
    
  });
});
