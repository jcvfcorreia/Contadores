$(document).ready(function(){
    $.fn.formatDate = function (val){
        return val.substring(0,4) + '-' + val.substring(4,6) + '-' + val.substring(6,8);
    };

    $.ajax({
        type: 'GET',
        url: "http://192.168.1.249/agua"        
    })
    .done(function( msg ) {
        $("#dataContagem").val($.fn.formatDate(msg[0].DATA));
        $("#Contagem").val(msg[0].VALOR);
    }); 

    $("#validation")[0].innerHTML = '';
    $("#submitAgua").click(function(){
        if($("#dataContagem").val() === '' || $("#Contagem").val() === ''){  
            $($("#validation")[0]).attr('class','bg-danger-subtle rounded-3 center text-center');
            $("#validation")[0].innerHTML = '<div>Erro ao gravar dados!!</div>';
        }else{
            $($("#validation")[0]).attr('class','');
            var data = {
                DATA: $("#dataContagem").val().replaceAll('-',''),
                VALOR: $("#Contagem").val()
              };
            $.ajax({
                type: 'POST',
                url: "http://192.168.1.249/agua",                                                      
                data: JSON.stringify(data),
                contentType: 'application/json',
            })
            .done(function( msg ) {                 
                $('.toast-body')[0].innerText = msg;
                const toastLiveExampleAgua = bootstrap.Toast.getOrCreateInstance($("#toastAgua"));
                toastLiveExampleAgua.show();
            });                                                
        }
    }); 
});