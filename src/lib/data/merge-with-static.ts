/**
 * When MongoDB has only part of the static catalog seeded, append missing static
 * entries so the public site does not hide content after the first admin save.
 */
export function mergeDbWithStatic<T>(
  dbItems: T[],
  staticItems: T[],
  getKey: (item: T) => string,
): T[] {
  if (dbItems.length === 0) return staticItems;

  const dbKeys = new Set(dbItems.map(getKey));
  const missing = staticItems.filter((item) => !dbKeys.has(getKey(item)));
  if (missing.length === 0) return dbItems;

  return [...dbItems, ...missing];
}

export function mergeKeys(dbKeys: string[], staticKeys: string[]): string[] {
  return [...new Set([...dbKeys, ...staticKeys])];
}

/** Keep static core values when the DB still has an older shorter list. */
export function mergeAboutValues(dbValues: string[] | undefined, staticValues: string[]): string[] {
  const values = dbValues ?? [];
  if (values.length === 0) return staticValues;
  if (staticValues.length > values.length) return staticValues;
  return values;
}
