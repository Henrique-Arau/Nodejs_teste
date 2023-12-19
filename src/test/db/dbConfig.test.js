import { describe } from '@jest/globals';
import db from '../../db/dbconfig';

describe('Testando configDB', () => {
  it('- Teste de conexão com obanco de dados', async () => {
    // Arrange
    const autorMock = {
      nome: 'Luana',
      nacionalidade: 'Brasileira',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // ACT
    const autorSalvo = await db('autores').insert(autorMock)
      .then((retorno) => db('autores')
        .where('id', retorno[0]))
      .then((autorSelecionado) => autorSelecionado[0]);

    // Assert
    expect(autorSalvo.nome).toBe(autorMock.nome);

    await db('autores').where({ id: autorSalvo.id }).del();
  });
});
