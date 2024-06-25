import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './login.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [AuthService] 
    });

    service = TestBed.inject(AuthService); 
    httpTestingController = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy(); 
  });

  it('deve enviar requisição para login', () => {
    const email = '';
    const senha = '';
    const respostaEsperada = { Mensagem: 'Login bem-sucedido!' };
   
    // service.login(email, senha).subscribe((res) => {
    //   expect(res).toEqual(respostaEsperada); 
    // });

    const req = httpTestingController.expectOne('http://localhost:5000/api/Usuario');
    expect(req.request.method).toEqual('POST'); 
    expect(req.request.body).toEqual({ email, senha }); 


    req.flush(respostaEsperada); 
  });
});
