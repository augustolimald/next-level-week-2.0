import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface IScheduleItem {
  weekday: number;
  from: string;
  to: string;
};

class ClassController {
  async index(request: Request, response: Response): Promise<Response> {
    /**
     * Filters
     */
    if (!request.query.subject || !request.query.weekday || !request.query.time) {
      return response.status(404).json({ error: 'You must inform all filters' });
    }

    const subject = request.query.subject as string;
    const weekday = Number.parseInt(request.query.weekday as string);
    const time = convertHourToMinutes(request.query.time as string);

    /**
     * Query and Response
     */
    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`weekday` = ??', [weekday])
          .whereRaw('`class_schedule`.`from` <= ??', [time])
          .whereRaw('`class_schedule`.`to` > ??', [time]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.status(200).json(classes);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { 
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
    const trx = await db.transaction();
  
    try {
      /**
       * Create User
       */
      const [user_id] = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio 
      });
  
      /**
       * Create Class
       */
      const [class_id] = await trx('classes').insert({
        user_id,
        subject,
        cost 
      });
  
      /**
       * Create Schedule
       */
      await trx('class_schedule').insert(
        schedule.map((item: IScheduleItem) => ({
          class_id,
          weekday: item.weekday,
          from: convertHourToMinutes(item.from),
          to: convertHourToMinutes(item.to),
        }))
      );
  
      await trx.commit();
    } catch (err) {
      await trx.rollback();
      return response.status(400).json({ error: 'An error has occured'});
    }
    
    return response.status(201).json();
  }
}

export default new ClassController();
