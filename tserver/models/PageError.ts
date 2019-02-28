import { Table, Column, Model, HasMany } from 'sequelize-typescript'

@Table
export default class PageError extends Model<PageError> {
  @Column urlP: string

  @Column date: string

  @Column errorCount: Number

  @Column pvCount: Number

  @Column errorRate: Number

  @Column createDate: string

  @Column updateDate: string
}
