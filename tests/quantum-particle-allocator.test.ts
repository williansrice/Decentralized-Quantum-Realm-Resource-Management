import { describe, it, expect, beforeEach } from "vitest"

const particleAllocations = new Map()
let lastParticleId = 0

describe("quantum-particle-allocator", () => {
  beforeEach(() => {
    particleAllocations.clear()
    lastParticleId = 0
  })
  
  it("should allocate a new particle", () => {
    const result = allocateParticle("electron")
    expect(result.success).toBe(true)
    expect(result.result).toBe(1)
  })
  
  it("should retrieve a particle allocation", () => {
    allocateParticle("proton")
    const particle = getParticleAllocation(1)
    expect(particle).toBeDefined()
    expect(particle.particle_type).toBe("proton")
    expect(particle.is_active).toBe(true)
  })
  
  it("should deactivate a particle", () => {
    allocateParticle("neutron")
    const result = deactivateParticle(1)
    expect(result.success).toBe(true)
    const particle = getParticleAllocation(1)
    expect(particle.is_active).toBe(false)
  })
})

function allocateParticle(particleType: string) {
  const newId = ++lastParticleId
  particleAllocations.set(newId, {
    owner: "tx-sender",
    particle_type: particleType,
    is_active: true,
  })
  return { success: true, result: newId }
}

function getParticleAllocation(particleId: number) {
  return particleAllocations.get(particleId)
}

function deactivateParticle(particleId: number) {
  const particle = particleAllocations.get(particleId)
  if (particle && particle.owner === "tx-sender") {
    particle.is_active = false
    particleAllocations.set(particleId, particle)
    return { success: true }
  }
  return { success: false, error: "Particle not found or unauthorized" }
}

