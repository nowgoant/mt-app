import { JsonController, Get, Put, Post, Delete, Param, BodyParam, Body, Req, Res, NotFoundError, OnUndefined } from 'routing-controllers';
import { Request, Response } from 'koa';

import axios from 'axios';
import * as fecha from 'fecha';
import esQuery from './../common/esQuery';

const feachAdpter: any = fecha;

@JsonController('/error')
export class ApiErrorController {
  @Get('/search')
  async search(@Req() req: Request, @Res() res: Response) {
    let rstData = ['北京', '上海'];

    return rstData;
  }
}
