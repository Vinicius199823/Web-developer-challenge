

 function carregamentoPagina() {
     alert("Mensagem apresentada no carregamento do sistema");
 }

function apagarClientes(idCliente) {
    let result = confirm("Tem a certeza que deseja apagar este cliente?")

    if (result) {
        let listaCliente = JSON.parse(localStorage.getItem("clientes"))

        for (let i = 0; i < listaCliente.length; i++) {
            const { id } = listaCliente[i]
            if (id === idCliente) {
                listaCliente.splice(i, 1)
                break;
            }
        }

        localStorage.setItem("clientes", JSON.stringify(listaCliente))
        populaTabela()
    }
}

function editarClientes(idCliente) {
    $("#modalregistro").modal("show")
    let clientes = JSON.parse(localStorage.getItem("clientes"))
    clientes.forEach(function(clientes){
        
        if(clientes.id === idCliente){
            $("#hdID").val(clientes.id)
            $("#imagemP").val(clientes.imagem)
            $("#nmUser").val(clientes.nome)
            $("#emailUser").val(clientes.email)
            $("#coment").val(clientes.comentario)
        }
    })
    
}

function populaTabela() {
    if (localStorage.getItem("clientes")) {
        let clientes = JSON.parse(localStorage.getItem("clientes"))

        $("#tblClientes tbody").html("")
        clientes.forEach((clientes) => {
            $("#tblClientes tbody").append(`<tr>
                <td>${clientes.imagem}</td>
                <td>${clientes.nome}</td>
                <td>${clientes.email}</td>
                <td>${clientes.comentario}</td>
                <td style="width: 50px">
                    <button type="button" class="btn btn-info" onclick="editarClientes(${clientes.id})"><i class="fas fa-edit"></i></button>
                </td>
                <td style="width: 50px">
                    <button type="button" class="btn btn-danger" onclick="apagarClientes(${clientes.id})"><i class="far fa-trash-alt"></i></button>
                </td>
            </tr>`)
        })
    }
}

$(() => {
    //Código executado no carregamento da página
    populaTabela()

    $("#btnSalvar").click(() => {
        let _id = $("#hdID").val()
        let listaCliente = []
        if (localStorage.getItem("clientes")) {
            listaCliente = JSON.parse(localStorage.getItem("clientes"))
        }

        if (!_id || _id == "0") { //ESTADO DE INSERÇÃO
            
            let clientes  = {}
            clientes.imagem = $("#imagemP").val()
            clientes.nome = $("#nmUser").val()
            clientes.email = $("#emailUser").val()
            clientes.comentario = $("#coment").val()
            
            clientes.id = listaCliente.length + 1
            listaCliente.push(clientes)
        }
        else { //ESTADO DE EDIÇÃO
            for (let i = 0; i < listaCliente.length; i++) {
                const { id } = listaCliente[i]
                
                    listaCliente[i].imagem = $("#imagemP").val()
                    listaCliente[i].nome = $("#nmUser").val()
                    listaCliente[i].email = $("#emailUser").val()
                    listaCliente[i].comentario = $("#coment").val()
                    _id = null
                    break;
                
            }
        }

        localStorage.setItem("clientes", JSON.stringify(listaCliente))

        alert("Comentário salvo com sucesso")
        $("#hdID").val("")
        $("#imagemP").val("")
        $("#nmUser").val("")
        $("#emailUser").val("")
        $("#coment").val("")

        populaTabela()
    })
})
