import { Request, Response } from 'express';

import { Certificate } from '../../models'


export const historyControllers = {
    get: async (req: Request, res: Response) => {
        /*
        #swagger.tags = ['History']
        #swagger.parameters['page'] = {
            in: 'query',
            type: 'number'
        }
        */
        const page = parseInt(req.params.page) || 0
        const limit = parseInt(req.params.limit) || 10

        const history = await Certificate.find({userId: req.user?.id}).then((d: Array<any>) => (({
            total: d.length,
            data: d.slice(page * limit, limit)
        })))

        res.send({
            ...history
        })
    },
}
