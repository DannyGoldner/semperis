export function getUniqueValues<
  RecordType extends Record<string, unknown>,
  FieldKey extends keyof RecordType
>(
  records: RecordType[],
  fieldName: FieldKey,
  delimiter = ','
): { key: string; value: string }[] {
  const uniqueSet = new Set<string>();

  for (const record of records) {
    const rawValue = record[fieldName];
    if (typeof rawValue === 'string') {
      for (const part of rawValue.split(delimiter)) {
        const trimmed = part.trim();
        if (trimmed) {
          uniqueSet.add(trimmed);
        }
      }
    }
  }

  const uniqueArray = Array.from(uniqueSet);
  const allNumeric = uniqueArray.every((item) => !Number.isNaN(Number(item)));

  const sortedArray = uniqueArray.sort((a, b) =>
    allNumeric ? Number(b) - Number(a) : a.localeCompare(b)
  );

  return sortedArray.map((value) => ({ key: value, value }));
}
