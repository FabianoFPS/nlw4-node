import { Request, Response } from "express";

export class AnswerController {
  async execute(request: Request, response: Response): Promise<Response> {

    return response.json({});
  }
}
//18:51