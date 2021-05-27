import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default <TypeOrmModuleOptions>{
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'nestjs',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
