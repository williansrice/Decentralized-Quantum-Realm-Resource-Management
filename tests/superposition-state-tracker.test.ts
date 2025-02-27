import { describe, it, expect, beforeEach } from "vitest"

const superpositionStates = new Map()

describe("superposition-state-tracker", () => {
  beforeEach(() => {
    superpositionStates.clear()
  })
  
  it("should record a superposition state", () => {
    const result = recordSuperposition(1, "up")
    expect(result.success).toBe(true)
  })
  
  it("should retrieve a superposition state", () => {
    recordSuperposition(1, "down")
    const state = getSuperpositionState(1)
    expect(state).toBeDefined()
    expect(state.state).toBe("down")
  })
})

function recordSuperposition(particleId: number, state: string) {
  superpositionStates.set(particleId, {
    state: state,
    last_measured: Date.now(),
  })
  return { success: true }
}

function getSuperpositionState(particleId: number) {
  return superpositionStates.get(particleId)
}

