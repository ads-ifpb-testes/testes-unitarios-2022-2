import repositorio from "./repositorio.filmes";

class GerenciadorFilmes {
  constructor() {}

  addFilme(filme) {
    if (!filme.nome || filme.ano > new Date().getFullYear()) {
      throw new Error("Não é possível adicionar filmes futuros");
    }
    repositorio.salvar(filme);
  }

  getFilmes() {
    return repositorio.getFilmes();
  }

  remFilme(filme) {
    if (filme) {
      const filmesAtuais = repositorio.getFilmes();
      const indiceFilme = filmesAtuais.findIndex(
        (filmeSalvo) =>
          filme.ano === filmeSalvo.ano && filme.nome === filmeSalvo.nome
      );
      if (indiceFilme !== -1) {
        repositorio.remover(indiceFilme);
      } else {
        throw new Error("Filme inexistente");
      }
    } else throw new Error("Informe um filme para excluir");
  }
}

export { GerenciadorFilmes };
