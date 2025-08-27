# Backend (AdonisJS v5)
API for cluster dashboard.

## Run
npm install
npm run dev

## Endpoints
- GET /api/health
- GET /api/clusters/:id/metrics
- GET /api/clusters/:id/snapshot-policy
- PUT /api/clusters/:id/snapshot-policy

## CURL test

Get current policy:
```
curl -s http://localhost:3333/api/clusters/cluster-1/snapshot-policy | jq .
```

Update policy:
```
curl -s -X PUT http://localhost:3333/api/clusters/cluster-1/snapshot-policy \
  -H "Content-Type: application/json" \
  -d '{
    "policyName":"ProjectX_Daily",
    "directory":"/Production/ProjectX",
    "timezone":"America/Los_Angeles",
    "time":"09:30",
    "days":["Mon","Wed","Fri"],
    "deleteAfterDays": 30,
    "locked": false,
    "enabled": true
  }' | jq .
```

Check the file:
```
cat backend-adonis/data/snapshot_policy.json
```

> Note: When running the compiled build (`npm run build && npm start`), the `data/` folder is copied to the build output via `.adonisrc.json -> metaFiles`. When running `npm run dev`, the file is read/written from the project root (`backend-adonis/data/snapshot_policy.json`).
