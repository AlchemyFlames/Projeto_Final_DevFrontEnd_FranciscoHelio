$(function () {

    $('#del').on('click', function () {//deleta o nome do localStorage
        localStorage.removeItem('lolnick');
        $('.dialog').fadeIn('fast', function () {
            $('.ajaxmsg').html(
                '<strong> Nick Deletado! </strong>' +
                '<button id="okNick">Ok</button>'
            ).fadeIn('slow');
            $('#okNick').on('click', function () {
                $('.dialog').hide();
                location.reload();
            });
        });
    });
    perfil();
    info();
    function info() { //verifica se o srvidor ta online e se tem algum erro
        $.ajax({
            url: "php/status.php",
            beforeSend: function () {
                $('#carregando').show();
            },
            success: function (status) {
                localStorage.setItem('status', status);
                alert = JSON.parse(localStorage.getItem('status'));
                $('.status').html('<span id="status">Servidor: ' + alert.services[0].status + ' ' + '</div>')
                $('.status').append('<br>')
                $('.status').append('<br>')
                $('.status').append('<div id="incidents" class="incidents" style="display: none;">' + alert.services[0].incidents + '</div>')
                stado();
            },
            error: function () {
                console.log('Erro na parte do info')
            }
        });
    }
    function stado() { // se o servidor tiver algum erro ele vai passar nesse parametro que vai liberar um click para ver qual erro esta dando no servidor
        if ($('#incidents').html() == '') {

        } else {
            $('#status').append('<i class="fas fa-exclamation-circle incident"></i>')
            $('.incident').on('click', function () {
                if ($('#incidents').attr(`style`) == "display: none;") {
                    $('#incidents').css({ "display": "block" })
                } else {
                    $('#incidents').css({ "display": "none" })
                }
            })
        }
    }
    function perfil() { // perfil principal
        $.ajax({
            url: "php/summoner.php",
            type: 'POST',
            data: {
                login: localStorage.getItem('lolnick'),
                local: "br1"
            },
            beforeSend: function () {
                $('#carregando').show();
            },
            success: function (tabs) {
                $('#carregando').hide();
                localStorage.setItem('player', tabs);
                response = JSON.parse(localStorage.getItem('player'));
                $('#level').html("Level " + response.summonerLevel);
                $('#nome').html('<span class="nome" alt="' + response.id + '">' + response.name + '</span>');
                $('#icone').html('<img src="http://ddragon.leagueoflegends.com/cdn/' + version + '/img/profileicon/' + response.profileIconId + '.png">');
                tier();
            },
            error: function () {
                console.log('Erro na parte do perfil :(')
            }
        });
    }
    function tier() { //chamado da api onde mostra os pontos
        response = JSON.parse(localStorage.getItem('player'));
        $.ajax({
            url: "php/tier.php",
            type: 'POST',
            data: {
                login: response.id,
                local: "br1"
            },
            beforeSend: function () {
                $('#carregando').show();
            },
            success: function (resp) {
                localStorage.setItem('tier', resp);
                elo = JSON.parse(localStorage.getItem('tier'));
                $('#elo').html(elo[0].tier);
                $('#posicao').html(elo[0].rank);
                $('#pontos').html(elo[0].leaguePoints + " PDL")
                tierName();
            },
            error: function () {
                console.log('Erro na parte de liga')
            }
        });
        function tierName() {
            if ($('#elo').html() == "SILVER") { // mostra o icone de acordo com a posição no rank
                $('#eloIcone').html('<img src="icon/silver.png">');
            } else if ($('#elo').html() == "PLATINUM") {
                $('#eloIcone').html('<img src="icon/PLATINUM.png">');
            } else if ($('#elo').html() == "GOLD") {
                $('#eloIcone').html('<img src="icon/gold.png">');
            } else if ($('#elo').html() == "BRONZE") {
                $('#eloIcone').html('<img src="icon/bronze.png">');
            } else if ($('#elo').html() == "diamond") {
                $('#eloIcone').html('<img src="icon/diamond.png">');
            } else if ($('#elo').html() == "master") {
                $('#eloIcone').html('<img src="icon/master.png">');
            } else {
                $('#eloIcone').html('<img src="icon/default.png">');
            }
            //Elos mudando para numeros
            if ($('#posicao').html() == "I") { // muda o nome do rank
                $('#posicao').html("1")
            } else if ($('#posicao').html() == "II") {
                $('#posicao').html("2")
            } else if ($('#posicao').html() == "III") {
                $('#posicao').html("3")
            } else if ($('#posicao').html() == "IV") {
                $('#posicao').html("4")
            } else if ($('#posicao').html() == "V") {
                $('#posicao').html("5")
            } else {
                $('#posicao').html("")
            }
            //Mudando elo para portugues
            if ($('#elo').html() == "GOLD") { // muda o nome do rank
                $('#elo').html("Ouro")
            } else if ($('#elo').html() == "SILVER") {
                $('#elo').html("Prata")
            } else if ($('#elo').html() == "BRONZE") {
                $('#elo').html("Bronze")
            } else if ($('#elo').html() == "PLATINUM") {
                $('#elo').html("Platina")
            }else if ($('#elo').html() == "diamond") {
                $('#elo').html("Diamante")
            } else if ($('#elo').html() == "master") {
                $('#elo').html("Mestre")
            } else {
                $('#elo').html("Sem elo")
            }
        }
        $('#id').html("");
    }
});