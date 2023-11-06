$(document).ready(function() {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
        type: "GET",
        dataType: "json",
        success: function(data) {
            var results = data.results;
            for (var i = 0; i < results.length; i++) {
                var name = results[i].name;
                var newData = `<span style="color: black;">${name}</span>`;
                $("#pokemon-" + (i + 1)).html(newData);

                $('.details-btn[data-id=' + (i + 1) + ']').on('click', function() {
                    var pokemonId = $(this).data('id');
                    var url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId + "/";
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        success: function(pokemonData) {
                            var details = "Name: " + pokemonData.name + "<br>Type: " + pokemonData.types[0].type.name + "<br>Ability: " + pokemonData.abilities.map(ability => ability.ability.name).join(", ")
                                            + "<br>Base Experience: " + pokemonData.base_experience + "<br>Height: " + pokemonData.height + " decimetres" + "<br>Weight: " + pokemonData.weight + " hectograms";
                            $("#details-" + pokemonId).html(details).show();
                        },
                        error: function() {
                            $("#details-" + pokemonId).html("Oops! Something went wrong fetching details. Please try again later.").show();
                        }
                    });
                });
            }
        },
        error: function() {
            for (var i = 0; i < 20; i++) {
                $("#pokemon-" + (i + 1)).text("Oops! Something went wrong. Please try again later.");
            }
        }
    });
});
