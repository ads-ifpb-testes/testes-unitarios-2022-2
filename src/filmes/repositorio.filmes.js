let filmes = [];

const salvar = (filme) => {
  filmes.push(filme);
};

const remover = (indiceFilme) => {
  filmes.splice(indiceFilme, 1);
};

const limpar = () => (filmes.length = 0);

const getFilmes = () => {
  return filmes;
};

export default { salvar, remover, limpar, getFilmes };
