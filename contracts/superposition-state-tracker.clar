;; superposition-state-tracker

(define-map superposition-states
  { particle-id: uint }
  {
    state: (string-ascii 10),
    last-measured: uint
  }
)

(define-public (record-superposition (particle-id uint) (state (string-ascii 10)))
  (ok (map-set superposition-states
    { particle-id: particle-id }
    {
      state: state,
      last-measured: block-height
    }
  ))
)

(define-read-only (get-superposition-state (particle-id uint))
  (map-get? superposition-states { particle-id: particle-id })
)

