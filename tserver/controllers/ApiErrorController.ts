import { JsonController, Get, Put, Post, Delete, Param, BodyParam, Body, Req, Res, NotFoundError, OnUndefined } from 'routing-controllers';
import { Request, Response } from 'koa';

@JsonController('/error')
export class ApiErrorController {
  @Get('/search')
  async search(@Req() req: Request, @Res() res: Response) {
    return ['北京', '天津'];
  }
}
