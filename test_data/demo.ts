import * as fs from "fs";

export default class DemoComponent {
  funcA(path: string) {
    return fs.readFileSync(path);
  }
}

// @ts-ignore
function HelperUtil() {

}

// @ts-ignore
interface IDemo {

}
