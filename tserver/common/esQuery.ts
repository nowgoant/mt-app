interface interFaceEsQuery {
  query: object
  from: number
  size: number
  sort: any[]
  aggs: object
}

export function addMust(source: any, params: any) {
  if (source && source.query && source.query.bool && source.query.bool.must) {
    params.map((item: any) => {
      const obj: any = {}
      const expression: any = {}
      if (item.value) {
        obj[item.key] = item.value

        if (!item.expressionKey) {
          item.expressionKey = 'term'
        }
        expression[item.expressionKey] = obj

        source.query.bool.must.push(expression)
      }
    })
  }
  return source
}

export function dateScope(value1: string, value2: string) {
  if (!value1 || !value2) {
    return value1 || ''
  }

  var getDate = function(str: any) {
    var tempDate = new Date()
    var list = str.split('-')
    tempDate.setFullYear(list[0])
    tempDate.setMonth(list[1] - 1)
    tempDate.setDate(list[2])
    return tempDate
  }
  var date1 = getDate(value1)
  var date2 = getDate(value2)
  if (date1 > date2) {
    var tempDate = date1
    date1 = date2
    date2 = tempDate
  }
  // date1.setDate(date1.getDate() + 1);
  console.log(value1, value2)
  var dateArr = []
  var i = 0

  while (
    !(
      date1.getFullYear() == date2.getFullYear() &&
      date1.getMonth() == date2.getMonth() &&
      date1.getDate() == date2.getDate()
    )
  ) {
    var dayStr = date1.getDate().toString()
    if (dayStr.length == 1) {
      dayStr = '0' + dayStr
    }
    var Month =
      date1.getMonth() + 1 < 10
        ? '0' + (date1.getMonth() + 1)
        : date1.getMonth() + 1
    dateArr[i] = date1.getFullYear() + '-' + Month + '-' + dayStr
    i++

    date1.setDate(date1.getDate() + 1)
  }
  dateArr.push(value2)
  // dateArr.push(value2.split('-').join(''))
  return dateArr
}

export function allreWrite(src: string, startDate: string, endDate: string) {
  var arr = dateScope(startDate, endDate).slice(0, 5)
  console.log('arr', arr)
  var matchStr = src.match(/\{([^\}]+)\}/)[1].split('_')[0]
  var f_Arr = []
  for (var i = 0; i < arr.length; i++) {
    f_Arr.push(matchStr + '-' + arr[i])
  }
  src = src.replace(new RegExp(/\{[^\}]+\}/), f_Arr.join(','))

  return src
}

export default function(): any {
  return {
    // 查询条件
    query: {
      bool: {
        must: [
          {
            match_all: {}
          }
          // {
          //   term: {
          //     pin: 'nowgoant'
          //   }
          // },
          // {
          //   term: {
          //     logLevel: 'ERROR'
          //   }
          // }
        ],
        must_not: [],
        should: []
      }
    },
    from: 0,
    // 多少条数据
    size: 50,
    // 排序
    sort: [
      {
        createDate: {
          order: 'desc'
        }
      }
    ],
    aggs: {}
  }
}
