Feature: Pesquisar Histórias

    Background:
        Given acesso a tela de histórias

    @realApiStories
    Scenario Outline: Listar histórias
        Given informo a história "<story>"
        When clicar no botão Submit
        Then as histórias cujo título combinam com a descrição "<story>" serão listadas
        Examples:
            | story      |
            | Cypress.io |

    @realApiStories
    Scenario: Carregar mais histórias
        Given clico no botão More
        Then 20 outras histórias serão acrescentadas

    @mockedStories
    Scenario: Clicar no título da história
        Given clico no título da história
        Then serei redirecionado para outra página

    @mockedStories
    Scenario: Marcar história como lida
        Given clico na ação de concluir
        Then a história é removida da lista

    @mockedStories
    Scenario Outline: Ordenar histórias
        Given clico na coluna "<coluna>"
        Then verei as histórias ordenadas de modo "<ordem1>" por "<coluna>"
        Given clico na coluna "<coluna>"
        Then verei as histórias ordenadas de modo "<ordem2>" por "<coluna>"
        Examples:
            | coluna   | ordem1      | ordem2      |
            | Title    | crescente   | decrescente |
            | Author   | crescente   | decrescente |
            | Comments | decrescente | crescente   |
            | Points   | decrescente | crescente   |

    @realApiStories
    Scenario: Cinco ou mais pesquisas
        Given realizo mais de 5 pesquisas
            | story      | acc |
            | Cypress.io | 1   |
            | BDD        | 2   |
            | Cucumber   | 3   |
            | Automation | 4   |
            | CTFL       | 5   |
            | Last       | 5   |
        Then apenas as 5 últimas serão armazenadas