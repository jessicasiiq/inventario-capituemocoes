class Produto {
    constructor() {
        this.idProduto = 1;
        this.arrayProdutos = [];
        this.IdEdicaoProduto = null;
    }

    cadastrar() {
        let produto = this.lerDados();

        if (this.validarCampos(produto)) {
            if(this.IdEdicaoProduto == null){
                this.adicionar(produto);
            } else{
                this.atualizar(this.IdEdicaoProduto, produto);

            }
        }

        this.listarTabela();
        this.cancelar();
    }

    listarTabela() {
        let tbody2 = document.getElementById("tbody2");
        tbody2.innerText = "";

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody2.insertRow();

            let td_acoesProduto = tr.insertCell();
            let td_idProduto = tr.insertCell();
            let td_nomeProduto = tr.insertCell();
            let td_tipoProduto = tr.insertCell();
            let td_marcaProduto = tr.insertCell();
            let td_descricaoProduto = tr.insertCell();

            td_idProduto.innerText = this.arrayProdutos[i].idProduto;
            td_nomeProduto.innerText = this.arrayProdutos[i].nomeProduto;
            td_tipoProduto.innerText = this.arrayProdutos[i].tipoProduto;
            td_marcaProduto.innerText = this.arrayProdutos[i].marcaProduto;
            td_descricaoProduto.innerText = this.arrayProdutos[i].descricaoProduto;

            let imagemEditar = document.createElement("img");
            imagemEditar.src = "../img/draw.png"
            imagemEditar.setAttribute("onclick", "produto.editar(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            let imagemExcluir = document.createElement("img");
            imagemExcluir.src = "../img/trash.png"
            imagemExcluir.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].idProduto + ")");

            td_acoesProduto.appendChild(imagemEditar);
            td_acoesProduto.appendChild(imagemExcluir);
        }
    }

    adicionar(produto) {
        (this.arrayProdutos).push(produto);

        let idProduto = this.idProduto;
        let nomeProduto =  document.getElementById("nomeProduto").value;
        let tipoProduto = document.getElementById("tipoProduto").value;
        let marcaProduto = document.getElementById("marcaProduto").value;
        let descricaoProduto = document.getElementById("descricaoProduto").value;

        let data = {
            idProduto, nomeProduto, tipoProduto, marcaProduto, descricaoProduto
        }
        let convertData = JSON.stringify(data);
        localStorage.setItem("dadosProduto", convertData)

        this.idProduto++;
    }

    validarCampos(produto) {
        let mensagem = "";

        if ((produto.nomeProduto.trim()).length == 0) {
            mensagem += " • Informe o nome do produto. \n";
        }
        if ((produto.tipoProduto.trim()).length == 0) {
            mensagem += " • Informe o tipo do produto. \n";
        }
        if ((produto.marcaProduto.trim()).length == 0) {
            mensagem += " • Informe a marca do produto. \n";
        }
        if ((produto.descricaoProduto.trim()).length == 0) {
            mensagem += " • Informe uma descrição breve do produto. \n";
        }
        if (mensagem.length != 0) {
            alert(mensagem);
            return false;
        }
        return true;
    }

    lerDados() {
        let produto = {}

        produto.idProduto = this.idProduto;
        produto.nomeProduto = document.getElementById("nomeProduto").value;
        produto.tipoProduto = document.getElementById("tipoProduto").value;
        produto.marcaProduto = document.getElementById("marcaProduto").value;
        produto.descricaoProduto = document.getElementById("descricaoProduto").value;

        return produto;
    }

    cancelar() {
        document.getElementById("nomeProduto").value = "";
        document.getElementById("tipoProduto").value = "";
        document.getElementById("marcaProduto").value = "";
        document.getElementById("descricaoProduto").value = "";

        document.getElementById("botao-cadastrarProduto").innerText = "Cadastrar";
        this.IdEdicao = null;
    }

    deletar(idProduto) {
        if (confirm("Deseja mesmo deletar o produto de código → " + idProduto)) {
            let tbody2 = document.getElementById("tbody2");

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].idProduto == idProduto) {
                    this.arrayProdutos.splice(i, 1);
                    tbody2.deleteRow(i);
                }
            }
        }
    }

    editar(dados){
        this.IdEdicaoProduto = dados.idProduto;

        document.getElementById("nomeProduto").value = dados.nomeProduto;
        document.getElementById("tipoProduto").value = dados.tipoProduto;
        document.getElementById("marcaProduto").value = dados.marcaProduto;
        document.getElementById("descricaoProduto").value = dados.descricaoProduto;

        document.getElementById("botao-cadastrarProduto").innerText = "Atualizar";
    }

    atualizar(idProduto, produto){
        for(let i=0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].idProduto == idProduto){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].tipoProduto = produto.tipoProduto;
                this.arrayProdutos[i].marcaProduto = produto.marcaProduto;
                this.arrayProdutos[i].descricaoProduto = produto.descricaoProduto;
            }
        }
    }
}

var produto = new Produto();