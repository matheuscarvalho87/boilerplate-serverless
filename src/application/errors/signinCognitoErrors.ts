import { HttpError } from '../errors/httpError';


export function handleSigninError(error): never {
  let statusCode: number;
  let message: string;

  switch (error.name) {
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
      message = 'O Cognito não tem permissão para usar sua identidade de e-mail.';
      break;
    case 'InvalidLambdaResponseException':
      statusCode = 400;
      message = 'Resposta inválida da função Lambda.';
      break;
    case 'InvalidParameterException':
      statusCode = 400;
      message = 'Parâmetro inválido fornecido.';
      break;
    case 'InvalidSmsRoleAccessPolicyException':
      statusCode = 400;
      message = 'A role fornecida para SMS não tem permissão para publicar usando SNS.';
      break;
    case 'InvalidSmsRoleTrustRelationshipException':
      statusCode = 400;
      message = 'Relação de confiança para a role SMS é inválida.';
      break;
    case 'InvalidUserPoolConfigurationException':
      statusCode = 400;
      message = 'Configuração do pool de usuários é inválida.';
      break;
    case 'NotAuthorizedException':
      statusCode = 403;
      message = 'Usuário não autorizado.';
      break;
    case 'PasswordResetRequiredException':
      statusCode = 403;
      message = 'Redefinição de senha é requerida.';
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
    case 'UserNotConfirmedException':
      statusCode = 400;
      message = 'Usuário não confirmado.';
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
        message = error.message || 'Erro ao processar a requisição.';
      }
  }

  throw new HttpError(statusCode, { error: message, details: error.message });
}
