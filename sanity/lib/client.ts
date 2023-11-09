import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  token:
    "skOMq1mNIKbrfLPSFmGr55QxepEe6Qr3qJ4m79ou8Z232T31N8K95dj9x5mIhBdHmbuA9foaCmc25bxrDlux4SFx2OAbTKmHmsS5IjZRWaSf4JTIxAKn8yCFbEuf3T4mpmtH98MSqc1arUE1XEoELtwgpKc0W4mxBCrBiW5NGwe7GuZGxTh2",
  useCdn,
});
