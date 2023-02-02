import { Request, Response } from 'express';
import { Readable } from 'stream';

import { Certificate } from '../../models'
import { exportReport } from '../../services/xlsx';


export const historyControllers = {
    get: async (req: Request, res: Response) => {
        /*
        #swagger.tags = ['History']
        #swagger.parameters['page'] = {
            in: 'query',
            type: 'number'
        }
        */
        const page = parseInt(req.query.page as string) || 0
        const limit = parseInt(req.query.limit as string) || 10

        const history = await Certificate.find().sort('-createdAt').then((d: Array<any>) => (({
            total: d.length,
            data: d.slice(page * limit, page * limit + limit)
        })))

        res.send({
            ...history
        })
    },


    report: async (req: Request, res: Response) => {
        /*
        #swagger.tags = ['History']
        */
        const certificates = await Certificate.find();

        const report = exportReport(certificates);

        res.setHeader("Content-Type", `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`);
        res.setHeader("Content-Disposition", `attachment; filename=Report.xlsx`);

        res.status(200).end(report);
    }
}
