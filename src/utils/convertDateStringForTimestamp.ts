export default function convertDateStringForTimestamp(date: string): number | null {
  const dateArr = date.split('/');

  if (!dateArr || dateArr.length !== 3) {
    return null;
  }

  const year = +dateArr[2];
  const month = +dateArr[1] - 1;
  const day = +dateArr[0];

  const birth = Date.parse(`${new Date(year, month, day)}`);
  return birth;
}
