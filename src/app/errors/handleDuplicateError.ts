import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicteError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]+)"/);
  const extractedMessage = match?.input;

  const errorMessages: TErrorSources = [
    {
      path: '',
      message: extractedMessage,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: err?.stack,
    errorMessages,
  };
};

export default handleDuplicteError;
