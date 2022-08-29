// (c) Tecnologico de Monterrey 2022, rights reserved.

enum STATUS_TYPE {
  FAIL = "FAIL",
  ERROR = "ERROR",
}

class ServerError extends Error {
  public statusCode: number;
  public statusType: STATUS_TYPE;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.statusType = `${statusCode}`.startsWith("4") ? STATUS_TYPE.FAIL : STATUS_TYPE.ERROR;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ServerError;
