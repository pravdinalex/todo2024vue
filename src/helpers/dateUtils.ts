
export function getTimestamp() {
  return +(new Date())
}

export function formatTimestamp(ts: number): string {
  return (new Date(ts)).toLocaleDateString()
}
