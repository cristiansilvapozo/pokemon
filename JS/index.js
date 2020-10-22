$(document).ready(function(){
    consultaAPI("pikachu")
    canvas()
    
    })
    
    $("button").click(function(){
        let pokemon = $("#input").val()
        consultaAPI(pokemon)
    })
    
    function consultaAPI(nombrePokemon) {
        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`,

            success: function (data) {
                
                $("#pokemon").html(data.name)
                $("#Peso").html(`Peso: ${data.weight/10} Kgs`)
                $("#Altura").html(`Altura: ${data.height/10} Mts`)

                let id = data.id
                let id2 = data.id + 1

                let imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
                let imagen2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id2}.svg`

                $("#imagenpoke").attr("src",data.sprites.other.dream_world.front_default)
                $("#imagenpoke2").attr("src",imagen2)

                let hp = data.stats[0].base_stat
                let attack = data.stats[1].base_stat
                let defense = data.stats[2].base_stat
                let specialAttack = data.stats[3].base_stat
                let specialDefense = data.stats[4].base_stat
                let speed = data.stats[5].base_stat
                
                canvas(hp,attack,defense,specialAttack,specialDefense,speed)
            },

            dataType: 'json'
        });

        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${+nombrePokemon + 1}`,

            success: function (data) {

                $("#pokemon2").html(data.name)

                },
            dataType: 'json'
    });
    
    }

    // Canvas
    
    function canvas(hp,attack,defense,specialAttack,specialDefense,speed){
        var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Habilidades"
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 18,
            indexLabel: "{label} - {y}",
            dataPoints: [
                { y: hp, label: "Puntos de vida" },
                { y: attack, label: "Ataque" },
                { y: defense, label: "Defensa" },
                { y: specialAttack, label: "Ataque Especial" },
                { y: specialDefense, label: "Defensa Especial" },
                { y: speed, label: "Velocidad" },
            ]
        }]
    });
    chart.render();
    }
    
    
    