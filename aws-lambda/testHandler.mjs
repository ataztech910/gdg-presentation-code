import { handler  } from "./index.mjs";

handler().then(() => {
    console.log('done');
}).catch((e) => {
    console.error(e, 'not done');
})