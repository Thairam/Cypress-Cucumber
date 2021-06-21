import SearchPage from '../pageobjects/SearchPage'
import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const searchPage = new SearchPage

Before({ tags: "@mockedStories" }, () => {
    searchPage.aguardarHistoriasMockadas()
})

Before({ tags: "@realApiStories" }, () => {
    searchPage.aguardarHistoriasApi()
})

Given(/^acesso a tela de histórias$/, () => {
    searchPage.accessarTelaPesquisa()
});

Given(`informo a história {string}`, (story) => {
    searchPage.preencherCampoPesquisa(story)
});

Given('clico no botão More', () => {
    searchPage.clicarMais()
})

Given('clico no título da história', () => {
    searchPage.clicarTituloLink()
})

Given('clico na ação de concluir', () => {
    searchPage.clicarAction()
})

Given(`clico na coluna {string}`, (coluna) => {
    searchPage.clicarHeaderColuna(coluna)
})

Given('realizo mais de 5 pesquisas', (datatable) => {
    searchPage.multiplasPesquisas(datatable)
})

When(/^clicar no botão Submit$/, () => {
    searchPage.clicarSubmit()
});

Then('as histórias cujo título combinam com a descrição {string} serão listadas', () => {
    searchPage.verificarHistorias(20)
});

Then('20 outras histórias serão acrescentadas', () => {
    searchPage.verificarMaisHistorias()
})

Then('serei redirecionado para outra página', () => {
    searchPage.verificarTituloLink()
})

Then('a história é removida da lista', () => {
    searchPage.verificarHistorias(1)
})

Then('verei as histórias ordenadas de modo {string} por {string}', (ordem, coluna) => {
    searchPage.verificarHistoriasOrdenacao(ordem, coluna)
})

Then('verei as histórias ordenadas de modo {string} por {string}', (ordem, coluna) => {
    searchPage.verificarHistoriasOrdenacao(ordem, coluna)
})

Then('apenas as {int} últimas serão armazenadas', (size) => {
    searchPage.verificarQtdUltimasPesquisas(size)
})
