import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './login.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa o módulo de teste para HTTP
      providers: [AuthService] // Fornece o serviço para ser testado
    });

    service = TestBed.inject(AuthService); // Injeta o serviço
    httpTestingController = TestBed.inject(HttpTestingController); // Injeta o controlador de teste HTTP
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica se não há requisições HTTP pendentes
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy(); // Verifica se o serviço foi criado
  });

  it('deve enviar requisição POST para login', () => {
    const email = '';
    const senha = '';
    const respostaEsperada = { Mensagem: 'Login bem-sucedido!' };

    // Chama o método de login no serviço
    service.login(email, senha).subscribe((res) => {
      expect(res).toEqual(respostaEsperada); // Verifica se a resposta é a esperada
    });

    // Verifica se uma requisição POST foi feita para o endpoint correto
    const req = httpTestingController.expectOne('http://localhost:5000/api/login/login');
    expect(req.request.method).toEqual('POST'); // Verifica se é uma requisição POST
    expect(req.request.body).toEqual({ email, senha }); // Verifica se o corpo da requisição está correto

    // Fornece uma resposta simulada para a requisição HTTP
    req.flush(respostaEsperada); 
  });
});
