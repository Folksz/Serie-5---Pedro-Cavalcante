import React, { Component } from "react";


const nomeRegex = RegExp(
  /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
);




const validacao = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  return valid;
};



class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: null,
      idade: null,
      formErrors: {
        nome: "",
        idade: ""  
      }
    };
  }
  
  


  
 enviar = async(event) => {
	 
	   if (validacao(this.state)) {
		
		await fetch('http://localhost:5000/sendformulario', {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      });  	  

    } else {
		alert('Não Atendeu alguma exigência')
    }
    
  };
  


  mudancas = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
	case "nome":
        formErrors.nome = nomeRegex.test(value)? "": "Só pode haver letras";
        break;
		
      case "idade":
        formErrors.idade=
          value < 18 ? "Idade tem que ser maior que 18" : isNaN(value)?"Tem que ser numero":"";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Formulário</h1>
          <form onSubmit={this.enviar}>
            <div className="nome">
              <label htmlFor="nome">Nome</label>
              <input
                placeholder="nome"
                type="text"
                name="nome"
                onChange={this.mudancas}
              />
              {formErrors.nome.length > 0 && (
                <span className="Erros de Mensagem">{formErrors.nome}</span>
              )}
            </div>
			<br></br>
            <div className="idade">
              <label htmlFor="idade">idade</label>
              <input
                placeholder="Idade"
                type="numeric"
                name="idade"
                onChange={this.mudancas}
              /> {formErrors.idade.length > 0 && (
                <span className="Erros de Mensagem">{formErrors.idade}</span>
              )}
            </div>
				<br></br>
            <div className="Submit">
              <button type="submit">Submit</button>
			  	<br></br>
            </div>
          </form>
        </div>
      </div>	  
	  
    );
  }
}

export default Formulario;
