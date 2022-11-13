import { RequestHandler } from "express";


export interface Controller {
    [controller: string] : RequestHandler[],
}