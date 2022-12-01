import { GerenciadorFilmes } from "../src/filmes/gerenciador.filmes";
import repositorio from "../src/filmes/repositorio.filmes";

jest.mock("../src/filmes/repositorio.filmes");

describe("Gerenciamento de filmes", () => {
  let gerenciador = null;

  beforeAll(() => {
    gerenciador = new GerenciadorFilmes();
  });

  beforeEach(() => {
    repositorio.limpar();
  });

  test("Deve ser possível adicionar um filme", () => {
    // Pré-condições
    const filmeTeste = {
      nome: "Baby Driver",
      ano: 2018,
    };
    // Passos
    gerenciador.addFilme(filmeTeste);
    // Pós-condição
    repositorio.getFilmes.mockReturnValue([filmeTeste]);
    const quantidadeFilmes = gerenciador.getFilmes().length;
    expect(quantidadeFilmes).toBe(1);
  });

  test("Deve ser permitido excluir um filme", () => {
    const filmeTeste = {
      nome: "Baby Driver",
      ano: 2018,
    };
    gerenciador.remFilme(filmeTeste);
    repositorio.getFilmes.mockReturnValue([]);
    const quantidadeFilmes = gerenciador.getFilmes().length;
    expect(quantidadeFilmes).toBe(0);
  });

  test("Não deve ser permitido adicionar filmes futuros", () => {
    const dataAtual = new Date();
    const anoFuturo = dataAtual.getFullYear() + 1;
    const filmeTeste = {
      nome: "Avatar 3",
      ano: anoFuturo,
    };
    expect(() => {
      gerenciador.addFilme(filmeTeste);
    }).toThrowError();
  });

  test("Não deve permitir um filme com valor de nome vazio", () => {
    const filmeTeste = {
      nome: "",
      ano: 2018,
    };
    expect(() => gerenciador.addFilme(filmeTeste)).toThrowError();
  });

  test("Não deve ser possível excluir um filme inexistente", () => {
    const filmeTeste = {
      nome: "A volta dos que não foram",
      ano: 1995,
    };
    repositorio.getFilmes.mockReturnValue([]);
    expect(() => {
      gerenciador.remFilme(filmeTeste);
    }).toThrowError();
  });

  test("Deve ser possível excluir um filme existente", () => {
    const filmeTeste = {
      nome: "Rango",
      ano: 2011,
    };
    repositorio.getFilmes.mockReturnValue([filmeTeste]);
    expect(() => {
      gerenciador.remFilme(filmeTeste);
    }).not.toThrowError();
  });

  afterEach(() => {
    // console.log("Encerrou o teste");
  });

  afterAll(() => {
    // console.log("Finalizou todos os testes");
  });
});
