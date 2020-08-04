import { Request, Response } from 'express';
import db from '../database/connection';

class ConnectionController {
  async index(request: Request, response: Response): Promise<Response> {
    const connections = await db('connections');

    return response.status(200).json({
      connections,
      total_connections: connections.reduce(sum => sum + 1, 0),
    });
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;
    await db('connections').insert({ user_id });
    
    return response.status(201).json();
  }
}

export default new ConnectionController();
