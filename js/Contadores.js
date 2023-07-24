$(document).ready(function(){
    $.fn.formatDate = function (val){
        return val.substring(0,4) + '-' + val.substring(4,6) + '-' + val.substring(6,8);
    };

    $("#idAgua").click(function(){    
        $("#frame").load("Agua.html");
        $("#content").hide();
    });

    $("#idGas").click(function(){        
        $("#frame").load("Gas.html");
        $("#content").hide();
    });

    $("#idEletricidade").click(function(){        
        $("#frame").load("Electricidade.html");
        $("#content").hide();
    });

    $("#idComunicar").click(function(){  
        var url = "https://www.endesa.pt/";
        window.open(url,"_blank");
    });
    
    $("#content").show();
    $.ajax({
        method: "GET",
        url: "http://192.168.1.249/agua"
    })
    .done(function( msg ) {                                                        
        if (msg.length > 0){
            $("#tableAgua")[0].innerHTML = "<thead><th>Data</th><th>Contagem</th><th>Consumo</th></thead>";
            $("#tableAgua")[0].innerHTML += "<tbody class=\"table-group-divider\">";
            msg.forEach(element => {
                $("#tableAgua")[0].innerHTML += "<tr><td>" + $.fn.formatDate(element.DATA) + "</td><td>" + element.VALOR + "</td><td>" + element.CONSUMO +"</td></tr>";
            });
            $("#tableAgua")[0].innerHTML += "</tbody>"
            $("#tableAgua").show();
        }else{
            $("#tableAgua").hide()
        }                                                                                               
    })
    .fail(function(err){
        console.log(err);
    });

    $.ajax({
        method: "GET",
        url: "http://192.168.1.249/gas"
    })
    .done(function( msg ) {                                                        
        if (msg.length > 0){
            $("#tableGas")[0].innerHTML = "<thead><th>Data</th><th>Contagem</th><th>Consumo</th></thead>";
            $("#tableGas")[0].innerHTML += "<tbody class=\"table-group-divider\">";
            msg.forEach(element => {
                $("#tableGas")[0].innerHTML += "<tr><td>" + $.fn.formatDate(element.DATA) + "</td><td>" + element.VALOR + "</td><td>" + element.CONSUMO +"</td></tr>";
            });
            $("#tableGas")[0].innerHTML += "</tbody>"
            $("#tableGas").show();
        }else{
            $("#tableGas").hide();
        }                                                                                            
    });

    $.ajax({
        method: "GET",
        url: "http://192.168.1.249/electricidade"
    })
    .done(function( msg ) {                                                        
        if (msg.length > 0){
            $("#tableElectricidade")[0].innerHTML = "<thead><th>Data</th><th>Ponta</th><th>Cheia</th><th>Vazio</th><th>Consumo Ponta</th><th>Consumo Cheia</th><th>Consumo Vazio</th></thead>";
            $("#tableElectricidade")[0].innerHTML += "<tbody class=\"table-group-divider\">";
            msg.forEach(element => {
                $("#tableElectricidade")[0].innerHTML += "<tr><td>" + $.fn.formatDate(element.DATA) + "</td><td>" + element.PONTA + "</td><td>" + element.CHEIAS +"</td><td>" + element.VAZIO +"</td><td>" + element.CONSUMOPONTA +"</td><td>" + element.CONSUMOCHEIAS +"</td><td>" + element.CONSUMOVAZIO +"</td></tr>";
            });
            $("#tableElectricidade")[0].innerHTML += "</tbody>"
            $("#tableElectricidade").show();
        }else{
            $("#tableElectricidade").hide();
        }                                                                                                
    });
})

