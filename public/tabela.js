$(document).ready(function() {
$("#exibir_tabela").click(function() {
        $.getJSON("http://localhost:5000/pegarDados", function(result){
        	result=result.vetor
							$('#dados').empty()

		    var tabela = '<table><thead><tr><th>Nome</th><th>Idade</th></tr></thead><tbody>'
            result.forEach(item => {
                tabela =tabela+'<tr><td>' + item.nome + '</td><td>' + item.idade + '</td></tr>';
            });
			tabela=tabela+'</tbody></table>'
				$('#dados').append(tabela)
        });
    });
});