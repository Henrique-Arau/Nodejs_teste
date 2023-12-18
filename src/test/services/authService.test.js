import { describe, it } from '@jest/globals';
import AuthService from '../../services/authService';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  it('- O usuario deve possuir um nome, email e senha', async () => {
    // Arrange - qual as informações para validar
    const usuarioMock = {
      nome: 'Raphael',
      email: 'teste@teste.com.br',
    };
    // ACT - Buscar as informações
    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);
    // Assert - comparar o arrange com o nosso act
    await expect(usuarioSalvo).rejects.toThrowError('A senha de usuario é obrigatorio!');
    // O ACT aciona o método que retorna os registros e,
    // em seguida, o ASSERT será utilizado para validar se as
    // informações retornadas, ou os erros lançados, estavam de
    // acordo com o esperado.
  });
});
