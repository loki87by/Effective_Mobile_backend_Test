import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import { Genders } from '../types';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'reception',
  password: 'welcome',
  database: 'Effective_mobile',
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
});

function getWord(arg: boolean | null) {
  let length = 0;
  while (length < 3) {
    length = Math.floor(Math.random() * 10);
  }
  let res = '';
  const latin = arg != null ? arg : Math.random() > 0.5;
  for (let i = 0; i < length; i++) {
    const maxNum = latin ? 26 : 34;
    const shifting = latin ? 65 : 1072;
    const symbol = String.fromCharCode(
      Math.floor(Math.random() * maxNum) + shifting,
    );
    res += symbol;
  }
  return res.toLowerCase();
}

export async function createUsers(param: boolean) {
  const users = [];
  const batchSize = 1000;
  const totalUsers = 1000000;
  console.log(
    '\u001b[38;5;196m Запущен процесс миграции пользователей, пожалуйста дождитесь записи о завершении.\u001B[0m',
  );

  if (param) {
    await AppDataSource.initialize();
  }
  for (let i = 0; i < totalUsers; i++) {
    const name = getWord(null);
    const index = name.charCodeAt(0);
    const latin = index < 1000;
    users.push({
      first_name: name,
      last_name: getWord(latin),
      age: Math.floor(Math.random() * 82) + 18,
      gender: Math.random() > 0.5 ? Genders.MALE : Genders.FEMALE,
      troubles: Math.random() > 0.5,
    });

    if (users.length === batchSize) {
      await AppDataSource.manager
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(users)
        .execute();
      users.length = 0;
    }
  }

  if (users.length > 0) {
    await AppDataSource.manager
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(users)
      .execute();
  }
  console.log(
    '\u001b[36m Миллион, миллион, миллион алых роз... Пользователи добавлены.\u001B[0m',
  );
  return 'Users created!';
}
createUsers(true).catch((error) =>
  console.error('Error creating users:', error),
);
