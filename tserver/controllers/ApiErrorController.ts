import { JsonController, Get, Put, Post, Delete, Param, BodyParam, Body, Req, Res, NotFoundError } from 'routing-controllers';
import { Request, Response } from 'koa';
import axios from 'axios';
import fecha from 'fecha';

import esQuery, { addMust, allreWrite } from './../common/esQuery';
import ResultData from './../view/ResultData';
import PageError from './../models/PageError';

@JsonController('/api/error')
export class ApiErrorController {
  @Get('/test')
  async test(@Req() req: Request, @Res() res: Response): Promise<any[]> {
    return ['test success'];
  }

  @Get('/search')
  async search(@Req() req: Request, @Res() res: Response): Promise<any[]> {
    const url = 'http://jrapp-es.jdfmgt.com/jrmdp-h5-business-2018-07-16,jrmdp-h5-business-2018-07-17/_search';
    const query = esQuery();
    const { data } = await axios.post(url, query);
    const originData = data.hits && data.hits.hits;
    let rstData = [];

    if (originData && originData.length) {
      rstData = originData;
    }

    return rstData;
  }

  @Post('/search')
  async searchPost(@Req() req: Request, @Res() res: Response, @BodyParam('dateRange') dateRange: any[]): Promise<any> {
    let startDate;
    let endDate;
    let serverUrl;
    if (dateRange && dateRange.length) {
      startDate = dateRange[0];
      endDate = dateRange[1] || '';
      serverUrl = allreWrite('http://jrapp-es.jdfmgt.com/{jrmdp-h5-business}/_search', startDate, endDate);
    } else {
      startDate = fecha.format(new Date(), 'YYYY-MM-DD');
      serverUrl = `http://jrapp-es.jdfmgt.com/jrmdp-h5-business-${startDate}/_search`;
    }
    let query = esQuery();
    query = addMust(query, [
      {
        key: 'pin',
        value: req.body['pin']
      },
      {
        key: 'url',
        expressionKey: 'prefix',
        value: req.body['url']
      },
      {
        key: 'logLevel',
        value: req.body['logLevel']
      }
    ]);
    console.log(req.body);
    console.log(serverUrl);
    console.log(query.query.bool.must);
    const { data } = await axios.post(serverUrl, query);
    const originData = data.hits && data.hits.hits;

    let rstData = new ResultData('0', '', { isSuccess: '1' });
    if (originData && originData.length) {
      rstData.resultData.list = originData;
    }

    return rstData;
  }

  @Post('/sync')
  async sync(@Req() req: Request, @Res() res: Response) {
    const startDate = fecha.format(new Date(), 'YYYY-MM-DD');
    const startDate1 = startDate.split('-').join('');

    const url = `http://jrmdp.jd.com/report/getCardReprot?sid=654f48de9faad53a678baa767bf2d27f&url=http://spago.jr.jd.com/SpagoBI/restful-services/2.0/datasets/jrapp_h5_data_r_error_20/content?etl_dt=${startDate1}&sid=f81a2afb61a6a0770807c6f8fc9d01fw`;
    console.log(url);
    // const { data } = await axios.get(url, {})
    // console.log('data', data)
    console.log('req.header', req.cookies);

    // let rstData = new ResultData('0', '', { isSuccess: '1' })

    const data = [{ urlP: '/rn/BTMonthBill/index.html' }, { urlP: '/jdbt/lightning/index.html' }, { urlP: '/jdbt/quotamanage/quota.html' }, { urlP: '/jdbt/btgold/index.html' }];

    const resultData: any[] = [];
    const promises = data.map(async item => {
      const errorCount = await this.getErrorCount(startDate, item.urlP);
      const pvCount = await this.getPVCount(startDate, item.urlP);
      resultData.push({
        urlP: item.urlP,
        errorCount,
        pvCount,
        errorRate: ((errorCount / pvCount) * 100).toFixed(2)
      });
    });
    await Promise.all(promises);

    console.log(resultData);
    return res.json(resultData);
  }

  @Post('/create')
  async createPageErrorAction(@Req() req: Request) {
    const createDate = fecha.format(new Date(), 'YYYY-MM-DD');
    const user = await PageError.create({
      urlP: req.body['urlP'] || '',
      date: req.body['date'] || '',
      errorCount: 0,
      pvCount: 0,
      errorRate: 0,
      createDate: createDate
    });
    return user.dataValues;
  }

  async getErrorCount(startDate: string, urlP: string) {
    let errorQuery = esQuery();
    errorQuery = addMust(errorQuery, [
      {
        key: 'urlP',
        value: urlP || ''
      },

      {
        key: 'logLevel',
        value: 'ERROR'
      }
    ]);

    const { data } = await axios.post(`http://jrapp-es.jdfmgt.com/jrmdp-h5-business-${startDate}/_count`, errorQuery);

    return data.count || 0;
  }

  async getPVCount(startDate: string, urlP: string) {
    let errorQuery = esQuery();
    errorQuery = addMust(errorQuery, [
      {
        key: 'urlP',
        value: urlP || ''
      },

      {
        key: 'logLevel',
        value: 'TRACE'
      }
    ]);

    const { data } = await axios.post(`http://jrapp-es.jdfmgt.com/jrmdp-h5-business-${startDate}/_count`, errorQuery);

    return data.count || 0;
  }
  // @Get('/findById/:id')
  // async getOne(@Param('id') id: number) {
  //   const user = await User.findById(id || '')
  //   if (!user) throw new NotFoundError(`User was not found.`)
  //   // console.log('user.dataValues', );
  //   return user.dataValues
  // }

  // @Get('/update/:id')
  // async update(@Req() req: Request, @Res() res: Response) {
  //   const updates = await User.update<User>(
  //     { name: 'majun1' },
  //     { where: { id: req.params['id'] } }
  //   )
  //   // return user.dataValues;
  //   res.send(`更新了${String(updates[0])}行`)
  // }
}
