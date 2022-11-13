type SemVersion = { major: number, minor: number, patch: number }
export function parseSemVersion (s: string) {
  const parsed = s.match(/^v?(\d+)\.(\d+)\.(\d+)$/i)

  return {
    major: parseInt(parsed![1]),
    minor: parseInt(parsed![2]),
    patch: parseInt(parsed![3])
  } as SemVersion
}
