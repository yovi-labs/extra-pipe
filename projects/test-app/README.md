# Extra Pipe documentation website

This is the Angular 22 public website. The root workspace intentionally remains
Angular 17 for partial library compilation. Node 24.15+ is required here.

From the repository root:

```sh
npm ci
npm run build:lib
npm run prepare:website
npm run start:website
npm run build:website
npm run test:website
```

Use Node 20 for the legacy library workspace if required by upstream Angular 17;
use Node 24 for website preparation/build/test. The preparation command installs
the isolated lockfile and a freshly packed local library (not source symlinks).
Never upgrade the library compiler merely to match the documentation app.

Production is static prerendered HTML in
`projects/test-app/dist/extra-pipe-website/browser`.
No Node server or paid hosting services are necessary.
The Angular 17 compatibility fixture is in `projects/angular17-demo`.
