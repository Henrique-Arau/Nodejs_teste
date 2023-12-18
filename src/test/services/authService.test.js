import { describe, it } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import AuthService from '../../services/authService';
import Usuario from '../../models/usuario';

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

  it('- A senha do usuario precisa ser criptografada quando for salva no banco de dados', async () => {
    // Arrange
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    // ACT
    const resultado = await authService.cadastrarUsuario(data);
    const senhaIguais = await bcryptjs.compare('senha123', resultado.content.senha);

    // Assert
    expect(senhaIguais).toStrictEqual(true);
    await Usuario.excluir(resultado.content.id);
  });

  it('- Não pode ser cadastrado um usuario com email duplicado', async () => {
    // Arrange
    const usuarioMock = {
      nome: 'Raphael',
      email: 'teste@gmail.com',
      senha: '123456',
    };

    // ACT
    const usuarioSave = authService.cadastrarUsuario(usuarioMock);

    // Assert
    await expect(usuarioSave).rejects.toThrowError('O email já esta cadastrado!');
  });

  it('- Ao cadastrar um usuario deve ser retornado uma mensagem informando que o usuario foi cadastrado', async () => {
    // Arrange
    const data = {
      nome: 'Johm Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    // ACT
    const resultado = await authService.cadastrarUsuario(data);

    // Assert
    expect(resultado.message).toEqual('usuario criado');

    await Usuario.excluir(resultado.content.id);
  });

  it('Ao cadastrar um usuário, validar o retorno das informações do usuário', async () => {
    // Arrange
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    // ACT
    const resultado = await authService.cadastrarUsuario(data);

    // Assert
    expect(resultado.content).toMatchObject(data);

    await Usuario.excluir(resultado.content.id);
  });
});
