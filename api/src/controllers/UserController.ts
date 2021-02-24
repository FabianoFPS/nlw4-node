import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UsersRepositories';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const usersRepository = getCustomRepository(UserRepository);
    const userAlreadyExists = await usersRepository.findOne({
      where: {
        email
      }
    });

    if(userAlreadyExists) return response.status(400).json({error: 'User already exists'});

    const user = usersRepository.create({ name, email });
    const createdUser = await usersRepository.save(user);
    
    return response.json(createdUser);
  }
}