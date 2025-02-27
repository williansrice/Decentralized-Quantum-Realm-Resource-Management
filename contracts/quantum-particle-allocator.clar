;; quantum-particle-allocator

(define-map particle-allocations
  { particle-id: uint }
  {
    owner: principal,
    particle-type: (string-ascii 10),
    is-active: bool
  }
)

(define-data-var last-particle-id uint u0)

(define-public (allocate-particle (particle-type (string-ascii 10)))
  (let
    (
      (new-id (+ (var-get last-particle-id) u1))
    )
    (map-set particle-allocations
      { particle-id: new-id }
      {
        owner: tx-sender,
        particle-type: particle-type,
        is-active: true
      }
    )
    (var-set last-particle-id new-id)
    (ok new-id)
  )
)

(define-read-only (get-particle-allocation (particle-id uint))
  (map-get? particle-allocations { particle-id: particle-id })
)

(define-public (deactivate-particle (particle-id uint))
  (let
    (
      (particle (unwrap! (get-particle-allocation particle-id) (err u404)))
    )
    (asserts! (is-eq (get owner particle) tx-sender) (err u403))
    (ok (map-set particle-allocations
      { particle-id: particle-id }
      (merge particle { is-active: false })
    ))
  )
)
