/// <reference types="cypress" />

import searchElements from '../elements/SearchElements'
const url = Cypress.config("baseUrl")
const stories = require('../../fixtures/stories.json')

class SearchPage {
  accessarTelaPesquisa() { cy.visit(url) }

  aguardarHistoriasApi() {
    cy.intercept('GET', '**/search?query=React&page=0').as('getStories')
    cy.visit(url)
    cy.wait('@getStories')
  }

  aguardarHistoriasMockadas() {
    cy.intercept(
      'GET',
      '**/search**',
      { fixture: 'stories' }
    ).as('getMockStories')

    cy.visit(url)
    cy.wait('@getMockStories')
  }

  preencherCampoPesquisa(string) {
    cy.get(searchElements.iptPesquisa)
      .should('be.visible')
      .clear()
      .type(string)
  }

  clicarSubmit() {
    cy.get(searchElements.botaoSubmit)
      .should('be.visible')
      .click()
  }

  clicarHeaderColuna(header) {
    cy.contains(header)
      .should('be.visible')
      .click()
  }

  clicarMais() {
    cy.intercept('GET', '**/search?query=React&page=1').as('getMoreStories')
    cy.contains(searchElements.botaoMore)
      .should('be.visible')
      .click()
  }

  clicarTituloLink() {
    cy.get(searchElements.tituloHistoria)
      .first()
      .within(() => {
        cy.get('a')
          .should('be.visible')
          .as('getTitleLink')
      })
  }

  clicarAction() {
    cy.get(searchElements.action)
      .should('be.visible')
      .click()
  }

  verificarHistorias(size) {
    cy.get(searchElements.tabela).should('have.length', size)
  }

  verificarMaisHistorias() {
    cy.wait('@getMoreStories')
    cy.get(searchElements.tabela).should('have.length', 40)
  }

  verificarTituloLink() {
    cy.get('@getTitleLink')
      .should('have.attr', 'href', 'https://exemplo/1')
      .and('have.attr', 'target', '_blank')
  }

  verificarQtdUltimasPesquisas(size) {
    cy.get(searchElements.ultimasPesquisas)
      .should('be.visible')
      .within(() => {
        cy.get('button')
          .should('have.length', size)
      })
  }

  verificarHistoriasOrdenacao(ordem, coluna) {
    const checkOrder = () => ordem === 'crescente'

    switch (coluna) {
      case 'Title':
        cy.get(searchElements.tituloHistoria)
          .first()
          .should('have.text', stories.hits[checkOrder() ? 1 : 0].title)
        break

      case 'Author':
        cy.get(searchElements.tituloHistoria)
          .first()
          .should('have.text', stories.hits[checkOrder() ? 0 : 1].title)
        break

      case 'Comments':
        cy.get(searchElements.tituloHistoria)
          .first()
          .should('have.text', stories.hits[checkOrder() ? 0 : 1].title)
        break

      case 'Points':
        cy.get(searchElements.tituloHistoria)
          .first()
          .should('have.text', stories.hits[checkOrder() ? 1 : 0].title)
        break
    }
  }

  multiplasPesquisas(datatable) {
    let lastTermSearched = 'React'

    datatable.hashes().forEach(element => {
      cy.intercept(
        'GET',
        `**/search?query=${element.story}&page=0`
      ).as('getTermStories')

      this.preencherCampoPesquisa(element.story)

      this.clicarSubmit()

      cy.wait('@getTermStories')

      cy.get(searchElements.ultimasPesquisas)
        .should('be.visible')
        .within(() => {
          cy.contains(lastTermSearched)
          lastTermSearched = element.story
        })
    })
  }
}

export default SearchPage
