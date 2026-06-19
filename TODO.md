# TubeSync Backend - Next Steps

- [x] Update server.js:

  - [ ] Add axios timeouts + retries for scrapeChannel and each tab fetch
  - [ ] Add deduplication of videos by videoId (after parsing)
  - [ ] Add basic cache size limit (simple eviction) + TTL behavior preserved
  - [ ] Add endpoint hardening:
    - [ ] validate `url` query length / rate-limit (simple in-memory)
  - [ ] Add axios timeouts to RSS fallback too
- [ ] Run quick test by starting server and calling GET /api/scan
- [ ] If parsing fails frequently, add logging improvements (counts + reasons)
