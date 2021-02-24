import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveyRepository } from '../repositories/SurveysRepository';

export class SurveyController {
  // surveyRepository = getCustomRepository(SurveyRepository);
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const surveyRepository = getCustomRepository(SurveyRepository);
    const survey = surveyRepository.create({
      title,
      description,
    })
    const createdSurvey = await surveyRepository.save(survey);
    
    return response.status(201).json(createdSurvey);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const surveyRepository = getCustomRepository(SurveyRepository);
    const all = await surveyRepository.find();

    return response.json(all);
  }
}