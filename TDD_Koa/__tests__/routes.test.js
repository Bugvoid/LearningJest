const request = require("supertest");
const server = require("../app");
const sayTDD = require("../helloJest");

/**UTILIZE IT OU TEST */

//o que será executado antes de todos os testes
beforeAll(async () => {
  console.log("Iniciando TDD com Jest");
});

//o que será executado após todos os testes
afterAll(() => {
  server.close();
  console.log("servidor fechado");
});

describe("inicio dos testes", () => {
  //descrição do caso de testes

  test("sdasdsadsa", () => {});

  test("acessa a rota da home e verifica o conteudo que é exibido", async () => {
    //qual a rota que ele deve acessar e qual requisição deve fazer
    const response = await request(server).get("/");
    //qual o status esperado
    expect(response.status).toEqual(200);

    //se todos esses passos passarem, verifica o conteudo exibido dentro dessa rota
    expect(response.text).toContain(
      "<h1>Você está na home!</h1>  <p> vamos começar os testes </p>"
    );
  });

  test("acessa a rota /tdd e entao sera apresentada a seguinte definição de tdd", async () => {
    const response = await request(server).get("/TDD");
    expect(response.status).toEqual(200);
    expect(response.text).toContain(
      "<h4>no tdd primeiro fazemos os testes e depois desenvolvemos o sistema para que ele passe nos testes</h4>"
    );
  });

  test("acessa a rota /koa e então será apresentada a seguinte definição de Koa.js", async () => {
    const response = await request(server).get("/KOA");
    expect(response.status).toEqual(200);
    expect(response.text).toContain(
      "<h4>O Koa é uma nova estrutura da Web criada pela equipe do Express, que pretende ser uma base menor, mais expressiva e mais robusta para aplicativos da Web e APIs</h4>"
    );
  });
  //aqui não iremos testar uma rota e sim o retorno de uma função.
  test("irá verificar o retorno da função saytdd", () => {
    //é esperado que o retorno da função saytdd seja:
    expect(sayTDD()).toMatch("TDD é o Desenvolvimento Orientado por Testes");
  });
});
