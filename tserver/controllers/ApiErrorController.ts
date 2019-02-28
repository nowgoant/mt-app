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
    const startDate = feachAdpter.format(new Date(), 'YYYY-MM-DD');
    const url = `http://jrapp-es.jdfmgt.com/jrmdp-h5-business-${startDate}/_search`;
    const query = esQuery();
    const { data } = await axios.post(url, query);
    const originData = data.hits && data.hits.hits;
    let rstData = [];

    if (originData && originData.length) {
      rstData = originData;
    }

    return rstData;
  }
}
