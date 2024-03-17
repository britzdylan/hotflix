export function createMockResolveValue(data: any) {
  return {
    json: () => new Promise<Response>((resolve) => resolve(data)),
    ok: true
  }
}
