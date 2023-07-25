$(document).ready(function(){
    $.fn.formatDate = function (val){
        return val.substring(0,4) + '-' + val.substring(4,6) + '-' + val.substring(6,8);
    };

    $.ajax({
        type: 'GET',
        url: "http://192.168.1.249/electricidade"        
    })
    .done(function( msg ) {
        $("#dataContagem").val($.fn.formatDate((new Date()).toISOString().replaceAll('-','').split('T')[0]));
        $("#ponta").val(msg[0].PONTA);
        $("#cheia").val(msg[0].CHEIAS);
        $("#vazio").val(msg[0].VAZIO);
    });

    $("#validation")[0].innerHTML = '';
    $("#submitElectricidade").click(function(){
        if($("#dataContagem").val() === '' || $("#ponta").val() === '' || 
            $("#vazio").val() === '' || $("#cheia").val() === ''){  
            $($("#validation")[0]).attr('class','bg-danger-subtle rounded-3 center text-center');                      
            $("#validation")[0].innerHTML = '<div>Erro ao gravar dados!!</div>';
        }else{
            $($("#validation")[0]).attr('class','');
            var data = {
                DATA: $("#dataContagem").val().replaceAll('-',''),
                PONTA: $("#ponta").val(),
                CHEIAS: $("#cheia").val(),
                VAZIO: $("#vazio").val()
            };
            $.ajax({
                method: "POST",
                url: "http://192.168.1.249/electricidade",                                                      
                data: JSON.stringify(data),
                contentType: 'application/json',
            })
            .done(function( msg ) {
                $('.toast-body')[0].innerText = msg;
                const toastLiveExampleElectricidade = bootstrap.Toast.getOrCreateInstance($("#toastElectricidade"));
                toastLiveExampleElectricidade.show();
            });                                                
        }
    });
});
