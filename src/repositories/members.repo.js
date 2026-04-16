import { membersMock } from "../mock/membersMock"

const USE_MOCK = false

export async function fetchMembersSummary() {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300))
    return membersMock
  }

  const res = await fetch("http://localhost:4000/membersSummary")
  if (!res.ok) throw new Error("Fetch membersSummary failed")
  return await res.json()
}
