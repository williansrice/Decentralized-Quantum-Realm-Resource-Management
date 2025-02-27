import { describe, it, expect, beforeEach } from "vitest"

const entanglements = new Map()
let lastEntanglementId = 0

describe("entanglement-network-optimizer", () => {
  beforeEach(() => {
    entanglements.clear()
    lastEntanglementId = 0
  })
  
  it("should create a new entanglement", () => {
    const result = createEntanglement(1, 2)
    expect(result.success).toBe(true)
    expect(result.result).toBe(1)
  })
  
  it("should retrieve an entanglement", () => {
    createEntanglement(1, 2)
    const entanglement = getEntanglement(1)
    expect(entanglement).toBeDefined()
    expect(entanglement.particle1_id).toBe(1)
    expect(entanglement.particle2_id).toBe(2)
  })
})

function createEntanglement(particle1Id: number, particle2Id: number) {
  const newId = ++lastEntanglementId
  entanglements.set(newId, {
    particle1_id: particle1Id,
    particle2_id: particle2Id,
    strength: (particle1Id + particle2Id) % 100,
  })
  return { success: true, result: newId }
}

function getEntanglement(entanglementId: number) {
  return entanglements.get(entanglementId)
}

