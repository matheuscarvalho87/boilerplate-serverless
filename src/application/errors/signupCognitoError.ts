import { HttpError } from '../errors/httpError';


export function handleSignupCognitoError(error): never {
  let statusCode: number;
  let message: string;

  switch (error.name) {
    case 'CodeDeliveryFailureException':
      statusCode = 400;
      message = 'Falha no envio do código de verificação.';
      break;
    case 'ForbiddenException':
      statusCode = 403;
      message = 'Acesso negado pelo WAF associado.';
      break;
    case 'InternalErrorException':
      statusCode = 500;
      message = 'Erro interno no serviço Cognito.';
      break;
    case 'InvalidEmailRoleAccessPolicyException':
      statusCode = 400;
      message = 'Política de acesso para e-mail inválida.';
      break;
    case 'InvalidLambdaResponseException':
      statusCode = 400;
      message = 'Resposta inválida da função Lambda.';
      break;
    case 'InvalidParameterException':
      statusCode = 400;
      message = 'Parâmetro inválido fornecido.';
      break;
    case 'InvalidPasswordException':
      statusCode = 400;
      message = 'Senha inválida.';
      break;
    case 'InvalidSmsRoleAccessPolicyException':
      statusCode = 400;
      message = 'Política de acesso para SMS inválida.';
      break;
    case 'InvalidSmsRoleTrustRelationshipException':
      statusCode = 400;
      message = 'Relação de confiança para SMS inválida.';
      break;
    case 'LimitExceededException':
      statusCode = 429;
      message = 'Limite de requisições excedido.';
      break;
    case 'NotAuthorizedException':
      statusCode = 403;
      message = 'Usuário não autorizado.';
      break;
    case 'ResourceNotFoundException':
      statusCode = 404;
      message = 'Recurso não encontrado.';
      break;
    case 'TooManyRequestsException':
      statusCode = 429;
      message = 'Muitas requisições. Tente novamente mais tarde.';
      break;
    case 'UnexpectedLambdaException':
      statusCode = 400;
      message = 'Exceção inesperada na função Lambda.';
      break;
    case 'UserLambdaValidationException':
      statusCode = 400;
      message = 'Validação do usuário falhou na função Lambda.';
      break;
    case 'UsernameExistsException':
      statusCode = 409;
      message = 'Nome de usuário já existe.';
      break;
    default:
      if (error.fault && error.fault === 'server') {
        statusCode = 500;
        message = 'Erro interno no serviço Cognito.';
      } else {
        statusCode = 400;
        message = error.message || 'Erro ao cadastrar usuário.';
      }
  }

  // Pode ser interessante incluir informações adicionais do erro
  throw new HttpError(statusCode, { error: message, details: error.message });
}

export function handleConfirmSignupError(error): never {
  let statusCode: number;
  let message: string;

  switch (error.name) {
    case 'AliasExistsException':
      statusCode = 409;
      message = 'O e-mail ou telefone já está associado a outro usuário.';
      break;
    case 'CodeMismatchException':
      statusCode = 400;
      message = 'O código fornecido não corresponde ao esperado.';
      break;
    case 'ExpiredCodeException':
      statusCode = 400;
      message = 'O código expirou.';
      break;
    case 'ForbiddenException':
      statusCode = 403;
      message = 'Acesso negado pelo WAF associado.';
      break;
    case 'InternalErrorException':
      statusCode = 500;
      message = 'Erro interno no serviço Cognito.';
      break;
    case 'InvalidLambdaResponseException':
      statusCode = 400;
      message = 'Resposta inválida da função Lambda.';
      break;
    case 'InvalidParameterException':
      statusCode = 400;
      message = 'Parâmetro inválido fornecido.';
      break;
    case 'LimitExceededException':
      statusCode = 429;
      message = 'Limite de requisições excedido.';
      break;
    case 'NotAuthorizedException':
      statusCode = 403;
      message = 'Usuário não autorizado.';
      break;
    case 'ResourceNotFoundException':
      statusCode = 404;
      message = 'Recurso não encontrado.';
      break;
    case 'TooManyFailedAttemptsException':
      statusCode = 429;
      message = 'Muitas tentativas falhadas.';
      break;
    case 'TooManyRequestsException':
      statusCode = 429;
      message = 'Muitas requisições. Tente novamente mais tarde.';
      break;
    case 'UnexpectedLambdaException':
      statusCode = 400;
      message = 'Exceção inesperada na função Lambda.';
      break;
    case 'UserLambdaValidationException':
      statusCode = 400;
      message = 'Validação do usuário falhou na função Lambda.';
      break;
    case 'UserNotFoundException':
      statusCode = 404;
      message = 'Usuário não encontrado.';
      break;
    default:
      if (error.fault && error.fault === 'server') {
        statusCode = 500;
        message = 'Erro interno no serviço Cognito.';
      } else {
        statusCode = 400;
        message = error.message || 'Erro ao confirmar cadastro.';
      }
  }

  throw new HttpError(statusCode, { error: message, details: error.message });
}
