const notNullObject =
(object: {[key: string]: string | number | undefined | null}): {[key: string]: string} =>
  Object.entries(object).reduce((prev, [key, value]) => {
    if (value) {
      prev[key] = value as string
    }
    return prev
  }, {} as Record<string, string>)

export default notNullObject
