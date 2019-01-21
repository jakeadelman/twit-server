import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

@Entity('chatmsg')
export class HourlySentiment extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column('integer') sentiment: number
  @Column('text') searchTerm: string
  // @Column("text") hour: string;
  // @Column("boolean") fromBot: boolean;
  // @Column("text") message: string;
}
