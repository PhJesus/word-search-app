import { Router, Request, Response } from 'express'
import { Generator, configParams } from '../Game/grid'


const router = Router()

router.get('/', (req: Request, res: Response) => {
  //const configParams: configParams = req.query;

  //const Grid = new Generator(configParams);

  Generator
})