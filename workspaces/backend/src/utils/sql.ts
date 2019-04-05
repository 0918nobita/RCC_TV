import MySQL from 'mysql';

export const connect = (connection: MySQL.Connection) =>
  new Promise<void>((resolve: () => void, reject) => {
    connection.connect(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

export function query<T>(
  connection: MySQL.Connection,
  queryString: string,
  params: (string | string[])[] = []
) {
  return new Promise((resolve: (rows: T[]) => void, reject) => {
    connection.query(queryString, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}
