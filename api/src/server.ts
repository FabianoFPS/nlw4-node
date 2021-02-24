import { log } from 'debug';

import { app } from "./app";

app.listen(3333, log('Server listem port 3333'));
