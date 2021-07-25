class Cliente {
    constructor() {
        this.id = 1;
        this.arrayClientes = [];
        this.IdEdicao = null;
    }

    cadastrar() {
        let cliente = this.lerDados();

        if (this.validarCampos(cliente)) {
            if(this.IdEdicao == null){
                this.adicionar(cliente);
            } else{
                this.atualizar(this.IdEdicao, cliente);
            }
        }

        this.listarTabela();
        this.cancelar();
    }

    listarTabela() {
        let tbody = document.getElementById("tbody");
        tbody.innerText = "";

        for (let i = 0; i < this.arrayClientes.length; i++) {
            let tr = tbody.insertRow();

            let td_acoes = tr.insertCell();
            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_email = tr.insertCell();
            let td_cpf = tr.insertCell();
            let td_endereco = tr.insertCell();
            let td_contato = tr.insertCell();

            td_id.innerText = this.arrayClientes[i].id;
            td_nome.innerText = this.arrayClientes[i].nome;
            td_email.innerText = this.arrayClientes[i].email;
            td_cpf.innerText = this.arrayClientes[i].cpf;
            td_endereco.innerText = this.arrayClientes[i].endereco;
            td_contato.innerText = this.arrayClientes[i].contato;

            let imagemEditar = document.createElement("img");
            imagemEditar.src = "../img/draw.png"
            imagemEditar.setAttribute("onclick", "cliente.editar(" + JSON.stringify(this.arrayClientes[i]) + ")");

            let imagemExcluir = document.createElement("img");
            imagemExcluir.src = "../img/trash.png"
            imagemExcluir.setAttribute("onclick", "cliente.deletar(" + this.arrayClientes[i].id + ")");

            td_acoes.appendChild(imagemEditar);
            td_acoes.appendChild(imagemExcluir);
        }
    }

    adicionar(cliente) {
        (this.arrayClientes).push(cliente);

        let id = this.id;
        let nome =  document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let cpf = document.getElementById("cpf").value;
        let endereco = document.getElementById("endereco").value;
        let contato = document.getElementById("contato").value;

        let data = {
            id, nome, email, cpf, endereco, contato
        }

        let convertData = JSON.stringify(data);
        localStorage.setItem("dadosCliente", convertData)

        this.id++;
    }

    validarCampos(cliente) {
        let mensagem = "";

        if ((cliente.nome.trim()).length == 0) {
            mensagem += " • Informe o nome do cliente. \n";
        }
        if ((cliente.email.trim()).length == 0) {
            mensagem += " • Informe o e-mail do cliente. \n";
        }
        if ((cliente.cpf.trim()).length == 0) {
            mensagem += " • Informe o cpf do cliente. \n";
        }
        if ((cliente.endereco.trim()).length == 0) {
            mensagem += " • Informe o endereço do cliente.\n";
        }
        if ((cliente.contato.trim()).length == 0) {
            mensagem += " • Informe algum número de contato do cliente. \n";
        }
        if (mensagem.length != 0) {
            alert(mensagem);
            return false;
        }

        return true;
    }

    lerDados() {
        let cliente = {}

        cliente.id = this.id;
        cliente.nome = document.getElementById("nome").value;
        cliente.email = document.getElementById("email").value;
        cliente.cpf = document.getElementById("cpf").value;
        cliente.endereco = document.getElementById("endereco").value;
        cliente.contato = document.getElementById("contato").value;

        return cliente;
    }

    cancelar() {
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("cpf").value = "";
        document.getElementById("endereco").value = "";
        document.getElementById("contato").value = "";

        document.getElementById("botao-cadastrar").innerText = "Cadastrar";
        this.IdEdicao = null;
    }

    deletar(id) {
        if (confirm("Deseja mesmo deletar cliente de código → " + id)) {
            let tbody = document.getElementById("tbody");

            for (let i = 0; i < this.arrayClientes.length; i++) {
                if (this.arrayClientes[i].id == id) {
                    this.arrayClientes.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

    editar(dados){
        this.IdEdicao = dados.id;

        document.getElementById("nome").value = dados.nome;
        document.getElementById("email").value = dados.email;
        document.getElementById("cpf").value = dados.cpf;
        document.getElementById("endereco").value = dados.endereco;
        document.getElementById("contato").value = dados.contato;

        document.getElementById("botao-cadastrar").innerText = "Atualizar";
    }

    atualizar(id, cliente){
        for(let i=0; i < this.arrayClientes.length; i++){
            if(this.arrayClientes[i].id == id){
                this.arrayClientes[i].nome = cliente.nome;
                this.arrayClientes[i].email = cliente.email;
                this.arrayClientes[i].cpf = cliente.cpf;
                this.arrayClientes[i].endereco = cliente.endereco;
                this.arrayClientes[i].contato = cliente.contato;
            }
        }
    }
}

var cliente = new Cliente();