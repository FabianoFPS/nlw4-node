import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from 'path';

import { SurveyRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UsersRepositories";
import SendMailService from "../services/SendMailService";

export class SendmailController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await userRepository.findOne({ email });

    if (!user)
      return response.status(400).json({ error: 'User does not exists.' });

    const { name, id: user_id } = user;

    const survey = await surveyRepository.findOne({ id: survey_id });

    if (!survey)
      return response.status(400).json({ error: 'Survey does not exists.' });

    const { title, description } = survey;

    let surveyUser = await surveysUsersRepository.findOne({
      where: { user_id, survey_id },
      relations: ['user', 'survey'],
    })

    if (!surveyUser) {
      surveyUser = surveysUsersRepository.create({
        user_id,
        survey_id,
      });
      surveyUser = await surveysUsersRepository.save(surveyUser);
    }
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
    const variables = {
      name,
      title,
      description,
      id: surveyUser.id,
      link: process.env.URL_MAIL,
    }

    await SendMailService.execute(
      email,
      title,
      variables,
      npsPath
    );

    return response.json(surveyUser);
  }
}